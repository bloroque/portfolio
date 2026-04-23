import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DetailProjetsCSS from "./DetailProjets.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useLanguage } from "../../context/LanguageContext";
import { FaArrowLeft, FaExternalLinkAlt, FaGithub, FaUserTie, FaClock, FaBriefcase, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import CustomCursor from "../CustomCursor/CustomCursor";

import Image1 from "../../assets/images/Image1.png";
import Image2 from "../../assets/images/image2.png";
import Image3 from "../../assets/images/image3.png";
import Image4 from "../../assets/images/image3.png";

const STATUS_STYLES = {
    completed: { bg: "bg-emerald-500/15", text: "text-emerald-600", dot: "bg-emerald-500" },
    "in-progress": { bg: "bg-amber-500/15", text: "text-amber-600", dot: "bg-amber-500" },
    standby: { bg: "bg-slate-400/15", text: "text-slate-500", dot: "bg-slate-400" },
};

/* Image map: resolves string keys from i18n to imported assets */
const IMAGE_MAP = { Image1, Image2, Image3, Image4 };

const DetailProjets = () => {
    const { t, isTransitioning } = useLanguage();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    /* Build project list dynamically from i18n items */
    const items = t('projects.items') || {};
    const projects = Object.keys(items).map((key) => ({
        key,
        ...items[key],
        image: IMAGE_MAP[items[key].image] || Image1,
    }));

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const fadeInLeft = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
    };

    const fadeInRight = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
    };

    const stagger = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } }
    };

    return (
        <div className="bg-[var(--bg-body)] min-h-screen transition-colors duration-300">
            <CustomCursor />
            <div
                className="transition-opacity duration-300 ease-in-out"
                style={{ opacity: isTransitioning ? 0 : 1 }}
            >
            <div className={DetailProjetsCSS.detailProjetsContainer}>
                <Header />

                {/* Hero banner */}
                <section className="relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[var(--color-accent)] opacity-[0.06] blur-3xl"></div>
                        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-[var(--color-accent)] opacity-[0.04] blur-3xl"></div>
                        <div className="absolute inset-0 opacity-[0.02]" style={{
                            backgroundImage: "radial-gradient(var(--color-accent) 1px, transparent 1px)",
                            backgroundSize: "30px 30px"
                        }}></div>
                    </div>

                        <div className="mx-auto max-w-screen-lg px-3 sm:px-4 pt-8 sm:pt-10 pb-6 sm:pb-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--color-accent)] text-sm font-medium transition-colors mb-8"
                            >
                                <FaArrowLeft className="text-xs" />
                                {t('projects.backHome')}
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                                <h1 className="text-[var(--text-heading)] font-bold text-fluid-3xl tracking-wide mb-4">
                                {t('projects.detailTitle')}
                            </h1>
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="w-12 h-0.5 bg-[var(--color-accent)] rounded-full"></div>
                                <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></div>
                                <div className="w-12 h-0.5 bg-[var(--color-accent)] rounded-full"></div>
                            </div>
                                <p className="text-[var(--text-secondary)] text-fluid-base max-w-xl mx-auto leading-relaxed">
                                {t('projects.detailSubtitle')}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Project sections */}
                <div className="flex-1">
                    {projects.map((project, index) => {
                        const isEven = index % 2 === 0;
                        const statusStyle = STATUS_STYLES[project.status] || STATUS_STYLES.standby;
                        const features = project.features;

                        return (
                            <motion.section
                                key={project.key}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.15 }}
                                variants={stagger}
                                className={`py-8 sm:py-12 md:py-16 lg:py-20 ${index % 2 === 1 ? 'bg-[var(--bg-card)]/50' : ''}`}
                            >
                                <div className="mx-auto max-w-screen-lg px-3 sm:px-4">

                                    {/* Project number + title header */}
                                    <motion.div variants={fadeInUp} className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 lg:mb-8">
                                        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[var(--color-accent)] opacity-20 leading-none">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <div>
                                            <h2 className="text-[var(--text-heading)] font-bold text-fluid-3xl">
                                                {project.title}
                                            </h2>
                                            <div className="flex items-center gap-3 mt-2">
                                                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`}></span>
                                                    {t(`projects.statusLabels.${project.status === "in-progress" ? "inProgress" : project.status}`)}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Main content: image + details */}
                                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 lg:gap-5 xl:gap-8 ${!isEven ? 'md:direction-rtl' : ''}`}>

                                        {/* Image */}
                                        <motion.div
                                            variants={isEven ? fadeInLeft : fadeInRight}
                                            className={`${!isEven ? 'md:order-2' : ''}`}
                                        >
                                            <div className="relative group rounded-2xl overflow-hidden shadow-lg border border-[var(--border-theme)]">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    loading="lazy"
                                                    className="w-full h-48 sm:h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                                            </div>
                                        </motion.div>

                                        {/* Details */}
                                        <motion.div
                                            variants={isEven ? fadeInRight : fadeInLeft}
                                            className={`flex flex-col justify-center ${!isEven ? 'md:order-1' : ''}`}
                                        >
                                            {/* Description */}
                                            <p className="text-[var(--text-primary)] text-fluid-base leading-relaxed mb-4 sm:mb-6">
                                                {project.desc}
                                            </p>

                                            {/* Info cards row */}
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                                                <div className="card-hover-lift bg-[var(--bg-card)] border border-[var(--border-theme)] rounded-xl p-2 sm:p-3 text-center">
                                                    <FaUserTie className="text-[var(--color-accent)] mx-auto mb-1 sm:mb-1.5 text-base sm:text-lg" />
                                                    <span className="text-[var(--text-secondary)] text-[10px] uppercase tracking-wider font-semibold block">
                                                        {t('projects.sectionLabels.role')}
                                                    </span>
                                                    <span className="text-[var(--text-heading)] text-xs font-bold mt-0.5 block">
                                                        {project.role}
                                                    </span>
                                                </div>
                                                <div className="card-hover-lift bg-[var(--bg-card)] border border-[var(--border-theme)] rounded-xl p-2 sm:p-3 text-center">
                                                    <FaClock className="text-[var(--color-accent)] mx-auto mb-1 sm:mb-1.5 text-base sm:text-lg" />
                                                    <span className="text-[var(--text-secondary)] text-[10px] uppercase tracking-wider font-semibold block">
                                                        {t('projects.sectionLabels.duration')}
                                                    </span>
                                                    <span className="text-[var(--text-heading)] text-xs font-bold mt-0.5 block">
                                                        {project.duration}
                                                    </span>
                                                </div>
                                                <div className="card-hover-lift bg-[var(--bg-card)] border border-[var(--border-theme)] rounded-xl p-2 sm:p-3 text-center">
                                                    <FaBriefcase className="text-[var(--color-accent)] mx-auto mb-1 sm:mb-1.5 text-base sm:text-lg" />
                                                    <span className="text-[var(--text-secondary)] text-[10px] uppercase tracking-wider font-semibold block">
                                                        {t('projects.sectionLabels.client')}
                                                    </span>
                                                    <span className="text-[var(--text-heading)] text-xs font-bold mt-0.5 block">
                                                        {project.client}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Tech stack */}
                                            <div className="mb-4 sm:mb-6">
                                                <h4 className="text-[var(--text-heading)] text-xs font-semibold uppercase tracking-wider mb-2.5">
                                                    {t('projects.sectionLabels.techStack')}
                                                </h4>
                                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                    {project.tags.map((tag, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-2 sm:px-3 py-1 sm:py-1.5 text-fluid-sm font-medium rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/15"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Action links */}
                                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn-glow inline-flex items-center gap-fluid px-fluid-btn py-fluid-btn rounded-xl bg-[var(--color-accent)] text-white font-semibold text-fluid-sm hover:shadow-lg hover:shadow-[var(--color-accent)]/25 transition-all duration-300"
                                                >
                                                    <FaExternalLinkAlt className="text-xs" />
                                                    {t('projects.liveDemo')}
                                                </a>
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-fluid px-fluid-btn py-fluid-btn rounded-xl border-2 border-[var(--border-theme)] text-[var(--text-primary)] font-semibold text-fluid-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300"
                                                >
                                                    <FaGithub />
                                                    {t('projects.sourceCode')}
                                                </a>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Features + Challenge row below */}
                                    <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-5 xl:gap-8 mt-6 sm:mt-8">
                                        {/* Key features */}
                                        <div className="bg-[var(--bg-card)] border border-[var(--border-theme)] rounded-2xl p-3 sm:p-5">
                                            <div className="flex items-center gap-2 mb-4">
                                                <FaCheckCircle className="text-[var(--color-accent)]" />
                                                <h4 className="text-[var(--text-heading)] font-bold text-sm uppercase tracking-wider">
                                                    {t('projects.sectionLabels.features')}
                                                </h4>
                                            </div>
                                            <ul className="space-y-2 sm:space-y-2.5">
                                                {Array.isArray(features) && features.map((feat, i) => (
                                                    <li key={i} className="flex items-start gap-2 sm:gap-2.5 text-[var(--text-primary)] text-fluid-sm">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-1.5 shrink-0"></span>
                                                        {feat}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Main challenge */}
                                        <div className="bg-[var(--bg-card)] border border-[var(--border-theme)] rounded-2xl p-3 sm:p-5">
                                            <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                                <FaExclamationTriangle className="text-amber-500" />
                                                <h4 className="text-[var(--text-heading)] font-bold text-sm uppercase tracking-wider">
                                                    {t('projects.sectionLabels.challenge')}
                                                </h4>
                                            </div>
                                            <p className="text-[var(--text-primary)] text-fluid-sm leading-relaxed">
                                                {project.challenge}
                                            </p>
                                        </div>
                                    </motion.div>

                                </div>

                                {/* Section divider */}
                                {index < projects.length - 1 && (
                                    <div className="mx-auto max-w-screen-sm mt-8 sm:mt-12 md:mt-16 lg:mt-20 flex items-center justify-center gap-3">
                                        <div className="flex-1 h-px bg-[var(--border-theme)]"></div>
                                        <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] opacity-40"></div>
                                        <div className="flex-1 h-px bg-[var(--border-theme)]"></div>
                                    </div>
                                )}
                            </motion.section>
                        );
                    })}
                </div>

                <Footer />
            </div>
            </div>
        </div>
    );
};

export default DetailProjets;