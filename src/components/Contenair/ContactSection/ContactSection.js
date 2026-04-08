import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../../context/LanguageContext";

const ContactSection = (props) => {
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

    const formContainerVariants = {
        hidden: {},
        visible: { transition: { delayChildren: 0.4, staggerChildren: 0.12 } }
    };

    const formChildVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <motion.section
            id={idSection}
            className={classeCSS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={containerVariants}
        >
            <div className="mx-auto max-w-screen-lg md:px-4 sm:px-3 md:pb-8 pt-4 md:pt-10 w-full">
                <div className="grid sm:grid-cols-6 lg:grid-cols-7 h-full md:pb-8">

                    <motion.div variants={titleVariants} className="sm:col-span-3 lg:col-span-3 px-3 md:pe-7 flex flex-col justify-center">
                        <h2 className="title-section text-[var(--text-heading)] font-bold text-4xl flex flex-col tracking-wide">
                            <span>{t('contact.title')}</span>
                        </h2>
                        <p className="py-4 text-[var(--text-primary)] text-justify">
                            {t('contact.description')}
                        </p>
                    </motion.div>

                    <div className="lg:mt-0 sm:col-span-3 lg:col-span-4 flex flex-col justify-center px-4 md:ps-7">
                        <motion.form variants={formContainerVariants} className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                            <motion.div variants={formChildVariants} className="flex flex-col gap-1">
                                <label className="text-[var(--text-secondary)] text-sm font-semibold">{t('contact.nameLabel')}</label>
                                <input
                                    type="text"
                                    placeholder={t('contact.namePlaceholder')}
                                    className="px-4 py-3 rounded border border-[var(--border-theme)] bg-[var(--bg-card)] text-[var(--text-primary)] outline-none focus:border-[var(--color-accent)] transition-colors"
                                />
                            </motion.div>
                            <motion.div variants={formChildVariants} className="flex flex-col gap-1">
                                <label className="text-[var(--text-secondary)] text-sm font-semibold">{t('contact.emailLabel')}</label>
                                <input
                                    type="email"
                                    placeholder={t('contact.emailPlaceholder')}
                                    className="px-4 py-3 rounded border border-[var(--border-theme)] bg-[var(--bg-card)] text-[var(--text-primary)] outline-none focus:border-[var(--color-accent)] transition-colors"
                                />
                            </motion.div>
                            <motion.div variants={formChildVariants} className="flex flex-col gap-1">
                                <label className="text-[var(--text-secondary)] text-sm font-semibold">{t('contact.messageLabel')}</label>
                                <textarea
                                    rows="5"
                                    placeholder={t('contact.messagePlaceholder')}
                                    className="px-4 py-3 rounded border border-[var(--border-theme)] bg-[var(--bg-card)] text-[var(--text-primary)] outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
                                ></textarea>
                            </motion.div>
                            <motion.div variants={formChildVariants} className="flex flex-row-reverse">
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-[var(--color-accent)] text-white font-bold rounded hover:opacity-90 transition-opacity"
                                >
                                    {t('contact.sendButton')}
                                </button>
                            </motion.div>
                        </motion.form>
                    </div>

                </div>
            </div>
        </motion.section>
    );
}

export default ContactSection;