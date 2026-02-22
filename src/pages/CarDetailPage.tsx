import { useParams, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getCarById } from '../data/cars';
import ImageWithSkeleton from '../components/ui/ImageWithSkeleton';
import SEO from '../components/ui/SEO';
import CheckoutButton from '../components/stripe/CheckoutButton';
import './CarDetailPage.css';

const SKETCHFAB_URL =
    'https://sketchfab.com/models/a5687befab084efdba9a5c99a9a8ad4c/embed?' +
    'ui_theme=dark&autospin=0.12&autostart=1&preload=1&transparent=1' +
    '&ui_animations=0&ui_infos=0&ui_stop=0&ui_inspector=0' +
    '&ui_watermark_link=0&ui_watermark=0&ui_ar=0&ui_help=0' +
    '&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0' +
    '&camera=0&dnt=1';

const CarDetailPage = () => {
    const { carId } = useParams<{ carId: string }>();
    const car = getCarById(carId || '');
    // Filter out the hero image to prevent visual duplication
    const uniqueGallery = car?.gallery.filter((img) => img !== car.image) || [];
    const [activeGallery, setActiveGallery] = useState(0);
    const [show3D, setShow3D] = useState(false);
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);

    // Scroll-triggered section reveals
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        sectionRefs.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [car]);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [carId]);

    if (!car) {
        return (
            <main className="detail-page">
                <section className="detail-not-found">
                    <h1>Vehicle Not Found</h1>
                    <p>The requested vehicle could not be found in our collection.</p>
                    <Link to="/vehicles" className="detail-back-btn">
                        ← Browse Vehicles
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <main className="detail-page">
            <SEO
                title={`${car.name} | ${car.brand}`}
                description={`Discover the ${car.name}, a masterpiece of ${car.brand} engineering. Available now at AutoSphere.`}
            />
            {/* ─── Hero Section ─── */}
            <section className="detail-hero">
                <div className="detail-hero-bg">
                    <ImageWithSkeleton src={car.image} alt={car.name} className="detail-hero-bg-img" />
                    <div className="detail-hero-overlay" />
                </div>
                <div className="detail-hero-content">
                    <Link to="/vehicles" className="detail-breadcrumb">
                        ← Back to Collection
                    </Link>
                    <span className="detail-hero-label">{car.brand} · {car.type}</span>
                    <h1 className="detail-hero-title">{car.name}</h1>
                    <p className="detail-hero-tagline">{car.tagline}</p>
                    <div className="detail-hero-price-row">
                        <span className="detail-hero-price">{car.price}</span>
                        <span className="detail-hero-condition">{car.condition}</span>
                    </div>
                </div>
            </section>

            {/* ─── Gallery Section ─── */}
            <section
                className="detail-gallery detail-section"
                ref={(el) => { sectionRefs.current[0] = el; }}
            >
                <div className="detail-gallery-main">
                    <ImageWithSkeleton
                        src={uniqueGallery[activeGallery] || ''}
                        alt={`${car.name} view ${activeGallery + 1}`}
                        className="detail-gallery-img"
                        key={activeGallery}
                    />
                </div>
                <div className="detail-gallery-thumbs">
                    {uniqueGallery.map((img, i) => (
                        <button
                            key={i}
                            className={`detail-thumb ${activeGallery === i ? 'active' : ''}`}
                            onClick={() => setActiveGallery(i)}
                        >
                            <ImageWithSkeleton src={img} alt={`Thumbnail ${i + 1}`} />
                        </button>
                    ))}
                    <button
                        className={`detail-thumb detail-thumb--3d ${show3D ? 'active' : ''}`}
                        onClick={() => setShow3D(!show3D)}
                    >
                        <span>3D</span>
                    </button>
                </div>
            </section>

            {/* ─── 3D Viewer (togglable) ─── */}
            {show3D && (
                <section className="detail-3d detail-section">
                    <div className="detail-3d-container">
                        <iframe
                            className="detail-3d-iframe"
                            title="3D Car Viewer"
                            src={SKETCHFAB_URL}
                            allow="autoplay; fullscreen; xr-spatial-tracking"
                        />
                        <div className="detail-3d-badge">
                            <span className="detail-3d-dot" />
                            Interactive 3D — Drag to Rotate
                        </div>
                    </div>
                </section>
            )}

            {/* ─── Description ─── */}
            <section
                className="detail-description detail-section"
                ref={(el) => { sectionRefs.current[1] = el; }}
            >
                <div className="detail-desc-inner">
                    <span className="detail-section-label">About</span>
                    <h2 className="detail-section-title">{car.name}</h2>
                    <p className="detail-desc-text">{car.description}</p>
                </div>
            </section>

            {/* ─── Specs Grid ─── */}
            <section
                className="detail-specs detail-section"
                ref={(el) => { sectionRefs.current[2] = el; }}
            >
                <span className="detail-section-label">Performance</span>
                <h2 className="detail-section-title">Technical Specifications</h2>
                <div className="detail-specs-grid">
                    {car.specs.map((spec, i) => (
                        <div
                            className="detail-spec-card"
                            key={spec.label}
                            style={{ transitionDelay: `${i * 0.1}s` }}
                        >
                            <span className="detail-spec-value">{spec.value}</span>
                            <span className="detail-spec-label">{spec.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── Features ─── */}
            <section
                className="detail-features detail-section"
                ref={(el) => { sectionRefs.current[3] = el; }}
            >
                <span className="detail-section-label">Highlights</span>
                <h2 className="detail-section-title">Key Features</h2>
                <div className="detail-features-list">
                    {car.features.map((feat, i) => (
                        <div
                            className="detail-feature"
                            key={feat}
                            style={{ transitionDelay: `${i * 0.12}s` }}
                        >
                            <span className="detail-feature-icon">◆</span>
                            <span className="detail-feature-text">{feat}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── CTA ─── */}
            <section
                className="detail-cta detail-section"
                ref={(el) => { sectionRefs.current[4] = el; }}
            >
                <h2 className="detail-cta-title">Interested in this {car.name}?</h2>
                <p className="detail-cta-text">
                    Schedule a private viewing or speak directly with our concierge team.
                </p>
                <div className="detail-cta-buttons">
                    <CheckoutButton
                        vehicleId={car.id}
                        vehicleName={car.name}
                        price={car.price}
                        className="detail-cta-primary"
                    />
                    <button className="detail-cta-secondary">Contact Concierge</button>
                </div>
            </section>
        </main>
    );
};

export default CarDetailPage;
