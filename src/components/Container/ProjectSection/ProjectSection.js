import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaAngleLeft, FaAngleRight, FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useLanguage } from "@/context/LanguageContext";

import Image1 from "@/assets/images/Image1.png";
import Image2 from "@/assets/images/image2.png";
import Image3 from "@/assets/images/image3.png";
import Image4 from "@/assets/images/image2.png";

const STATUS_STYLES = {
    "completed": { bg: "bg-emerald-500/20", text: "text-emerald-400", dot: "bg-emerald-400" },
    "in-progress": { bg: "bg-amber-500/20", text: "text-amber-400", dot: "bg-amber-400" },
    "standby": { bg: "bg-slate-400/20", text: "text-slate-400", dot: "bg-slate-400" },
};

/* Image map: resolves string keys from i18n to imported assets */
const IMAGE_MAP = { Image1, Image2, Image3, Image4 };

const ProjectSection = (props) => {
    const classeCSS = props.className;
    const idSection = props.id;
    const sectionStyle = props.style;
    const { t } = useLanguage();

    const swiperRef = useRef(null);

    /* Build project list dynamically from i18n items */
    const items = t('projects.items') || {};
    const projectList = Object.keys(items).map((key) => ({
        key,
        ...items[key],
        image: IMAGE_MAP[items[key].image] || Image1,
    }));

    const handlePrev = () => {
        if (swiperRef.current) swiperRef.current.slidePrev();
    };

    const handleNext = () => {
        if (swiperRef.current) swiperRef.current.slideNext();
    };

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } }
    };

    const introVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const panelVariants = {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
    };

    const carouselVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const titleVariants = {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
    };

    const btnVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <>
            <motion.section
                id={idSection}
                className={classeCSS}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={containerVariants}
                style={{ position: "relative", overflow: "hidden", ...sectionStyle }}
            >
                <div className="mx-auto max-w-screen-lg px-3 sm:px-4 pb-4 sm:pb-6 md:pb-8 pt-4 md:pt-5 w-full">

                    <div className="flex flex-col gap-2 sm:gap-3 lg:gap-5 xl:gap-8 w-full h-full justify-center">

                        {/* Header: title + intro */}
                        <div className="flex flex-col justify-between gap-2 sm:gap-4">
                            <motion.div variants={titleVariants} className="flex-1">
                                <h2 className="title-section text-[var(--text-heading)] font-bold text-fluid-3xl tracking-wide relative inline-block">
                                    {t('projects.title')}
                                </h2>
                            </motion.div>
                            <motion.div variants={introVariants} className="flex-1 text-[var(--text-primary)]">
                                <motion.p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
                                    {t('projects.intro')}
                                </motion.p>
                            </motion.div>
                        </div>

                        {/* Carousel zone */}
                        <div className="flex flex-col justify-center md:grid md:grid-cols-4 w-full md:grid-rows-1 gap-2 sm:gap-3">

                            {/* Side panel */}
                            <motion.div variants={panelVariants} className="col-span-1 flex flex-col justify-center md:h-full">
                                <div className="flex flex-row md:flex-col justify-between p-3 sm:p-4 lg:p-5 h-auto md:h-72 lg:h-80 bg-[var(--color-accent)] rounded-lg relative overflow-hidden">
                                    {/* Decorative circle */}
                                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10"></div>
                                    <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-white/5"></div>
                                    
                                    <div className="relative z-10">
                                        <h2 className="text-white font-bold text-fluid-xl flex flex-col tracking-wide leading-snug">
                                            <span>{t('projects.title')}</span>
                                            <span className="ps-2 sm:ps-4 text-white/70 text-fluid-base font-medium">{t('projects.subtitle')}</span>
                                        </h2>
                                        
                                        <div className="w-8 sm:w-10 h-0.5 bg-white/40 rounded-full mt-2 sm:mt-4 mb-2 sm:mb-4"></div>

                                        {/* Stats row */}
                                        <motion.div variants={introVariants} className="flex items-center gap-4 sm:gap-6">
                                            <div className="flex flex-col">
                                                <span className="text-xl sm:text-2xl font-bold text-white">20+</span>
                                                <span className="text-[10px] sm:text-[11px] text-white/60 font-medium">{t('home.stats.projects')}</span>
                                            </div>
                                        </motion.div>
                                    </div>

                                    <div className="flex flex-col gap-3 relative z-10">
                                        <div className="flex gap-2">
                                            <button 
                                                className="border border-white/40 hover:border-white hover:bg-white/10 p-2.5 rounded-full transition-all" 
                                                onClick={handlePrev}
                                            >
                                                <FaAngleLeft className="text-white text-sm"/>
                                            </button>
                                            <button 
                                                className="border border-white/40 hover:border-white hover:bg-white/10 p-2.5 rounded-full transition-all" 
                                                onClick={handleNext}
                                            >
                                                <FaAngleRight className="text-white text-sm"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Cards carousel */}
                            <motion.div variants={carouselVariants} className="col-span-3 md:h-full projet-carousel">

                                <Swiper className="h-full"
                                    spaceBetween={8}
                                    slidesPerView={1}
                                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                                    breakpoints={{
                                        480: { slidesPerView: 1.5 },
                                        640: { slidesPerView: 2 },
                                        1024: { slidesPerView: 3 },
                                    }}>

                                    {projectList.map((project) => {
                                        const statusStyle = STATUS_STYLES[project.status] || STATUS_STYLES["standby"];
                                        return (
                                            <SwiperSlide key={project.key} className="m-0 h-full flex flex-col justify-center">
                                                <div className="flex flex-col">
                                                    <div className="h-[20px] sm:h-[40px]"></div>
                                                    <div className="h-60 sm:h-72 lg:h-80 relative overflow-hidden group cursor-pointer rounded-lg border border-[var(--border-theme)] shadow-sm hover:shadow-xl transition-shadow duration-500">
                                                        <img
                                                            src={project.image}
                                                            alt={project.title}
                                                            loading="lazy"
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                        />
                                                        
                                                        {/* Status badge */}
                                                        <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md ${statusStyle.bg}`}>
                                                            <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`}></span>
                                                            <span className={`text-[10px] font-semibold ${statusStyle.text}`}>
                                                                {t(`projects.statusLabels.${project.status === 'in-progress' ? 'inProgress' : project.status}`)}
                                                            </span>
                                                        </div>

                                                        {/* Gradient overlay */}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                        
                                                        {/* Content */}
                                                        <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-1.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                                            <h3 className="text-white font-bold text-sm leading-tight">
                                                                {project.title}
                                                            </h3>
                                                            <p className="text-white/60 text-xs line-clamp-2 leading-relaxed">
                                                                {project.desc}
                                                            </p>
                                                            <div className="flex flex-wrap gap-1 mt-0.5">
                                                                {(project.tags || []).map((tag) => (
                                                                    <span
                                                                        key={tag}
                                                                        className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/15 backdrop-blur-sm"
                                                                    >
                                                                        {tag}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                            <div className="mt-1.5 max-h-0 opacity-0 overflow-hidden group-hover:max-h-12 group-hover:opacity-100 transition-all duration-400">
                                                                <button className="w-full py-2 text-xs font-semibold rounded-md bg-white text-[var(--color-accent)] hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
                                                                    {t('projects.detail')}
                                                                    <FaArrowRight className="text-[10px]" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="h-[40px]"></div>
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })}
                                    
                                </Swiper>

                            </motion.div>
                        </div>

                        {/* View all button */}
                        <motion.div variants={btnVariants} className="flex justify-center">
                            <Link 
                                to="/detail-projets" 
                                className="group/btn btn-glow inline-flex items-center gap-2 px-fluid-btn py-fluid-btn rounded-full border-2 border-[var(--color-accent)] text-[var(--color-accent)] font-semibold hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300"
                            >
                                {t('projects.viewAll')}
                                <FaArrowRight className="text-xs transition-transform duration-300 group-hover/btn:translate-x-1" />
                            </Link>
                        </motion.div>
                    </div>

                </div>

                {/* <KeyboardBackground/> */}

            </motion.section>
        </>
    );
}

export default ProjectSection;
