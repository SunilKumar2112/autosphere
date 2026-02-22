import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { StoryPanelData } from '../../data/story';
import './StorySection.css';

interface StorySectionProps {
    steps?: StoryPanelData[];
    isLoading?: boolean;
}

const StorySection = ({ steps = [], isLoading = false }: StorySectionProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading || steps.length === 0) return;

        // Intersection Observer to trigger reveal animations when cards scroll into view
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-revealed');
                    }
                });
            },
            {
                threshold: 0.15, // Trigger when 15% of the element is visible
                rootMargin: '0px 0px -10% 0px'
            }
        );

        const cards = containerRef.current?.querySelectorAll('.story-card');
        cards?.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, [isLoading, steps]);

    return (
        <section className="story-section" ref={containerRef}>

            <div className="story-intro-header">
                <h2 className="story-intro-title">
                    Our <span>Heritage</span>
                </h2>
                <p className="story-intro-desc">
                    Since 2004, we have curated the rarest machines for the world's most discerning enthusiasts. Discover how it all began.
                </p>
            </div>

            <div className="story-cards-container">
                {isLoading ? (
                    <div style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '4rem' }}>Loading journey details...</div>
                ) : (
                    steps.map((step, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <div
                                key={step.id}
                                className={`story-card ${isEven ? 'layout-left' : 'layout-right'}`}
                            >
                                <div className="story-card-image-content">
                                    <div className="story-card-image-wrapper">
                                        <div className="img-overlay"></div>
                                        <img src={step.image} alt={step.title} loading="lazy" />
                                    </div>
                                </div>

                                <div className="story-card-text-content">
                                    <div className="story-card-number">{step.number}</div>
                                    <div className="story-card-meta">
                                        <span className="story-card-label">{step.label}</span>
                                        <div className="story-card-line"></div>
                                    </div>
                                    <h3 className="story-card-title">{step.title}</h3>
                                    <p className="story-card-desc">{step.description}</p>
                                    <button
                                        className="story-card-btn"
                                        onClick={() => navigate('/journey')}
                                    >
                                        Discover More
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

        </section>
    );
};

export default StorySection;
