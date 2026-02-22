import { serve } from "@std/http"
import { createClient } from "@supabase/supabase-js"
import Stripe from "stripe"

const stripe = new Stripe(Deno.env.get('STRIPE_API_KEY') as string, {
    apiVersion: '2023-10-16',
    httpClient: Stripe.createFetchHttpClient(),
})

const cryptoProvider = Stripe.createSubtleCryptoProvider()

serve(async (req: Request) => {
    const startTime = Date.now()
    const signature = req.headers.get('Stripe-Signature')
    const wideEvent: Record<string, any> = {
        path: '/stripe-webhook',
        method: req.method,
        timestamp: new Date().toISOString(),
    }

    if (!signature) {
        wideEvent.status = 400
        wideEvent.error = 'No signature'
        console.log(JSON.stringify(wideEvent))
        return new Response('No signature', { status: 400 })
    }

    try {
        const body = await req.text()
        const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') as string

        let event;
        try {
            event = await stripe.webhooks.constructEventAsync(
                body,
                signature,
                webhookSecret,
                undefined,
                cryptoProvider
            )
        } catch (err: any) {
            wideEvent.status = 400
            wideEvent.error = `Signature verification failed: ${err.message}`
            console.log(JSON.stringify(wideEvent))
            return new Response(`Webhook Error: ${err.message}`, { status: 400 })
        }

        wideEvent.event_type = event.type

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object
            wideEvent.stripe_session_id = session.id

            const supabaseAdmin = createClient(
                Deno.env.get('SUPABASE_URL') ?? '',
                Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
            )

            const { user_id, vehicle_id, vehicle_name } = session.metadata || {}
            wideEvent.metadata = { user_id, vehicle_id, vehicle_name }

            const { error } = await supabaseAdmin
                .from('reservations')
                .insert({
                    user_id,
                    vehicle_id,
                    vehicle_name,
                    price: session.amount_total ? session.amount_total / 100 : 0,
                    stripe_session_id: session.id,
                    status: 'confirmed'
                })

            if (error) {
                wideEvent.db_error = error.message
                throw error
            }
            wideEvent.outcome = 'reservation_created'
        }

        wideEvent.status = 200
        return new Response(JSON.stringify({ received: true }), { status: 200 })
    } catch (error: any) {
        wideEvent.status = 500
        wideEvent.error = error.message
        return new Response('Webhook handler failed', { status: 500 })
    } finally {
        wideEvent.duration_ms = Date.now() - startTime
        console.log(JSON.stringify(wideEvent))
    }
})
