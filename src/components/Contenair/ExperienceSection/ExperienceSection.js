import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../../context/LanguageContext";
import ExperienceCSS from "./ExperienceSection.module.css";
import {
    FaBriefcase,
    FaMapMarkerAlt,
    FaExternalLinkAlt,
} from "react-icons/fa";

const ExperienceSection = (props) => {
    const classeCSS = props.className;
    const idSection = props.id;
    const { t, lang } = useLanguage();

    const experiences = t("experience.jobs");

    // --- Date formatting helpers ---
    const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthNamesFr = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    const parseDate = (str) => {
        if (!str) return null;
        const [month, year] = str.split("-").map(Number);
        return { month, year };
    };

    const formatDate = (str) => {
        const d = parseDate(str);
        if (!d) return lang === "fr" ? "Présent" : "Present";
        const names = lang === "fr" ? monthNamesFr : monthNamesEn;
        return `${names[d.month - 1]} ${d.year}`;
    };

    const calcDuration = (startStr, finishStr) => {
        const start = parseDate(startStr);
        if (!start) return "";
        const end = finishStr ? parseDate(finishStr) : { month: new Date().getMonth() + 1, year: new Date().getFullYear() };
        let totalMonths = (end.year - start.year) * 12 + (end.month - start.month);
        if (totalMonths < 0) totalMonths = 0;
        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;
        if (lang === "fr") {
            if (years === 0) return `${months} mois`;
            if (months === 0) return `${years} an${years > 1 ? "s" : ""}`;
            return `${years} an${years > 1 ? "s" : ""} ${months} mois`;
        }
        if (years === 0) return `${months} mo${months > 1 ? "s" : ""}`;
        if (months === 0) return `${years} yr${years > 1 ? "s" : ""}`;
        return `${years} yr${years > 1 ? "s" : ""} ${months} mo${months > 1 ? "s" : ""}`;
    };

    // --- Framer Motion variants ---
    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
    };

    const titleVariants = {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <motion.section
            id={idSection}
            className={`${classeCSS} ${ExperienceCSS.Experience}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            variants={containerVariants}
        >
            <div className="mx-auto max-w-screen-lg w-full flex flex-col justify-center p-3 md:px-4">
                {/* Section Title */}
                <motion.div variants={titleVariants} className="px-3 md:pe-7 space-y-2 mb-10 relative">
                    <h2 className="text-[var(--text-heading)] font-bold text-4xl tracking-wide relative inline-block">
                        {t("experience.title")}
                        {/* Curved arrow decoration */}
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 50 30"
                            className="absolute -right-14 top-0 w-12 md:w-14 pointer-events-none"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8, duration: 0.4 }}
                        >
                            <motion.path
                                d="M 3 22 C 8 8, 22 2, 38 5 M 33 1 L 39 5 L 33 10"
                                stroke="var(--svg-deco-arrow)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="transparent"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.8, duration: 1, ease: "easeInOut" }}
                            />
                        </motion.svg>
                    </h2>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-xl">
                        {t("experience.subtitle")}
                    </p>
                </motion.div>

                {/* Timeline - centered with alternating sides */}
                <div className="relative px-3">
                    {/* Vertical center line */}
                    <div className={ExperienceCSS.timelineCenterLine} />

                    <div className="flex flex-col gap-0">
                        {experiences.map((job, index) => {
                            const isCurrent = job.current;
                            const isLooking = job.isLooking;
                            // For alternating: skip the "looking" entry in the count
                            const realIndex = isLooking ? 0 : index;
                            const isLeft = realIndex % 2 === 0;

                            // Dynamic current month/year for "looking" entry
                            const now = new Date();
                            const currentMonthYear = lang === "fr"
                                ? `${monthNamesFr[now.getMonth()]} ${now.getFullYear()}`
                                : `${monthNamesEn[now.getMonth()]} ${now.getFullYear()}`;

                            // Special "looking for opportunities" card
                            if (isLooking) {
                                return (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        className={`relative pb-12 ${ExperienceCSS.timelineItem}`}
                                    >
                                        <div className={`${ExperienceCSS.timelineDotCenter} ${ExperienceCSS.dotCurrent}`}>
                                            <span className={ExperienceCSS.dotPing} />
                                        </div>

                                        <div className={ExperienceCSS.cardLeft}>
                                            <div className={`${ExperienceCSS.card} ${ExperienceCSS.cardLooking}`}>
                                                <p className="text-[var(--text-secondary)] text-xs mb-1">
                                                    {currentMonthYear}
                                                </p>
                                                <h3 className="text-[var(--color-accent)] font-bold text-base leading-tight mb-1">
                                                    {job.role}
                                                </h3>
                                                <div className="flex justify-center gap-x-3 text-xs text-[var(--text-secondary)]">
                                                    {job.type && <span>{job.type}</span>}
                                                    {job.location && (
                                                        <span className="flex items-center text-center gap-1">
                                                            <FaMapMarkerAlt className="text-[10px] shrink-0" />
                                                            {job.location}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            }

                            return (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className={`relative pb-12 last:pb-0 ${ExperienceCSS.timelineItem}`}
                                >
                                    {/* Timeline dot at center */}
                                    <div className={`${ExperienceCSS.timelineDotCenter} ${isCurrent ? ExperienceCSS.dotCurrent : ExperienceCSS.dotPast}`}>
                                        {isCurrent && <span className={ExperienceCSS.dotPing} />}
                                        <FaBriefcase className="text-white text-[16px]" />
                                    </div>

                                    {/* Card - positioned left or right */}
                                    <div className={`${isLeft ? ExperienceCSS.cardLeft : ExperienceCSS.cardRight}`}>
                                        <div className={`${ExperienceCSS.card} ${isCurrent ? ExperienceCSS.cardCurrent : ""}`}>
                                            {/* Period (top, normal text) */}
                                            <p className="text-[var(--text-secondary)] text-xs mb-3 flex items-center gap-1.5 flex-wrap">
                                                <span>{formatDate(job.dateStart)} – {formatDate(job.dateFinish)}</span>
                                                <span className="text-[var(--text-secondary)]/40">·</span>
                                                <span>{calcDuration(job.dateStart, job.dateFinish)}</span>
                                            </p>

                                            {/* Job title */}
                                            <h3 className="text-[var(--text-heading)] font-bold text-base md:text-lg leading-tight mb-2">
                                                {job.role}
                                            </h3>

                                            {/* Company + work mode */}
                                            <div className="mb-3 space-y-1">
                                                <p className="text-[var(--text-primary)] text-sm font-semibold">
                                                    {job.company}
                                                    {job.type && (
                                                        <span className="text-[var(--text-secondary)] font-normal"> · {job.type}</span>
                                                    )}
                                                </p>
                                                {job.location && (
                                                    <p className="text-[var(--text-secondary)] text-xs flex items-center gap-1">
                                                        <FaMapMarkerAlt className="text-[10px] shrink-0" />
                                                        <span>{job.location}</span>
                                                        {job.remote && (
                                                            <span className="text-[var(--text-secondary)]/60"> · {job.remote}</span>
                                                        )}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Description */}
                                            {job.description && (
                                                <p className="text-[var(--text-primary)] text-xs leading-relaxed mb-2">
                                                    {job.description}
                                                </p>
                                            )}

                                            {/* Achievements */}
                                            {job.achievements && job.achievements.length > 0 && (
                                                <ul className="space-y-2 mb-4">
                                                    {job.achievements.map((item, i) => (
                                                        <li key={i} className="flex items-start gap-2.5 text-xs text-[var(--text-primary)]">
                                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shrink-0" />
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            {/* Skills/Tech */}
                                            {job.skills && job.skills.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5">
                                                    {job.skills.map((skill, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-2.5 py-1 text-xs font-medium rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default ExperienceSection;
