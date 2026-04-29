import React, { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import HomeCSS from "./HeroSection.module.css";
import { FaArrowRight, FaFileDownload, FaGlobe, FaLayerGroup, FaCloud, FaServer, FaCog } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import DownloadPopup from "@/components/DownloadPopup/DownloadPopup";
import CanvasService from "./CanvasService";

const HeroSection = (props) => {
    const classeCSS = props.className;
    const idSection = props.id;
    const sectionStyle = props.style;
    const { t } = useLanguage();
    const sectionRef = useRef(null);

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
        { icon: FaGlobe, key: 'website' },
        { icon: FaLayerGroup, key: 'webapp' },
        { icon: FaServer, key: 'api' },
        { icon: FaCloud, key: 'consulting' },
        { icon: FaCog, key: 'maintenance' },
    ], []);

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
                style={{ position: "relative", overflow: "hidden", ...sectionStyle }}
            >
                
                <div className="mx-auto max-w-screen-lg px-2 pt-32 2xl:pt-5 w-full relative z-10 flex items-center justify-center">

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

                <div className="mx-auto max-w-screen-lg px-2 pt-4 2xl:pt-5 w-full relative z-10 flex items-center justify-center">

                    {/* Services — Desktop fan layout (Canvas) */}
                    <motion.div
                        variants={fadeInUp}
                        className="hidden md:block relative w-full"
                    >
                        <CanvasService sectionRef={sectionRef} />
                    </motion.div>
                </div>
            </motion.section>
        </>
    );
}

export default HeroSection;