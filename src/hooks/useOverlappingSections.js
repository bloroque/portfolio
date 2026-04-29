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

                    // Distance supplémentaire de scroll = largeur cachée de la piste
                    const getExtraScroll = () => {
                        if (!hasHorizontalScroll) return 0;
                        return Math.max(0, hTrack.scrollWidth - hContainer.offsetWidth);
                    };

                    const applyVisual = (progress) => {
                        const scale = 1 - progress * 0.05;       // 1 → 0.95
                        const radius = progress * 20;             // 0 → 20px
                        gsap.set(overlay, {
                            scale,
                            borderBottomLeftRadius: `${radius}px`,
                            borderBottomRightRadius: `${radius}px`,
                        });
                    };

                    if (hasHorizontalScroll) {
                        // ─────────────────────────────────────────────────────
                        // UN SEUL ScrollTrigger qui épingle la section sur deux
                        // phases consécutives :
                        //   Phase A (0 → hRatio)  → translation X de la piste
                        //                           (la section reste plein écran,
                        //                            aucune anim de scale)
                        //   Phase B (hRatio → 1)  → la section suivante glisse
                        //                           par-dessus : scale + radius
                        //
                        // Distance totale = scroll horizontal + 1 viewport pour
                        // la phase de slide-up. Un seul pin → pas de conflit.
                        // ─────────────────────────────────────────────────────
                        ScrollTrigger.create({
                            trigger: overlay,
                            start: 'top top',
                            end: () => `+=${getExtraScroll() + window.innerHeight}`,
                            pin: true,
                            pinSpacing: true,
                            invalidateOnRefresh: true,
                            onUpdate: (self) => {
                                const hDist = getExtraScroll();
                                const total = hDist + window.innerHeight;
                                const hRatio = total > 0 ? hDist / total : 0;
                                const p = self.progress;

                                if (p <= hRatio && hRatio > 0) {
                                    // Phase A : scroll horizontal
                                    const hp = p / hRatio;
                                    gsap.set(hTrack, { x: -hDist * hp });
                                    applyVisual(0);
                                } else {
                                    // Phase B : slide-up
                                    gsap.set(hTrack, { x: -hDist });
                                    const vp = hRatio < 1 ? (p - hRatio) / (1 - hRatio) : p;
                                    applyVisual(vp);
                                }
                            },
                            onLeaveBack: () => {
                                gsap.set(hTrack, { x: 0 });
                                applyVisual(0);
                            },
                        });
                    } else {
                        // Pin la section pendant que la suivante remonte par-dessus
                        ScrollTrigger.create({
                            trigger: overlay,
                            start: 'top top',
                            endTrigger: nextOverlay,
                            end: 'top top',
                            pin: true,
                            pinSpacing: false,
                            invalidateOnRefresh: true,
                            onUpdate: (self) => applyVisual(self.progress),
                        });
                    }
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
