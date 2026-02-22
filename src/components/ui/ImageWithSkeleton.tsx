import { useState, useEffect } from 'react';
import type { ImgHTMLAttributes } from 'react';
import './ImageWithSkeleton.css';

interface ImageWithSkeletonProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    skeletonClassName?: string;
    fetchPriority?: 'high' | 'low' | 'auto';
}

const ImageWithSkeleton = ({
    src,
    alt,
    className = '',
    skeletonClassName = '',
    loading = 'lazy',
    ...props
}: ImageWithSkeletonProps) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    // Reset state if src changes
    useEffect(() => {
        setLoaded(false);
        setError(false);
    }, [src]);

    return (
        <div className={`img-skeleton-container ${skeletonClassName}`}>
            {/* Skeleton Background */}
            <div className={`img-skeleton ${loaded || error ? 'hidden' : ''}`} />

            {/* The Image */}
            <img
                src={src}
                alt={alt}
                className={`img-skeleton-actual ${loaded ? 'visible' : ''} ${className}`}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
                loading={loading}
                decoding="async"
                {...props}
            />
        </div>
    );
};

export default ImageWithSkeleton;
