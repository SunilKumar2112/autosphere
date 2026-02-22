import { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/auth-context';
import './LoginPage.css';

interface Reservation {
    vehicle_name: string;
    status: string;
}

const CheckoutSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const sessionId = searchParams.get('session_id');
    const fallbackVehicleName = searchParams.get('vehicle') || 'your vehicle';

    const [reservation, setReservation] = useState<Reservation | null>(null);
    const [isLoading, setIsLoading] = useState(!!sessionId);

    useEffect(() => {
        if (!user && sessionId) {
            // Need to be logged in to view your reservation
            navigate('/login');
            return;
        }

        if (sessionId && user) {
            // Poll for the reservation since the webhook might take a moment to write it
            let attempts = 0;
            const maxAttempts = 10;

            const checkReservation = async () => {
                const { data, error } = await supabase
                    .from('reservations')
                    .select('vehicle_name, status')
                    .eq('stripe_session_id', sessionId)
                    .single();

                if (data) {
                    setReservation(data as Reservation);
                    setIsLoading(false);
                } else if (attempts < maxAttempts) {
                    attempts++;
                    setTimeout(checkReservation, 2000); // Poll every 2 seconds
                } else {
                    console.error('Reservation timeout or error:', error);
                    setIsLoading(false);
                }
            };

            checkReservation();
        }
    }, [sessionId, user, navigate]);

    const vehicleName = reservation?.vehicle_name || fallbackVehicleName;

    return (
        <main className="auth-page">
            <div style={{
                maxWidth: '520px',
                width: '100%',
                textAlign: 'center',
                background: 'rgba(15, 15, 15, 0.9)',
                border: '1px solid rgba(201, 169, 110, 0.15)',
                borderRadius: '16px',
                padding: '3rem',
                backdropFilter: 'blur(20px)',
            }}>
                {/* Success Check */}
                <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(52, 168, 83, 0.12)',
                    border: '2px solid rgba(52, 168, 83, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34A853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>

                <h1 style={{
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    color: '#e8e0d2',
                    marginBottom: '0.75rem',
                    letterSpacing: '-0.01em',
                }}>
                    {isLoading ? 'Confirming Reservation...' : 'Reservation Confirmed'}
                </h1>

                <p style={{
                    fontSize: '0.9rem',
                    color: 'rgba(232, 224, 210, 0.5)',
                    lineHeight: 1.6,
                    marginBottom: '2rem',
                }}>
                    {isLoading ? (
                        'Please wait while we securely verify your payment and lock in your reservation details...'
                    ) : (
                        <>
                            Your reservation for <strong style={{ color: '#c9a96e' }}>{vehicleName}</strong> has been
                            successfully placed and verified. Our concierge team will reach out within 24 hours to finalize the details.
                        </>
                    )}
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link to="/vehicles" style={{
                        padding: '0.75rem 1.5rem',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(201,169,110,0.2)',
                        borderRadius: '10px',
                        color: '#e8e0d2',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s',
                        opacity: isLoading ? 0.5 : 1,
                        pointerEvents: isLoading ? 'none' : 'auto',
                    }}>
                        Browse More
                    </Link>
                    <Link to="/" style={{
                        padding: '0.75rem 1.5rem',
                        background: 'linear-gradient(135deg, #c9a96e, #a88b54)',
                        border: 'none',
                        borderRadius: '10px',
                        color: '#0a0a0a',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        transition: 'all 0.2s',
                        opacity: isLoading ? 0.5 : 1,
                        pointerEvents: isLoading ? 'none' : 'auto',
                    }}>
                        Return Home
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default CheckoutSuccessPage;
