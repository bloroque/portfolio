import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Lerp-based smooth scroll using window.scrollTo().
 * Unlike fixed+transform, this preserves position:sticky
 * and keeps GSAP ScrollTrigger in sync natively.
 *
 * @param {number} lerp - Smoothing factor (0.06–0.12 = silky, 0.15+ = snappier)
 */
const useSmoothScroll = (lerp = 0.09) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        // Skip on mobile / touch for native momentum scroll
        if ('ontouchstart' in window || window.innerWidth < 768) return;
        // Skip if user prefers reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        if (!window.location.hash) {
            window.scrollTo(0, 0);
        }

        let current = window.scrollY;
        let target = window.scrollY;
        let rafId = null;
        let selfTriggered = false;

        const getMaxScroll = () =>
            Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

        const startLoop = () => {
            if (rafId == null) {
                rafId = requestAnimationFrame(animate);
            }
        };

        // Intercept wheel to apply lerp smoothing
        const onWheel = (e) => {
            // Si le curseur est dans une zone "zoom" (ex: canvas 3D Skills),
            // on laisse le wheel à OrbitControls pour zoomer dans le canvas
            // au lieu de scroller la page.
            const t = e.target;
            if (t && t.closest && t.closest('[data-zoom-area]')) {
                return;
            }
            // If inside a modal overlay, let the modal scroll normally
            if (t && t.closest && t.closest('[data-modal-overlay]')) {
                return;
            }
            e.preventDefault();
            target += e.deltaY;
            target = Math.max(0, Math.min(target, getMaxScroll()));
            startLoop();
        };

        // For non-wheel scrolls (scrollbar drag, keyboard, etc.): sync immediately
        const onScroll = () => {
            if (selfTriggered) {
                selfTriggered = false;
                return;
            }
            // External scroll source — snap to it
            current = window.scrollY;
            target = window.scrollY;
        };

        const animate = () => {
            current += (target - current) * lerp;

            // Snap when close enough
            if (Math.abs(current - target) < 0.5) {
                current = target;
            }

            selfTriggered = true;
            window.scrollTo({ top: Math.round(current), behavior: 'instant' });

            // Keep ScrollTrigger in sync
            ScrollTrigger.update();

            if (current !== target) {
                rafId = requestAnimationFrame(animate);
            } else {
                rafId = null;
            }
        };

        rafId = requestAnimationFrame(animate);

        // Handle anchor link clicks
        const onHashClick = (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;
            const hash = link.getAttribute('href');
            if (!hash || hash === '#') return;
            const el = document.querySelector(hash);
            if (!el) return;
            e.preventDefault();
            const rect = el.getBoundingClientRect();
            target = Math.max(0, rect.top + window.scrollY - 80);
            startLoop();
        };

        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('scroll', onScroll, { passive: true });
        document.addEventListener('click', onHashClick);

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('scroll', onScroll);
            document.removeEventListener('click', onHashClick);
        };
    }, [lerp]);

    return scrollRef;
};

export default useSmoothScroll;
