import React, { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutCSS from "./AboutSection.module.css";
import { useLanguage } from "../../../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = (props) => {
    const classeCSS = props.className;
    const idSection = props.id;
    const { t } = useLanguage();

    const sectionRef = useRef(null);
    const imgZoneRef = useRef(null);
    const titleRef = useRef(null);
    const paragraphsRef = useRef(null);

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

            tl.from(imgZoneRef.current, {
                opacity: 0, x: -80, duration: 0.8, ease: "power3.out"
            })
            .from(titleRef.current, {
                opacity: 0, y: -30, duration: 0.6, ease: "power3.out"
            }, "-=0.4")
            .from(paragraphsRef.current.children, {
                opacity: 0, y: 25, duration: 0.5, stagger: 0.15, ease: "power2.out"
            }, "-=0.3");
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id={idSection} className={`${classeCSS} ${AboutCSS.About}`}>
            <div className="mx-auto max-w-screen-lg md:px-4 sm:px-3 md:pb-5 pt-4 md:pt-5 w-full ">
                
                <div className="grid sm:grid-cols-6 lg:grid-cols-7 h-full  md:pb-8">

                    <div ref={imgZoneRef} className="sm:col-span-3 lg:col-span-3 px-3 md:pe-7 flex flex-col justify-center">
                        <div className="w-full h-3/4 img-zone  ml-auto"> </div>
                    </div>

                    <div className="lg:mt-0 sm:col-span-3 lg:col-span-4 flex flex-col justify-center px-4 md:ps-7">
                        <div ref={titleRef} className={AboutCSS.homeSectionTitle}>
                            <h2 className="title-section text-[var(--text-heading)] font-bold text-4xl flex flex-col tracking-wide">
                                <span>{t('about.title')}</span>
                                <span></span>
                            </h2>
                        </div>
                        <div ref={paragraphsRef} className="py-4 text-[var(--text-primary)]">

                            <p className="pb-4 text-justify">
                                {t('about.paragraph1')}
                            </p>

                            <p className="pb-4 text-justify">
                                {t('about.paragraph2')}
                            </p>

                            <p className="pb-4 text-justify">
                                {t('about.paragraph3')}
                            </p>

                            <p className="text-right font-bold pt-3">
                                <span>{t('about.cta')}</span>
                            </p>

                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}

export default AboutSection;