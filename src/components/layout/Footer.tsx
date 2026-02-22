
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

// ─── Compound Component Parts ───

function FooterRoot({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <footer className={`site-footer ${className}`}>
            <div className="footer-top">{children}</div>
        </footer>
    );
}

function FooterBrand() {
    return (
        <div className="footer-brand">
            <span className="footer-logo">AUTOSPHERE</span>
            <p className="footer-tagline">
                Curating extraordinary automobiles for the discerning collector since 2024.
            </p>
        </div>
    );
}

function FooterNav({ children }: { children: React.ReactNode }) {
    return <nav className="footer-links" aria-label="Footer Navigation">{children}</nav>;
}

function FooterLinkGroup({ title, links }: { title: string; links: { label: string; to: string; isExternal?: boolean }[] }) {
    return (
        <div className="footer-link-group">
            <h3 className="footer-link-title">{title}</h3>
            <ul className="footer-link-list">
                {links.map((link) => (
                    <li key={link.label}>
                        {link.isExternal ? (
                            <a href={link.to} className="footer-link" target="_blank" rel="noopener noreferrer">
                                {link.label}
                            </a>
                        ) : (
                            <Link to={link.to} className="footer-link">
                                {link.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function FooterNewsletter() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 5000);
    };

    return (
        <div className="footer-newsletter">
            <h3 className="footer-newsletter-title">Join the Inner Circle</h3>
            {status === 'success' ? (
                <p className="footer-newsletter-success">Welcome to the inner circle.</p>
            ) : (
                <form
                    className="footer-newsletter-form"
                    onSubmit={handleSubscribe}
                >
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="footer-newsletter-input"
                        placeholder="Your email address"
                        aria-label="Email address for newsletter"
                        required
                        disabled={status === 'loading'}
                    />
                    <button
                        type="submit"
                        className={`footer-newsletter-btn ${status === 'loading' ? 'loading' : ''}`}
                        aria-label="Subscribe"
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? (
                            <span className="footer-btn-spinner" />
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        )}
                    </button>
                </form>
            )}
        </div>
    );
}

function FooterBottom() {
    const currentYear = new Date().getFullYear();
    return (
        <div className="footer-bottom">
            <span className="footer-copy">© {currentYear} AUTOSPHERE. All rights reserved.</span>
            <div className="footer-socials">
                <a href="https://instagram.com" className="footer-social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                    <svg role="img" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <title>Instagram</title>
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                </a>
                <a href="https://linkedin.com" className="footer-social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                    <svg role="img" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <title>LinkedIn</title>
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                    </svg>
                </a>
                <a href="https://youtube.com" className="footer-social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                    <svg role="img" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <title>YouTube</title>
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                    </svg>
                </a>
            </div>
        </div>
    );
}

// ─── Main Export ───

export const FooterComponent = Object.assign(FooterRoot, {
    Brand: FooterBrand,
    Nav: FooterNav,
    LinkGroup: FooterLinkGroup,
    Newsletter: FooterNewsletter,
    Bottom: FooterBottom
});

const SHOWROOM_LINKS = [
    { label: 'Models', to: '/vehicles' },
    { label: 'Pre-Owned', to: '/vehicles?condition=certified' },
    { label: 'Coming Soon', to: '/vehicles?status=upcoming' },
];

const EXPERIENCE_LINKS = [
    { label: 'Bespoke', to: '/contact' },
    { label: 'Test Drive', to: '/contact?type=test-drive' },
    { label: 'Engineering', to: '/engineering' },
];

const COMPANY_LINKS = [
    { label: 'Our Journey', to: '/journey' },
    { label: 'Careers', to: '/contact?subject=careers' },
    { label: 'Press', to: '/contact?subject=press' },
];

export default function Footer() {
    return (
        <FooterComponent>
            <FooterComponent.Brand />

            <FooterComponent.Nav>
                <FooterComponent.LinkGroup title="Showroom" links={SHOWROOM_LINKS} />
                <FooterComponent.LinkGroup title="Experience" links={EXPERIENCE_LINKS} />
                <FooterComponent.LinkGroup title="Company" links={COMPANY_LINKS} />
            </FooterComponent.Nav>

            <FooterComponent.Newsletter />
            <FooterComponent.Bottom />
        </FooterComponent>
    );
}
