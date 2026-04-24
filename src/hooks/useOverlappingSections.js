import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook for the "Overlapping Sections / Slide-up Overlay" effect.
 * Uses GSAP ScrollTrigger pin to lock each section at the top.
 * The next section (higher z-index) scrolls up and covers it.
 * The covered section scales down and dims as it gets covered.
 */
const useOverlappingSections = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const overlays = [...container.querySelectorAll('[data-section-overlay]')];
        if (overlays.length < 2) return;

        // Wait for layout to settle
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();

            const ctx = gsap.context(() => {
                overlays.forEach((overlay, i) => {
                    // Don't pin the last section — nothing slides over it
                    if (i === overlays.length - 1) return;

                    const nextOverlay = overlays[i + 1];

                    // Pin the section while the next one scrolls up over it
                    ScrollTrigger.create({
                        trigger: overlay,
                        start: 'top top',
                        endTrigger: nextOverlay,
                        end: 'top top',
                        pin: true,
                        pinSpacing: false,
                        onUpdate: (self) => {
                            const p = self.progress;
                            const scale = 1 - p * 0.05;       // 1 → 0.95
                            const brightness = 1 - p * 0.3;   // 1 → 0.7
                            const radius = p * 20;             // 0 → 20px

                            gsap.set(overlay, {
                                scale,
                                filter: `brightness(${brightness})`,
                                borderBottomLeftRadius: `${radius}px`,
                                borderBottomRightRadius: `${radius}px`,
                            });
                        },
                    });
                });
            }, container);

            container._gsapCtx = ctx;
        }, 600);

        return () => {
            clearTimeout(timer);
            if (container._gsapCtx) {
                container._gsapCtx.revert();
                delete container._gsapCtx;
            }
        };
    }, []);

    return containerRef;
};

export default useOverlappingSections;
