import { useState } from 'react';
import './Car3DViewer.css';

interface Car3DViewerProps {
    embedUrl: string;
    title: string;
    modelImage: string;
}

const Car3DViewer = ({ embedUrl, title, modelImage }: Car3DViewerProps) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="car-3d-viewer">
            {!isLoaded ? (
                <div
                    className="car-3d-facade"
                    onClick={() => setIsLoaded(true)}
                    style={{ backgroundImage: `url(${modelImage})` }}
                >
                    <div className="car-3d-overlay">
                        <button className="play-3d-btn" aria-label="Load 3D Model">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polygon points="10 8 16 12 10 16 10 8"></polygon>
                            </svg>
                            <span>Interact in 3D</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="sketchfab-embed-wrapper">
                    <iframe
                        title={title}
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; fullscreen; xr-spatial-tracking"
                        src={embedUrl}
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default Car3DViewer;
