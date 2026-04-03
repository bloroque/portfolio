import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HomeCSS from "./HomeSection.module.css";
import {FaFileDownload } from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const HomeSection = (props) => {
    const classeCSS = props.className;
    const idSection = props.id;
    const { t } = useLanguage();

    const sectionRef = useRef(null);
    const greetingRef = useRef(null);
    const nameRef = useRef(null);
    const roleRef = useRef(null);
    const btnRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                }
            });

            tl.from(greetingRef.current, {
                opacity: 0, y: 30, duration: 0.6, ease: "power3.out"
            })
            .from(nameRef.current, {
                opacity: 0, x: 80, duration: 0.8, ease: "power3.out"
            }, "-=0.3")
            .from(roleRef.current, {
                opacity: 0, y: 20, duration: 0.5, ease: "power2.out"
            }, "-=0.3")
            .from(btnRef.current, {
                opacity: 0, scale: 0.8, duration: 0.5, ease: "back.out(1.7)"
            }, "-=0.2")
            .from(imgRef.current, {
                opacity: 0, x: 60, duration: 0.8, ease: "power3.out"
            }, "-=0.6");
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id={idSection} className={classeCSS}>
            <div className="mx-auto max-w-screen-lg md:px-4 sm:px-3 md:pb-8 pt-4 md:pt-20 w-full ">
                <div className="grid sm:grid-cols-6 lg:grid-cols-7 h-full  md:pb-8">

                    <div className="sm:col-span-3 lg:col-span-3 px-3 md:pe-7 flex flex-col justify-center">
                        <div ref={greetingRef} className="md:pb-6">
                            <h2 className="text-[var(--text-secondary)]">
                                {t('home.greeting')}
                            </h2>
                        </div>
                        <div ref={nameRef} className={HomeCSS.homeSectionName}>
                            <h1 className="text-4xl md:text-5xl font-extrabold flex flex-col justify-end text-[var(--text-heading)]">
                                <span className="uppercase tracking-wide py-1 te">
                                    Loroque Brillant
                                </span>
                                <span className="uppercase tracking-wide py-1 whitespace-nowrap">
                                    Andriamampiadana
                                </span>
                            </h1>
                        </div>

                        <div ref={roleRef} className="flex  pt-2  md:pt-5">
                            <div className="grow flex flex-col justify-center pe-2">
                                <h2 className="text-[var(--text-secondary)] flex flex-col">
                                    <span>{t('home.role')}</span>
                                    <span></span>
                                </h2>
                            </div>
                        </div>

                        <div ref={roleRef} className="flex  pt-2  md:pt-5">
                            <div className="grow flex flex-col justify-center pe-2">
                                <span className="text-[var(--text-secondary)] ">
                                    <span>
                                        4 ans et 5 mois d'expérience (depuis nov. 2021). Basé à Madagascar, 
                                        spécialisé dans les applications SaaS, plateformes métier et solutions web sur mesure.
                                    </span>
                                </span>
                            </div>
                        </div>
                        
                        
                        <div ref={btnRef} className="flex flex-col pt-2 md:pt-5">

                            <div className="flex ">
                                <button className="relative flex text-[var(--btn-bg)]" type="button">
                                    <div className="h-full relative w-10 bg-[var(--color-accent)] flex items-center justify-center">
                                        <FaFileDownload size="25" className="text-white" />
                                    </div>
                                    <div className="text-md font-bold ps-2 bg-[var(--btn-text)] text-[var(--btn-bg)] flex items-center h-11 pe-4 ms-1">
                                        <span >{t('home.downloadCV')}</span>
                                    </div>
                                </button>
                            </div>

                        </div>
                    </div>

                    <div ref={imgRef} className="lg:mt-0 sm:col-span-3 lg:col-span-4 flex flex-col justify-center px-4 md:ps-7">
                        <div className="w-full h-full img-zone  ml-auto">
                                
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default HomeSection;