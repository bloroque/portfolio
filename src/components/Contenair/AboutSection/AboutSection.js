import React from 'react';
import { motion } from "framer-motion";
import AboutCSS from "./AboutSection.module.css";
import { useLanguage } from "../../../context/LanguageContext";

const AboutSection = (props) => {
    const classeCSS = props.className;
    const idSection = props.id;
    const { t } = useLanguage();

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } }
    };

    const imgVariants = {
        hidden: { opacity: 0, x: -80 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
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

    return (
        <motion.section
            id={idSection}
            className={`${classeCSS} ${AboutCSS.About}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={containerVariants}
        >
            <div className="mx-auto max-w-screen-lg md:px-4 sm:px-3 md:pb-5 pt-4 md:pt-5 w-full ">
                
                <div className="grid sm:grid-cols-6 lg:grid-cols-7 h-full  md:pb-8">

                    <motion.div variants={imgVariants} className="sm:col-span-3 lg:col-span-3 px-3 md:pe-7 flex flex-col justify-center">
                        <div className="w-full h-3/4 img-zone ml-auto relative">
                            <div className="w-full h-full overflow-hidden shadow-lg absolute mt-6 ml-6 border-4 border-[var(--logo-bg)] ">
                                <img src={require('../../../assets/images/image2.png')} alt={t('about.imageAlt')} className=" w-full h-full object-cover" />
                            </div>
                        </div>
                    </motion.div>

                    <div className="lg:mt-0 sm:col-span-3 lg:col-span-4 flex flex-col justify-center px-4 md:ps-7">
                        <motion.div variants={titleVariants} className={AboutCSS.homeSectionTitle}>
                            <h2 className="title-section text-[var(--text-heading)] font-bold text-4xl flex flex-col tracking-wide">
                                <span>{t('about.title')}</span>
                                <span></span>
                            </h2>
                        </motion.div>
                        <motion.div variants={paragraphsContainerVariants} className="py-4 text-[var(--text-primary)]">

                            <motion.p variants={paragraphVariants} className="pb-4 text-justify">
                                {t('about.paragraph1')}
                            </motion.p>

                            <motion.p variants={paragraphVariants} className="pb-4 text-justify">
                                {t('about.paragraph2')}
                            </motion.p>

                            <motion.p variants={paragraphVariants} className="pb-4 text-justify">
                                {t('about.paragraph3')}
                            </motion.p>

                            <motion.p variants={paragraphVariants} className="text-right font-bold pt-3">
                                <span>{t('about.cta')}</span>
                            </motion.p>

                        </motion.div>
                    </div>

                </div>

            </div>
        </motion.section>
    );
}

export default AboutSection;