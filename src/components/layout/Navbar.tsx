import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { useAuth } from '../../context/auth-context';
import './Navbar.css';

/* ─── Enterprise Navigation Configuration (rendering-hoist-jsx) ─── */

interface NavigationItem {
    id: string;
    label: string;
    path: string;
    /** If set, scrolls to this element ID on the homepage instead of routing */
    sectionAnchor?: string;
}

const NAVIGATION_ITEMS: NavigationItem[] = [
    { id: 'nav-vehicles', label: 'Vehicles', path: '/vehicles' },
    { id: 'nav-journey', label: 'Our Journey', path: '/journey' },
    { id: 'nav-engineering', label: 'Engineering', path: '/engineering' },
    { id: 'nav-contact', label: 'Contact', path: '/contact' },
];

/* ─── Navbar Component ─── */

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const garageCount = useAppSelector((state) => state.garage.savedVehicleIds.length);
    const { user, signOut } = useAuth();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    /* ── Scroll detection (client-passive-event-listeners rule) ── */
    const handleScroll = useCallback(() => {
        setIsScrolled(window.scrollY > 50);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    /* ── Close mobile menu on route change ── */
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    /* ── Smart navigation handler ── */
    const handleNavigation = useCallback(
        (item: NavigationItem) => {
            setIsMobileMenuOpen(false);

            if (item.sectionAnchor) {
                // If we're already on the homepage, just scroll
                if (location.pathname === '/') {
                    const element = document.getElementById(item.sectionAnchor);
                    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    // Navigate to homepage first, then scroll after render
                    navigate('/');
                    setTimeout(() => {
                        const element = document.getElementById(item.sectionAnchor!);
                        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 300);
                }
            } else {
                navigate(item.path);
            }
        },
        [location.pathname, navigate]
    );

    /* ── Active link detection ── */
    const isActiveLink = (item: NavigationItem): boolean => {
        if (item.sectionAnchor) return false;
        if (item.path === '/vehicles') {
            return location.pathname.startsWith('/vehicles');
        }
        return location.pathname === item.path;
    };

    return (
        <>
            <nav
                className={`as-navbar ${isScrolled ? 'as-navbar--scrolled' : ''}`}
                role="navigation"
                aria-label="Primary Navigation"
            >
                {/* ── Brand ── */}
                <div className="as-navbar__brand">
                    <Link to="/" className="as-navbar__logo" aria-label="AutoSphere Home">
                        AUTOSPHERE
                    </Link>
                </div>

                {/* ── Desktop Navigation ── */}
                <div className="as-navbar__nav-group">
                    <ul className="as-navbar__nav-list" role="menubar">
                        {NAVIGATION_ITEMS.map((item) => (
                            <li key={item.id} role="none">
                                {item.sectionAnchor ? (
                                    <button
                                        className={`as-navbar__nav-link ${isActiveLink(item) ? 'as-navbar__nav-link--active' : ''}`}
                                        onClick={() => handleNavigation(item)}
                                        role="menuitem"
                                    >
                                        {item.label}
                                    </button>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className={`as-navbar__nav-link ${isActiveLink(item) ? 'as-navbar__nav-link--active' : ''}`}
                                        role="menuitem"
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ── Actions ── */}
                <div className="as-navbar__actions">
                    {/* Garage Counter */}
                    <Link to="/vehicles" className="as-navbar__garage-btn" aria-label={`View your ${garageCount} saved vehicles`}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        {garageCount > 0 && <span className="garage-badge">{garageCount}</span>}
                    </Link>

                    {/* Auth State */}
                    {user ? (
                        <div className="as-navbar__user-menu">
                            <button
                                className="as-navbar__avatar-btn"
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                aria-label="User menu"
                                aria-expanded={isUserMenuOpen}
                                aria-haspopup="true"
                            >
                                <span className="as-navbar__avatar">
                                    {(user.user_metadata?.full_name || user.email || 'U').charAt(0).toUpperCase()}
                                </span>
                            </button>
                            {isUserMenuOpen && (
                                <div className="as-navbar__dropdown">
                                    <div className="as-navbar__dropdown-header">
                                        <span>{user.user_metadata?.full_name || 'Member'}</span>
                                        <span className="as-navbar__dropdown-email">{user.email}</span>
                                    </div>
                                    <button
                                        className="as-navbar__dropdown-item"
                                        onClick={() => { signOut(); setIsUserMenuOpen(false); }}
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="as-navbar__cta-btn">
                            Sign In
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    )}

                    {/* ── Mobile menu toggle ── */}
                    <button
                        className={`as-navbar__hamburger ${isMobileMenuOpen ? 'as-navbar__hamburger--active' : ''}`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </nav>

            {/* ── Mobile Overlay Menu ── */}
            <div className={`as-mobile-menu ${isMobileMenuOpen ? 'as-mobile-menu--open' : ''}`}>
                <ul className="as-mobile-menu__list">
                    {NAVIGATION_ITEMS.map((item, index) => (
                        <li
                            key={item.id}
                            className="as-mobile-menu__item"
                            style={{ transitionDelay: `${index * 0.08}s` }}
                        >
                            <button
                                className="as-mobile-menu__link"
                                onClick={() => handleNavigation(item)}
                            >
                                <span className="as-mobile-menu__link-number">0{index + 1}</span>
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="as-mobile-menu__footer">
                    <Link
                        to="/vehicles"
                        className="as-navbar__cta-btn as-navbar__cta-btn--mobile"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Browse Collection
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Navbar;
