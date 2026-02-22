import { useState } from 'react';
import { useAuth } from '../../context/auth-context';
import { useNavigate } from 'react-router-dom';

interface CheckoutButtonProps {
    vehicleId: string;
    vehicleName: string;
    price: string;
    className?: string;
}

/**
 * Stripe Checkout Button — "Reserve Vehicle"
 *
 * Per the stripe-integration skill:
 * - Uses Stripe Checkout Sessions (recommended for primary integrations)
 * - Never exposes sk_test on client — calls a Supabase Edge Function to create session
 */
const CheckoutButton = ({ vehicleId, vehicleName, price, className = '' }: CheckoutButtonProps) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = async () => {
        if (!user) {
            navigate('/login', { state: { from: { pathname: `/vehicles/${vehicleId}` } } });
            return;
        }

        setIsLoading(true);

        try {
            // Call the Supabase Edge Function to initiate Stripe Checkout
            const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
                },
                body: JSON.stringify({ vehicleId, vehicleName, price }),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Failed to create checkout session');
            }

            const { url } = await response.json();

            // Redirect to Stripe Hosted Checkout
            window.location.href = url;

        } catch (err) {
            console.error('[Stripe] Checkout failed:', err);
            setIsLoading(false);
        }
    };

    return (
        <button
            className={`checkout-btn ${className}`}
            onClick={handleCheckout}
            disabled={isLoading}
        >
            {isLoading ? (
                <>
                    <span className="checkout-btn-spinner" />
                    Processing...
                </>
            ) : (
                <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                        <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                    Reserve — {price}
                </>
            )}
        </button>
    );
};

export default CheckoutButton;
