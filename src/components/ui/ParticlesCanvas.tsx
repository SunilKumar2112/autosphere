import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Inner component to handle the particle animation logic
const ParticleField = ({ count = 600 }) => {
    const pointsRef = useRef<THREE.Points>(null);

    // Generate stable, random positions
    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return positions;
    }, [count]);

    useFrame((state) => {
        if (!pointsRef.current) return;
        // Very slow, ambient rotation
        pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
        pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particles, 3]}
                />
            </bufferGeometry>
            {/* Soft, small, slightly transparent gold/white particles */}
            <pointsMaterial
                size={0.015}
                color="#c9a96e"
                transparent
                opacity={0.4}
                sizeAttenuation={true}
                depthWrite={false}
            />
        </points>
    );
};

// Main Export Component
const ParticlesCanvas = () => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [dpr, setDpr] = useState(1);

    useEffect(() => {
        // Handle accessibility preference for heavy motion
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handleMotionChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };
        mediaQuery.addEventListener('change', handleMotionChange);

        // Handle DPR for performance (lower DPR on mobile)
        const isMobile = window.innerWidth <= 768;
        setDpr(isMobile ? 1 : Math.min(2, window.devicePixelRatio || 1));

        return () => mediaQuery.removeEventListener('change', handleMotionChange);
    }, []);

    // If the user prefers reduced motion, disable the particle canvas entirely
    // to strictly adhere to Vercel accessibility guidelines.
    if (prefersReducedMotion) return null;

    return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 60 }}
                // Vercel rule: demand frameloop prevents constant rendering when idle.
                // We use 'always' here only because we rotate the particles via useFrame,
                // but if we tied rotation to scroll, we could use 'demand'.
                // Given the slow ambient rotation and 'Stealth Wealth' vibe, 'always' is
                // necessary, but we optimized with primitive arrays and low DPR.
                frameloop="always"
                dpr={dpr}
                gl={{ antialias: false, alpha: true }}
            >
                <ParticleField count={800} />
            </Canvas>
        </div>
    );
};

// Next.js/Vite optimized lazy-loading requires default export usually
export default ParticlesCanvas;
