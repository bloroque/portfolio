import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import { useTheme } from "../../../context/ThemeContext";

// ═══════════════════ Skill Nodes ═══════════════════
const skillNodesData = [
    // Backend
    { name: "PHP",         group: "backend",  color: "#777BB4" },
    { name: "Laravel",     group: "backend",  color: "#FF2D20" },
    { name: "Symfony",     group: "backend",  color: "#6c6c6c" },
    { name: "CodeIgniter", group: "backend",  color: "#EF4223" },
    { name: "Next.js",     group: "backend",  color: "#555555" },
    { name: "REST API",    group: "backend",  color: "#009688" },
    { name: "GraphQL",     group: "backend",  color: "#E10098" },
    { name: "JWT",         group: "backend",  color: "#fb015b" },
    // Frontend
    { name: "JavaScript",    group: "frontend", color: "#F7DF1E" },
    { name: "TypeScript",    group: "frontend", color: "#3178C6" },
    { name: "React",         group: "frontend", color: "#61DAFB" },
    { name: "Vue.js",        group: "frontend", color: "#4FC08D" },
    { name: "Tailwind CSS",  group: "frontend", color: "#06B6D4" },
    { name: "Bootstrap",     group: "frontend", color: "#7952B3" },
    { name: "shadcn/ui",     group: "frontend", color: "#888888" },
    { name: "Framer Motion", group: "frontend", color: "#0055FF" },
    // Database
    { name: "MySQL",      group: "database", color: "#4479A1" },
    { name: "PostgreSQL", group: "database", color: "#4169E1" },
    { name: "MongoDB",    group: "database", color: "#47A248" },
    { name: "Redis",      group: "database", color: "#DC382D" },
    // Tools
    { name: "Git",     group: "tools", color: "#F05032" },
    { name: "GitHub",  group: "tools", color: "#6e5494" },
    { name: "npm",     group: "tools", color: "#CB3837" },
    { name: "Vite",    group: "tools", color: "#646CFF" },
    { name: "Docker",  group: "tools", color: "#2496ED" },
    { name: "Linux",   group: "tools", color: "#FCC624" },
    { name: "VS Code", group: "tools", color: "#007ACC" },
    { name: "Jira",    group: "tools", color: "#0052CC" },
    { name: "Trello",  group: "tools", color: "#0052CC" },
];

// ═══════════════════ Development Connections ═══════════════════
const skillConnections = [
    { from: "PHP", to: "Laravel" },
    { from: "PHP", to: "Symfony" },
    { from: "PHP", to: "CodeIgniter" },
    { from: "JavaScript", to: "TypeScript" },
    { from: "JavaScript", to: "React" },
    { from: "JavaScript", to: "Vue.js" },
    { from: "TypeScript", to: "React" },
    { from: "TypeScript", to: "Next.js" },
    { from: "React", to: "Next.js" },
    { from: "React", to: "Framer Motion" },
    { from: "React", to: "shadcn/ui" },
    { from: "React", to: "Tailwind CSS" },
    { from: "Vue.js", to: "Tailwind CSS" },
    { from: "React", to: "Bootstrap" },
    { from: "Laravel", to: "REST API" },
    { from: "REST API", to: "JWT" },
    { from: "GraphQL", to: "React" },
    { from: "Next.js", to: "REST API" },
    { from: "Laravel", to: "MySQL" },
    { from: "Laravel", to: "PostgreSQL" },
    { from: "Laravel", to: "Redis" },
    { from: "Symfony", to: "PostgreSQL" },
    { from: "Next.js", to: "MongoDB" },
    { from: "Git", to: "GitHub" },
    { from: "npm", to: "Vite" },
    { from: "Docker", to: "Linux" },
    { from: "Vite", to: "React" },
    { from: "Vite", to: "Vue.js" },
];

// ═══════════════════ Group Config ═══════════════════
const groupOrder = ["backend", "frontend", "database", "tools"];
const groupMeta = {
    backend:  { cols: 4, color: "#3b82f6" },
    frontend: { cols: 4, color: "#a855f7" },
    database: { cols: 4, color: "#10b981" },
    tools:    { cols: 5, color: "#f59e0b" },
};

// ═══════════════════ Breakpoint Configs ═══════════════════
const bpConfig = {
    md:    { pillH: 28, iconR: 7,  fontSize: 10, labelFont: 11, padding: 12, labelH: 26, lineW: 1.2, pillPadX: 8, pillGap: 6, rowGap: 8,  sectionGap: 16 },
    lg:    { pillH: 30, iconR: 8,  fontSize: 11, labelFont: 12, padding: 14, labelH: 28, lineW: 1.4, pillPadX: 9, pillGap: 7, rowGap: 9,  sectionGap: 18 },
    xl:    { pillH: 32, iconR: 8,  fontSize: 11, labelFont: 13, padding: 16, labelH: 30, lineW: 1.5, pillPadX: 10, pillGap: 8, rowGap: 10, sectionGap: 20 },
    '2xl': { pillH: 34, iconR: 9,  fontSize: 12, labelFont: 14, padding: 18, labelH: 32, lineW: 1.6, pillPadX: 11, pillGap: 9, rowGap: 11, sectionGap: 22 },
};

// ═══════════════════ Drawing Helpers ═══════════════════
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

// ═══════════════════ Component ═══════════════════
const SkillsCanvas = () => {
    const { t } = useLanguage();
    const { isDark } = useTheme();
    const canvasRef = useRef(null);
    const animRef = useRef(null);
    const nodesRef = useRef([]);
    const hoveredRef = useRef(-1);
    const dragRef = useRef({ active: false, nodeIndex: -1, offsetX: 0, offsetY: 0 });
    const scheduleRef = useRef(null);
    const startTimeRef = useRef(0);
    const pillWidthsRef = useRef([]);
    const [canvasSize, setCanvasSize] = useState({ w: 800, h: 520 });

    // Breakpoint
    const getBreakpoint = useCallback(() => {
        const w = window.innerWidth;
        if (w >= 1536) return '2xl';
        if (w >= 1280) return 'xl';
        if (w >= 1024) return 'lg';
        return 'md';
    }, []);
    const [bp, setBp] = useState(getBreakpoint);
    useEffect(() => {
        const onResize = () => setBp(getBreakpoint());
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [getBreakpoint]);

    const cfg = bpConfig[bp] || bpConfig.md;

    // Index map: name → index
    const nodeIndexMap = useMemo(() => {
        const map = {};
        skillNodesData.forEach((n, i) => { map[n.name] = i; });
        return map;
    }, []);

    // Per-node connection lookup
    const connLookup = useMemo(() => {
        const lookup = {};
        skillNodesData.forEach((_, i) => { lookup[i] = []; });
        skillConnections.forEach((conn) => {
            const fi = nodeIndexMap[conn.from];
            const ti = nodeIndexMap[conn.to];
            if (fi !== undefined && ti !== undefined) {
                lookup[fi].push(ti);
                lookup[ti].push(fi);
            }
        });
        return lookup;
    }, [nodeIndexMap]);

    // ─── Measure pill widths (needs a canvas context) ───
    const measurePills = useCallback((ctx) => {
        ctx.font = `500 ${cfg.fontSize}px Inter, system-ui, sans-serif`;
        pillWidthsRef.current = skillNodesData.map(skill => {
            const textW = ctx.measureText(skill.name).width;
            // iconR*2 (icon dot) + gap + text + paddingX*2
            return Math.ceil(cfg.iconR * 2 + 6 + textW + cfg.pillPadX * 2);
        });
    }, [cfg]);

    // ─── Compute Layout ───
    const computeLayout = useCallback((w) => {
        const grouped = {};
        skillNodesData.forEach((node, i) => {
            if (!grouped[node.group]) grouped[node.group] = [];
            grouped[node.group].push(i);
        });

        const pillWidths = pillWidthsRef.current;
        if (!pillWidths.length) return { positions: new Array(skillNodesData.length), totalH: 400, groupLabels: {}, groupBounds: {} };

        const contentW = w - cfg.padding * 2;
        let cursorY = cfg.padding;
        const positions = new Array(skillNodesData.length);
        const groupLabelsMap = {};
        const groupBoundsMap = {};
        let groupDelay = 0;

        groupOrder.forEach(key => {
            const indices = grouped[key] || [];
            const groupStartY = cursorY;

            // Group label
            groupLabelsMap[key] = { x: cfg.padding + 6, y: cursorY + cfg.labelH * 0.55 };
            cursorY += cfg.labelH;

            // Flow-wrap pills
            let rowX = cfg.padding;
            let rowY = cursorY;

            indices.forEach((gi, li) => {
                const pw = pillWidths[gi] || 80;
                // wrap?
                if (rowX + pw > w - cfg.padding && rowX > cfg.padding) {
                    rowX = cfg.padding;
                    rowY += cfg.pillH + cfg.rowGap;
                }
                positions[gi] = {
                    x: rowX + pw / 2,
                    y: rowY + cfg.pillH / 2,
                    delay: groupDelay + li * 50,
                };
                rowX += pw + cfg.pillGap;
            });

            cursorY = rowY + cfg.pillH + cfg.sectionGap;

            groupBoundsMap[key] = {
                x: cfg.padding / 2,
                y: groupStartY,
                w: contentW + cfg.padding,
                h: cursorY - groupStartY - cfg.sectionGap / 2,
            };

            groupDelay += 200;
        });

        const totalH = cursorY + cfg.padding;
        return { positions, totalH, groupLabels: groupLabelsMap, groupBounds: groupBoundsMap };
    }, [cfg]);

    // ─── Initialize & resize ───
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement;
        if (!parent) return;

        const ctx = canvas.getContext('2d');
        measurePills(ctx);

        const updateLayout = () => {
            const w = parent.clientWidth;
            const { positions, totalH } = computeLayout(w);
            setCanvasSize({ w, h: totalH });

            const centerX = w / 2;
            const centerY = totalH / 2;

            nodesRef.current = positions.map((p, i) => ({
                x: p?.x ?? centerX, y: p?.y ?? centerY, delay: p?.delay ?? 0,
                cx: nodesRef.current[i]?.cx ?? centerX,
                cy: nodesRef.current[i]?.cy ?? centerY,
                cScale: nodesRef.current[i]?.cScale ?? 0,
                cOpacity: nodesRef.current[i]?.cOpacity ?? 0,
                dragged: nodesRef.current[i]?.dragged ?? false,
            }));

            if (!startTimeRef.current) {
                startTimeRef.current = performance.now();
            }
        };

        updateLayout();

        const observer = new ResizeObserver(() => {
            measurePills(ctx);
            const w = parent.clientWidth;
            const { positions, totalH } = computeLayout(w);
            setCanvasSize({ w, h: totalH });
            nodesRef.current.forEach((node, i) => {
                if (positions[i] && !node.dragged) {
                    node.x = positions[i].x;
                    node.y = positions[i].y;
                }
            });
            scheduleRef.current?.();
        });
        observer.observe(parent);
        return () => observer.disconnect();
    }, [bp, computeLayout, measurePills]);

    // ─── Draw loop ───
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let running = true;

        // Read theme colors
        const style = getComputedStyle(document.documentElement);
        const textColor = style.getPropertyValue('--text-primary').trim() || (isDark ? '#94a3b8' : '#475569');
        const bgCard = style.getPropertyValue('--bg-card').trim() || (isDark ? '#1e293b' : '#ffffff');
        const borderTheme = style.getPropertyValue('--border-theme').trim() || (isDark ? '#334155' : '#e2e8f0');
        const accentColor = style.getPropertyValue('--color-accent').trim() || '#3b82f6';

        const lerp = (a, b, t) => a + (b - a) * t;

        const draw = () => {
            if (!running) return;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = canvasSize.w * dpr;
            canvas.height = canvasSize.h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, canvasSize.w, canvasSize.h);

            const nodes = nodesRef.current;
            const pillWidths = pillWidthsRef.current;
            if (!nodes.length || !pillWidths.length) { animRef.current = null; return; }

            const hovered = hoveredRef.current;
            const drag = dragRef.current;
            const now = performance.now();
            const elapsed = now - startTimeRef.current;
            let needsMore = false;

            const { groupLabels, groupBounds } = computeLayout(canvasSize.w);

            // ── Animate node states ──
            nodes.forEach((node, i) => {
                const ready = elapsed >= node.delay;
                if (!ready) { needsMore = true; return; }

                const isHovered = i === hovered;
                const isDragged = drag.active && drag.nodeIndex === i;
                const isConnected = hovered >= 0 && connLookup[hovered]?.includes(i);
                const dimmed = hovered >= 0 && !isHovered && !isConnected;

                const ts = (isHovered || isDragged) ? 1.08 : 1;
                const to = dimmed ? 0.25 : 1;

                if (!isDragged) {
                    node.cx = lerp(node.cx, node.x, 0.1);
                    node.cy = lerp(node.cy, node.y, 0.1);
                }
                node.cScale = lerp(node.cScale, ts, 0.12);
                node.cOpacity = lerp(node.cOpacity, to, 0.12);

                if ((!isDragged && (Math.abs(node.cx - node.x) > 0.3 || Math.abs(node.cy - node.y) > 0.3)) ||
                    Math.abs(node.cScale - ts) > 0.005 || Math.abs(node.cOpacity - to) > 0.005) {
                    needsMore = true;
                }
            });

            // ── Draw group region backgrounds ──
            groupOrder.forEach(key => {
                const b = groupBounds[key];
                if (!b) return;
                const gColor = groupMeta[key].color;
                const r = parseInt(gColor.slice(1, 3), 16);
                const g = parseInt(gColor.slice(3, 5), 16);
                const bl = parseInt(gColor.slice(5, 7), 16);

                ctx.save();
                ctx.fillStyle = `rgba(${r},${g},${bl},${isDark ? 0.05 : 0.03})`;
                drawRoundedRect(ctx, b.x, b.y, b.w, b.h, 10);
                ctx.fill();
                ctx.strokeStyle = `rgba(${r},${g},${bl},${isDark ? 0.12 : 0.08})`;
                ctx.lineWidth = 1;
                drawRoundedRect(ctx, b.x, b.y, b.w, b.h, 10);
                ctx.stroke();
                ctx.restore();
            });

            // ── Draw group labels ──
            groupOrder.forEach(key => {
                const lp = groupLabels[key];
                if (!lp) return;
                const gColor = groupMeta[key].color;
                ctx.save();
                ctx.font = `bold ${cfg.labelFont}px Inter, system-ui, sans-serif`;
                ctx.textAlign = 'left';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = gColor;
                ctx.globalAlpha = 0.85;
                ctx.fillText(t(`skills.groups.${key}`), lp.x, lp.y);
                ctx.restore();
            });

            // ── Draw connections (bezier curves) ──
            skillConnections.forEach((conn) => {
                const fi = nodeIndexMap[conn.from];
                const ti = nodeIndexMap[conn.to];
                if (fi === undefined || ti === undefined) return;

                const fromNode = nodes[fi];
                const toNode = nodes[ti];
                if (!fromNode || !toNode) return;
                if (fromNode.cScale < 0.05 || toNode.cScale < 0.05) return;

                const isHighlighted = hovered === fi || hovered === ti;
                const alpha = hovered >= 0
                    ? (isHighlighted ? 0.55 : 0.05)
                    : 0.15;
                const lw = isHighlighted ? cfg.lineW + 0.8 : cfg.lineW;

                const x1 = fromNode.cx, y1 = fromNode.cy;
                const x2 = toNode.cx, y2 = toNode.cy;
                const dx = x2 - x1, dy = y2 - y1;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 1) return;

                const curvature = Math.min(dist * 0.2, 50);
                const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
                const nx = -dy / dist, ny = dx / dist;
                const sign = ((fi + ti) % 2 === 0) ? 1 : -1;

                const gColor = groupMeta[skillNodesData[fi].group].color;

                ctx.save();
                ctx.globalAlpha = Math.min(alpha, fromNode.cOpacity, toNode.cOpacity);
                ctx.strokeStyle = gColor;
                ctx.lineWidth = lw;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.quadraticCurveTo(mx + nx * curvature * sign, my + ny * curvature * sign, x2, y2);
                ctx.stroke();
                ctx.restore();
            });

            // ── Draw pill nodes (sorted: dragged on top) ──
            const sortedIndices = nodes.map((_, i) => i).sort((a, b) => {
                const aD = drag.active && drag.nodeIndex === a;
                const bD = drag.active && drag.nodeIndex === b;
                if (aD) return 1;
                if (bD) return -1;
                return 0;
            });

            sortedIndices.forEach(i => {
                const node = nodes[i];
                if (node.cScale < 0.01) return;
                const skill = skillNodesData[i];
                const pw = pillWidths[i] || 80;
                const ph = cfg.pillH;
                const isHov = i === hovered;
                const isDrag = drag.active && drag.nodeIndex === i;

                ctx.save();
                ctx.globalAlpha = node.cOpacity;
                ctx.translate(node.cx, node.cy);
                ctx.scale(node.cScale, node.cScale);

                const x = -pw / 2;
                const y = -ph / 2;
                const radius = ph / 2;

                // Shadow
                if (isDrag) {
                    ctx.shadowColor = 'rgba(0,0,0,0.3)';
                    ctx.shadowBlur = 16;
                    ctx.shadowOffsetY = 4;
                } else if (isHov) {
                    ctx.shadowColor = skill.color + '55';
                    ctx.shadowBlur = 12;
                } else {
                    ctx.shadowColor = 'rgba(0,0,0,0.08)';
                    ctx.shadowBlur = 4;
                }

                // Pill background
                ctx.fillStyle = bgCard;
                drawRoundedRect(ctx, x, y, pw, ph, radius);
                ctx.fill();

                // Pill border
                ctx.shadowColor = 'transparent';
                ctx.strokeStyle = (isHov || isDrag) ? accentColor : borderTheme;
                ctx.lineWidth = (isHov || isDrag) ? 1.5 : 1;
                drawRoundedRect(ctx, x, y, pw, ph, radius);
                ctx.stroke();

                // Icon color dot
                const dotX = x + cfg.pillPadX + cfg.iconR;
                const dotY = 0;
                ctx.fillStyle = skill.color;
                ctx.beginPath();
                ctx.arc(dotX, dotY, cfg.iconR, 0, Math.PI * 2);
                ctx.fill();

                // Skill name text
                ctx.fillStyle = textColor;
                ctx.font = `500 ${cfg.fontSize}px Inter, system-ui, sans-serif`;
                ctx.textAlign = 'left';
                ctx.textBaseline = 'middle';
                ctx.fillText(skill.name, dotX + cfg.iconR + 6, 0.5);

                ctx.restore();
            });

            // ── Schedule next frame ──
            if (needsMore) {
                animRef.current = requestAnimationFrame(draw);
            } else {
                animRef.current = null;
            }
        };

        const scheduleFrame = () => {
            if (!animRef.current && running) {
                animRef.current = requestAnimationFrame(draw);
            }
        };
        scheduleRef.current = scheduleFrame;

        draw();
        return () => {
            running = false;
            scheduleRef.current = null;
            if (animRef.current) cancelAnimationFrame(animRef.current);
        };
    }, [canvasSize, cfg, isDark, t, nodeIndexMap, connLookup, computeLayout]);

    // ─── Mouse helpers ───
    const getMousePos = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        return { mx: e.clientX - rect.left, my: e.clientY - rect.top };
    };

    const hitTest = useCallback((mx, my) => {
        const nodes = nodesRef.current;
        const pillWidths = pillWidthsRef.current;
        // Test in reverse for z-order (dragged is rendered last)
        const drag = dragRef.current;
        // If dragging, check dragged node first
        if (drag.active && drag.nodeIndex >= 0) {
            const n = nodes[drag.nodeIndex];
            const pw = pillWidths[drag.nodeIndex] || 80;
            if (mx >= n.cx - pw / 2 && mx <= n.cx + pw / 2 &&
                my >= n.cy - cfg.pillH / 2 && my <= n.cy + cfg.pillH / 2) {
                return drag.nodeIndex;
            }
        }
        for (let i = nodes.length - 1; i >= 0; i--) {
            const n = nodes[i];
            if (n.cScale < 0.1) continue;
            const pw = pillWidths[i] || 80;
            if (mx >= n.cx - pw / 2 && mx <= n.cx + pw / 2 &&
                my >= n.cy - cfg.pillH / 2 && my <= n.cy + cfg.pillH / 2) {
                return i;
            }
        }
        return -1;
    }, [cfg.pillH]);

    // ─── Mouse move (hover + drag) ───
    const handleMouseMove = useCallback((e) => {
        const { mx, my } = getMousePos(e);
        const drag = dragRef.current;

        if (drag.active && drag.nodeIndex >= 0) {
            const node = nodesRef.current[drag.nodeIndex];
            node.cx = mx - drag.offsetX;
            node.cy = my - drag.offsetY;
            node.x = node.cx;
            node.y = node.cy;
            node.dragged = true;
            canvasRef.current.style.cursor = 'grabbing';
            scheduleRef.current?.();
            return;
        }

        const hit = hitTest(mx, my);
        if (hit !== hoveredRef.current) {
            hoveredRef.current = hit;
            canvasRef.current.style.cursor = hit >= 0 ? 'grab' : 'default';
            scheduleRef.current?.();
        }
    }, [hitTest]);

    // ─── Mouse down (start drag) ───
    const handleMouseDown = useCallback((e) => {
        const { mx, my } = getMousePos(e);
        const hit = hitTest(mx, my);
        if (hit < 0) return;
        const node = nodesRef.current[hit];
        dragRef.current = {
            active: true,
            nodeIndex: hit,
            offsetX: mx - node.cx,
            offsetY: my - node.cy,
        };
        canvasRef.current.style.cursor = 'grabbing';
        scheduleRef.current?.();
    }, [hitTest]);

    // ─── Mouse up (stop drag) ───
    const handleMouseUp = useCallback(() => {
        const drag = dragRef.current;
        if (drag.active && drag.nodeIndex >= 0) {
            scheduleRef.current?.();
        }
        dragRef.current = { active: false, nodeIndex: -1, offsetX: 0, offsetY: 0 };
        canvasRef.current.style.cursor = hoveredRef.current >= 0 ? 'grab' : 'default';
    }, []);

    // ─── Mouse leave ───
    const handleMouseLeave = useCallback(() => {
        hoveredRef.current = -1;
        dragRef.current = { active: false, nodeIndex: -1, offsetX: 0, offsetY: 0 };
        scheduleRef.current?.();
    }, []);

    return (
        <div className="relative w-full">
            <canvas
                ref={canvasRef}
                width={canvasSize.w}
                height={canvasSize.h}
                style={{ width: canvasSize.w, height: canvasSize.h, display: 'block' }}
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                role="img"
                aria-label={t('skills.hardSkillsTitle')}
            />
            <ul className="sr-only">
                {skillNodesData.map((s) => (
                    <li key={s.name}>{s.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SkillsCanvas;
