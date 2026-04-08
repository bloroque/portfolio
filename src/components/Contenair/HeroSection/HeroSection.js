import React from "react";
import { motion } from "framer-motion";
import HomeCSS from "./HeroSection.module.css";
import { FaFileDownload } from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

const HeroSection = (props) => {
    const classeCSS = props.className;
    const idSection = props.id;
    const { t } = useLanguage();

    // Variants d'animation pour le conteneur
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.15
            }
        }
    };

    // Variants pour les éléments qui apparaissent de bas en haut
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    // Variants pour les éléments qui apparaissent de droite à gauche
    const fadeInLeft = {
        hidden: { opacity: 0, x: 80 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: [0.6, -0.05, 0.01, 0.99]
            }
        }
    };

    // Variants pour le bouton avec effet bounce
    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        },
        tap: {
            scale: 0.95
        }
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
                <div className="mx-auto max-w-screen-lg md:px-4 sm:px-3 md:pb-8 pt-2 w-full relative z-10">
                    <div className="flex flex-col items-center justify-center h-full md:pb-8">

                        <motion.div
                            className="w-full flex flex-col gap-4 items-center text-center"
                            variants={containerVariants}
                        >
                            <motion.div variants={fadeInUp}>
                                <p className="text-[var(--text-secondary)]  tracking-wide text-xl">
                                    {t('home.greeting')} Loroque Brillant 👋
                                </p>
                            </motion.div>
                            
                            <motion.div variants={fadeInLeft} className={HomeCSS.homeSectionName}>
                                <h1 className="text-4xl md:text-6xl font-bold flex flex-col justify-end tracking-wide text-[var(--text-heading)] leading-snug">
                                    {t('home.role')}
                                </h1>
                            </motion.div>

                            <motion.div variants={fadeInLeft} className="flex max-w-xl ">
                               <div>
                                    <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[var(--border-theme)] bg-[var(--bg-card)] text-sm text-[var(--text-secondary)]">
                                        <span className="relative flex h-2.5 w-2.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                                        </span>
                                        {t('home.badge')}
                                    </span>
                                </div> 
                            </motion.div>

                            <motion.div variants={fadeInUp} className="flex max-w-xl ">
                                <div className="grow flex flex-col justify-center pe-2">
                                    <span className="text-[var(--text-secondary)] ">
                                        <span>
                                            {t('home.experience')}
                                        </span>
                                    </span>
                                </div>
                            </motion.div>
                            
                            <motion.div variants={fadeInUp} className="w-full max-w-sm pt-2 md:pt-5">
                                <div className="grid grid-cols-2 gap-4">

                                    <div className="">
                                        <motion.button
                                            className="w-full flex text-[var(--btn-bg)]"
                                            type="button"
                                            variants={buttonVariants}
                                            whileHover="hover"
                                            whileTap="tap"
                                        >
                                            <div className="w-full text-md font-bold ps-2 bg-[var(--btn-text)] text-[var(--btn-bg)] flex items-center justify-center h-11 pe-4 ms-1  rounded-md">
                                                <span >
                                                    {t('home.contactBtn')}
                                                </span>
                                            </div>
                                        </motion.button>
                                    </div>

                                    <div className="">
                                        <motion.button
                                            className="w-full flex text-[var(--btn-bg)]"
                                            type="button"
                                            variants={buttonVariants}
                                            whileHover="hover"
                                            whileTap="tap"
                                        >
                                            <div className="w-full text-md font-bold ps-2 bg-[var(--btn-text)] text-[var(--btn-bg)] flex items-center justify-center h-11 pe-4 ms-1  rounded-md">
                                                <span >
                                                    {t('home.cvBtn')}
                                                </span>
                                            </div>
                                        </motion.button>
                                    </div>

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