import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import './ContactPage.css';
import SEO from '../components/ui/SEO';

const ContactPage = () => {
    const [searchParams] = useSearchParams();
    const queryType = searchParams.get('type');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Vercel rule: uncontrolled inputs preferred unless controlled is cheap
    const formRef = useRef<HTMLFormElement>(null);

    /* ─── Global Reveal Observer ─── */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
        );

        document.querySelectorAll('.cnt-reveal').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSuccess(true);
        formRef.current?.reset();
        setTimeout(() => setIsSuccess(false), 5000);
    };

    return (
        <main className="contact-page">
            <SEO
                title="Contact Concierge"
                description="Connect with our global concierge team to arrange a private viewing, configure your bespoke commission, or inquire about ownership privileges."
            />
            <div className="cnt-layout">
                <section className="cnt-visual">
                    <div className="cnt-visual__bg"></div>
                    <div className="cnt-visual__content cnt-reveal">
                        <span className="cnt-eyebrow">Concierge Services</span>
                        <h1 className="cnt-title">
                            Begin Your<br />
                            <span className="cnt-title--accent">Journey.</span>
                        </h1>
                        <p className="cnt-subtitle">
                            Connect with our global concierge team to arrange a private viewing, configure your bespoke commission, or inquire about ownership privileges.
                        </p>
                    </div>
                </section>

                <section className="cnt-form-section">
                    <div className="cnt-form-container cnt-reveal">
                        <h2>Direct Inquiry</h2>
                        <p className="cnt-form-desc">Provide your details and our team will contact you within 24 hours.</p>

                        <form ref={formRef} onSubmit={handleSubmit} className="cnt-form">
                            <div className="cnt-form__row">
                                <div className="cnt-form__group">
                                    <label htmlFor="firstName" className="cnt-label">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="given-name"
                                        className="cnt-input"
                                        autoComplete="given-name"
                                        required
                                    />
                                </div>
                                <div className="cnt-form__group">
                                    <label htmlFor="lastName" className="cnt-label">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="family-name"
                                        className="cnt-input"
                                        autoComplete="family-name"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="cnt-form__group">
                                <label htmlFor="email" className="cnt-label">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="cnt-input"
                                    autoComplete="email"
                                    spellCheck={false}
                                    required
                                />
                            </div>

                            <div className="cnt-form__group">
                                <label htmlFor="phone" className="cnt-label">Phone Number (Optional)</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="tel"
                                    className="cnt-input"
                                    autoComplete="tel"
                                />
                            </div>

                            <div className="cnt-form__group">
                                <label htmlFor="interest" className="cnt-label">Area of Interest</label>
                                <select
                                    id="interest"
                                    name="interest"
                                    className="cnt-input cnt-select"
                                    required
                                    defaultValue={queryType === 'test-drive' ? 'test-drive' : ''}
                                >
                                    <option value="" disabled>Select an option...</option>
                                    <option value="purchase">Vehicle Allocation Inquiry</option>
                                    <option value="test-drive">Private Test Drive Request</option>
                                    <option value="bespoke">Bespoke Commission</option>
                                    <option value="support">Owner Support</option>
                                    <option value="media">Press & Media</option>
                                </select>
                            </div>

                            <div className="cnt-form__group">
                                <label htmlFor="message" className="cnt-label">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="cnt-input cnt-textarea"
                                    rows={4}
                                    required
                                ></textarea>
                            </div>

                            <div className="cnt-form__actions">
                                <button
                                    type="submit"
                                    className={`cnt-submit ${isSubmitting ? 'cnt-submit--loading' : ''} ${isSuccess ? 'cnt-submit--success' : ''}`}
                                    disabled={isSubmitting}
                                >
                                    <span className="cnt-submit__text">
                                        {isSuccess ? 'Inquiry Sent' : 'Submit Inquiry'}
                                    </span>
                                    {isSubmitting && (
                                        <svg className="cnt-spinner" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="10" fill="none" strokeWidth="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            {isSuccess && (
                                <div className="cnt-form__success-msg" role="alert">
                                    Thank you. A concierge representative will be in touch shortly.
                                </div>
                            )}
                        </form>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default ContactPage;
