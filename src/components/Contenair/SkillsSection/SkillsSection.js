import React from "react";
import { motion } from "framer-motion";
import SkillsCSS from "./SkillsSection.module.css";
import { useLanguage } from "../../../context/LanguageContext";
import { FaPhp, FaReact, FaDocker, FaGitAlt, FaLinux, FaNodeJs, FaGithub, FaNpm } from "react-icons/fa";
import {
    SiLaravel, SiSymfony, SiCodeigniter, SiJavascript, SiTypescript,
    SiVuedotjs, SiMysql, SiPostgresql, SiMongodb, SiRedis, SiGraphql,
    SiTailwindcss, SiBootstrap, SiJira, SiTrello, SiJsonwebtokens,
    SiNextdotjs, SiVite, SiFramer, SiVisualstudiocode
} from "react-icons/si";
import { TbComponents } from "react-icons/tb";
import { MdDataObject } from "react-icons/md";
import DrawingPin from "../../../assets/images/Drawing-Pin.png";

const skillGroups = [
    {
        key: "backend",
        skills: [
            { name: "PHP", icon: FaPhp, color: "#777BB4" },
            { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
            { name: "Symfony", icon: SiSymfony, color: "#000000" },
            { name: "CodeIgniter", icon: SiCodeigniter, color: "#EF4223" },
            // { name: "Node.js", icon: FaNodeJs, color: "#339933" },
            { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
            { name: "REST API", icon: MdDataObject, color: "#009688" },
            { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
            { name: "JWT", icon: SiJsonwebtokens, color: "#000000" },
        ],
    },
    {
        key: "frontend",
        skills: [
            { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
            { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
            { name: "React", icon: FaReact, color: "#61DAFB" },
            { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" },
            { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
            { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
            { name: "shadcn/ui", icon: TbComponents, color: "#000000" },
            { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
        ],
    },
    {
        key: "database",
        skills: [
            { name: "MySQL", icon: SiMysql, color: "#4479A1" },
            { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
            { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
            { name: "Redis", icon: SiRedis, color: "#DC382D" },
        ],
    },
    {
        key: "tools",
        skills: [
            { name: "Git", icon: FaGitAlt, color: "#F05032" },
            { name: "GitHub", icon: FaGithub, color: "#181717" },
            { name: "npm", icon: FaNpm, color: "#CB3837" },
            { name: "Vite", icon: SiVite, color: "#646CFF" },
            { name: "Docker", icon: FaDocker, color: "#2496ED" },
            { name: "Linux", icon: FaLinux, color: "#FCC624" },
            { name: "VS Code", icon: SiVisualstudiocode, color: "#007ACC" },
            { name: "Jira", icon: SiJira, color: "#0052CC" },
            { name: "Trello", icon: SiTrello, color: "#0052CC" },
        ],
    },
];

const SkillsSection = (props) => {
    const classeCSS = props.className;
    const idSection = props.id;
    const { t } = useLanguage();

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } }
    };

    const titleVariants = {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const pillVariants = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4, type: "spring", bounce: 0.4 } }
    };

    const pillsContainerVariants = {
        hidden: {},
        visible: { transition: { delayChildren: 0.3, staggerChildren: 0.04 } }
    };

    return (
        <motion.section
            id={idSection}
            className={`${classeCSS} ${SkillsCSS.Skills} items-center justify-center`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={containerVariants}
        >

            <div className="mx-auto max-w-screen-lg md:px-4 sm:px-3 md:pb-8 pt-4 md:pt-5 w-full">

                <div className="flex flex-col gap-8 px-2">

                    {/* Title */}
                    <motion.div variants={titleVariants} className="relative inline-block">
                        <h2 className="title-section text-[var(--text-heading)] font-bold text-4xl tracking-wide relative inline-block">
                            {t('skills.title')}
                            {/* Sparkle decoration */}
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 28 28"
                                className="absolute -right-8 -top-4 md:-right-10 md:-top-5 w-5 md:w-7 pointer-events-none"
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6, duration: 0.5, ease: "backOut" }}
                            >
                                <motion.path
                                    d="M 14 0 L 16.5 10.5 L 28 14 L 16.5 17.5 L 14 28 L 11.5 17.5 L 0 14 L 11.5 10.5 Z"
                                    stroke="var(--svg-deco-sparkle)"
                                    strokeWidth="1.5"
                                    strokeLinejoin="round"
                                    fill="var(--svg-deco-sparkle)"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ delay: 1, duration: 2, ease: "easeInOut", repeat: Infinity }}
                                />
                            </motion.svg>
                        </h2>
                    </motion.div>

                    {/* Engineering + Soft Skills : Sticky Notes */}
                    <div className="mx-auto max-w-screen-md grid md:grid-cols-2 gap-8 py-4">
                        <motion.div
                            variants={cardVariants}
                            whileHover={{ rotate: 0, scale: 1.03 }}
                            className="relative p-5 rounded-lg bg-[#fef9c3] dark:bg-[#fef08a]"
                            style={{
                                rotate: "-2deg",
                                boxShadow: "2px 4px 12px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)",
                            }}
                        >
                            {/* Push pin */}
                            <img src={DrawingPin} alt="pin" className="absolute -top-1 left-1/2 w-10 h-10 drop-shadow-lg z-20 object-contain" style={{ transform: "translateX(-50%) rotate(-100deg)" }} />
                            
                            <div className="flex items-center gap-3 px-2">
                                <div className="w-7 h-7 rounded-full bg-[var(--color-accent)] flex items-center justify-center shadow-sm">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                                    </svg>
                                </div>
                                <h3 className="text-gray-800 font-bold text-base font-mono tracking-wide">
                                    {t('skills.engineering.title')}
                                </h3>
                            </div>
                            <p className="text-gray-700 text-sm leading-snug italic font-mono p-2 pb-0">
                                {t('skills.engineering.description')}
                            </p>
                        </motion.div>

                        <motion.div
                            variants={cardVariants}
                            whileHover={{ rotate: 0, scale: 1.03 }}
                            className="relative p-5 rounded-lg bg-[#dbeafe] dark:bg-[#93c5fd]"
                            style={{
                                rotate: "1.5deg",
                                boxShadow: "2px 4px 12px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)"
                            }}
                        >
                            {/* Push pin */}
                            <img src={DrawingPin} alt="pin" className="absolute -top-2 left-1/2 w-10 h-10 drop-shadow-lg z-20 object-contain" style={{ transform: "translateX(-50%) rotate(-8deg)" }} />
                            
                            <div className="flex items-center gap-3 px-2">
                                <div className="w-7 h-7 rounded-full bg-[var(--color-accent)] flex items-center justify-center shadow-sm">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </div>
                                <h3 className="text-gray-800 font-bold text-base font-mono tracking-wide">
                                    {t('skills.softSkills.title')}
                                </h3>
                            </div>
                            <p className="text-gray-700 text-sm leading-snug italic font-mono p-2 pb-0">
                                {t('skills.softSkills.description')}
                            </p>
                        </motion.div>
                    </div>

                    {/* Hard Skills — all groups in one view */}
                    <motion.div 
                        variants={cardVariants}
                        className="px-3 ">
                        
                        <h3 className="text-[var(--text-heading)] font-bold text-lg mb-3">
                            {t('skills.hardSkillsTitle')}
                        </h3>

                        <motion.div variants={pillsContainerVariants} className="flex flex-col gap-2">
                            {skillGroups.map((group) => (
                                <div key={group.key}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-1 h-5 rounded-full bg-[var(--color-accent)]"></div>
                                        <span className="text-[var(--text-heading)] text-sm font-bold tracking-wider">
                                            {t(`skills.groups.${group.key}`)}
                                        </span>
                                        {/* 
                                            <span className="text-[10px] text-[var(--text-secondary)] font-medium px-2 py-0.5 rounded-full border border-[var(--border-theme)]">
                                                {group.skills.length}
                                            </span> 
                                        */}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {group.skills.map((skill, i) => (
                                            <motion.div
                                                key={`${group.key}-${i}`}
                                                variants={pillVariants}
                                                whileHover={{ y: -3 }}
                                                className="flex items-center gap-1.5 px-2 py-2 rounded-md border border-[var(--border-theme)] bg-[var(--bg-card)] hover:border-[var(--color-accent)] hover:shadow-md transition-all duration-300 cursor-default"
                                            >
                                                <skill.icon className="text-lg flex-shrink-0" style={{ color: skill.color }} />
                                                <span className="text-[var(--text-primary)] text-sm font-medium whitespace-nowrap">
                                                    {skill.name}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </motion.section>
    );
}

export default SkillsSection;
