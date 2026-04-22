import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const pos = useRef({ x: 0, y: 0 });
    const prevPos = useRef({ x: 0, y: 0 });
    const ringPos = useRef({ x: 0, y: 0 });
    const velocity = useRef({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Skip on touch devices
        if ('ontouchstart' in window) return;

        const onMouseDown = () => setIsClicking(true);
        const onMouseUp = () => setIsClicking(false);

        const onMouseEnterInteractive = () => setIsHovering(true);
        const onMouseLeaveInteractive = () => setIsHovering(false);

        // Animate both dot (3D pointer) and ring with lerp
        let animId;
        let animRunning = false;
        const startLoop = () => {
            if (!animRunning) {
                animRunning = true;
                animId = requestAnimationFrame(animateLoop);
            }
        };

        const animateLoop = () => {
            // Ring follows with delay
            ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
            ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;
            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
            }

            // 3D pointer: tilt based on velocity
            if (dotRef.current) {
                const vx = velocity.current.x;
                const vy = velocity.current.y;
                // Clamp tilt angles
                const tiltY = Math.max(-35, Math.min(35, vx * 2.5));
                const tiltX = Math.max(-35, Math.min(35, -vy * 2.5));
                dotRef.current.style.transform =
                    `translate(${pos.current.x}px, ${pos.current.y}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            }

            // Decay velocity towards 0
            velocity.current.x *= 0.85;
            velocity.current.y *= 0.85;

            // Stop loop when ring has converged and velocity is near zero
            const ringDx = Math.abs(pos.current.x - ringPos.current.x);
            const ringDy = Math.abs(pos.current.y - ringPos.current.y);
            const speed = Math.abs(velocity.current.x) + Math.abs(velocity.current.y);
            if (ringDx < 0.5 && ringDy < 0.5 && speed < 0.1) {
                animRunning = false;
                return;
            }

            animId = requestAnimationFrame(animateLoop);
        };

        const onMouseMove = (e) => {
            prevPos.current = { ...pos.current };
            pos.current = { x: e.clientX, y: e.clientY };
            velocity.current = {
                x: pos.current.x - prevPos.current.x,
                y: pos.current.y - prevPos.current.y,
            };
            if (!isVisible) setIsVisible(true);
            startLoop();
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        // Observe interactive elements
        const addListeners = () => {
            const interactives = document.querySelectorAll('a, button, input, textarea, [role="button"], .card-hover-lift, .btn-glow');
            interactives.forEach(el => {
                el.addEventListener('mouseenter', onMouseEnterInteractive);
                el.addEventListener('mouseleave', onMouseLeaveInteractive);
            });
            return interactives;
        };

        // MutationObserver to catch dynamically added elements (debounced)
        let currentInteractives = addListeners();
        let mutationTimeout = null;
        const observer = new MutationObserver(() => {
            if (mutationTimeout) clearTimeout(mutationTimeout);
            mutationTimeout = setTimeout(() => {
                currentInteractives.forEach(el => {
                    el.removeEventListener('mouseenter', onMouseEnterInteractive);
                    el.removeEventListener('mouseleave', onMouseLeaveInteractive);
                });
                currentInteractives = addListeners();
            }, 300);
        });
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            currentInteractives.forEach(el => {
                el.removeEventListener('mouseenter', onMouseEnterInteractive);
                el.removeEventListener('mouseleave', onMouseLeaveInteractive);
            });
            observer.disconnect();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Don't render on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

    return (
        <>
            {/* 3D SVG arrow pointer */}
            <div
                ref={dotRef}
                className={`custom-cursor-dot ${isVisible ? 'visible' : ''} ${isClicking ? 'clicking' : ''} ${isHovering ? 'hovering' : ''}`}
            >
                <svg
                    className="cursor-svg"
                    width="28"
                    height="32"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        className="cursor-path-dark"
                        d="M22 10 L45 61 L22 79 Z"
                        strokeWidth="0.5"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                    <path
                        className="cursor-path-light"
                        d="M22 10 L78 51 L45 61 Z"
                        strokeWidth="0.5"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                </svg>
                <div className="cursor-3d-glow"></div>
            </div>
            {/* Trailing ring */}
            <div
                ref={ringRef}
                className={`custom-cursor-ring ${isVisible ? 'visible' : ''} ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
            />
        </>
    );
};

export default CustomCursor;
