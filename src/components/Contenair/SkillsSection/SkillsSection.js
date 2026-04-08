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

const skillGroups = [
    {
        key: "backend",
        skills: [
            { name: "PHP", icon: FaPhp, color: "#777BB4" },
            { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
            { name: "Symfony", icon: SiSymfony, color: "#000000" },
            { name: "CodeIgniter", icon: SiCodeigniter, color: "#EF4223" },
            { name: "Node.js", icon: FaNodeJs, color: "#339933" },
            { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
            { name: "REST APIs", icon: MdDataObject, color: "#009688" },
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
        hidden: { opacity: 0, y: -40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const textContainerVariants = {
        hidden: {},
        visible: { transition: { delayChildren: 0.3, staggerChildren: 0.12 } }
    };

    const textChildVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    const pillsContainerVariants = {
        hidden: {},
        visible: { transition: { delayChildren: 0.5, staggerChildren: 0.07 } }
    };

    const pillVariants = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4, type: "spring", bounce: 0.4 } }
    };

    return (
        <motion.section
            id={idSection}
            className={`${classeCSS} ${SkillsCSS.Skills} items-center justify-center`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={containerVariants}
        >
            <motion.div className="mx-auto max-w-screen-lg md:px-3 sm:px-3 md:pb-5 pt-4 md:pt-5 w-full h-full justify-center py-10">

                <motion.div className="flex flex-col space-y-5 h-full md:pb-8">
                    
                    <motion.div variants={titleVariants} className={`${SkillsCSS.skillsSectionTitle} flex flex-col py-4`}>
                        <h2 className="title-section text-[var(--text-heading)] font-bold text-4xl flex flex-col tracking-wide">
                            <span>{t('skills.title')}</span>
                        </h2>
                    </motion.div>

                    <motion.div className="grow grid gap-6">

                        <motion.div variants={textChildVariants} className="">
                            <h3 className="text-[var(--text-heading)] font-bold text-lg mb-3">
                                {t('skills.engineering.title')}
                            </h3>
                            <p className="text-[var(--text-primary)] text-sm leading-relaxed text-justify">
                                {t('skills.engineering.description')}
                            </p>
                        </motion.div>

                        <motion.div className="flex flex-col justify-center">
                             <h3 className="text-[var(--text-heading)] font-bold text-lg mb-3">
                                {t('skills.hardSkillsTitle')}
                            </h3>
                            <motion.div variants={pillsContainerVariants} className="w-full flex flex-col gap-3 content-start">
                                {skillGroups.map((group, groupIndex) => (
                                    <React.Fragment key={group.key}>
                                        {groupIndex > 0 && (
                                            <motion.div
                                                variants={pillVariants}
                                                className="w-full border-t border-[var(--skill-border)] opacity-30"
                                            ></motion.div>
                                        )}
                                        <div className="flex flex-wrap gap-2">
                                            {group.skills.map((skill, i) => (
                                                <motion.div
                                                    key={`${group.key}-${i}`}
                                                    variants={pillVariants}
                                                    className="flex items-center gap-2 px-2 py-1.5 rounded border border-[var(--skill-border)] bg-[var(--bg-card)] cursor-default hover:scale-105 transition-transform"
                                                >
                                                    <skill.icon className="text-lg flex-shrink-0" style={{ color: skill.color }} />
                                                    <span className="text-[var(--skill-text)] text-xs font-medium whitespace-nowrap">{skill.name}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </React.Fragment>
                                ))}
                            </motion.div>
                        </motion.div>
                        
                    </motion.div>

                    <motion.div variants={textContainerVariants} className="grid md:pb-8">

                        <motion.div variants={textChildVariants} className="">
                            <h3 className="text-[var(--text-heading)] font-bold text-lg mb-3">
                                {t('skills.softSkills.title')}
                            </h3>
                            <p className="text-[var(--text-primary)] text-sm leading-relaxed text-justify">
                                {t('skills.softSkills.description')}
                            </p>
                        </motion.div>

                    </motion.div>

                </motion.div>
            </motion.div>
        </motion.section>
    );
}

export default SkillsSection;
