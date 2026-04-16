import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../../context/LanguageContext";
import { FaEnvelope, FaCalendarAlt, FaPaperPlane, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import SchedulerPicker from "./SchedulerPicker";
import useContactForm from "./formContact/useContactForm";

const ContactSection = (props) => {
    const classeCSS = props.className;
    const idSection = props.id;
    const { t, lang } = useLanguage();
    const { nameRef, emailRef, messageRef, status, handleSubmit } = useContactForm();
    const [activeTab, setActiveTab] = useState("form");

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

    const tabContentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.25 } }
    };

    const sideVariants = {
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.3 } }
    };

    const contactInfoItems = [
        { icon: <FaEnvelope />, label: "brillantloroque@gmail.com", href: "mailto:brillantloroque@gmail.com" },
        { icon: <FaPhone />, label: "+261 34 68 632 99" },
        { icon: <FaMapMarkerAlt />, label: "Fianarantsoa 301, Madagascar" },
    ];

    return (
        <motion.section
            id={idSection}
            className={classeCSS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={containerVariants}
            style={{ position: "relative", overflow: "hidden" }}
        >
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 right-0 w-80 h-80 rounded-full bg-[var(--color-accent)] opacity-[0.04] blur-3xl"></div>
                <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full bg-[var(--color-accent)] opacity-[0.03] blur-3xl"></div>
            </div>

            <div className="mx-auto max-w-screen-lg w-full flex flex-col justify-center px-3 sm:px-4 py-2 sm:py-3">

                {/* Section header */}
                <motion.div variants={titleVariants} className="px-1 sm:px-3 md:pe-7 space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 lg:mb-8 relative">
                    <h2 className="text-[var(--text-heading)] font-bold text-fluid-3xl tracking-wide relative inline-block">
                        {t('contact.title')}
                        {/* Paper plane decoration - flying animation */}
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 70 60"
                            className="absolute -right-14 -top-6 md:-right-16 md:-top-7 w-11 md:w-14 pointer-events-none"
                            initial={{ opacity: 0, x: -20, y: 20, rotate: 0 }}
                            whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8, duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
                            animate={{
                                x: [0, 5, -3, 6, -2, 0],
                                y: [0, -6, 2, -4, 3, 0],
                                rotate: [0, -8, 5, -6, 3, 0],
                            }}
                            style={{ originX: "50%", originY: "50%" }}
                        >
                            {/* Paper plane body */}
                            <motion.path
                                d="M 8 42 L 60 8 L 42 52 L 32 34 Z"
                                stroke="var(--svg-deco-arrow)"
                                strokeWidth="3.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="transparent"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.8, duration: 1, ease: "easeInOut" }}
                            />
                            {/* Fold line */}
                            <motion.path
                                d="M 60 8 L 32 34"
                                stroke="var(--svg-deco-arrow)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                fill="transparent"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1.3, duration: 0.5, ease: "easeInOut" }}
                            />
                            {/* Trail swoosh 1 */}
                            <motion.path
                                d="M 5 44 C 2 47, 1 50, 3 52"
                                stroke="var(--svg-deco-arrow)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                fill="transparent"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ opacity: [0.5, 0.2, 0.5] }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1.6, duration: 2, ease: "easeInOut", repeat: Infinity }}
                            />
                            {/* Trail swoosh 2 */}
                            <motion.path
                                d="M 12 46 C 9 49, 8 52, 10 54"
                                stroke="var(--svg-deco-arrow)"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                fill="transparent"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ opacity: [0.4, 0.15, 0.4] }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1.8, duration: 2.2, ease: "easeInOut", repeat: Infinity }}
                            />
                            {/* Trail swoosh 3 */}
                            <motion.path
                                d="M 18 49 C 16 51, 15 53, 17 55"
                                stroke="var(--svg-deco-arrow)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                fill="transparent"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ opacity: [0.3, 0.1, 0.3] }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 2, duration: 2.4, ease: "easeInOut", repeat: Infinity }}
                            />
                        </motion.svg>
                    </h2>
                    
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3 lg:gap-5 xl:gap-8 px-1 sm:px-3">

                    {/* Side info panel */}
                    <motion.div variants={sideVariants} className="md:col-span-4">
                        <div className="flex flex-col gap-3 sm:gap-4">

                            <p className="text-[var(--text-primary)] text-fluid-sm leading-relaxed">
                                {t('contact.description')}
                            </p>

                            <div className="flex flex-col gap-3 sm:gap-4">
                                {contactInfoItems.map((item, i) => (
                                    <div key={i} className="flex items-start">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] text-fluid-sm shrink-0">
                                            {item.icon}
                                        </div>
                                        <div className="flex flex-col justify-center min-h-[32px] sm:min-h-[40px]">
                                            {item.href ? (
                                                <a href={item.href} className="text-[var(--text-primary)] text-fluid-sm hover:text-[var(--color-accent)] transition-colors">
                                                    {item.label}
                                                </a>
                                            ) : (
                                                    <span className="text-[var(--text-primary)] text-fluid-sm">{item.label}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Decorative accent top */}
                            <div className="w-full h-1 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-transparent"></div>

                            {/* Availability note */}
                            <div className="flex items-center gap-2 mb-3">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                                </span>
                                <span className="text-[var(--text-heading)] text-sm font-semibold">
                                    {t('contact.availableStatus')}
                                </span>
                            </div>
                            <p className="text-[var(--text-secondary)] text-xs leading-relaxed">
                                {t('contact.responseTime')}
                            </p>
                        </div>
                    </motion.div>

                    {/* Main content area */}
                    <div className="md:col-span-8">

                        {/* Tabs */}
                        <motion.div variants={titleVariants} className="flex gap-1 mb-2">
                            <button
                                onClick={() => setActiveTab("form")}
                                className={`group flex items-center gap-fluid px-fluid-btn py-fluid-btn rounded text-fluid-sm font-semibold transition-all duration-300 border
                                    ${activeTab === "form"
                                        ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)] shadow-lg shadow-[var(--color-accent)]/20"
                                        : "border-[var(--border-theme)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                                    }`}
                            >
                                <FaEnvelope className="text-xs" />
                                {t('contact.tabs.form')}
                            </button>
                            <button
                                onClick={() => setActiveTab("scheduler")}
                                className={`group flex items-center gap-fluid px-fluid-btn py-fluid-btn rounded text-fluid-sm font-semibold transition-all duration-300 border
                                    ${activeTab === "scheduler"
                                        ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)] shadow-lg shadow-[var(--color-accent)]/20"
                                        : "border-[var(--border-theme)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                                    }`}
                            >
                                <FaCalendarAlt className="text-xs" />
                                {t('contact.tabs.scheduler')}
                            </button>
                        </motion.div>

                        {/* Tab content */}
                        <AnimatePresence mode="wait">
                            {activeTab === "form" && (
                                <motion.div
                                    key="form"
                                    variants={tabContentVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <div className="bg-[var(--bg-card)] border border-[var(--border-theme)] rounded p-fluid-card shadow-sm">
                                        <motion.form variants={formContainerVariants} initial="hidden" animate="visible" className="flex flex-col gap-2 sm:gap-3 lg:gap-5 xl:gap-8" onSubmit={handleSubmit}>

                                            {/* Name + Email row */}
                                            <div className="grid gap-5">
                                                <motion.div variants={formChildVariants} className="flex flex-col gap-1.5">
                                                    <label className="text-[var(--text-secondary)] text-xs font-semibold tracking-wider">
                                                        {t('contact.nameLabel')}
                                                    </label>
                                                    <input
                                                        ref={nameRef}
                                                        type="text"
                                                        required
                                                        placeholder={t('contact.namePlaceholder')}
                                                        className="px-3 py-2 rounded border border-[var(--border-theme)] text-state-700 text-sm outline-none focus:border-[var(--color-accent)] focus:shadow-sm transition-all placeholder:text-[var(--text-secondary)]/50"
                                                    />
                                                </motion.div>
                                            </div>
                                            <div className="grid gap-5">
                                                <motion.div variants={formChildVariants} className="flex flex-col gap-1.5">
                                                    <label className="text-[var(--text-secondary)] text-xs font-semibold tracking-wider">
                                                        {t('contact.emailLabel')}
                                                    </label>
                                                    <input
                                                        ref={emailRef}
                                                        type="email"
                                                        required
                                                        placeholder={t('contact.emailPlaceholder')}
                                                        className="px-3 py-2 rounded border border-[var(--border-theme)] text-state-700 text-sm outline-none focus:border-[var(--color-accent)] focus:shadow-sm transition-all placeholder:text-[var(--text-secondary)]/50"
                                                    />
                                                </motion.div>
                                            </div>

                                            {/* Message */}
                                            <motion.div variants={formChildVariants} className="flex flex-col gap-1.5">
                                                <label className="text-[var(--text-secondary)] text-xs font-semibold tracking-wider">
                                                    {t('contact.messageLabel')}
                                                </label>
                                                <textarea
                                                    ref={messageRef}
                                                    rows="5"
                                                    required
                                                    placeholder={t('contact.messagePlaceholder')}
                                                    className="px-3 py-2 rounded border border-[var(--border-theme)] text-state-700 text-sm outline-none focus:border-[var(--color-accent)] focus:shadow-sm transition-all resize-none placeholder:text-[var(--text-secondary)]/50"
                                                ></textarea>
                                            </motion.div>

                                            {/* Status feedback */}
                                            {status === "success" && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 rounded px-3 py-2 text-center font-semibold"
                                                >
                                                    {lang === "fr" ? "Message envoyé avec succès !" : "Message sent successfully!"}
                                                </motion.div>
                                            )}
                                            {status === "error" && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-xs text-red-500 bg-red-50 border border-red-200 rounded px-3 py-2 text-center font-semibold"
                                                >
                                                    {lang === "fr" ? "Erreur lors de l'envoi. Réessayez." : "Error sending message. Please try again."}
                                                </motion.div>
                                            )}

                                            {/* Submit */}
                                            <motion.div variants={formChildVariants}>
                                                <button
                                                    type="submit"
                                                    disabled={status === "sending" || status === "success"}
                                                    className="group inline-flex items-center gap-2.5 px-fluid-btn py-fluid-btn bg-[var(--color-accent)] text-white text-fluid-sm font-bold rounded hover:shadow-lg hover:shadow-[var(--color-accent)]/25 transition-all duration-300 disabled:opacity-50"
                                                >
                                                    {status === "sending" ? (
                                                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                                                            <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                                                        </svg>
                                                    ) : (
                                                        <FaPaperPlane className="text-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                                    )}
                                                    {status === "sending"
                                                        ? (lang === "fr" ? "Envoi en cours..." : "Sending...")
                                                        : t('contact.sendButton')
                                                    }
                                                </button>
                                            </motion.div>
                                        </motion.form>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "scheduler" && (
                                <motion.div
                                    key="scheduler"
                                    variants={tabContentVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <SchedulerPicker />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </motion.section>
    );
}

export default ContactSection;