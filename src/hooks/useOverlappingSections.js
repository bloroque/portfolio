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

                    // Check if this overlay contains a horizontal-scroll track
                    const hTrack = overlay.querySelector('[data-h-track]');
                    const hContainer = overlay.querySelector('[data-h-container]');
                    const hasHorizontalScroll = hTrack && hContainer;

                    // Extra scroll distance for horizontal timeline
                    const getExtraScroll = () => {
                        if (!hasHorizontalScroll) return 0;
                        return Math.max(0, hTrack.scrollWidth - hContainer.offsetWidth);
                    };

                    // Pin the section while the next one scrolls up over it
                    ScrollTrigger.create({
                        trigger: overlay,
                        start: 'top top',
                        endTrigger: nextOverlay,
                        end: () => `top+=${getExtraScroll()} top`,
                        pin: true,
                        pinSpacing: hasHorizontalScroll,
                        invalidateOnRefresh: true,
                        onUpdate: (self) => {
                            // Only apply scale/dim after horizontal scroll is done
                            const extra = getExtraScroll();
                            const totalDistance = self.end - self.start;

                            let visualProgress;
                            if (hasHorizontalScroll && extra > 0 && totalDistance > 0) {
                                // How much of the pin is just horizontal scroll
                                const hScrollRatio = extra / totalDistance;

                                // Drive horizontal track translation during pin
                                const hScrollProgress = Math.min(1, self.progress / hScrollRatio);
                                const scrollDist = hTrack.scrollWidth - hContainer.offsetWidth;
                                gsap.set(hTrack, { x: -scrollDist * hScrollProgress });

                                // Visual effects only start after horizontal scroll ends
                                visualProgress = Math.max(0, (self.progress - hScrollRatio) / (1 - hScrollRatio));
                            } else {
                                visualProgress = self.progress;
                            }

                            const scale = 1 - visualProgress * 0.05;       // 1 → 0.95
                            const radius = visualProgress * 20;             // 0 → 20px

                            gsap.set(overlay, {
                                scale,
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
