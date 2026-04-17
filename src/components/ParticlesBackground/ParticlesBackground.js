import React, { useEffect, useRef } from 'react';

const ParticlesBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;
        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Particle class
        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.3 + 0.1;
                this.pulseSpeed = Math.random() * 0.02 + 0.005;
                this.pulsePhase = Math.random() * Math.PI * 2;
            }
            update(time) {
                this.x += this.speedX;
                this.y += this.speedY;
                // Wrap around
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
                // Pulse
                this.currentOpacity = this.opacity + Math.sin(time * this.pulseSpeed + this.pulsePhase) * 0.1;
            }
            draw(ctx) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(55, 103, 210, ${Math.max(0, this.currentOpacity)})`;
                ctx.fill();
            }
        }

        // Create particles (sparse for performance)
        const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 25000));
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }

        // Connection distance
        const maxDist = 120;

        const animate = (time) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update & draw particles
            particles.forEach(p => {
                p.update(time);
                p.draw(ctx);
            });

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < maxDist) {
                        const alpha = (1 - dist / maxDist) * 0.12;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(55, 103, 210, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            animId = requestAnimationFrame(animate);
        };

        animId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
                opacity: 0.6,
            }}
            aria-hidden="true"
        />
    );
};

export default ParticlesBackground;
