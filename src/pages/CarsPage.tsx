import { useState, useRef, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CARS } from '../data/cars';
import './CarsPage.css';
import ImageWithSkeleton from '../components/ui/ImageWithSkeleton';

gsap.registerPlugin(ScrollTrigger);

const BRANDS = ['All', ...Array.from(new Set(CARS.map((c) => c.brand)))];
const TYPES = ['All', ...Array.from(new Set(CARS.map((c) => c.type)))];

const CarsPage = () => {
    const [searchParams] = useSearchParams();
    const queryCondition = searchParams.get('condition');
    const queryStatus = searchParams.get('status');

    const [activeBrand, setActiveBrand] = useState('All');
    const [activeType, setActiveType] = useState('All');
    const containerRef = useRef<HTMLElement>(null);

    const filtered = useMemo(() => {
        return CARS.filter((car) => {
            const brandMatch = activeBrand === 'All' || car.brand === activeBrand;
            const typeMatch = activeType === 'All' || car.type === activeType;

            // Query param filtering (footer links)
            const conditionMatch = !queryCondition ||
                (queryCondition === 'certified' && car.condition.toLowerCase().includes('certified'));

            // Mocking 'upcoming' status for the demo if query param is set
            const statusMatch = !queryStatus ||
                (queryStatus === 'upcoming' && (car.name.includes('GT3') || car.year > 2023));

            return brandMatch && typeMatch && conditionMatch && statusMatch;
        });
    }, [activeBrand, activeType, queryCondition, queryStatus]);

    // Resilient GSAP scroll-triggered animations (Replacing stale IntersectionObserver)
    useGSAP(() => {
        const cards = gsap.utils.toArray('.car-card');
        if (cards.length > 0) {
            gsap.fromTo(cards,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.08,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.cars-grid',
                        start: 'top 90%' // Start animation slightly earlier for fluidity
                    }
                }
            );
        }
    }, { scope: containerRef, dependencies: [filtered] });

    return (
        <main className="cars-page" ref={containerRef}>
            {/* Hero Header — Refactored for centered aesthetics */}
            <section className="cars-hero">

                <div className="cars-hero-overlay" />
                <div className="cars-hero-content">
                    <div className="as-container">
                        <span className="cars-hero-label">The Collection</span>
                        <h1 className="cars-hero-title">
                            {queryCondition === 'certified' ? 'Certified Pre-Owned' :
                                queryStatus === 'upcoming' ? 'Coming Soon' : 'All Vehicles'}
                        </h1>
                        <p className="cars-hero-subtitle">
                            Explore our hand-curated collection of the world's finest automobiles,
                            ranging from historical classics to modern hypercars.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filters */}
            <section className="cars-filters">
                <div className="cars-filter-group">
                    <span className="cars-filter-label">Brand</span>
                    <div className="cars-filter-pills">
                        {BRANDS.map((brand) => (
                            <button
                                key={brand}
                                className={`cars-pill ${activeBrand === brand ? 'active' : ''}`}
                                onClick={() => setActiveBrand(brand)}
                            >
                                {brand}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="cars-filter-group">
                    <span className="cars-filter-label">Type</span>
                    <div className="cars-filter-pills">
                        {TYPES.map((type) => (
                            <button
                                key={type}
                                className={`cars-pill ${activeType === type ? 'active' : ''}`}
                                onClick={() => setActiveType(type)}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="cars-count-wrapper">
                    <p className="cars-count">{filtered.length} vehicles</p>
                    {(activeBrand !== 'All' || activeType !== 'All' || queryCondition || queryStatus) && (
                        <Link to="/vehicles" className="cars-clear-btn" onClick={() => { setActiveBrand('All'); setActiveType('All'); }}>
                            Clear Filters
                        </Link>
                    )}
                </div>
            </section>

            {/* Cars Grid */}
            <section className="cars-grid-section">
                <div className="cars-grid">
                    {filtered.map((car) => (
                        <Link
                            to={`/vehicles/${car.id}`}
                            key={car.id}
                            className="car-card"
                        >
                            <div className="car-card-inner">
                                <ImageWithSkeleton
                                    className="car-card-img"
                                    src={car.image}
                                    alt={car.name}
                                    loading="lazy"
                                />
                                <div className="car-card-gradient" />

                                {/* Hover metadata pills */}
                                <span className="car-card-meta car-card-meta--type">{car.type}</span>
                                <span className="car-card-meta car-card-meta--brand">{car.brand}</span>

                                {/* Always-visible info */}
                                <div className="car-card-info">
                                    <h3 className="car-card-name">{car.name}</h3>
                                    <p className="car-card-price">{car.price}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                    {filtered.length === 0 && (
                        <div className="cars-empty">
                            <p>No vehicles found matching your criteria.</p>
                            <Link to="/vehicles" className="as-btn as-btn--outline" onClick={() => { setActiveBrand('All'); setActiveType('All'); }}>
                                View All Vehicles
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default CarsPage;
