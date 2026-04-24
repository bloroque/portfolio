import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import SkillsCSS from "./SkillsSection.module.css";
import { useLanguage } from "../../../context/LanguageContext";
import useScrollReveal from "../../../hooks/useScrollReveal";

import SkillsCanvas, { FaceLegend } from "./SkillsCanvas";



const SkillsSection = (props) => {
    const classeCSS = props.className;
    const idSection = props.id;
    const sectionStyle = props.style;
    const { t } = useLanguage();
    const [scrollRef, isVisible] = useScrollReveal({ threshold: 0.2, once: false });
    const [activeFace, setActiveFace] = useState(null);
    const [targetFace, setTargetFace] = useState(null);

    const handleFaceClick = useCallback((faceKey) => {
        setActiveFace(faceKey);
        setTargetFace(faceKey);
    }, []);

    const handleAnimDone = useCallback(() => {
        setTargetFace(null);
    }, []);

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



    return (
        <motion.section
            id={idSection}
            className={`${classeCSS} ${SkillsCSS.Skills} items-center justify-center`}
            style={sectionStyle}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={containerVariants}
        >

            <div className="mx-auto max-w-screen-lg px-3 sm:px-4 pb-4 sm:pb-6 md:pb-8 pt-4 md:pt-5 w-full">

                <div className="flex flex-col gap-2 sm:gap-3 lg:gap-5 xl:gap-8 px-1 sm:px-2">

                    {/* 2-column grid: text + cube */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center" ref={scrollRef}>
                        {/* Col 1: Text content */}
                        <div className="flex flex-col gap-4">
                            {/* Title */}
                            <motion.div variants={titleVariants} className="relative inline-block">
                                <h2 className="title-section text-[var(--text-heading)] font-bold text-fluid-3xl tracking-wide relative inline-block">
                                    {t('skills.title')}
                                    {/* Sparkle decoration */}
                                    <motion.svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 28 28"
                                        className="absolute right-8 -top-4 md:right-10 md:-top-5 w-5 md:w-7 pointer-events-none"
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
                            <motion.p variants={cardVariants} className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
                                {t('skills.description')}
                            </motion.p>
                            <motion.h3 variants={titleVariants} className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)] mt-2">
                                {t('skills.whatIKnow')}
                            </motion.h3>
                            <motion.div variants={cardVariants}>
                                <FaceLegend activeFace={activeFace} onFaceClick={handleFaceClick} t={t} />
                            </motion.div>
                        </div>

                        {/* Col 2: Cube canvas */}
                        <motion.div variants={cardVariants}>
                            <SkillsCanvas targetFace={targetFace} onAnimDone={handleAnimDone} isVisible={isVisible} />
                        </motion.div>
                    </div>

                </div>
            </div>
        </motion.section>
    );
}

export default SkillsSection;
