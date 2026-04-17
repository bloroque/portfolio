import { useCallback, useRef } from 'react';

/**
 * Hook for 3D tilt effect on hover.
 * Returns event handlers to spread onto a container element.
 * 
 * Usage:
 *   const tiltHandlers = useTilt({ maxTilt: 10, scale: 1.02 });
 *   <div {...tiltHandlers}> ... </div>
 */
const useTilt = ({ maxTilt = 8, scale = 1.02, speed = 400 } = {}) => {
    const ref = useRef(null);

    const handleMouseMove = useCallback((e) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        el.style.transition = `transform 0.1s ease-out`;
        el.style.transform = `perspective(${speed}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
    }, [maxTilt, scale, speed]);

    const handleMouseLeave = useCallback((e) => {
        const el = e.currentTarget;
        el.style.transition = `transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)`;
        el.style.transform = `perspective(${speed}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }, [speed]);

    return {
        ref,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        style: { transformStyle: 'preserve-3d', willChange: 'transform' },
    };
};

export default useTilt;
