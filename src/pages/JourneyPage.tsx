import { useEffect, useRef, useCallback } from 'react';
import ImageWithSkeleton from '../components/ui/ImageWithSkeleton';
import SEO from '../components/ui/SEO';
import './JourneyPage.css';

/* ─── Static Data (rendering-hoist-jsx rule) ─── */

const MILESTONES = [
    {
        year: '2004',
        title: 'The Genesis',
        subtitle: 'Where legends begin',
        description:
            'In a boutique showroom in Munich, AutoSphere was born from a single conviction: that the world\'s finest automobiles deserve custodians who understand them as art. We started with three hand-selected manual sports cars and a dream that stretched far beyond the horizon.',
        stat: { value: 3, label: 'Founding Vehicles' },
        image: '/cars/journey-m1.png',
    },
    {
        year: '2009',
        title: 'The Ascent',
        subtitle: 'Global partnerships forged',
        description:
            'We secured exclusive allocation agreements with Maranello, Sant\'Agata, and Weissach. Our reputation as the world\'s most selective curator of rare exotics attracted collectors from 40 countries. Every vehicle underwent our legendary 300-point inspection.',
        stat: { value: 40, label: 'Countries Served' },
        image: '/cars/journey-m2.png',
    },
    {
        year: '2015',
        title: 'The Experience',
        subtitle: 'Beyond the machine',
        description:
            'Recognizing that our clients crave experiences, not just possessions, we launched the AutoSphere Concierge — private track days at Spa-Francorchamps, climate-controlled heritage storage, and a members-only lounge where enthusiasts share stories over single malt.',
        stat: { value: 12, label: 'Track Day Events / Year' },
        image: '/cars/journey-m3.png',
    },
    {
        year: '2020',
        title: 'The Evolution',
        subtitle: 'Heritage meets future',
        description:
            'As the automotive world pivoted toward electrification, we embraced the revolution without abandoning our roots. From the Rimac Nevera to the Pininfarina Battista, we curate the future of performance alongside the analog legends that defined it.',
        stat: { value: 850, label: 'Vehicles Curated' },
        image: '/cars/journey-m4.png',
    },
    {
        year: '2024',
        title: 'The Pinnacle',
        subtitle: 'Defining the standard',
        description:
            'Today, AutoSphere stands as the undisputed benchmark in automotive curation. With a global network spanning five continents, bespoke acquisition services, and an unwavering commitment to perfection, we don\'t just sell cars — we write automotive history.',
        stat: { value: 5, label: 'Continents' },
        image: '/cars/journey-m5.png',
    },
];

const PRINCIPLES = [
    {
        icon: '◆',
        title: 'Absolute Authenticity',
        description: 'Every vehicle is verified through an exhaustive provenance chain. We reject 94% of submissions.',
    },
    {
        icon: '◈',
        title: 'Obsessive Curation',
        description: 'Our 300-point inspection leaves nothing to chance. Perfection is not an aspiration — it is our baseline.',
    },
    {
        icon: '◇',
        title: 'Timeless Relationships',
        description: 'We don\'t have customers. We have fellow enthusiasts who become lifelong partners in the pursuit of the extraordinary.',
    },
];

/* ─── Animated Counter Hook ─── */
function useCountUp(target: number, duration: number, triggerRef: React.RefObject<HTMLElement | null>) {
    const countRef = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const el = triggerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    animateCount();
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(el);
        return () => observer.disconnect();

        function animateCount() {
            const start = performance.now();
            const step = (now: number) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(eased * target);
                if (countRef.current) {
                    countRef.current.textContent = current.toLocaleString();
                }
                if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        }
    }, [target, duration, triggerRef]);

    return countRef;
}

/* ─── Stat Counter Component ─── */
function StatCounter({ value, label }: { value: number; label: string }) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const countRef = useCountUp(value, 2000, wrapperRef);

    return (
        <div className="milestone-stat" ref={wrapperRef}>
            <span className="stat-number" ref={countRef}>0</span>
            <span className="stat-label">{label}</span>
        </div>
    );
}

/* ─── Parallax on scroll (rerender-use-ref-transient-values rule) ─── */
function useParallax() {
    const handleScroll = useCallback(() => {
        const elements = document.querySelectorAll<HTMLElement>('.parallax-img');
        elements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const center = rect.top + rect.height / 2;
            const offset = (center - window.innerHeight / 2) * 0.08;
            el.style.transform = `translateY(${offset}px) scale(1.15)`;
        });
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);
}


/* ─── Main Page Component ─── */
const JourneyPage = () => {
    useParallax();

    useEffect(() => {
        // Intersection Observer for staggered reveals
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

        document.querySelectorAll('.js-reveal').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <main className="journey-page">
            <SEO
                title="Our Journey"
                description="Two decades of uncompromising automotive excellence. Explore the story and philosophy of AutoSphere, from genesis to the pinnacle of curation."
            />

            {/* ════════════════════════════════════════════
          SECTION 1 — Cinematic Full-Screen Hero
          ════════════════════════════════════════════ */}
            <section className="j-hero">
                <div className="j-hero__bg">
                    <ImageWithSkeleton src="/cars/journey-hero.png" alt="" aria-hidden="true" />
                </div>
                <div className="j-hero__vignette" />
                <div className="j-hero__content">
                    <div className="j-hero__eyebrow js-reveal">Est. 2004</div>
                    <h1 className="j-hero__title">
                        <span className="j-hero__line js-reveal">The</span>
                        <span className="j-hero__line j-hero__line--accent js-reveal">AutoSphere</span>
                        <span className="j-hero__line js-reveal">Legacy</span>
                    </h1>
                    <p className="j-hero__subtitle js-reveal">
                        Two decades of uncompromising automotive excellence
                    </p>
                </div>
                <div className="j-hero__scroll-cue">
                    <div className="j-hero__scroll-line" />
                    <span>Scroll to explore</span>
                </div>
            </section>

            {/* ════════════════════════════════════════════
          SECTION 2 — Philosophy / Manifesto
          ════════════════════════════════════════════ */}
            <section className="j-manifesto">
                <div className="j-manifesto__container">
                    <div className="j-manifesto__text js-reveal">
                        <h2>
                            We don't sell cars.<br />
                            <span className="gold">We curate legacies.</span>
                        </h2>
                        <p>
                            At the intersection of art and engineering lies a rare breed of machinery.
                            For twenty years, AutoSphere has been the trusted custodian of these rolling
                            masterworks — objects that transcend transportation and enter the realm of the sublime.
                        </p>
                    </div>
                    <div className="j-manifesto__image js-reveal">
                        <ImageWithSkeleton src="/cars/journey-manifesto.png" alt="Craftsmanship detail" loading="lazy" />
                    </div>
                </div>

            </section>

            {/* ════════════════════════════════════════════
          SECTION 3 — Vertical Timeline (Milestones)
          ════════════════════════════════════════════ */}
            <section className="j-timeline">
                <div className="j-timeline__header js-reveal">
                    <span className="j-timeline__eyebrow">2004 — Present</span>
                    <h2>Our Story</h2>
                    <p>Two decades of relentless pursuit of perfection.</p>
                </div>

                {/* The vertical timeline line */}
                <div className="j-timeline__line" />

                <div className="j-timeline__list">
                    {MILESTONES.map((m, index) => (
                        <div
                            className={`j-milestone js-reveal ${index % 2 === 0 ? 'j-milestone--left' : 'j-milestone--right'}`}
                            key={m.year}
                        >
                            {/* Image side */}
                            <div className="j-milestone__image-wrap">
                                <div className="j-milestone__image">
                                    <ImageWithSkeleton src={m.image} alt={m.title} loading="lazy" className="parallax-img" />
                                    <div className="j-milestone__overlay" />
                                </div>
                                <div className="j-milestone__year">{m.year}</div>
                            </div>

                            {/* Text side */}
                            <div className="j-milestone__content">
                                <span className="j-milestone__subtitle">{m.subtitle}</span>
                                <h3 className="j-milestone__title">{m.title}</h3>
                                <p className="j-milestone__desc">{m.description}</p>
                                <StatCounter value={m.stat.value} label={m.stat.label} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ════════════════════════════════════════════
          SECTION 4 — Full-Screen Quote
          ════════════════════════════════════════════ */}
            <section className="j-quote">
                <blockquote className="js-reveal">
                    <p>"The best cars are not driven. They are <em>experienced</em>."</p>
                    <cite>— AutoSphere Founding Charter, 2004</cite>
                </blockquote>
            </section>

            <section className="j-principles-section">
                <div className="j-principles">
                    {PRINCIPLES.map((p) => (
                        <div className="j-principle js-reveal" key={p.title}>
                            <span className="j-principle__icon">{p.icon}</span>
                            <h3>{p.title}</h3>
                            <p>{p.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            {/* ════════════════════════════════════════════
          SECTION 5 — CTA Outro
          ════════════════════════════════════════════ */}
            <section className="j-cta">
                <div className="j-cta__content js-reveal">
                    <h2>Your chapter begins here.</h2>
                    <p>Join the inner circle of the world's most discerning collectors.</p>
                    <a href="/vehicles" className="j-cta__btn">
                        Explore the Collection
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>
            </section>

        </main>
    );
};

export default JourneyPage;
