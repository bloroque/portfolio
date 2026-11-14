import { useRef } from 'react';

/**
 * Hook neutralisé : les sections défilent normalement (scroll vertical
 * classique), sans pin GSAP ni effet de superposition (slide-up overlay).
 *
 * Conserve la même API (`ref` retournée) pour ne pas modifier les
 * composants qui l'utilisent.
 */
const useOverlappingSections = () => {
    const containerRef = useRef(null);
    return containerRef;
};

export default useOverlappingSections;
