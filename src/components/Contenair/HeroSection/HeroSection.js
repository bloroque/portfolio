import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import HomeCSS from "./HeroSection.module.css";
import { FaArrowRight, FaFileDownload, FaGlobe, FaLayerGroup, FaCloud, FaServer, FaPaintBrush, FaTools } from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

const HeroSection = (props) => {
    const classeCSS = props.className;
    const idSection = props.id;
    const { t } = useLanguage();
    const canvasRef = useRef(null);
    const [zOrder, setZOrder] = useState({});
    const zCounterRef = useRef(10);

    const bringToFront = (key) => {
        zCounterRef.current += 1;
        setZOrder(prev => ({ ...prev, [key]: zCounterRef.current }));
    };

    const services = [
        { icon: FaGlobe, key: 'website', color: '#3b82f6' },
        { icon: FaLayerGroup, key: 'fullstack', color: '#8b5cf6' },
        { icon: FaCloud, key: 'saas', color: '#06b6d4' },
        { icon: FaServer, key: 'api', color: '#f59e0b' },
        { icon: FaPaintBrush, key: 'ui', color: '#ec4899' },
        { icon: FaTools, key: 'maintenance', color: '#10b981' },
    ];

    // Fan layout like cards in hand
    const totalCards = services.length;
    const fanAngle = 40; // total arc degrees
    const fanRadius = 30; // vertical offset for arc
    const getCardFan = (index) => {
        const mid = (totalCards - 1) / 2;
        const offset = index - mid;
        const rotate = (offset / mid) * (fanAngle / 2);
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

                <div className="mx-auto max-w-screen-lg md:px-4 sm:px-3 md:pb-8 pt-2 w-full relative z-10">
                    <div className="flex flex-col items-center justify-center h-full md:pb-8">

                        <motion.div
                            className="w-full flex flex-col gap-5 items-center text-center"
                            variants={containerVariants}
                        >
                            {/* Badge + Greeting */}
                            <motion.div variants={fadeInUp} className="flex flex-col items-center gap-3">
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
                            <motion.div variants={fadeInUp} className="max-w-xl">
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    {t('home.experience')}
                                </p>
                            </motion.div>

                            {/* CTA Buttons */}
                            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 pt-3">
                                <motion.a
                                    href="#contact"
                                    className="group inline-flex items-center justify-center gap-2 px-7 py-3 min-w-[200px] rounded-full bg-[var(--btn-bg)] text-[var(--btn-text)] font-semibold shadow-lg hover:shadow-xl transition-shadow"
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    {t('home.contactBtn')}
                                    <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                                </motion.a>

                                <motion.a
                                    href="#cv"
                                    className="group inline-flex items-center justify-center gap-2 px-7 py-3 min-w-[200px] rounded-full border-2 border-[var(--btn-bg)] text-[var(--btn-bg)] font-semibold hover:bg-[var(--btn-bg)] hover:text-[var(--btn-text)] transition-all duration-300"
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <FaFileDownload className="text-sm" />
                                    {t('home.cvBtn')}
                                </motion.a>
                            </motion.div>

                            {/* Services Canvas */}
                            <motion.div
                                variants={fadeInUp}
                                ref={canvasRef}
                                className="relative w-full max-w-2xl pt-6"
                                style={{ minHeight: 200 }}
                            >
                                <div className="flex items-end justify-center" style={{ minHeight: 180 }}>
                                    {services.map(({ icon: Icon, key, color }, index) => {
                                        const { rotate, translateY } = getCardFan(index);
                                        return (
                                            <motion.div
                                                key={key}
                                                drag
                                                dragConstraints={canvasRef}
                                                dragElastic={0.15}
                                                dragMomentum={false}
                                                initial={{ rotate: rotate + 15, y: 60, opacity: 0, scale: 0.5 }}
                                                animate={{
                                                    rotate,
                                                    y: [translateY - 6, translateY + 4, translateY],
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                transition={{
                                                    delay: 0.3 + index * 0.12,
                                                    duration: 0.7,
                                                    ease: [0.34, 1.56, 0.64, 1],
                                                    y: {
                                                        delay: 0.3 + index * 0.12,
                                                        duration: 0.9,
                                                        times: [0, 0.6, 1],
                                                        ease: "easeOut",
                                                    },
                                                }}
                                                whileHover={{
                                                    y: translateY - 20,
                                                    scale: 1.12,
                                                    rotate: 0,
                                                    zIndex: 40,
                                                    boxShadow: `0 14px 36px ${color}35`,
                                                    transition: { type: "spring", stiffness: 300, damping: 18 },
                                                }}
                                                onDragStart={() => bringToFront(key)}
                                                onPointerDown={() => bringToFront(key)}
                                                whileDrag={{
                                                    scale: 1.15,
                                                    rotate: 0,
                                                    boxShadow: `0 20px 48px ${color}45`,
                                                }}
                                                whileTap={{ scale: 0.95 }}
                                                style={{ transformOrigin: "bottom center", zIndex: zOrder[key] ?? index }}
                                                className={`${HomeCSS.serviceCard} group flex flex-col items-center gap-2.5 p-5 w-28 sm:w-32 -mx-2 sm:-mx-1 rounded-2xl border border-[var(--border-theme)] backdrop-blur-sm shadow-lg cursor-grab active:cursor-grabbing select-none transition-colors duration-300`}
                                            >
                                                <motion.div
                                                    className="flex items-center justify-center w-10 h-10 rounded-xl"
                                                    style={{ backgroundColor: `${color}18` }}
                                                    whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
                                                >
                                                    <Icon className="text-lg pointer-events-none" style={{ color }} />
                                                </motion.div>
                                                <span className="text-[11px] font-semibold text-[var(--text-heading)] text-center leading-tight pointer-events-none">
                                                    {t(`home.services.${key}`)}
                                                </span>
                                                <motion.div
                                                    className="h-0.5 rounded-full opacity-60"
                                                    style={{ backgroundColor: color }}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: 32 }}
                                                    transition={{ delay: 0.8 + index * 0.12, duration: 0.4, ease: "easeOut" }}
                                                />
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.div>

                        </motion.div>

                    </div>
                </div>
            </motion.section>
        </>
    );
}

export default HeroSection;