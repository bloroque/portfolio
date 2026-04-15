import React from "react";
import { motion } from "framer-motion";
import DetailProjetsCSS from "./DetailProjets.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useLanguage } from "../../context/LanguageContext";
import { FaArrowLeft, FaExternalLinkAlt, FaGithub, FaUserTie, FaClock, FaBriefcase, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

import Image1 from "../../assets/images/Image1.png";
import Image2 from "../../assets/images/image2.png";
import Image3 from "../../assets/images/image3.png";
import Image4 from "../../assets/images/image3.png";

const STATUS_STYLES = {
    completed: { bg: "bg-emerald-500/15", text: "text-emerald-600", dot: "bg-emerald-500" },
    "in-progress": { bg: "bg-amber-500/15", text: "text-amber-600", dot: "bg-amber-500" },
    standby: { bg: "bg-slate-400/15", text: "text-slate-500", dot: "bg-slate-400" },
};

const DetailProjets = () => {
    const { t, isTransitioning } = useLanguage();

    const projects = [
        { id: 1, image: Image1, key: "p1", tags: ["React", "Node.js", "MongoDB"], status: "completed", liveUrl: "#", githubUrl: "#" },
        { id: 2, image: Image2, key: "p2", tags: ["Laravel", "Vue.js", "MySQL"], status: "in-progress", liveUrl: "#", githubUrl: "#" },
        { id: 3, image: Image3, key: "p3", tags: ["React", "Tailwind", "Firebase"], status: "completed", liveUrl: "#", githubUrl: "#" },
        { id: 4, image: Image4, key: "p4", tags: ["PHP", "Symfony", "PostgreSQL"], status: "standby", liveUrl: "#", githubUrl: "#" },
    ];

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

                    <div className="mx-auto max-w-screen-lg px-4 pt-10 pb-8 relative z-10">
                        <motion.a
                            href="/"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                            className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--color-accent)] text-sm font-medium transition-colors mb-8"
                        >
                            <FaArrowLeft className="text-xs" />
                            {t('projects.backHome')}
                        </motion.a>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            <h1 className="text-[var(--text-heading)] font-bold text-4xl md:text-5xl tracking-wide mb-4">
                                {t('projects.detailTitle')}
                            </h1>
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="w-12 h-0.5 bg-[var(--color-accent)] rounded-full"></div>
                                <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></div>
                                <div className="w-12 h-0.5 bg-[var(--color-accent)] rounded-full"></div>
                            </div>
                            <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto leading-relaxed">
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
                        const p = `projects.items.${project.key}`;
                        const features = t(`${p}.features`);

                        return (
                            <motion.section
                                key={project.id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.15 }}
                                variants={stagger}
                                className={`py-12 md:py-20 ${index % 2 === 1 ? 'bg-[var(--bg-card)]/50' : ''}`}
                            >
                                <div className="mx-auto max-w-screen-lg px-4">

                                    {/* Project number + title header */}
                                    <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-8">
                                        <span className="text-5xl md:text-6xl font-black text-[var(--color-accent)] opacity-20 leading-none">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <div>
                                            <h2 className="text-[var(--text-heading)] font-bold text-2xl md:text-3xl">
                                                {t(`${p}.title`)}
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
                                    <div className={`grid lg:grid-cols-2 gap-8 md:gap-12 ${!isEven ? 'lg:direction-rtl' : ''}`}>

                                        {/* Image */}
                                        <motion.div
                                            variants={isEven ? fadeInLeft : fadeInRight}
                                            className={`${!isEven ? 'lg:order-2' : ''}`}
                                        >
                                            <div className="relative group rounded-2xl overflow-hidden shadow-lg border border-[var(--border-theme)]">
                                                <img
                                                    src={project.image}
                                                    alt={t(`${p}.title`)}
                                                    className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                                            </div>
                                        </motion.div>

                                        {/* Details */}
                                        <motion.div
                                            variants={isEven ? fadeInRight : fadeInLeft}
                                            className={`flex flex-col justify-center ${!isEven ? 'lg:order-1' : ''}`}
                                        >
                                            {/* Description */}
                                            <p className="text-[var(--text-primary)] leading-relaxed mb-6">
                                                {t(`${p}.desc`)}
                                            </p>

                                            {/* Info cards row */}
                                            <div className="grid grid-cols-3 gap-3 mb-6">
                                                <div className="bg-[var(--bg-card)] border border-[var(--border-theme)] rounded-xl p-3 text-center">
                                                    <FaUserTie className="text-[var(--color-accent)] mx-auto mb-1.5 text-lg" />
                                                    <span className="text-[var(--text-secondary)] text-[10px] uppercase tracking-wider font-semibold block">
                                                        {t('projects.sectionLabels.role')}
                                                    </span>
                                                    <span className="text-[var(--text-heading)] text-xs font-bold mt-0.5 block">
                                                        {t(`${p}.role`)}
                                                    </span>
                                                </div>
                                                <div className="bg-[var(--bg-card)] border border-[var(--border-theme)] rounded-xl p-3 text-center">
                                                    <FaClock className="text-[var(--color-accent)] mx-auto mb-1.5 text-lg" />
                                                    <span className="text-[var(--text-secondary)] text-[10px] uppercase tracking-wider font-semibold block">
                                                        {t('projects.sectionLabels.duration')}
                                                    </span>
                                                    <span className="text-[var(--text-heading)] text-xs font-bold mt-0.5 block">
                                                        {t(`${p}.duration`)}
                                                    </span>
                                                </div>
                                                <div className="bg-[var(--bg-card)] border border-[var(--border-theme)] rounded-xl p-3 text-center">
                                                    <FaBriefcase className="text-[var(--color-accent)] mx-auto mb-1.5 text-lg" />
                                                    <span className="text-[var(--text-secondary)] text-[10px] uppercase tracking-wider font-semibold block">
                                                        {t('projects.sectionLabels.client')}
                                                    </span>
                                                    <span className="text-[var(--text-heading)] text-xs font-bold mt-0.5 block">
                                                        {t(`${p}.client`)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Tech stack */}
                                            <div className="mb-6">
                                                <h4 className="text-[var(--text-heading)] text-xs font-semibold uppercase tracking-wider mb-2.5">
                                                    {t('projects.sectionLabels.techStack')}
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.tags.map((tag, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-3 py-1.5 text-sm font-medium rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/15"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Action links */}
                                            <div className="flex flex-wrap gap-3">
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-accent)] text-white font-semibold text-sm hover:shadow-lg hover:shadow-[var(--color-accent)]/25 transition-all duration-300"
                                                >
                                                    <FaExternalLinkAlt className="text-xs" />
                                                    {t('projects.liveDemo')}
                                                </a>
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-[var(--border-theme)] text-[var(--text-primary)] font-semibold text-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300"
                                                >
                                                    <FaGithub />
                                                    {t('projects.sourceCode')}
                                                </a>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Features + Challenge row below */}
                                    <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-6 mt-8">
                                        {/* Key features */}
                                        <div className="bg-[var(--bg-card)] border border-[var(--border-theme)] rounded-2xl p-5">
                                            <div className="flex items-center gap-2 mb-4">
                                                <FaCheckCircle className="text-[var(--color-accent)]" />
                                                <h4 className="text-[var(--text-heading)] font-bold text-sm uppercase tracking-wider">
                                                    {t('projects.sectionLabels.features')}
                                                </h4>
                                            </div>
                                            <ul className="space-y-2.5">
                                                {Array.isArray(features) && features.map((feat, i) => (
                                                    <li key={i} className="flex items-start gap-2.5 text-[var(--text-primary)] text-sm">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-1.5 shrink-0"></span>
                                                        {feat}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Main challenge */}
                                        <div className="bg-[var(--bg-card)] border border-[var(--border-theme)] rounded-2xl p-5">
                                            <div className="flex items-center gap-2 mb-4">
                                                <FaExclamationTriangle className="text-amber-500" />
                                                <h4 className="text-[var(--text-heading)] font-bold text-sm uppercase tracking-wider">
                                                    {t('projects.sectionLabels.challenge')}
                                                </h4>
                                            </div>
                                            <p className="text-[var(--text-primary)] text-sm leading-relaxed">
                                                {t(`${p}.challenge`)}
                                            </p>
                                        </div>
                                    </motion.div>

                                </div>

                                {/* Section divider */}
                                {index < projects.length - 1 && (
                                    <div className="mx-auto max-w-screen-sm mt-12 md:mt-20 flex items-center justify-center gap-3">
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