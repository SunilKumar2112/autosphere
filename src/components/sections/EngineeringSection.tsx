import { useEffect, useRef, useState } from 'react';
import type { StatData } from '../../data/engineering';
import './EngineeringSection.css';

// Animated counter hook
function useCountUp(target: number, isVisible: boolean, duration = 2000) {
    const [current, setCurrent] = useState(0);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        if (!isVisible || target === 0) return;

        const startTime = performance.now();
        const isFloat = target % 1 !== 0;

        const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const val = eased * target;
            setCurrent(isFloat ? parseFloat(val.toFixed(1)) : Math.floor(val));

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(animate);
            }
        };

        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, [isVisible, target, duration]);

    return current;
}

function StatCardComponent({ stat, index, isVisible }: { stat: StatData; index: number; isVisible: boolean }) {
    const animatedValue = useCountUp(stat.value, isVisible);

    return (
        <div
            className={`engineering-card ${isVisible ? 'visible' : ''}`}
            style={{ transitionDelay: `${index * 0.15}s` }}
        >
            <div
                className="engineering-card-icon"
                dangerouslySetInnerHTML={{ __html: stat.iconSvg }}
            />
            <div className="engineering-card-value">
                {animatedValue}{stat.suffix}
            </div>
            <div className="engineering-card-label">{stat.label}</div>
            <p className="engineering-card-desc">{stat.description}</p>
        </div>
    );
}

interface EngineeringSectionProps {
    stats?: StatData[];
    isLoading?: boolean;
}

const EngineeringSection = ({ stats = [], isLoading = false }: EngineeringSectionProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        const el = sectionRef.current;
        if (el) observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="engineering-section" id="engineering" ref={sectionRef}>
            <div className="engineering-header">
                <p className="section-label">Precision Engineering</p>
                <h2 className="section-title">Built Without Compromise</h2>
                <p className="section-subtitle" style={{ margin: '0 auto' }}>
                    Every vehicle in our collection represents the absolute zenith of automotive engineering.
                </p>
            </div>

            <div className="engineering-grid">
                {isLoading ? (
                    <div style={{ color: 'var(--color-text-muted)', textAlign: 'center', gridColumn: '1 / -1' }}>Loading statistics...</div>
                ) : (
                    stats.map((stat, i) => (
                        <StatCardComponent key={stat.id} stat={stat} index={i} isVisible={isVisible} />
                    ))
                )}
            </div>
        </section>
    );
};

export default EngineeringSection;
