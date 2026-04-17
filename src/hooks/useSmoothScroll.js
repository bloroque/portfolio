import { useEffect, useRef } from 'react';

/**
 * Lerp-based smooth scroll for the entire page.
 * Creates a buttery smooth scroll feel by interpolating
 * the actual scroll position with a lerp factor.
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

        const body = document.body;
        const html = document.documentElement;

        // Measure full page height
        const getPageHeight = () => Math.max(
            body.scrollHeight, body.offsetHeight,
            html.scrollHeight, html.offsetHeight
        );

        // Create a wrapper that holds all content
        const wrapper = scrollRef.current;
        if (!wrapper) return;

        let current = window.scrollY;
        let target = window.scrollY;
        let rafId = null;
        let resizeObserver = null;

        // Set body to fixed, wrapper will translate
        const enable = () => {
            const height = getPageHeight();
            body.style.height = `${height}px`;
            wrapper.style.position = 'fixed';
            wrapper.style.top = '0';
            wrapper.style.left = '0';
            wrapper.style.width = '100%';
            wrapper.style.willChange = 'transform';
        };

        const disable = () => {
            body.style.height = '';
            wrapper.style.position = '';
            wrapper.style.top = '';
            wrapper.style.left = '';
            wrapper.style.width = '';
            wrapper.style.willChange = '';
            wrapper.style.transform = '';
        };

        enable();

        // Update body height when content changes
        resizeObserver = new ResizeObserver(() => {
            const height = getPageHeight();
            body.style.height = `${height}px`;
        });
        resizeObserver.observe(wrapper);

        const onScroll = () => {
            target = window.scrollY;
        };
        window.addEventListener('scroll', onScroll, { passive: true });

        const animate = () => {
            current += (target - current) * lerp;

            // Snap when close enough to avoid infinite micro-renders
            if (Math.abs(current - target) < 0.5) {
                current = target;
            }

            wrapper.style.transform = `translate3d(0, ${-current}px, 0)`;
            rafId = requestAnimationFrame(animate);
        };
        rafId = requestAnimationFrame(animate);

        // Handle anchor link clicks to work with smooth scroll
        const onHashClick = (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;
            const hash = link.getAttribute('href');
            if (!hash || hash === '#') return;
            const el = document.querySelector(hash);
            if (!el) return;
            e.preventDefault();
            // Calculate the element's position relative to the wrapper
            const rect = el.getBoundingClientRect();
            const offset = rect.top + current;
            target = Math.max(0, offset - 80); // 80px offset for fixed header
            window.scrollTo(0, target);
        };
        document.addEventListener('click', onHashClick);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('scroll', onScroll);
            document.removeEventListener('click', onHashClick);
            if (resizeObserver) resizeObserver.disconnect();
            disable();
        };
    }, [lerp]);

    return scrollRef;
};

export default useSmoothScroll;
