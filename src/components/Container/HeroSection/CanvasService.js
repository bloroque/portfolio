import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { FaGlobe, FaLayerGroup, FaServer, FaCloud, FaCog } from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

const CanvasService = ({ sectionRef }) => {
    const { t } = useLanguage();
    const canvasRef = useRef(null);
    const animFrameRef = useRef(null);
    const cardsStateRef = useRef([]);
    const dragRef = useRef({ active: false, cardIndex: -1, offsetX: 0, offsetY: 0 });
    const dealPhaseRef = useRef({ started: false, startTime: 0 });
    const hoveredRef = useRef(-1);
    const scheduleFrameRef = useRef(null);
    // const scrollFoldRef = useRef(0); // DISABLED
    const [canvasSize, setCanvasSize] = useState({ w: 900, h: 320 });

    // Responsive breakpoint for fan layout
    const getBreakpoint = useCallback(() => {
        const w = window.innerWidth;
        if (w >= 1536) return '2xl';
        if (w >= 1280) return 'xl';
        if (w >= 1024) return 'lg';
        return 'md';
    }, []);
    const [breakpoint, setBreakpoint] = useState(getBreakpoint);
    useEffect(() => {
        const onResize = () => setBreakpoint(getBreakpoint());
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [getBreakpoint]);

    const fanConfig = {
        md:  { spacing: 130, cardW: 170, cardH: 180, fontSize: 9,  specFont: 10, iconSize: 22, padX: 16, padY: 28, gapIconTitle: 12, gapTitleSpec: 24, canvasPadX: 10 },
        lg:  { spacing: 135, cardW: 190, cardH: 180, fontSize: 10, specFont: 10, iconSize: 24, padX: 18, padY: 28, gapIconTitle: 12, gapTitleSpec: 24, canvasPadX: 15 },
        xl:  { spacing: 155, cardW: 190, cardH: 180, fontSize: 10, specFont: 10, iconSize: 26, padX: 18, padY: 27, gapIconTitle: 12, gapTitleSpec: 24, canvasPadX: 20 },
        '2xl': { spacing: 175, cardW: 220, cardH: 180, fontSize: 11, specFont: 11, iconSize: 30, padX: 18, padY: 28, gapIconTitle: 12, gapTitleSpec: 24, canvasPadX: 25 },
    };
    const currentFan = fanConfig[breakpoint] || fanConfig.md;

    const services = useMemo(() => [
        { icon: FaGlobe,      key: 'website',     color: '#3b82f6', gradStart: '#3470f1', gradEnd: '#2459ec' },
        { icon: FaLayerGroup, key: 'webapp',      color: '#8b5cf6', gradStart: '#daba6b', gradEnd: '#a1812f' },
        { icon: FaServer,     key: 'api',         color: '#f59e0b', gradStart: '#3470f1', gradEnd: '#2459ec' },
        { icon: FaCloud,      key: 'consulting',  color: '#06b6d4', gradStart: '#daba6b', gradEnd: '#a1812f' },
        { icon: FaCog,        key: 'maintenance', color: '#10b981', gradStart: '#3470f1', gradEnd: '#2459ec' },
    ], []);

    // SVG path data for canvas rendering (from FontAwesome 5)
    const serviceSvgPaths = useMemo(() => ({
        globe: {
            vb: [496, 512],
            d: 'M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z',
        },
        layerGroup: {
            vb: [512, 512],
            d: 'M12.41 148.02l232.94 105.67c6.8 3.09 14.49 3.09 21.29 0l232.94-105.67c16.55-7.51 16.55-32.52 0-40.03L266.65 2.31a25.607 25.607 0 00-21.29 0L12.41 107.98c-16.55 7.51-16.55 32.53 0 40.04zm487.18 88.28l-58.09-26.33-161.64 73.27c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.51 209.97l-58.1 26.33c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 276.3c16.55-7.5 16.55-32.5 0-40zm0 127.8l-57.87-26.23-161.86 73.37c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.29 337.87 12.41 364.1c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0l232.94-105.59c16.55-7.5 16.55-32.5 0-40z',
        },
        server: {
            vb: [512, 512],
            d: 'M480 160H32c-17.673 0-32-14.327-32-32V64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm112 248H32c-17.673 0-32-14.327-32-32v-64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm112 248H32c-17.673 0-32-14.327-32-32v-64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24z',
        },
        cloud: {
            vb: [640, 512],
            d: 'M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4z',
        },
        cog: {
            vb: [512, 512],
            d: 'M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.4-.7-11.2-5.6-14zm-231.4 0c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z',
        },
    }), []);

    const serviceIconMap = useMemo(() => ({
        website:     serviceSvgPaths.globe,
        webapp:      serviceSvgPaths.layerGroup,
        api:         serviceSvgPaths.server,
        consulting:  serviceSvgPaths.cloud,
        maintenance: serviceSvgPaths.cog,
    }), [serviceSvgPaths]);

    // --- Canvas fan layout: compute card positions ---
    const computeCardPositions = useCallback((cfg, width) => {
        const totalCards = services.length;
        const mid = (totalCards - 1) / 2;
        const centerX = width / 2;
        const topPad = 30;
        const bottomPad = 40;
        const canvasPadX = cfg.canvasPadX || 0;
        const cards = services.map((_, index) => {
            const offset = index - mid;
            const rotate = offset * 10 * (Math.PI / 180);
            const arcY = Math.pow(Math.abs(offset), 2) * 20;
            let x = centerX + (index - mid) * cfg.spacing - cfg.cardW / 2;
            x = Math.max(canvasPadX, Math.min(x, width - cfg.cardW - canvasPadX));
            const y = topPad + arcY;
            const zIdx = totalCards - Math.abs(offset);
            return { x, y, rotate, targetX: x, targetY: y, targetRotate: rotate, scale: .5, opacity: 1, zIndex: zIdx, baseZIndex: zIdx };
        });
        return { cards, bottomPad };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Initialize and update card positions on breakpoint/size changes
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement;
        if (!parent) return;
        const w = parent.clientWidth;
        const { cards: positions, bottomPad } = computeCardPositions(currentFan, w);
        let maxBottom = 0;
        positions.forEach(p => {
            const bottom = p.y + currentFan.cardH + bottomPad;
            if (bottom > maxBottom) maxBottom = bottom;
        });
        const h = Math.ceil(maxBottom);
        setCanvasSize({ w, h });
        const centerX = w / 2 - currentFan.cardW / 2;
        const centerY = (h / 2) - currentFan.cardH / 2;
        cardsStateRef.current = positions.map((p, i) => ({
            ...p,
            cx: cardsStateRef.current[i]?.cx ?? centerX,
            cy: cardsStateRef.current[i]?.cy ?? centerY,
            cRotate: cardsStateRef.current[i]?.cRotate ?? 0,
            cScale: cardsStateRef.current[i]?.cScale ?? 0.85,
            cOpacity: cardsStateRef.current[i]?.cOpacity ?? 1,
            dealDelay: 600 + i * 150,
            dealing: cardsStateRef.current[i]?.dealing ?? true,
        }));
        if (!dealPhaseRef.current.started) {
            dealPhaseRef.current = { started: true, startTime: performance.now() };
        }
    }, [breakpoint, computeCardPositions, currentFan]);

    // Resize observer
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement;
        const observer = new ResizeObserver(() => {
            const w = parent.clientWidth;
            const { cards: positions, bottomPad } = computeCardPositions(currentFan, w);
            let maxBottom = 0;
            positions.forEach(p => {
                const bottom = p.y + currentFan.cardH + bottomPad;
                if (bottom > maxBottom) maxBottom = bottom;
            });
            setCanvasSize({ w, h: Math.ceil(maxBottom) });
            cardsStateRef.current.forEach((c, i) => {
                c.targetX = positions[i].x;
                c.targetY = positions[i].y;
                c.targetRotate = positions[i].rotate;
                c.x = positions[i].x;
                c.y = positions[i].y;
                c.rotate = positions[i].rotate;
            });
        });
        observer.observe(parent);
        return () => observer.disconnect();
    }, [computeCardPositions, currentFan]);

    // --- Scroll fold animation DISABLED ---

    // --- Canvas drawing helpers ---
    const drawRoundedRect = (ctx, x, y, w, h, r) => {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.arcTo(x + w, y, x + w, y + r, r);
        ctx.lineTo(x + w, y + h - r);
        ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
        ctx.lineTo(x + r, y + h);
        ctx.arcTo(x, y + h, x, y + h - r, r);
        ctx.lineTo(x, y + r);
        ctx.arcTo(x, y, x + r, y, r);
        ctx.closePath();
    };

    const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
        const words = text.split(' ');
        let line = '';
        let currentY = y;
        for (const word of words) {
            const testLine = line + (line ? ' ' : '') + word;
            if (ctx.measureText(testLine).width > maxWidth && line) {
                ctx.fillText(line, x, currentY);
                line = word;
                currentY += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, x, currentY);
        return currentY;
    };

    const countTextLines = (ctx, text, maxWidth) => {
        const words = text.split(' ');
        let line = '';
        let lines = 1;
        for (const word of words) {
            const testLine = line + (line ? ' ' : '') + word;
            if (ctx.measureText(testLine).width > maxWidth && line) {
                line = word;
                lines++;
            } else {
                line = testLine;
            }
        }
        return lines;
    };

    const drawSvgIcon = (ctx, iconData, cx, cy, size) => {
        if (!iconData) return;
        const { vb, d } = iconData;
        const scale = size / Math.max(vb[0], vb[1]);
        const offsetX = cx - (vb[0] * scale) / 2;
        const offsetY = cy - (vb[1] * scale) / 2;
        ctx.save();
        ctx.translate(offsetX, offsetY);
        ctx.scale(scale, scale);
        const path = new Path2D(d);
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.fill(path);
        ctx.restore();
    };

    // --- Canvas animation loop ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let running = true;

        const lerp = (a, b, t) => a + (b - a) * t;
        const lerpAngle = lerp;

        const draw = () => {
            if (!running) return;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = canvasSize.w * dpr;
            canvas.height = canvasSize.h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, canvasSize.w, canvasSize.h);

            const cards = cardsStateRef.current;
            if (!cards.length) { animFrameRef.current = null; return; }

            const hovered = hoveredRef.current;
            const dragging = dragRef.current;

            const cfg = currentFan;
            const now = performance.now();
            const dealStart = dealPhaseRef.current.startTime;
            const speed = 0.12;
            let needsMore = false;

            cards.forEach((card, i) => {
                const isHovered = i === hovered && !dragging.active;
                const isDragged = dragging.active && dragging.cardIndex === i;

                // --- Deal phase ---
                if (card.dealing) {
                    const elapsed = now - dealStart;
                    if (elapsed < card.dealDelay) {
                        const wobble = Math.sin(elapsed * 0.008 + i * 1.5) * 3;
                        card.cx += (card.cx + wobble - card.cx) * 0.1;
                        card.cRotate = wobble * 0.5 * (Math.PI / 180);
                        card.cScale = lerp(card.cScale, 0.9, 0.08);
                        card.cOpacity = lerp(card.cOpacity, 1, 0.15);
                        needsMore = true;
                        return;
                    }
                    const dealSpeed = 0.1;
                    card.cx = lerp(card.cx, card.targetX, dealSpeed);
                    card.cy = lerp(card.cy, card.targetY, dealSpeed);
                    card.cRotate = lerpAngle(card.cRotate, card.targetRotate, dealSpeed);
                    card.cScale = lerp(card.cScale, 1, dealSpeed);
                    card.cOpacity = lerp(card.cOpacity, 1, dealSpeed * 1.5);
                    const dx = Math.abs(card.cx - card.targetX);
                    const dy = Math.abs(card.cy - card.targetY);
                    if (dx < 1 && dy < 1) {
                        card.dealing = false;
                    }
                    needsMore = true;
                    return;
                }

                let tx = card.targetX;
                let ty = card.targetY;
                let tr = card.targetRotate;
                let ts = 1;
                let to = 1;

                if (isHovered) {
                    ts = 1.1;
                    tr = 0;
                    const scaledH = cfg.cardH * ts;
                    const overflow = (scaledH - cfg.cardH) / 2;
                    const minY = overflow;
                    ty = Math.max(card.targetY - 20, minY);
                }
                if (isDragged) {
                    ts = 1.08;
                    tr = 0;
                }

                if (!isDragged) {
                    card.cx      = lerp(card.cx, tx, speed);
                    card.cy      = lerp(card.cy, ty, speed);
                    card.cRotate = lerpAngle(card.cRotate, tr, speed);
                    card.cScale  = lerp(card.cScale, ts, speed);
                    card.cOpacity = lerp(card.cOpacity, to, speed * 1.5);
                } else {
                    card.cRotate = lerpAngle(card.cRotate, tr, speed);
                    card.cScale  = lerp(card.cScale, ts, speed);
                    card.cOpacity = lerp(card.cOpacity, to, speed * 1.5);
                }

                if (isDragged ||
                    Math.abs(card.cx - tx) > 0.5 || Math.abs(card.cy - ty) > 0.5 ||
                    Math.abs(card.cRotate - tr) > 0.001 || Math.abs(card.cScale - ts) > 0.001) {
                    needsMore = true;
                }
            });

            const sortedIndices = cards.map((_, i) => i).sort((a, b) => {
                const aIsHovered = a === hovered;
                const bIsHovered = b === hovered;
                if (aIsHovered) return 1;
                if (bIsHovered) return -1;
                return cards[a].zIndex - cards[b].zIndex;
            });

            sortedIndices.forEach(i => {
                const card = cards[i];
                const service = services[i];

                ctx.save();
                ctx.globalAlpha = card.cOpacity;

                const cx = card.cx + cfg.cardW / 2;
                const cy = card.cy + cfg.cardH / 2;
                ctx.translate(cx, cy);
                ctx.rotate(card.cRotate);
                ctx.scale(card.cScale, card.cScale);
                ctx.translate(-cfg.cardW / 2, -cfg.cardH / 2);

                ctx.shadowColor = 'rgba(0,0,0,0.2)';
                ctx.shadowBlur = 16;
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 4;

                const grad = ctx.createLinearGradient(0, 0, cfg.cardW, cfg.cardH);
                grad.addColorStop(0, service.gradStart);
                grad.addColorStop(1, service.gradEnd);
                ctx.fillStyle = grad;
                drawRoundedRect(ctx, 0, 0, cfg.cardW, cfg.cardH, 12);
                ctx.fill();

                ctx.shadowColor = 'transparent';
                ctx.strokeStyle = 'rgba(255,255,255,0.7)';
                ctx.lineWidth = 2;
                drawRoundedRect(ctx, 0, 0, cfg.cardW, cfg.cardH, 12);
                ctx.stroke();

                const iconData = serviceIconMap[service.key];
                const iconCx = cfg.padX + cfg.iconSize / 2;
                const iconCy = cfg.padY + cfg.iconSize / 2;
                drawSvgIcon(ctx, iconData, iconCx, iconCy, cfg.iconSize);

                ctx.fillStyle = 'white';
                ctx.font = `bold ${cfg.fontSize}px Inter, sans-serif`;
                ctx.textAlign = 'left';
                const title = t(`home.services.${service.key}.title`) || service.key;
                const titleX = cfg.padX + cfg.iconSize + cfg.gapIconTitle;
                const titleMaxW = cfg.cardW - titleX - cfg.padX;
                const titleLineH = cfg.fontSize + 3;
                const titleLines = countTextLines(ctx, title, titleMaxW);
                const titleBlockH = cfg.fontSize + (titleLines - 1) * titleLineH;
                const titleStartY = iconCy - titleBlockH / 2 + cfg.fontSize;
                const titleBottomY = wrapText(ctx, title, titleX, titleStartY, titleMaxW, titleLineH);

                const headerBottom = Math.max(titleBottomY, cfg.padY + cfg.iconSize);
                const specs = t(`home.services.${service.key}.detail.specification`) || [];
                ctx.font = `${cfg.specFont}px Inter, sans-serif`;
                ctx.textAlign = 'left';
                ctx.fillStyle = 'rgba(255,255,255,0.85)';
                let specY = headerBottom + cfg.gapTitleSpec;
                specs.forEach((spec) => {
                    if (specY > cfg.cardH - cfg.padY) return;
                    const lastY = wrapText(ctx, `${spec}`, cfg.padX, specY, cfg.cardW - cfg.padX * 2, cfg.specFont + 5);
                    specY = lastY + cfg.specFont + 8;
                });

                ctx.restore();
            });

            if (needsMore) {
                animFrameRef.current = requestAnimationFrame(draw);
            } else {
                animFrameRef.current = null;
            }
        };

        const scheduleFrame = () => {
            if (!animFrameRef.current && running) {
                animFrameRef.current = requestAnimationFrame(draw);
            }
        };
        scheduleFrameRef.current = scheduleFrame;

        draw();
        return () => {
            running = false;
            scheduleFrameRef.current = null;
            cancelAnimationFrame(animFrameRef.current);
        };
    }, [canvasSize, currentFan, t, services, serviceIconMap]);

    // --- Canvas mouse interactions ---
    const getMousePos = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        return { mx: e.clientX - rect.left, my: e.clientY - rect.top };
    };

    const hitTest = (mx, my) => {
        const cards = cardsStateRef.current;
        const cfg = currentFan;
        const sorted = cards.map((_, i) => i).sort((a, b) => cards[b].zIndex - cards[a].zIndex);
        for (const i of sorted) {
            const card = cards[i];
            const x = card.cx, y = card.cy;
            if (mx >= x && mx <= x + cfg.cardW && my >= y && my <= y + cfg.cardH) return i;
        }
        return -1;
    };

    const handleCanvasMouseMove = useCallback((e) => {
        const { mx, my } = getMousePos(e);
        const drag = dragRef.current;
        if (drag.active && drag.cardIndex >= 0) {
            const card = cardsStateRef.current[drag.cardIndex];
            card.cx = mx - drag.offsetX;
            card.cy = my - drag.offsetY;
            canvasRef.current.style.cursor = 'grabbing';
            scheduleFrameRef.current?.();
            return;
        }
        const hit = hitTest(mx, my);
        const cards = cardsStateRef.current;
        if (hit !== hoveredRef.current) {
            cards.forEach((card, i) => {
                if (i === hit) {
                    card.zIndex = 100;
                } else if (!dragRef.current.active || dragRef.current.cardIndex !== i) {
                    card.zIndex = card.baseZIndex ?? card.zIndex;
                }
            });
        }
        hoveredRef.current = hit;
        canvasRef.current.style.cursor = hit >= 0 ? 'grab' : 'default';
        scheduleFrameRef.current?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentFan]);

    const handleCanvasMouseDown = useCallback((e) => {
        const { mx, my } = getMousePos(e);
        const hit = hitTest(mx, my);
        if (hit < 0) return;
        const card = cardsStateRef.current[hit];
        const maxZ = Math.max(...cardsStateRef.current.map(c => c.zIndex));
        card.zIndex = maxZ + 1;
        dragRef.current = { active: true, cardIndex: hit, offsetX: mx - card.cx, offsetY: my - card.cy };
        canvasRef.current.style.cursor = 'grabbing';
        scheduleFrameRef.current?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentFan]);

    const handleCanvasMouseUp = useCallback(() => {
        const drag = dragRef.current;
        if (drag.active && drag.cardIndex >= 0) {
            scheduleFrameRef.current?.();
        }
        dragRef.current = { active: false, cardIndex: -1, offsetX: 0, offsetY: 0 };
    }, []);

    const handleCanvasMouseLeave = useCallback(() => {
        hoveredRef.current = -1;
        cardsStateRef.current.forEach(card => {
            card.zIndex = card.baseZIndex ?? card.zIndex;
        });
        dragRef.current = { active: false, cardIndex: -1, offsetX: 0, offsetY: 0 };
        scheduleFrameRef.current?.();
    }, []);

    return (
        <div className="relative w-full">
            <canvas
                ref={canvasRef}
                width={canvasSize.w}
                height={canvasSize.h}
                style={{ width: canvasSize.w, height: canvasSize.h, display: 'block' }}
                onMouseMove={handleCanvasMouseMove}
                onMouseDown={handleCanvasMouseDown}
                onMouseUp={handleCanvasMouseUp}
                onMouseLeave={handleCanvasMouseLeave}
                role="img"
                aria-label={t('home.services.title')}
            />
            <ul className="sr-only">
                {services.map(({ key }) => (
                    <li key={key}>{t(`home.services.${key}.title`)}</li>
                ))}
            </ul>
        </div>
    );
};

export default CanvasService;