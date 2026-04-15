import React from 'react';
import { motion } from "framer-motion";
import AboutCSS from "./AboutSection.module.css";
import { useLanguage } from "../../../context/LanguageContext";
import { FaCode, FaLightbulb, FaUsers, FaArrowRight } from "react-icons/fa";

const AboutSection = (props) => {
    const classeCSS = props.className;
    const idSection = props.id;
    const { t } = useLanguage();

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } }
    };

    const imgVariants = {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] } }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const paragraphsContainerVariants = {
        hidden: {},
        visible: { transition: { delayChildren: 0.5, staggerChildren: 0.15 } }
    };

    const paragraphVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    const highlights = [
        { icon: <FaCode />, labelKey: 'about.highlightTech' },
        { icon: <FaLightbulb />, labelKey: 'about.highlightCreative' },
        { icon: <FaUsers />, labelKey: 'about.highlightTeam' },
    ];

    return (
        <motion.section
            id={idSection}
            className={`${classeCSS} ${AboutCSS.About}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={containerVariants}
        >
            <div className="mx-auto max-w-screen-lg md:px-4 sm:px-3 md:pb-5 pt-4 md:pt-5 w-full">

                <div className="grid sm:grid-cols-6 lg:grid-cols-12 h-full md:pb-8 gap-6">

                    {/* Image side */}
                    <motion.div variants={imgVariants} className="sm:col-span-3 lg:col-span-5 px-3 md:pe-4 flex flex-col justify-center">

                        <div className="relative w-full aspect-[3/4] max-w-sm mx-auto">
                            {/* Decorative accent frame */}
                            <div className="absolute -top-3 -left-3 w-full h-full border-2 border-[var(--color-accent)] rounded-2xl opacity-30"></div>
                            {/* Decorative dots */}
                            <div className="absolute -bottom-5 -right-5 w-20 h-20 opacity-20" style={{
                                backgroundImage: "radial-gradient(var(--color-accent) 2px, transparent 2px)",
                                backgroundSize: "10px 10px"
                            }}></div>
                            {/* Main image */}
                            <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-xl">
                                <img
                                    src={require('../../../assets/images/image2.png')}
                                    alt={t('about.imageAlt')}
                                    className="w-full h-full object-cover"
                                />
                                {/* Subtle gradient overlay at bottom */}
                                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Text side */}
                    <div className="lg:mt-0 sm:col-span-3 lg:col-span-7 flex flex-col justify-center px-4 md:ps-4">

                        {/* Section title - animated */}
                        <motion.div variants={titleVariants} className={AboutCSS.homeSectionTitle}>
                            <div className="flex flex-wrap items-baseline gap-x-3">
                                <motion.span
                                    className="text-3xl md:text-4xl font-black text-[var(--text-heading)] leading-tight"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                >
                                    {t('about.animTitle1')}
                                </motion.span>
                                <motion.span
                                    className="text-3xl md:text-4xl font-black leading-tight"
                                    style={{ color: 'var(--color-accent)' }}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                                >
                                    {t('about.animTitle2')}
                                </motion.span>
                            </div>
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 293 24"
                                className="w-48 md:w-64 mt-1"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1.2, duration: 0.4 }}
                            >
                                <motion.path
                                    d="M 3 8.397 C 32.76 5.575 121.068 0.779 236.228 4.165 M 67.503 16.663 C 88.654 13.471 151.95 6.537 235.928 4.341 M 68.203 16.605 C 96.815 15.061 181.196 13.876 289.83 21.484"
                                    stroke="var(--svg-deco-underline)"
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                    fill="transparent"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 1.2, duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 0.5 }}
                                />
                            </motion.svg>
                        </motion.div>

                        {/* Paragraphs */}
                        <motion.div variants={paragraphsContainerVariants} className="py-5 text-[var(--text-primary)] space-y-4">
                            <motion.p variants={paragraphVariants} className="text-justify leading-relaxed">
                                {t('about.paragraph1')}
                            </motion.p>
                            <motion.p variants={paragraphVariants} className="text-justify leading-relaxed">
                                {t('about.paragraph2')}
                            </motion.p>
                            <motion.p variants={paragraphVariants} className="text-justify leading-relaxed">
                                {t('about.paragraph3')}
                            </motion.p>
                        </motion.div>

                        {/* Highlight pills */}
                        <motion.div variants={paragraphVariants} className="flex flex-wrap gap-3 pb-5">
                            {highlights.map((h, i) => (
                                <span key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-theme)] bg-[var(--bg-card)] text-sm text-[var(--text-secondary)] shadow-sm">
                                    <span className="text-[var(--color-accent)]">{h.icon}</span>
                                    {t(h.labelKey)}
                                </span>
                            ))}
                        </motion.div>

                        {/* CTA */}
                        <motion.div variants={paragraphVariants}>
                            <a
                                href="#contactsSection"
                                className="group inline-flex items-center gap-2 text-[var(--color-accent)] font-semibold hover:underline underline-offset-4 transition-all"
                            >
                                {t('about.cta')}
                                <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                            </a>
                        </motion.div>

                    </div>
                </div>
            </div>
        </motion.section>
    );
}

export default AboutSection;