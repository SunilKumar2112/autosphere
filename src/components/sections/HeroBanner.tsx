import { useRef, useEffect, useState } from 'react';
import './HeroBanner.css';

const HeroBanner = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (video.readyState >= 3) {
            setLoaded(true);
        }

        const onCanPlay = () => setLoaded(true);
        video.addEventListener('canplay', onCanPlay);

        // Attempt autoplay (muted is required by browsers)
        video.play().catch(() => { });

        return () => video.removeEventListener('canplay', onCanPlay);
    }, []);

    return (
        <section className="hero-banner" id="hero">
            {/* Full-viewport video background with poster fallback */}
            <div className="hero-video-container">
                <video
                    ref={videoRef}
                    className={`hero-video ${loaded ? 'loaded' : ''}`}
                    src="/hero-video.mp4"
                    poster="/cars/journey-hero.png"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                />
            </div>

            {/* Cinematic vignette + bottom gradient overlay */}
            <div className="hero-vignette" />

            {/* Text overlay at bottom */}
            <div className="hero-overlay">
                <span className="hero-label">Explore the Elite</span>
                <h1 className="hero-title">
                    The Pinnacle of<br /><em>Excellence</em>
                </h1>
                <p className="hero-subtitle">
                    Curating the world's most exclusive automobiles for the discerning few.
                </p>
                <a href="/vehicles" className="hero-cta">
                    Discover the Collection
                </a>
            </div>

            {/* Scroll indicator */}
            <div className="hero-scroll">
                <div className="hero-scroll-line" />
                <span className="hero-scroll-text">Scroll</span>
            </div>
        </section>
    );
};

export default HeroBanner;
