import { useParams, Link } from 'react-router-dom';
import { useEffect, useRef, useState, useMemo } from 'react';
import { getCarById } from '../data/cars';
import SEO from '../components/ui/SEO';
import CheckoutButton from '../components/stripe/CheckoutButton';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CarDetailPage.css';

gsap.registerPlugin(ScrollTrigger);

const CarDetailPage = () => {
    const { carId } = useParams<{ carId: string }>();
    const car = getCarById(carId || '');

    // Combine hero image and gallery for the unified interactive dock
    const allImages = useMemo(() => {
        if (!car) return [];
        return Array.from(new Set([car.image, ...car.gallery]));
    }, [car]);

    const [viewMode, setViewMode] = useState<'gallery' | '3d'>('gallery');
    const [activeImgIndex, setActiveImgIndex] = useState(0);
    const [hasLoaded3D, setHasLoaded3D] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLElement>(null);

    // Skills-First: React Rules - Sync top scroll
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [carId]);

    // Skills-First: Performance & GSAP React - Component-scoped animations
    useGSAP(() => {
        if (!car) return;

        // 1. Staggered reveal of hero text
        gsap.from('.hero-text-elem', {
            y: 50,
            opacity: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: 'expo.out',
            delay: 0.2
        });

        // 2. Premium dock slide-in
        gsap.from('.hero-thumbnails-dock', {
            y: 80,
            opacity: 0,
            duration: 1.4,
            ease: 'expo.out',
            delay: 0.6
        });

        // 3. ScrollTrigger for lower sections using deterministic scoped array
        const sections = gsap.utils.toArray<HTMLElement>('.detail-section');
        sections.forEach((section) => {
            const reveals = gsap.utils.toArray<HTMLElement>('.gs-reveal', section);
            if (reveals.length > 0) {
                gsap.fromTo(reveals,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 85%'
                        }
                    }
                );
            }
        });
    }, { scope: containerRef, dependencies: [car?.id] });

    // Cinematic dual-layer hero transitions
    useGSAP(() => {
        const tl = gsap.timeline();

        if (viewMode === '3d') {
            // Animate Image Layer Out
            tl.to('.hero-img-layer', {
                scale: 1.1,
                filter: 'blur(15px) brightness(0.2)',
                opacity: 0,
                duration: 1.2,
                ease: 'power2.inOut'
            })
                // Hide text layer
                .to('.hero-text-block', { opacity: 0, x: -50, duration: 0.8, ease: 'power2.inOut' }, 0)
                // Animate 3D layer In
                .fromTo('.hero-3d-layer',
                    { opacity: 0, scale: 0.95 },
                    { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' },
                    "-=0.6"
                );
        } else {
            // Image Layer In / 3D Layout Out
            gsap.to('.hero-img-layer', {
                scale: 1, filter: 'blur(0px) brightness(1)', opacity: 1, duration: 1.5, ease: 'power3.out'
            });

            // Only animate the 3D layer out if it successfully mounted
            const threeDLayer = document.querySelector('.hero-3d-layer');
            if (threeDLayer) {
                gsap.to('.hero-3d-layer', {
                    opacity: 0, scale: 0.95, duration: 0.8, ease: 'power2.inOut'
                });
            }

            gsap.fromTo('.hero-anim-img',
                { scale: 1.05, filter: 'brightness(0.6)' },
                { scale: 1, filter: 'brightness(1)', duration: 2, ease: 'power2.out' }
            );
            gsap.to('.hero-text-block', { opacity: 1, x: 0, duration: 1, ease: 'power2.out', delay: 0.2 });
        }
    }, { scope: heroRef, dependencies: [activeImgIndex, viewMode] });

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
        <main className="detail-page" ref={containerRef}>
            <SEO
                title={`${car.name} | ${car.brand}`}
                description={`Discover the ${car.name}, a masterpiece of ${car.brand} engineering. Available now at AutoSphere.`}
            />

            {/* ─── Immersive Combined Hero & Gallery ─── */}
            <section className="detail-hero-immersive" ref={heroRef}>
                <div className="detail-hero-visuals">
                    {/* Layer 1: Cinematic High-Res Image */}
                    <div className="hero-img-layer">
                        <img
                            src={allImages[activeImgIndex]}
                            alt={car.name}
                            className="hero-anim-img"
                            fetchPriority="high"
                        />
                        <div className="hero-gradient-overlay" />
                    </div>

                    {/* Layer 2: Immersive 3D Context (Rendered only when requested to save performance, but kept for out-transitions) */}
                    {hasLoaded3D && car.sketchfabUrl && (
                        <div className="hero-3d-layer" style={{ pointerEvents: viewMode === '3d' ? 'auto' : 'none' }}>
                            <iframe
                                title={`${car.brand} ${car.name} 3D Model`}
                                frameBorder="0"
                                allowFullScreen
                                allow="autoplay; fullscreen; xr-spatial-tracking"
                                src={car.sketchfabUrl}
                                className="hero-3d-iframe"
                            />
                        </div>
                    )}
                </div>

                <div className="hero-content-layer">
                    <div className="hero-text-block">
                        <div className="hero-text-elem">
                            <Link to="/vehicles" className="detail-breadcrumb">← Back to Collection</Link>
                        </div>
                        <span className="detail-hero-label hero-text-elem">{car.brand} · {car.type}</span>
                        <h1 className="detail-hero-title hero-text-elem">{car.name}</h1>
                        <p className="detail-hero-tagline hero-text-elem">{car.tagline}</p>
                        <div className="detail-hero-price-row hero-text-elem">
                            <span className="detail-hero-price">{car.price}</span>
                            <span className="detail-hero-condition">{car.condition}</span>
                        </div>
                    </div>

                    <div className="hero-thumbnails-dock">
                        {allImages.map((img, i) => (
                            <button
                                key={i}
                                className={`detail-thumb ${viewMode === 'gallery' && activeImgIndex === i ? 'active' : ''}`}
                                onClick={() => { setViewMode('gallery'); setActiveImgIndex(i); }}
                            >
                                <img src={img} alt={`Thumbnail ${i + 1}`} loading="lazy" />
                            </button>
                        ))}
                        {car.sketchfabUrl && (
                            <button
                                className={`detail-thumb detail-thumb--3d ${viewMode === '3d' ? 'active' : ''}`}
                                onClick={() => { setHasLoaded3D(true); setViewMode('3d'); }}
                            >
                                <span>3D</span>
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* ─── Description ─── */}
            <section className="detail-description detail-section">
                <div className="detail-desc-inner">
                    <span className="detail-section-label gs-reveal">About</span>
                    <h2 className="detail-section-title gs-reveal">{car.name}</h2>
                    <p className="detail-desc-text gs-reveal">{car.description}</p>
                </div>
            </section>

            {/* ─── Specs Grid ─── */}
            <section className="detail-specs detail-section">
                <div>
                    <span className="detail-section-label gs-reveal">Performance</span>
                    <h2 className="detail-section-title gs-reveal">Technical Specifications</h2>
                </div>
                <div className="detail-specs-grid">
                    {car.specs.map((spec: { label: string; value: string }) => (
                        <div className="detail-spec-card gs-reveal" key={spec.label}>
                            <span className="detail-spec-value">{spec.value}</span>
                            <span className="detail-spec-label">{spec.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── Features ─── */}
            <section className="detail-features detail-section">
                <div>
                    <span className="detail-section-label gs-reveal">Highlights</span>
                    <h2 className="detail-section-title gs-reveal">Key Features</h2>
                </div>
                <div className="detail-features-list">
                    {car.features.map((feat: string) => (
                        <div className="detail-feature gs-reveal" key={feat}>
                            <span className="detail-feature-icon">◆</span>
                            <span className="detail-feature-text">{feat}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── CTA ─── */}
            <section className="detail-cta detail-section">
                <h2 className="detail-cta-title gs-reveal">Interested in this {car.name}?</h2>
                <p className="detail-cta-text gs-reveal">
                    Schedule a private viewing or speak directly with our concierge team.
                </p>
                <div className="detail-cta-buttons gs-reveal">
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
