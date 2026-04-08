import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useLanguage } from "../../../context/LanguageContext";
import KeyboardBackground from "../../UI/KeyboardBackground";

const ProjectSection = (props) => {
    const classeCSS = props.className;
    const idSection = props.id;
    const { t } = useLanguage();

    // Créer une référence pour Swiper
    const swiperRef = useRef(null);

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

    return (
        <>
        <motion.section
            id={idSection}
            className={classeCSS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={containerVariants}
             style={{ position: "relative", overflow: "hidden" }}
        >
            <div className="mx-auto max-w-screen-lg md:px-4 sm:px-3 md:pb-8 pt-4 md:pt-5 w-full ">

                <div className="w-full flex flex-col h-full justify-center px-2">
          
                    <motion.div variants={introVariants} className="py-4 text-[var(--text-primary)]">
                        <p className="pb-4 text-justify text-lg">
                            {t('projects.intro')}
                        </p>
                    </motion.div>

                    <div className="flex flex-col justify-center sm:grid sm:grid-cols-4  w-full  sm:grid-rows-1  ">

                        <motion.div variants={panelVariants} className="col-span-1 flex flex-col justify-center sm:h-full">

                            <div className="flex flex-col justify-center p-4 h-80 bg-[var(--color-accent)]">
                                <h2 className="text-white font-bold text-xl flex flex-col tracking-wide p-4 pb-2">
                                    <span>{t('projects.title')}</span>
                                    <span className="ps-4">{t('projects.subtitle')}</span>
                                </h2>
                                <div className="flex gap-2 p-4 pt-2 ps-8">
                                    <button className="border-white border p-2 rounded-full" onClick={handlePrev}>
                                        <FaAngleLeft className="text-white"/>
                                    </button>
                                    <button className="border-white border p-2 rounded-full" onClick={handleNext}>
                                        <FaAngleRight className="text-white"/>
                                    </button>
                                </div>
                                <div className="px-4 pt-2">
                                    <a 
                                        href="/detail-projets" 
                                        className="inline-block w-full text-center bg-white text-[var(--color-accent)] font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all"
                                    >
                                        {t('projects.viewAll')}
                                    </a>
                                </div>
                            </div>

                        </motion.div>
                        <motion.div variants={carouselVariants} className="col-span-3 sm:h-full projet-carousel ">

                            <Swiper className="h-full grid-cols-3"
                                spaceBetween={0}
                                slidesPerView={3}
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => (swiperRef.current = swiper)}
                                breakpoints={{
                                    640: { slidesPerView: 2 },
                                    768: { slidesPerView: 3 },
                                }}>

                                <SwiperSlide className=" m-0 border-white h-full flex flex-col justify-center" >
                                    <div className="border-4 flex flex-col">
                                        <div className="h-[40px]"></div>
                                        <div className="h-80 bg-[var(--slide-bg)]">
                                            Slide 1
                                        </div>
                                        <div className="h-[40px]"></div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className=" m-0 border-white h-full flex flex-col justify-center" >
                                    <div className="flex flex-col">
                                        <div className="h-[40px]"></div>
                                        <div className="h-80 bg-[var(--slide-bg)]">
                                            Slide 2
                                        </div>
                                        <div className="h-[40px]"></div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className=" m-0 border-white h-full flex flex-col justify-center" >
                                    <div className="flex flex-col">
                                        <div className="h-[40px]"></div>
                                        <div className="h-80 bg-[var(--slide-bg)]">
                                            Slide 3
                                        </div>
                                        <div className="h-[40px]"></div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className=" m-0 border-white h-full flex flex-col justify-center" >
                                    <div className="flex flex-col">
                                        <div className="h-[40px]"></div>
                                        <div className="h-80 bg-[var(--slide-bg)]">
                                            Slide 4
                                        </div>
                                        <div className="h-[40px]"></div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className=" m-0 border-white h-full flex flex-col justify-center" >
                                    <div className="flex flex-col">
                                        <div className="h-[40px]"></div>
                                        <div className="h-80 bg-[var(--slide-bg)]">
                                            Slide 5
                                        </div>
                                        <div className="h-[40px]"></div>
                                    </div>
                                </SwiperSlide>
                                
                            </Swiper>

                        </motion.div>
                    </div>
                </div>

            </div>

            {/* <KeyboardBackground/> */}

        </motion.section>

        </>
    );
}

export default ProjectSection;
