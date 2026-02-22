import React, { useEffect, useRef, useState } from 'react';
import type { ReviewData } from '../../data/reviews';
import './ReviewsSection.css';

// ─── Compound Component Parts ───

function ReviewCardRoot({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={`review-card ${className}`}>{children}</div>;
}

function ReviewHeader({ review }: { review: ReviewData }) {
    return (
        <div className="review-header">
            <img src={review.avatar} alt={review.author} className="review-avatar" loading="lazy" />
            <div className="review-author-info">
                <h4 className="review-author">{review.author}</h4>
                <p className="review-role">
                    {review.role} • <span className="review-company">{review.company}</span>
                </p>
                {review.verified && (
                    <span className="review-verified">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        Verified Client
                    </span>
                )}
            </div>
        </div>
    );
}

function ReviewSentiment({ review }: { review: ReviewData }) {
    return (
        <div className="review-sentiment">
            <div className="review-stars" aria-label={`Rating: ${review.rating} out of 5 stars`}>
                {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`star ${i < review.rating ? 'filled' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                ))}
            </div>
            <span className="sentiment-badge">{review.sentiment}</span>
        </div>
    );
}

function ReviewBody({ review }: { review: ReviewData }) {
    return (
        <div className="review-body">
            <p className="review-highlight">"{review.highlight}"</p>
            <p className="review-text">{review.text}</p>
        </div>
    );
}

// ─── Main Component & Data ───

export const Review = Object.assign(ReviewCardRoot, {
    Header: ReviewHeader,
    Sentiment: ReviewSentiment,
    Body: ReviewBody
});

interface ReviewsSectionProps {
    reviews?: ReviewData[];
    isLoading?: boolean;
}

export default function ReviewsSection({ reviews = [], isLoading = false }: ReviewsSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isLoading || reviews.length === 0) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => observer.disconnect();
    }, [isLoading, reviews]);

    return (
        <section className="reviews-section" ref={sectionRef} id="reviews">
            <div className={`reviews-container ${isVisible ? 'animate-in' : ''}`}>
                <div className="reviews-header-block">
                    <p className="section-label">Client Perspectives</p>
                    <h2 className="section-title">The Standard of Excellence</h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Hear directly from the visionaries, founders, and executives who trust us with their automotive commissions.
                    </p>
                </div>

                <div className="reviews-grid">
                    {isLoading ? (
                        <div style={{ color: 'var(--color-text-muted)', textAlign: 'center', gridColumn: '1 / -1', padding: '4rem' }}>
                            Loading client perspectives...
                        </div>
                    ) : (
                        reviews.map((review, index) => (
                            <Review
                                key={review.id}
                                className={`review-anim-delay-${index + 1}`}
                            >
                                <Review.Header review={review} />
                                <Review.Sentiment review={review} />
                                <Review.Body review={review} />
                            </Review>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
