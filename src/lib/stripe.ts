import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
    console.warn(
        '[Stripe] Missing VITE_STRIPE_PUBLISHABLE_KEY. Payment features will be unavailable.'
    );
}

export const stripePromise = stripePublishableKey
    ? loadStripe(stripePublishableKey)
    : null;
