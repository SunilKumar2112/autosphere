import ImageWithSkeleton from '../ui/ImageWithSkeleton';
import type { BrandData } from '../../data/brands';
import './BrandsSection.css';

/* ─── Main Component ─── */

interface BrandsSectionProps {
    brands?: BrandData[];
    isLoading?: boolean;
}

const BrandsSection = ({ brands = [], isLoading = false }: BrandsSectionProps) => {
    // Duplicate the list for seamless looping if we have data
    const doubledBrands = brands.length > 0 ? [...brands, ...brands] : [];

    return (
        <section className="brands-section">
            <div className="brands-header">
                <h2 className="section-title">
                    We offer vehicles from<br />the world's most iconic brands
                </h2>
                <p className="section-subtitle" style={{ margin: '0 auto' }}>
                    Our success is driven by people who share a passion for cars,
                    precision, and exceptional service.
                </p>
            </div>

            <div className="brands-marquee-wrapper">
                {isLoading ? (
                    <div className="brands-marquee loading-state">
                        <span style={{ color: 'var(--color-text-muted)' }}>Loading brands...</span>
                    </div>
                ) : (
                    <div className="brands-marquee">
                        {doubledBrands.map((brand, i) => (
                            <div className="brand-item" key={`${brand.name}-${i}`}>
                                <ImageWithSkeleton src={brand.iconUrl} alt={`${brand.name} logo`} className="brand-icon-img" loading="lazy" />
                                <span className="brand-name">{brand.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default BrandsSection;
