import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import HomeCSS from "./HeroSection.module.css";
import { FaArrowRight, FaFileDownload, FaGlobe, FaLayerGroup, FaCloud, FaServer, FaCog } from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

const HeroSection = (props) => {
    const classeCSS = props.className;
    const idSection = props.id;
    const { t } = useLanguage();
    const canvasRef = useRef(null);
    const [zOrder, setZOrder] = useState({});
    const [cardPositions, setCardPositions] = useState({});
    const zCounterRef = useRef(10);

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

    const bringToFront = (key) => {
        zCounterRef.current += 1;
        setZOrder(prev => ({ ...prev, [key]: zCounterRef.current }));
    };

    const resetCardPosition = (key, finalPos) => {
        setCardPositions(prev => ({ ...prev, [key]: finalPos }));
    };

    const services = [
        { icon: FaGlobe, key: 'website', color: '#3b82f6' },
        { icon: FaLayerGroup, key: 'webapp', color: '#8b5cf6' },
        { icon: FaServer, key: 'api', color: '#f59e0b' },
        { icon: FaCloud, key: 'consulting', color: '#06b6d4' },
        { icon: FaCog, key: 'maintenance', color: '#10b981' },
    ];

    // Fan layout like cards in hand
    const totalCards = services.length;
    const fanAngle = 30; // total arc degrees
    const fanRadius = 60; // vertical offset for arc
    const getCardFan = (index) => {
        const mid = (totalCards - 1) / 2;
        const offset = index - mid;
        const rotate = (offset / mid) * (fanAngle / 1);
        const translateY = Math.abs(offset) * (fanRadius / mid) * Math.abs(offset) * 0.5;
        return { rotate, translateY };
    };

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
                id={idSection}
                className={classeCSS}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
                style={{ position: "relative", overflow: "hidden" }}
            >
                {/* Decorative background elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[var(--color-accent)] opacity-[0.06] blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[var(--color-accent)] opacity-[0.04] blur-3xl"></div>
                    {/* Grid pattern */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: "radial-gradient(var(--color-accent) 1px, transparent 1px)",
                        backgroundSize: "30px 30px"
                    }}></div>
                </div>

                <div className="mx-auto max-w-screen-lg md:px-4 sm:px-3 pt-2 w-full relative z-10">
                    <div className="flex flex-col items-center justify-center h-full">

                        <motion.div
                            className="w-full flex flex-col gap-2 items-center text-center"
                            variants={containerVariants}
                        >
                            {/* Badge + Greeting */}
                            <motion.div variants={fadeInUp} className="flex flex-col items-center gap-1">
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-theme)] bg-white text-sm text-[var(--color-accent)] shadow-sm">
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                                    </span>
                                    {t('home.badge')}
                                </span>
                                <p className="text-[var(--text-secondary)] tracking-wide text-lg">
                                    {t('home.greeting')} Loroque Brillant 
                                    <span className="text-2xl ml-1">👋</span>
                                </p>
                            </motion.div>

                            {/* Name / Role */}
                            <motion.div variants={fadeInLeft} className={HomeCSS.homeSectionName}>
                                <h1 className="text-4xl md:text-6xl font-bold tracking-wide text-[var(--text-heading)] leading-snug relative inline-block">
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
                                    className="w-64 md:w-80 mx-auto mt-2"
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
                            <motion.div variants={fadeInUp} className="max-w-2xl px-4">
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    {experienceText}
                                </p>
                            </motion.div>

                            {/* CTA Buttons */}
                            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 pt-3">
                                <motion.a
                                    href="#cv"
                                    className="group inline-flex items-center justify-center gap-2 px-7 py-2 min-w-[200px] rounded-full border-2 border-[var(--btn-bg)] text-[var(--btn-bg)] font-semibold hover:bg-[var(--btn-bg)] hover:text-[var(--btn-text)] duration-300 shadow-lg hover:shadow-xl transition-shadow"
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <FaFileDownload className="text-sm" />
                                    {t('home.cvBtn')}
                                </motion.a>

                                <motion.a
                                    href="#contactsSection"
                                    className="group inline-flex items-center justify-center gap-2 px-7 py-2 min-w-[200px] rounded-full bg-[var(--btn-bg)] text-[var(--btn-text)] font-semibold shadow-lg hover:shadow-xl transition-shadow"
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    {t('home.contactBtn')}
                                    <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                                </motion.a>
                            </motion.div>

                            {/* Services Canvas */}
                            <motion.div
                                variants={fadeInUp}
                                ref={canvasRef}
                                className="relative w-full h-auto"
                                style={{ minHeight: 250, position: 'relative' }}
                            >
                                {services.map(({ icon: Icon, key, color }, index) => {
                                    const totalCards = services.length;
                                    const mid = (totalCards - 1) / 2;
                                    const offset = index - mid;

                                    // Fan angles: -22, -11, 0, +11, +22 deg
                                    const rotate = offset * 15;

                                    // Arc: cards at the edges drop lower
                                    const translateY = Math.pow(Math.abs(offset), 2) * 25;

                                    // Horizontal spacing
                                    const cardWidth = 172;
                                    const spacing = 160; // overlap effect
                                    const totalWidth = spacing * (totalCards - 1 );
                                    const startX = -totalWidth / 2;
                                    const xPos = startX + index * spacing;

                                    const arcPosition = { x: xPos - cardWidth / 2, y: translateY, rotate };

                                    return (
                                        <motion.div
                                            key={key}
                                                drag
                                                dragConstraints={canvasRef}
                                                dragElastic={0.15}
                                                dragMomentum={false}
                                                style={{
                                                position: 'absolute',
                                                left: '49%',
                                                top: '10%',
                                                transformOrigin: 'bottom center',
                                                zIndex: zOrder[key] ?? (totalCards - Math.abs(offset)),
                                            }}
                                            initial={{ x: arcPosition.x, y: 60, rotate: 0, opacity: 0, scale: 0.85 }}
                                                animate={cardPositions[key] || {
                                                x: arcPosition.x,
                                                y: arcPosition.y,
                                                rotate: arcPosition.rotate,
                                                scale: 1,
                                                opacity: 1,
                                            }}
                                            transition={cardPositions[key] ? {
                                                type: 'spring', stiffness: 300, damping: 25
                                                } : {
                                                delay: 0.3 + index * 0.12,
                                                duration: 0.7,
                                                ease: 'easeOut',
                                            }}
                                            whileHover={{
                                                y: arcPosition.y - 20,
                                                scale: 1.5,
                                                rotate: 0,
                                                zIndex: 40,
                                                transition: { type: 'spring', stiffness: 300, damping: 18 },
                                            }}
                                            onHoverEnd={() => resetCardPosition(key, { ...arcPosition, scale: 1, opacity: 1 })}
                                            onDragStart={() => bringToFront(key)}
                                            onPointerDown={() => bringToFront(key)}
                                            whileDrag={{ scale: 1.12, rotate: 0 }}
                                            className={`${HomeCSS.serviceCard} ${index % 2 === 0 ? HomeCSS.serviceCardBlue :    HomeCSS.serviceCardDark}
                                            group flex flex-col items-center justify-between gap-2 p-5 max-w-[14rem] min-h-[12rem] rounded-xl border-2 border-white shadow-xl cursor-grab active:cursor-grabbing select-none relative overflow-hidden`}
                                        >
                                            <h3 className="text-[.8rem] font-bold text-white text-center leading-snug pointer-events-none z-10">
                                                {t(`home.services.${key}.title`)}
                                            </h3>
                                            <div className="flex flex-col gap-1.5 w-full z-10 pointer-events-none">
                                                <p className="text-[9px] text-white/90 leading-relaxed text-center">
                                                    {t(`home.services.${key}.detail.desc`)}
                                                </p>
                                                <ul className="flex flex-col gap-1 mt-1 ">
                                                    {(t(`home.services.${key}.detail.specification`) || []).map((spec, i) => (
                                                        <li key={i} className="flex items-start gap-1.5 text-left text-[9.5px] text-white/90 leading-normal">
                                                            {spec}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="relative flex items-center justify-center pointer-events-none z-10 pt-2">
                                                <svg className="absolute -top-2 -right-3 w-4 h-4 text-white opacity-80" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 0L13.5 9L24 12L13.5 15L12 24L10.5 15L0 12L10.5 9Z" />
                                                </svg>
                                                <Icon className="text-3xl text-white opacity-90" />
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>

                        </motion.div>

                    </div>
                </div>
            </motion.section>
        </>
    );
}

export default HeroSection;