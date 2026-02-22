import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
    title: string;
    description?: string;
    type?: string;
    name?: string;
}

/**
 * Programmatic SEO Component (programmatic-seo skill)
 * Updates document head metadata dynamically for each page.
 */
const SEO = ({ title, description, type = 'website', name = 'AutoSphere' }: SEOProps) => {
    const location = useLocation();
    const siteTitle = `${title} | ${name}`;

    useEffect(() => {
        // Update Document Title
        document.title = siteTitle;

        // Update Meta Description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description || 'Explore the world\'s most exclusive vehicle collection at AutoSphere.');
        }

        // Update Open Graph (Social)
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', siteTitle);

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute('content', window.location.origin + location.pathname);

    }, [siteTitle, description, location.pathname]);

    return null;
};

export default SEO;
