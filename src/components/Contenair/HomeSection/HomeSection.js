import React from "react";
import { motion } from "framer-motion";
import HomeCSS from "./HomeSection.module.css";
import { FaFileDownload } from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

const HomeSection = (props) => {
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

    // Variants pour l'image qui apparait de droite
    const imageVariants = {
        hidden: { opacity: 0, x: 60, scale: 0.9 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
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
                <div className="mx-auto max-w-screen-lg md:px-4 sm:px-3 md:pb-8 pt-4 md:pt-20 w-full relative z-10">
                    <div className="grid sm:grid-cols-6 lg:grid-cols-7 h-full  md:pb-8">

                        <motion.div
                            className="sm:col-span-3 lg:col-span-3 px-3 md:pe-7 flex flex-col justify-center"
                            variants={containerVariants}
                        >
                            <motion.div variants={fadeInUp} className="md:pb-6">
                                <h2 className="text-[var(--text-secondary)]">
                                    {t('home.greeting')}
                                </h2>
                            </motion.div>
                            
                            <motion.div variants={fadeInLeft} className={HomeCSS.homeSectionName}>
                                <h1 className="text-4xl md:text-5xl font-extrabold flex flex-col justify-end text-[var(--text-heading)]">
                                    <span className="uppercase tracking-wide py-1 te">
                                        Loroque Brillant
                                    </span>
                                    <span className="uppercase tracking-wide py-1 whitespace-nowrap">
                                        Andriamampiadana
                                    </span>
                                </h1>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="flex  pt-2  md:pt-5">
                                <div className="grow flex flex-col justify-center pe-2">
                                    <h2 className="text-[var(--text-secondary)] flex flex-col">
                                        <span>{t('home.role')}</span>
                                        <span></span>
                                    </h2>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="flex  pt-2  md:pt-5">
                                <div className="grow flex flex-col justify-center pe-2">
                                    <span className="text-[var(--text-secondary)] ">
                                        <span>
                                            {t('home.experience')}
                                        </span>
                                    </span>
                                </div>
                            </motion.div>
                            
                            
                            <motion.div variants={fadeInUp} className="flex flex-col pt-2 md:pt-5">
                                <div className="flex ">
                                    <motion.button
                                        className="relative flex text-[var(--btn-bg)]"
                                        type="button"
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                    >
                                        <motion.div
                                            className="h-full relative w-10 bg-[var(--color-accent)] flex items-center justify-center"
                                            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <FaFileDownload size="25" className="text-white" />
                                        </motion.div>
                                        <div className="text-md font-bold ps-2 bg-[var(--btn-text)] text-[var(--btn-bg)] flex items-center h-11 pe-4 ms-1">
                                            <span >{t('home.downloadCV')}</span>
                                        </div>
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            variants={imageVariants}
                            className="lg:mt-0 sm:col-span-3 lg:col-span-4 flex flex-col justify-center px-4 md:ps-7"
                        >
                            <motion.div
                                className="w-full h-full img-zone  ml-auto"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                    
                            </motion.div>
                        </motion.div>

                    </div>
                </div>

                
            </motion.section>
        </>
    );
}

export default HomeSection;