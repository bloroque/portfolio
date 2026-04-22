import React from "react";
import { motion } from "framer-motion";
import SkillsCSS from "./SkillsSection.module.css";
import { useLanguage } from "../../../context/LanguageContext";

import DrawingPin from "../../../assets/images/Drawing-Pin.png";
import SkillsCanvas from "./SkillsCanvas";



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



    return (
        <motion.section
            id={idSection}
            className={`${classeCSS} ${SkillsCSS.Skills} items-center justify-center`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={containerVariants}
        >

            <div className="mx-auto max-w-screen-lg px-3 sm:px-4 pb-4 sm:pb-6 md:pb-8 pt-4 md:pt-5 w-full">

                <div className="flex flex-col gap-2 sm:gap-3 lg:gap-5 xl:gap-8 px-1 sm:px-2">

                    {/* Title */}
                    <motion.div variants={titleVariants} className="relative inline-block">
                        <h2 className="title-section text-[var(--text-heading)] font-bold text-fluid-3xl tracking-wide relative inline-block">
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
                    
                    {/* Hard Skills — Canvas Graph */}
                    <motion.div 
                        variants={cardVariants}
                        className="px-1 sm:px-3">
                      
                        <SkillsCanvas />
                    </motion.div>

                </div>
            </div>
        </motion.section>
    );
}

export default SkillsSection;
