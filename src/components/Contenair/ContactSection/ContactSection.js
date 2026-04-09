import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../../context/LanguageContext";
import { FaEnvelope, FaCalendarAlt, FaPaperPlane, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import SchedulerPicker from "./SchedulerPicker";

const ContactSection = (props) => {
    const classeCSS = props.className;
    const idSection = props.id;
    const { t } = useLanguage();
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
        { icon: <FaEnvelope />, label: "loroque@email.com", href: "mailto:loroque@email.com" },
        { icon: <FaPhone />, label: "+261 00 000 00" },
        { icon: <FaMapMarkerAlt />, label: "Madagascar" },
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

            <div className="mx-auto max-w-screen-lg md:px-4 sm:px-3 md:pb-8 pt-4 md:pt-10 w-full relative z-10">

                {/* Section header */}
                <motion.div variants={titleVariants} className="px-3 md:pe-7 mb-8">
                    <h2 className="text-[var(--text-heading)] font-bold text-4xl tracking-wide">
                        {t('contact.title')}
                    </h2>
                    <div className="flex items-center gap-2 mt-3 mb-4">
                        <div className="w-10 h-1 rounded-full bg-[var(--color-accent)]"></div>
                        <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></div>
                    </div>
                    <p className="text-[var(--text-primary)] max-w-2xl leading-relaxed">
                        {t('contact.description')}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-8 px-3">

                    {/* Main content area */}
                    <div className="lg:col-span-8">

                        {/* Tabs */}
                        <motion.div variants={titleVariants} className="flex gap-3 mb-6">
                            <button
                                onClick={() => setActiveTab("form")}
                                className={`group flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border
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
                                className={`group flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border
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
                                    <div className="bg-[var(--bg-card)] border border-[var(--border-theme)] rounded-2xl p-6 md:p-8 shadow-sm">
                                        <motion.form variants={formContainerVariants} initial="hidden" animate="visible" className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>

                                            {/* Name + Email row */}
                                            <div className="grid sm:grid-cols-2 gap-5">
                                                <motion.div variants={formChildVariants} className="flex flex-col gap-1.5">
                                                    <label className="text-[var(--text-secondary)] text-xs font-semibold uppercase tracking-wider">
                                                        {t('contact.nameLabel')}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder={t('contact.namePlaceholder')}
                                                        className="px-4 py-3 rounded-xl border border-[var(--border-theme)] bg-transparent text-[var(--text-primary)] outline-none focus:border-[var(--color-accent)] focus:shadow-sm transition-all placeholder:text-[var(--text-secondary)]/50"
                                                    />
                                                </motion.div>
                                                <motion.div variants={formChildVariants} className="flex flex-col gap-1.5">
                                                    <label className="text-[var(--text-secondary)] text-xs font-semibold uppercase tracking-wider">
                                                        {t('contact.emailLabel')}
                                                    </label>
                                                    <input
                                                        type="email"
                                                        placeholder={t('contact.emailPlaceholder')}
                                                        className="px-4 py-3 rounded-xl border border-[var(--border-theme)] bg-transparent text-[var(--text-primary)] outline-none focus:border-[var(--color-accent)] focus:shadow-sm transition-all placeholder:text-[var(--text-secondary)]/50"
                                                    />
                                                </motion.div>
                                            </div>

                                            {/* Message */}
                                            <motion.div variants={formChildVariants} className="flex flex-col gap-1.5">
                                                <label className="text-[var(--text-secondary)] text-xs font-semibold uppercase tracking-wider">
                                                    {t('contact.messageLabel')}
                                                </label>
                                                <textarea
                                                    rows="5"
                                                    placeholder={t('contact.messagePlaceholder')}
                                                    className="px-4 py-3 rounded-xl border border-[var(--border-theme)] bg-transparent text-[var(--text-primary)] outline-none focus:border-[var(--color-accent)] focus:shadow-sm transition-all resize-none placeholder:text-[var(--text-secondary)]/50"
                                                ></textarea>
                                            </motion.div>

                                            {/* Submit */}
                                            <motion.div variants={formChildVariants}>
                                                <button
                                                    type="submit"
                                                    className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-[var(--color-accent)] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[var(--color-accent)]/25 transition-all duration-300"
                                                >
                                                    <FaPaperPlane className="text-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                                    {t('contact.sendButton')}
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

                    {/* Side info panel */}
                    <motion.div variants={sideVariants} className="lg:col-span-4">
                        <div className="bg-[var(--bg-card)] border border-[var(--border-theme)] rounded-2xl p-6 shadow-sm sticky top-24">

                            {/* Decorative accent top */}
                            <div className="w-full h-1 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-transparent mb-6"></div>

                            <h3 className="text-[var(--text-heading)] font-bold text-lg mb-5">
                                {t('contact.infoTitle')}
                            </h3>

                            <div className="flex flex-col gap-4">
                                {contactInfoItems.map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] text-sm shrink-0">
                                            {item.icon}
                                        </div>
                                        <div className="flex flex-col justify-center min-h-[40px]">
                                            {item.href ? (
                                                <a href={item.href} className="text-[var(--text-primary)] text-sm hover:text-[var(--color-accent)] transition-colors">
                                                    {item.label}
                                                </a>
                                            ) : (
                                                <span className="text-[var(--text-primary)] text-sm">{item.label}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="border-t border-[var(--border-theme)] my-6"></div>

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

                </div>
            </div>
        </motion.section>
    );
}

export default ContactSection;