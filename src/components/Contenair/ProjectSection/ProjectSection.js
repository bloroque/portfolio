import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useLanguage } from "../../../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const ProjectSection = (props) => {
    const classeCSS = props.className;
    const idSection = props.id;
    const { t } = useLanguage();

    // Créer une référence pour Swiper
    const swiperRef = useRef(null);
    const sectionRef = useRef(null);
    const introRef = useRef(null);
    const panelRef = useRef(null);
    const carouselRef = useRef(null);

    const handlePrev = () => {
        if (swiperRef.current) swiperRef.current.slidePrev();
    };

    const handleNext = () => {
        if (swiperRef.current) swiperRef.current.slideNext();
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                }
            });

            tl.from(introRef.current, {
                opacity: 0, y: 30, duration: 0.6, ease: "power3.out"
            })
            .from(panelRef.current, {
                opacity: 0, x: -60, duration: 0.7, ease: "power3.out"
            }, "-=0.3")
            .from(carouselRef.current, {
                opacity: 0, y: 50, duration: 0.8, ease: "power3.out"
            }, "-=0.4");
        }, sectionRef);

        return () => ctx.revert();
    }, []);


    return (
        <section ref={sectionRef} id={idSection} className={classeCSS}>
            <div className="mx-auto max-w-screen-lg md:px-4 sm:px-3 md:pb-8 pt-4 md:pt-5 w-full ">

                <div className="w-full flex flex-col h-full justify-center px-2">
          
                    <div ref={introRef} className="py-4 text-[var(--text-primary)]">
                        <p className="pb-4 text-justify text-lg">
                            {t('projects.intro')}
                        </p>
                    </div>

                    <div className="flex flex-col justify-center sm:grid sm:grid-cols-4  w-full  sm:grid-rows-1  ">

                        <div ref={panelRef} className="col-span-1 flex flex-col justify-center sm:h-full">

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
                            </div>

                        </div>
                        <div ref={carouselRef} className="col-span-3 sm:h-full projet-carousel ">

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

                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default ProjectSection;
