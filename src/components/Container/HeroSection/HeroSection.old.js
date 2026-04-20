import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import HomeCSS from "./HeroSection.module.css";
import { FaArrowRight, FaFileDownload, FaGlobe, FaLayerGroup, FaCloud, FaServer, FaCog } from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";
import DownloadPopup from "../../DownloadPopup/DownloadPopup";
import ServiceSection from "./ServiceSection";

const HeroSection = (props) => {
    const classeCSS = props.className;
    const idSection = props.id;
    const { t } = useLanguage();
    const canvasRef = useRef(null);
    const animFrameRef = useRef(null);
    const cardsStateRef = useRef([]);
    const dragRef = useRef({ active: false, cardIndex: -1, offsetX: 0, offsetY: 0 });
    const dealPhaseRef = useRef({ started: false, startTime: 0 });
    const hoveredRef = useRef(-1);
    const scheduleFrameRef = useRef(null);
    const sectionRef = useRef(null);
    const scrollFoldRef = useRef(0); // scroll fold progress: 0 = fully open fan, 1 = fully folded at center
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

    // --- Fan layout control points ---
    // spacing:       horizontal distance between card centers
    // cardW/cardH:   card dimensions
    // fontSize:      title font size (px)
    // specFont:      specification list font size (px)
    // iconSize:      service icon size (px)
    // padX/padY:     internal card padding (content inset)
    // gapIconTitle:  space between icon and title
    // gapTitleSpec:  space between title and spec list
    // canvasPadX:    horizontal padding of the canvas (cards won't go beyond)
    const fanConfig = {
        md:  { spacing: 130, cardW: 170, cardH: 180, fontSize: 9, specFont: 10, iconSize: 22, padX: 16, padY: 28, gapIconTitle: 12, gapTitleSpec: 24, canvasPadX: 10 },
        lg:  { spacing: 135, cardW: 190, cardH: 180, fontSize: 10, specFont: 10, iconSize: 24, padX: 18, padY: 28, gapIconTitle: 12, gapTitleSpec: 24, canvasPadX: 15 },
        xl:  { spacing: 155, cardW: 190, cardH: 180, fontSize: 10, specFont: 10, iconSize: 26, padX: 18, padY: 27, gapIconTitle: 12, gapTitleSpec: 24, canvasPadX: 20 },
        '2xl': { spacing: 175, cardW: 220, cardH: 180, fontSize: 11, specFont: 11, iconSize: 30, padX: 18, padY: 28, gapIconTitle: 12, gapTitleSpec: 24, canvasPadX: 25 },
    };
    const currentFan = fanConfig[breakpoint] || fanConfig.md;

    // Calculate experience years dynamically from jobs data
    const getExperienceYears = () => {
        const jobs = t('experience.jobs');
        if (!Array.isArray(jobs) || jobs.length === 0) return 0;
        let earliest = null;
        jobs.forEach(job => {
            if (job.dateStart) {
                const [m, y] = job.dateStart.split('-').map(Number);
                const d = new Date(y, m - 1);
                if (!earliest || d < earliest) earliest = d;
            }
        });
        if (!earliest) return 0;
        const now = new Date();
        return Math.floor((now - earliest) / (1000 * 60 * 60 * 24 * 365.25));
    };

    const experienceText = (t('home.experience') || '').replace('{{years}}', getExperienceYears());

    const services = useMemo(() => [
        { icon: FaGlobe, key: 'website', color: '#3b82f6', gradStart: '#3470f1', gradEnd: '#2459ec' },
        { icon: FaLayerGroup, key: 'webapp', color: '#8b5cf6', gradStart: '#daba6b', gradEnd: '#a1812f' },
        { icon: FaServer, key: 'api', color: '#f59e0b', gradStart: '#3470f1', gradEnd: '#2459ec' },
        { icon: FaCloud, key: 'consulting', color: '#06b6d4', gradStart: '#daba6b', gradEnd: '#a1812f' },
        { icon: FaCog, key: 'maintenance', color: '#10b981', gradStart: '#3470f1', gradEnd: '#2459ec' },
    ], []);

    // SVG path data for canvas rendering (from FontAwesome 5 — same as react-icons/fa)
    const serviceSvgPaths = useMemo(() => ({
        // FaGlobe — viewBox 0 0 496 512
        globe: {
            vb: [496, 512],
            d: 'M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z',
        },
        // FaLayerGroup — viewBox 0 0 512 512
        layerGroup: {
            vb: [512, 512],
            d: 'M12.41 148.02l232.94 105.67c6.8 3.09 14.49 3.09 21.29 0l232.94-105.67c16.55-7.51 16.55-32.52 0-40.03L266.65 2.31a25.607 25.607 0 00-21.29 0L12.41 107.98c-16.55 7.51-16.55 32.53 0 40.04zm487.18 88.28l-58.09-26.33-161.64 73.27c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.51 209.97l-58.1 26.33c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 276.3c16.55-7.5 16.55-32.5 0-40zm0 127.8l-57.87-26.23-161.86 73.37c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.29 337.87 12.41 364.1c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0l232.94-105.59c16.55-7.5 16.55-32.5 0-40z',
        },
        // FaServer — viewBox 0 0 512 512
        server: {
            vb: [512, 512],
            d: 'M480 160H32c-17.673 0-32-14.327-32-32V64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm112 248H32c-17.673 0-32-14.327-32-32v-64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm112 248H32c-17.673 0-32-14.327-32-32v-64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24z',
        },
        // FaCloud — viewBox 0 0 640 512
        cloud: {
            vb: [640, 512],
            d: 'M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4z',
        },
        // FaCog — viewBox 0 0 512 512
        cog: {
            vb: [512, 512],
            d: 'M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.4-.7-11.2-5.6-14zm-231.4 0c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z',
        },
    }), []);

    // Map service keys to their SVG icon data
    const serviceIconMap = useMemo(() => ({
        website: serviceSvgPaths.globe,
        webapp: serviceSvgPaths.layerGroup,
        api: serviceSvgPaths.server,
        consulting: serviceSvgPaths.cloud,
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
            // Clamp within canvas horizontal padding
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
        // Compute needed height
        let maxBottom = 0;
        positions.forEach(p => {
            const bottom = p.y + currentFan.cardH + bottomPad;
            if (bottom > maxBottom) maxBottom = bottom;
        });
        const h = Math.ceil(maxBottom);
        setCanvasSize({ w, h });
        // Init card state — riffle shuffle: all cards start stacked at center
        const centerX = w / 2 - currentFan.cardW / 2;
        const centerY = (h / 2) - currentFan.cardH / 2;
        cardsStateRef.current = positions.map((p, i) => ({
            ...p,
            // current animated position — start stacked at center
            cx: cardsStateRef.current[i]?.cx ?? centerX,
            cy: cardsStateRef.current[i]?.cy ?? centerY,
            cRotate: cardsStateRef.current[i]?.cRotate ?? 0,
            cScale: cardsStateRef.current[i]?.cScale ?? 0.85,
            cOpacity: cardsStateRef.current[i]?.cOpacity ?? 1,
            // Deal animation: each card has a staggered delay before it starts moving
            dealDelay: 600 + i * 150, // ms before this card starts dealing
            dealing: cardsStateRef.current[i]?.dealing ?? true,
        }));
        // Start deal timer
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

    // --- Scroll fold animation: cards fold back to center when section scrolls off top ---
    useEffect(() => {
        const onScroll = () => {
            const section = sectionRef.current;
            if (!section) return;
            const rect = section.getBoundingClientRect();
            const sectionH = rect.height;

            // FOLD_VISIBLE_THRESHOLD: fraction of section still visible when fold begins.
            // 0.4 means the fold starts when only 40% of the section remains on screen
            // (i.e. 60% has already scrolled above the viewport).
            // Decrease to start folding later, increase to start earlier.
            const FOLD_VISIBLE_THRESHOLD = 0.95;

            // Section hasn't started scrolling off top yet
            if (rect.top >= 0) {
                scrollFoldRef.current = 0;
                scheduleFrameRef.current?.();
                return;
            }

            // Section is fully off screen
            if (rect.bottom <= 0) {
                scrollFoldRef.current = 1;
                scheduleFrameRef.current?.();
                return;
            }

            // visibleFraction: proportion of section still visible (0 to 1)
            const visibleFraction = Math.max(0, rect.bottom) / sectionH;

            if (visibleFraction >= FOLD_VISIBLE_THRESHOLD) {
                // Above threshold — cards stay in normal fan position
                scrollFoldRef.current = 0;
                scheduleFrameRef.current?.();
                return;
            }

            // foldProgress: 0 at threshold, 1 when section fully off screen
            const foldProgress = Math.min(1, Math.max(0,
                (FOLD_VISIBLE_THRESHOLD - visibleFraction) / FOLD_VISIBLE_THRESHOLD
            ));
            scrollFoldRef.current = foldProgress;
            scheduleFrameRef.current?.();
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // initial check
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

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

    // Measure how many lines wrapText would produce (without drawing)
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

    // Draw an SVG path icon on canvas, scaled and centered at (cx, cy)
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

            // Animate towards targets
            const cfg = currentFan;
            const now = performance.now();
            const dealStart = dealPhaseRef.current.startTime;
            const speed = 0.12;
            let needsMore = false;

            // Scroll fold: center position where cards converge
            const foldP = scrollFoldRef.current;
            const centerFoldX = canvasSize.w / 2 - cfg.cardW / 2;
            const centerFoldY = canvasSize.h / 2 - cfg.cardH / 2;
            cards.forEach((card, i) => {
                const isHovered = i === hovered && !dragging.active;
                const isDragged = dragging.active && dragging.cardIndex === i;

                // Deal phase: card stays at center until its delay elapses
                if (card.dealing) {
                    const elapsed = now - dealStart;
                    if (elapsed < card.dealDelay) {
                        // Still waiting — slight shuffle wobble at center
                        const wobble = Math.sin(elapsed * 0.008 + i * 1.5) * 3;
                        card.cx += (card.cx + wobble - card.cx) * 0.1;
                        card.cRotate = wobble * 0.5 * (Math.PI / 180);
                        card.cScale = lerp(card.cScale, 0.9, 0.08);
                        card.cOpacity = lerp(card.cOpacity, 1, 0.15);
                        needsMore = true;
                        return;
                    }
                    // Card is now dealing — use faster speed for the deal
                    const dealSpeed = 0.1;
                    card.cx = lerp(card.cx, card.targetX, dealSpeed);
                    card.cy = lerp(card.cy, card.targetY, dealSpeed);
                    card.cRotate = lerpAngle(card.cRotate, card.targetRotate, dealSpeed);
                    card.cScale = lerp(card.cScale, 1, dealSpeed);
                    card.cOpacity = lerp(card.cOpacity, 1, dealSpeed * 1.5);
                    // Check if card has arrived
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
                    // Prevent card from going above canvas top when scaled
                    const scaledH = cfg.cardH * ts;
                    const overflow = (scaledH - cfg.cardH) / 2;
                    const minY = overflow;
                    ty = Math.max(card.targetY - 20, minY);
                }
                if (isDragged) {
                    ts = 1.08;
                    tr = 0;
                    // x,y set directly by mouse handler
                }

                // --- Scroll fold: smoothly interpolate targets toward center ---
                // Fold modifies the target positions; lerp ensures fluid motion
                // both when folding (scroll down) and unfolding (scroll back up).
                if (foldP > 0 && !isDragged && !isHovered) {
                    tx = tx + (centerFoldX - tx) * foldP;
                    ty = ty + (centerFoldY - ty) * foldP;
                    tr = tr * (1 - foldP);
                    ts = ts + (0.85 - ts) * foldP;
                    card.wasFolding = true;
                }

                if (!isDragged) {
                    // Smooth lerp toward target — works for normal, fold, and unfold
                    card.cx = lerp(card.cx, tx, speed);
                    card.cy = lerp(card.cy, ty, speed);
                    card.cRotate = lerpAngle(card.cRotate, tr, speed);
                    card.cScale = lerp(card.cScale, ts, speed);
                    card.cOpacity = lerp(card.cOpacity, to, speed * 1.5);
                } else {
                    card.cRotate = lerpAngle(card.cRotate, tr, speed);
                    card.cScale = lerp(card.cScale, ts, speed);
                    card.cOpacity = lerp(card.cOpacity, to, speed * 1.5);
                }

                // Clear wasFolding flag once card has returned close to its fan target
                if (card.wasFolding && foldP === 0 && !isDragged) {
                    if (Math.abs(card.cx - card.targetX) < 1 && Math.abs(card.cy - card.targetY) < 1) {
                        card.cx = card.targetX;
                        card.cy = card.targetY;
                        card.cRotate = card.targetRotate;
                        card.wasFolding = false;
                    }
                }

                // Check if this card still needs animation
                if (isDragged ||
                    Math.abs(card.cx - tx) > 0.5 || Math.abs(card.cy - ty) > 0.5 ||
                    Math.abs(card.cRotate - tr) > 0.001 || Math.abs(card.cScale - ts) > 0.001) {
                    needsMore = true;
                }
            });

            // Sort by zIndex for draw order — hovered card always on top
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

                // Shadow
                ctx.shadowColor = 'rgba(0,0,0,0.2)';
                ctx.shadowBlur = 16;
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 4;

                // Card background gradient
                const grad = ctx.createLinearGradient(0, 0, cfg.cardW, cfg.cardH);
                grad.addColorStop(0, service.gradStart);
                grad.addColorStop(1, service.gradEnd);
                ctx.fillStyle = grad;
                drawRoundedRect(ctx, 0, 0, cfg.cardW, cfg.cardH, 12);
                ctx.fill();

                // Border
                ctx.shadowColor = 'transparent';
                ctx.strokeStyle = 'rgba(255,255,255,0.7)';
                ctx.lineWidth = 2;
                drawRoundedRect(ctx, 0, 0, cfg.cardW, cfg.cardH, 12);
                ctx.stroke();

                // Icon + Title (left-aligned, icon left of title, title centered on icon)
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

                // Specification list — starts below icon+title row
                const headerBottom = Math.max(titleBottomY, cfg.padY + cfg.iconSize);
                const specs = t(`home.services.${service.key}.detail.specification`) || [];
                ctx.font = `${cfg.specFont}px Inter, sans-serif`;
                ctx.textAlign = 'left';
                ctx.fillStyle = 'rgba(255,255,255,0.85)';
                let specY = headerBottom + cfg.gapTitleSpec;
                specs.forEach((spec, si) => {
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
        return () => { running = false; scheduleFrameRef.current = null; cancelAnimationFrame(animFrameRef.current); };
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
        // Test in reverse zIndex order (top card first)
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
        // Manage zIndex: hovered card on top, others restore
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
        // Bring to front
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
            // Snap back to target — restart loop for lerp animation
            scheduleFrameRef.current?.();
        }
        dragRef.current = { active: false, cardIndex: -1, offsetX: 0, offsetY: 0 };
    }, []);

    const handleCanvasMouseLeave = useCallback(() => {
        hoveredRef.current = -1;
        // Restore all zIndex on leave
        cardsStateRef.current.forEach(card => {
            card.zIndex = card.baseZIndex ?? card.zIndex;
        });
        dragRef.current = { active: false, cardIndex: -1, offsetX: 0, offsetY: 0 };
        scheduleFrameRef.current?.();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { delayChildren: 0.3, staggerChildren: 0.15 }
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const fadeInLeft = {
        hidden: { opacity: 0, x: 80 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] } }
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
        hover: { scale: 1.05, transition: { duration: 0.3 } },
        tap: { scale: 0.95 }
    };

    return (
        <>
            <motion.section
                ref={sectionRef}
                id={idSection}
                className={`${classeCSS} `}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
                style={{ position: "relative", overflow: "hidden" }}
            >
                
                <div className="mx-auto max-w-screen-lg px-2 pt-24 2xl:pt-5 w-full relative z-10 flex items-center justify-center">

                    <motion.div
                        className="w-full h-full flex flex-col gap-2 items-center text-center"
                        variants={containerVariants}
                    >
                        {/* Badge + Greeting */}
                        <motion.div variants={fadeInUp} className="flex flex-col items-center gap-1">
                            <span className="shimmer inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[var(--border-theme)] bg-white text-fluid-sm text-[var(--color-accent)] shadow-sm">
                                <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-green-500"></span>
                                </span>
                                {t('home.badge')}
                            </span>
                            <p className="text-[var(--text-secondary)] tracking-wide text-fluid-base">
                                {t('home.greeting')} Loroque Brillant 
                                <span className="text-xl sm:text-2xl ml-1">👋</span>
                            </p>
                        </motion.div>

                        {/* Name / Role */}
                        <motion.div variants={fadeInLeft} className={HomeCSS.homeSectionName}>
                            <h1 className="text-fluid-3xl font-bold tracking-wide text-[var(--text-heading)] leading-snug relative inline-block">
                                <span className="relative">
                                    <motion.svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 59 49"
                                        className="absolute -left-11 -top-4 md:-left-11 md:-top-8 w-10 md:w-14 pointer-events-none"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1, duration: 0.5 }}
                                    >
                                        <motion.path
                                            d="M 55.596 34.687 C 55.336 25.196 53.949 6.285 50.479 6.568 C 46.142 6.922 42.415 26.1 43.251 30.723 C 44.087 35.347 35.934 6.426 29.358 2.936 C 22.781 -0.554 31.338 29.876 33.851 33.242 C 36.365 36.608 10.681 20.463 3.841 23.508 C -2.999 26.553 30.4 51.941 43.502 45.198"
                                            stroke="var(--svg-deco-scribble)"
                                            strokeWidth="5"
                                            strokeLinecap="round"
                                            fill="transparent"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ delay: 1, duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 0.5 }}
                                        />
                                    </motion.svg>
                                    
                                    {t('home.role')}
                                </span>
                            </h1>
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 293 24"
                                className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 mx-auto mt-1 sm:mt-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 0.5 }}
                            >
                                <motion.path
                                    d="M 3 8.397 C 32.76 5.575 121.068 0.779 236.228 4.165 M 67.503 16.663 C 88.654 13.471 151.95 6.537 235.928 4.341 M 68.203 16.605 C 96.815 15.061 181.196 13.876 289.83 21.484"
                                    stroke="var(--svg-deco-underline)"
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                    fill="transparent"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ delay: 1, duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 0.5 }}
                                />
                            </motion.svg>
                        </motion.div>

                        {/* Experience text */}
                        <motion.div variants={fadeInUp} className="max-w-3xl px-2">
                            <p className="text-[var(--text-secondary)] leading-relaxed text-fluid-base">
                                {experienceText}
                            </p>
                        </motion.div>

                        {/* CTA Buttons */}
                        <DownloadPopup>
                            {(startDownload) => (
                        <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-2 sm:gap-3 pt-2 sm:pt-3 px-2 w-full max-w-lg">
                            <motion.button
                                onClick={(e) => {
                                    e.preventDefault();
                                    startDownload('/CV_Loroque_Brillant.pdf', 'CV_Loroque_Brillant.pdf');
                                }}
                                className="group btn-glow flex items-center justify-center gap-2 px-4 py-1.5 text-fluid-sm rounded-full border-2 border-[var(--btn-bg)] text-[var(--btn-bg)] font-semibold hover:bg-[var(--btn-bg)] hover:text-[var(--btn-text)] duration-300 shadow-lg hover:shadow-xl transition-shadow"
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <FaFileDownload className="text-xs" />
                                {t('home.cvBtn')}
                            </motion.button>

                            <motion.a
                                href="#contactsSection"
                                className="group btn-glow flex items-center justify-center gap-2 px-4 py-1.5 text-fluid-sm rounded-full bg-[var(--btn-bg)] text-[var(--btn-text)] font-semibold shadow-lg hover:shadow-xl transition-shadow"
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                {t('home.contactBtn')}
                                <FaArrowRight className="text-[0.6rem] transition-transform duration-300 group-hover:translate-x-1" />
                            </motion.a>
                        </motion.div>
                            )}
                        </DownloadPopup>

                        {/* Services — Mobile grid layout */}
                        {/* 
                            <motion.div variants={fadeInUp} className="md:hidden flex flex-col items-center pt-4">
                                <h2 className="text-fluid-xl font-bold tracking-wide text-[var(--text-heading)]">
                                    {t('home.services.title')}
                                </h2>
                            </motion.div> 
                        */}
                        <motion.div variants={fadeInUp} className="md:hidden w-full px-1 pt-2">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                                {services.map(({ icon: Icon, key }, index) => (
                                    <motion.div
                                        key={key}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        className={`${HomeCSS.serviceCard} ${index % 2 === 0 ? HomeCSS.serviceCardBlue : HomeCSS.serviceCardDark}
                                        card-hover-lift shimmer flex flex-col items-center justify-between gap-2 p-3 sm:p-4 rounded-xl border-2 border-white shadow-xl`}
                                    >
                                        <h3 className="text-[.65rem] sm:text-[.75rem] font-bold text-white text-center leading-snug">
                                            {t(`home.services.${key}.title`)}
                                        </h3>
                                        <Icon className="text-xl sm:text-2xl text-white opacity-90" />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                    </motion.div>
               
                </div>

                <div
                    className="p-3"
                >

                    {/* Services — Desktop fan layout (Canvas) */}
                        <motion.div
                            variants={fadeInUp}
                            className="hidden md:block relative w-full"
                        >
                           
                            {/* Service title */}
                            
                            {/* 
                            
                                <motion.div variants={fadeInUp} className="flex flex-col items-center pt-4">
                                    <h2 className="text-fluid-2xl font-bold tracking-wide text-[var(--text-heading)] leading-snug relative inline-block">
                                        {t('home.services.title')}
                                    </h2>
                                </motion.div>  
                            */}
                            
                            {/* <canvas
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
                        */}
                           


                            {/* Screen reader fallback for canvas content */}
                            {/*}
                            <ul className="sr-only">
                                {services.map(({ key }) => (
                                    <li key={key}>{t(`home.services.${key}.title`)}</li>
                                ))}
                            </ul> */}

                            <ServiceSection id="servicesSection" className={`${classeCSS.section} flex align-center justify-center`} />
                        </motion.div>

                </div>
            </motion.section>
        </>
    );
}

export default HeroSection;