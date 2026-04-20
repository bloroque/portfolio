import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { FaGlobe, FaLayerGroup, FaServer, FaCloud, FaCog } from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";
import styles from "./ServiceSection.module.css";

// ─── Responsive breakpoint thresholds ─────────────────────────────
const getBreakpoint = () => {
    const w = window.innerWidth;
    if (w >= 1536) return "2xl";
    if (w >= 1280) return "xl";
    if (w >= 1024) return "lg";
    return "md";
};

// ─── Fan layout config per breakpoint ─────────────────────────────
const fanConfig = {
    md:   { spacing: 130, cardW: 170, cardH: 180, fontSize: 9,  specFont: 10, iconSize: 22, padX: 16, padY: 28, gapIconTitle: 12, gapTitleSpec: 24, canvasPadX: 10 },
    lg:   { spacing: 135, cardW: 190, cardH: 180, fontSize: 10, specFont: 10, iconSize: 24, padX: 18, padY: 28, gapIconTitle: 12, gapTitleSpec: 24, canvasPadX: 15 },
    xl:   { spacing: 155, cardW: 190, cardH: 180, fontSize: 10, specFont: 10, iconSize: 26, padX: 18, padY: 27, gapIconTitle: 12, gapTitleSpec: 24, canvasPadX: 20 },
    "2xl":{ spacing: 175, cardW: 220, cardH: 180, fontSize: 11, specFont: 11, iconSize: 30, padX: 18, padY: 28, gapIconTitle: 12, gapTitleSpec: 24, canvasPadX: 25 },
};

// ─── Service definitions ──────────────────────────────────────────
const services = [
    { icon: FaGlobe,      key: "website",     gradClass: "serviceCardBlue" },
    { icon: FaLayerGroup,  key: "webapp",      gradClass: "serviceCardGold" },
    { icon: FaServer,      key: "api",         gradClass: "serviceCardBlue" },
    { icon: FaCloud,       key: "consulting",  gradClass: "serviceCardGold" },
    { icon: FaCog,         key: "maintenance", gradClass: "serviceCardBlue" },
];

// ─── Compute fan positions (mirrors the canvas logic) ─────────────
const computeFanPositions = (cfg, containerWidth) => {
    const total = services.length;
    const mid = (total - 1) / 2;
    const centerX = containerWidth / 2;
    const topPad = 30;

    return services.map((_, i) => {
        const offset = i - mid;
        const rotateDeg = offset * 10;                        // degrees
        const arcY = Math.pow(Math.abs(offset), 2) * 20;
        let x = centerX + offset * cfg.spacing - cfg.cardW / 2;
        x = Math.max(cfg.canvasPadX, Math.min(x, containerWidth - cfg.cardW - cfg.canvasPadX));
        const y = topPad + arcY;
        const zIndex = total - Math.abs(Math.round(offset));
        return { x, y, rotateDeg, zIndex };
    });
};

// ─── Single draggable service card ────────────────────────────────
const ServiceCard = React.memo(({
    service,
    index,
    target,      // { x, y, rotateDeg, zIndex }
    cfg,
    foldProgress,
    containerW,
    containerH,
    dealDelay,
    t,
}) => {
    const { icon: Icon, key, gradClass } = service;
    const title = t(`home.services.${key}.title`) || key;
    const specs = t(`home.services.${key}.detail.specification`) || [];

    // ── Motion values for position & transform ──────────────
    const x = useMotionValue(containerW / 2 - cfg.cardW / 2);
    const y = useMotionValue(containerH / 2 - cfg.cardH / 2);
    const rotate = useMotionValue(0);
    const scale = useMotionValue(0.85);
    const opacity = useMotionValue(0);

    // Smooth springs for fold animation
    const springX = useSpring(x, { stiffness: 120, damping: 20 });
    const springY = useSpring(y, { stiffness: 120, damping: 20 });
    const springRotate = useSpring(rotate, { stiffness: 120, damping: 20 });
    const springScale = useSpring(scale, { stiffness: 120, damping: 20 });
    const springOpacity = useSpring(opacity, { stiffness: 120, damping: 20 });

    const [zIndex, setZIndex] = useState(target.zIndex);
    const [isHovered, setIsHovered] = useState(false);
    const isDragging = useRef(false);
    const hasDealt = useRef(false);

    // ── Deal animation (staggered) ──────────────────────────
    useEffect(() => {
        const timer = setTimeout(() => {
            animate(x, target.x, { duration: 0.6, ease: "easeOut" });
            animate(y, target.y, { duration: 0.6, ease: "easeOut" });
            animate(rotate, target.rotateDeg, { duration: 0.6, ease: "easeOut" });
            animate(scale, 1, { duration: 0.6, ease: "easeOut" });
            animate(opacity, 1, { duration: 0.4, ease: "easeOut" });
            hasDealt.current = true;
        }, dealDelay);
        // Wobble while waiting
        const wobbleTimer = setTimeout(() => {
            animate(opacity, 1, { duration: 0.3 });
        }, 100);
        return () => { clearTimeout(timer); clearTimeout(wobbleTimer); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── Update targets when layout / fold changes ───────────
    const prevTarget = useRef(target);
    useEffect(() => {
        if (!hasDealt.current) return;
        if (isDragging.current) return;

        const centerX = containerW / 2 - cfg.cardW / 2;
        const centerY = containerH / 2 - cfg.cardH / 2;
        const fp = foldProgress;

        const tx = target.x + (centerX - target.x) * fp;
        const ty = target.y + (centerY - target.y) * fp;
        const tr = target.rotateDeg * (1 - fp);
        const ts = 1 + (0.85 - 1) * fp;

        x.set(tx);
        y.set(ty);
        rotate.set(tr);
        scale.set(ts);

        prevTarget.current = target;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [target.x, target.y, target.rotateDeg, foldProgress, containerW, containerH]);

    // ── Hover ───────────────────────────────────────────────
    const handleHoverStart = () => {
        if (isDragging.current) return;
        setIsHovered(true);
        setZIndex(100);
        if (hasDealt.current && foldProgress === 0) {
            animate(scale, 1.1, { duration: 0.25 });
            animate(rotate, 0, { duration: 0.25 });
            animate(y, Math.max(target.y - 20, 0), { duration: 0.25 });
        }
    };
    const handleHoverEnd = () => {
        setIsHovered(false);
        setZIndex(target.zIndex);
        if (hasDealt.current && !isDragging.current && foldProgress === 0) {
            animate(scale, 1, { duration: 0.25 });
            animate(rotate, target.rotateDeg, { duration: 0.25 });
            animate(y, target.y, { duration: 0.25 });
        }
    };

    // ── Drag ────────────────────────────────────────────────
    const handleDragStart = () => {
        isDragging.current = true;
        setZIndex(200);
        animate(scale, 1.08, { duration: 0.15 });
        animate(rotate, 0, { duration: 0.15 });
    };
    const handleDragEnd = () => {
        isDragging.current = false;
        setZIndex(target.zIndex);
        // Snap back
        animate(x, target.x, { type: "spring", stiffness: 200, damping: 20 });
        animate(y, target.y, { type: "spring", stiffness: 200, damping: 20 });
        animate(rotate, target.rotateDeg, { type: "spring", stiffness: 200, damping: 20 });
        animate(scale, 1, { type: "spring", stiffness: 200, damping: 20 });
    };

    return (
        <motion.div
            className={`${styles.serviceCard} ${styles[gradClass]}`}
            style={{
                width: cfg.cardW,
                height: cfg.cardH,
                x: springX,
                y: springY,
                rotate: springRotate,
                scale: springScale,
                opacity: springOpacity,
                zIndex,
            }}
            drag
            dragMomentum={false}
            dragElastic={0.1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            whileTap={{ cursor: "grabbing" }}
        >
            <div
                className={styles.cardContent}
                style={{ padding: `${cfg.padY}px ${cfg.padX}px` }}
            >
                {/* Icon + Title */}
                <div className={styles.cardHeader} style={{ gap: cfg.gapIconTitle }}>
                    <Icon
                        className={styles.cardIcon}
                        style={{ fontSize: cfg.iconSize }}
                    />
                    <span
                        className={styles.cardTitle}
                        style={{ fontSize: cfg.fontSize }}
                    >
                        {title}
                    </span>
                </div>

                {/* Specifications */}
                <ul
                    className={styles.specList}
                    style={{ marginTop: cfg.gapTitleSpec, gap: 4 }}
                >
                    {specs.map((spec, si) => (
                        <li
                            key={si}
                            className={styles.specItem}
                            style={{ fontSize: cfg.specFont }}
                        >
                            {spec}
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
});

// ─── Main ServiceSection component ────────────────────────────────
const ServiceSection = ({ className, id }) => {
    const { t } = useLanguage();
    const containerRef = useRef(null);
    const sectionRef = useRef(null);

    const [breakpoint, setBreakpoint] = useState(getBreakpoint);
    const [containerW, setContainerW] = useState(900);
    const cfg = fanConfig[breakpoint] || fanConfig.md;

    // Responsive breakpoint
    useEffect(() => {
        const onResize = () => setBreakpoint(getBreakpoint());
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // Observe container width
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setContainerW(entry.contentRect.width);
            }
        });
        observer.observe(el);
        setContainerW(el.clientWidth);
        return () => observer.disconnect();
    }, []);

    // Compute fan positions
    const positions = useMemo(
        () => computeFanPositions(cfg, containerW),
        [cfg, containerW]
    );

    // Container height — tallest card + padding
    const containerH = useMemo(() => {
        let maxBottom = 0;
        positions.forEach((p) => {
            const bottom = p.y + cfg.cardH + 40;
            if (bottom > maxBottom) maxBottom = bottom;
        });
        return Math.ceil(maxBottom);
    }, [positions, cfg.cardH]);

    // ── Scroll fold progress (0 = open fan, 1 = folded at center) ──
    const [foldProgress, setFoldProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const section = sectionRef.current;
            if (!section) return;
            const rect = section.getBoundingClientRect();
            const sectionH = rect.height;
            const FOLD_VISIBLE_THRESHOLD = 0.95;

            if (rect.top >= 0) { setFoldProgress(0); return; }
            if (rect.bottom <= 0) { setFoldProgress(1); return; }

            const visibleFraction = Math.max(0, rect.bottom) / sectionH;
            if (visibleFraction >= FOLD_VISIBLE_THRESHOLD) { setFoldProgress(0); return; }

            const fp = Math.min(1, Math.max(0,
                (FOLD_VISIBLE_THRESHOLD - visibleFraction) / FOLD_VISIBLE_THRESHOLD
            ));
            setFoldProgress(fp);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Deal delays (same stagger as canvas version)
    const dealDelays = useMemo(
        () => services.map((_, i) => 600 + i * 150),
        []
    );

    return (
        <div ref={sectionRef} className={`${className || ""} ${styles.serviceSection}`} id={id}>
            {/* ── Desktop: DOM fan layout ── */}
            <motion.div
                className={`hidden md:block ${styles.serviceSection}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div
                    ref={containerRef}
                    className={styles.fanContainer}
                    style={{ height: containerH }}
                >
                    {services.map((service, i) => (
                        <ServiceCard
                            key={service.key}
                            service={service}
                            index={i}
                            target={positions[i]}
                            cfg={cfg}
                            foldProgress={foldProgress}
                            containerW={containerW}
                            containerH={containerH}
                            dealDelay={dealDelays[i]}
                            t={t}
                        />
                    ))}
                </div>

                {/* Screen reader fallback */}
                <ul className="sr-only">
                    {services.map(({ key }) => (
                        <li key={key}>{t(`home.services.${key}.title`)}</li>
                    ))}
                </ul>
            </motion.div>

            {/* ── Mobile: grid layout ── */}
            <motion.div
                className="md:hidden w-full px-1 pt-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
            >
                <div className={styles.mobileGrid}>
                    {services.map(({ icon: Icon, key, gradClass }, index) => (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className={`${styles.mobileCard} ${styles[gradClass]}`}
                        >
                            <h3 className={styles.mobileCardTitle}>
                                {t(`home.services.${key}.title`)}
                            </h3>
                            <Icon className={styles.mobileCardIcon} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default ServiceSection;
