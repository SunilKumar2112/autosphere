import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import './LoginPage.css'; /* Shared auth styles */

const SignupPage = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { signUp, signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setIsSubmitting(true);
        const { error: authError } = await signUp(email, password, fullName);

        if (authError) {
            setError(authError.message);
            setIsSubmitting(false);
        } else {
            setSuccess('Account created! Check your email for a confirmation link.');
            setTimeout(() => navigate('/login'), 3000);
        }
    };

    const handleGoogleSignIn = async () => {
        setError('');
        const { error: authError } = await signInWithGoogle();
        if (authError) {
            setError(authError.message);
        }
    };

    return (
        <main className="auth-page">
            <div className="auth-container">
                {/* Left Side — Branding */}
                <div className="auth-branding">
                    <div className="auth-branding-content">
                        <h1 className="auth-branding-title">
                            Join the
                            <span className="auth-branding-accent"> Autosphere</span> experience
                        </h1>
                        <p className="auth-branding-subtitle">
                            Create your account to unlock a world of automotive excellence.
                        </p>
                        <div className="auth-branding-features">
                            <div className="auth-feature">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                                <span>Curate your personal Garage</span>
                            </div>
                            <div className="auth-feature">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                                <span>Priority reservations on new arrivals</span>
                            </div>
                            <div className="auth-feature">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                                <span>Verified member status</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side — Form */}
                <div className="auth-form-panel">
                    <div className="auth-form-wrapper">
                        <h2 className="auth-form-title">Create Account</h2>
                        <p className="auth-form-subtitle">
                            Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
                        </p>

                        {error && <div className="auth-error" role="alert" aria-live="assertive">{error}</div>}
                        {success && (
                            <div className="auth-success" role="alert" aria-live="polite">
                                {success}
                            </div>
                        )}

                        {/* Google OAuth */}
                        <button className="auth-google-btn" onClick={handleGoogleSignIn} type="button">
                            <svg width="18" height="18" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Continue with Google
                        </button>

                        <div className="auth-divider">
                            <span>or sign up with email</span>
                        </div>

                        <form className="auth-form" onSubmit={handleSubmit} noValidate>
                            <div className="auth-field">
                                <label htmlFor="signup-name">Full Name</label>
                                <input
                                    id="signup-name"
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="John Doe"
                                    required
                                    aria-required="true"
                                    autoComplete="name"
                                />
                            </div>
                            <div className="auth-field">
                                <label htmlFor="signup-email">Email</label>
                                <input
                                    id="signup-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    aria-required="true"
                                    aria-invalid={!!error}
                                    autoComplete="email"
                                />
                            </div>
                            <div className="auth-field">
                                <label htmlFor="signup-password">Password</label>
                                <input
                                    id="signup-password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    aria-required="true"
                                    aria-invalid={!!error}
                                    autoComplete="new-password"
                                    minLength={6}
                                />
                            </div>
                            <div className="auth-field">
                                <label htmlFor="signup-confirm">Confirm Password</label>
                                <input
                                    id="signup-confirm"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    aria-required="true"
                                    aria-invalid={!!error}
                                    autoComplete="new-password"
                                    minLength={6}
                                />
                            </div>
                            <button
                                className="auth-submit-btn"
                                type="submit"
                                disabled={isSubmitting}
                                aria-busy={isSubmitting}
                            >
                                {isSubmitting ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SignupPage;
