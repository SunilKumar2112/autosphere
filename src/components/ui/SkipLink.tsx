import './SkipLink.css';

/**
 * SkipLink — Accessibility (WCAG 2.4.1)
 * Hidden link that becomes visible on keyboard focus,
 * allowing screen reader and keyboard users to skip
 * directly to the main content area.
 */
const SkipLink = () => (
    <a href="#main-content" className="as-skip-link">
        Skip to main content
    </a>
);

export default SkipLink;
