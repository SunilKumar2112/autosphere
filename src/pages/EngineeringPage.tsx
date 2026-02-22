import { useEffect } from 'react';
import ImageWithSkeleton from '../components/ui/ImageWithSkeleton';
import SEO from '../components/ui/SEO';
import './EngineeringPage.css';

/* ─── Static Telemetry Data (rendering-hoist-jsx) ─── */
const TELEMETRY_CARDS = [
    {
        id: 'powerDensity',
        title: 'Power Density',
        value: 1250,
        unit: 'kW / ton',
        offset: 80,
        detail: 'Unprecedented power-to-weight ratio achieved through structural carbon-titanium integration and active mass management.',
        tech: 'Structural Carbon-Titanium'
    },
    {
        id: 'thermalEfficiency',
        title: 'Thermal Efficiency',
        value: 42.8,
        unit: '% Peak Output',
        offset: 140,
        detail: 'Industry-leading thermal management utilizing Formula-derived pre-chamber ignition and advanced energy recovery systems.',
        tech: 'Energy Recovery System'
    },
    {
        id: 'torqueVectoring',
        title: 'Torque Vectoring Precision',
        value: 0.1,
        unit: 'Milliseconds',
        offset: 50,
        detail: 'Individual wheel torque distribution calculated instantly, enabling physically impossible yaw angles and supreme mechanical grip.',
        tech: 'Dynamic Torque Vectoring'
    }
];

const MATERIALS = [
    {
        id: 'carbon',
        title: 'Carbo-Titanium Core',
        desc: 'A patented weave of carbon fiber intertwining titanium strands. This composite achieves three times the torsional rigidity of conventional carbon monocoques while absorbing impact energy linearly.',
        spec: 'Rigidity: 65,000 Nm/deg'
    },
    {
        id: 'inconel',
        title: 'Inconel 625 Exhaust',
        desc: 'Formula 1-grade nickel-chromium superalloy that withstands exhaust gas temperatures exceeding 1,000°C. Wall thickness is reduced to 0.8mm, cutting unsprung weight by 45% over steel.',
        spec: 'Weight: 4.8 kg full system'
    },
    {
        id: 'bespoke',
        title: 'Aerogel Shielding',
        desc: 'Space-age acoustic and thermal insulation separating the violent 9,500 RPM power unit from the cabin. Originally developed for spacecraft, it ensures thermal stability without mass penalty.',
        spec: 'Thermal Conductivity: 0.015 W/m·K'
    }
];

const EngineeringPage = () => {
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

        document.querySelectorAll('.eng-reveal').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <main className="engineering-page">
            <SEO
                title="Engineering Mastery"
                description="Where relentless computational fluid dynamics and raw mathematical perfection meet visceral human emotion. Explore the engineering behind AutoSphere."
            />

            {/* ════════════════════════════════════════════
                SECTION 1: The Blueprint Hero
            ════════════════════════════════════════════ */}
            <section className="eng-hero">
                <div className="eng-hero__blueprint-bg">
                    {/* Placeholder div, actual image applied via CSS background for easier blending */}
                    <div className="eng-hero__scanline"></div>
                </div>

                <div className="eng-hero__content">
                    <span className="eng-eyebrow eng-reveal">Pure Precision Dynamics</span>
                    <h1 className="eng-title eng-reveal">
                        Engineering<br />
                        <span className="eng-title--accent">The Impossible.</span>
                    </h1>
                    <p className="eng-subtitle eng-reveal">
                        Where relentless computational fluid dynamics and raw mathematical perfection meet visceral human emotion. We don't just build hypercars; we forge kinetic art.
                    </p>
                </div>

                <div className="eng-hero__scroll-indicator">
                    <span className="eng-hero__scroll-line"></span>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 2: Aerodynamic Mastery (Wind Tunnel)
            ════════════════════════════════════════════ */}
            <section className="eng-aero">
                <div className="eng-aero__text eng-reveal">
                    <h2>Mastering the Air</h2>
                    <p>Every surface, every intake, and every winglet is dictated by the relentless pursuit of aerodynamic supremacy. We don't fight the air; we sculpt it to our will.</p>
                </div>

                <div className="eng-aero__tunnel eng-reveal">
                    {/* The wind tunnel image */}
                    <ImageWithSkeleton src="/cars/eng-aero.png" alt="Aerodynamic profile" className="eng-aero__car-img" />

                    {/* Animated smoke trails overlay */}
                    <div className="eng-aero__smoke eng-aero__smoke--top"></div>
                    <div className="eng-aero__smoke eng-aero__smoke--mid"></div>
                    <div className="eng-aero__smoke eng-aero__smoke--bottom"></div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 3: The Power Unit (Telemetry)
            ════════════════════════════════════════════ */}
            <section className="eng-telemetry">
                <div className="eng-telemetry__header eng-reveal">
                    <h2>Visceral Power</h2>
                    <p>Live telemetry emulation. Performance metrics that redefine the boundaries of production vehicles, operating at the bleeding edge of physical limits.</p>
                </div>

                <div className="eng-telemetry__grid">
                    {TELEMETRY_CARDS.map((card, index) => (
                        <div
                            className="eng-telemetry-card eng-reveal"
                            key={card.id}
                            style={{
                                transitionDelay: `${index * 0.15}s`,
                                '--target-offset': card.offset
                            } as React.CSSProperties}
                        >
                            <div className="eng-telemetry-card__dial">
                                {/* Advanced SVG Ring Animation */}
                                <svg viewBox="0 0 120 120" className="eng-dial-svg">
                                    <defs>
                                        <linearGradient id={`grad-${card.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="var(--color-accent-gold)" />
                                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
                                        </linearGradient>
                                    </defs>
                                    {/* Track */}
                                    <circle cx="60" cy="60" r="48" className="eng-dial-bg" />
                                    {/* Progress */}
                                    <circle cx="60" cy="60" r="48" className="eng-dial-progress" stroke={`url(#grad-${card.id})`} />
                                </svg>
                                <div className="eng-telemetry-card__value">
                                    <span className="eng-val">{card.value}</span>
                                    <span className="eng-unit">{card.unit}</span>
                                </div>
                            </div>
                            <div className="eng-telemetry-card__info">
                                <span className="eng-section-label">Applied Aerodynamics</span>
                                <h3>{card.title}</h3>
                                <p>{card.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 4: Deep Architecture (Exploded View)
            ════════════════════════════════════════════ */}
            <section className="eng-architecture">
                <div className="eng-arch__container">
                    <div className="eng-arch__content eng-reveal">
                        <span className="eng-eyebrow">Powertrain Architecture</span>
                        <h2>Applied Systems Architecture</h2>
                        <p>A platform-agnostic approach to performance, marrying precise control logic with advanced materials science to create timeless engineering leadership.</p>
                        <ul className="eng-arch__list">
                            <li><strong>Propulsion Systems:</strong> Seamless integration of high-density energy solutions with instantaneous power delivery.</li>
                            <li><strong>Control Logic:</strong> Milliseconds dictate performance; proprietary processors map terrain and react before human perception.</li>
                            <li><strong>Materials Science:</strong> Advanced ceramics and graphene composites minimize unsprung mass while maximizing torsional rigidity.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 4: Materials (Hover Cards)
            ════════════════════════════════════════════ */}
            <section className="eng-materials">
                <div className="eng-materials__header eng-reveal">
                    <h2>Space-Age Construction</h2>
                </div>

                <div className="eng-materials__grid">
                    {MATERIALS.map((mat, index) => (
                        <div className="eng-material-card eng-reveal" key={mat.id} style={{ transitionDelay: `${index * 0.1}s` }}>
                            <div className="eng-material-card__icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                            </div>
                            <div className="eng-material-card__content">
                                <h3>{mat.title}</h3>
                                <p>{mat.desc}</p>
                                <div className="eng-material-card__spec"><span>{mat.spec}</span></div>
                            </div>
                            <div className="eng-material-card__glare"></div>
                        </div>
                    ))}
                </div>
            </section>

        </main>
    );
};

export default EngineeringPage;
