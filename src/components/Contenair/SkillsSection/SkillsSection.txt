import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillsCSS from "./SkillsSection.module.css";
import { useLanguage } from "../../../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = (props) => {
    const classeCSS = props.className;
    const idSection = props.id;
    const { t } = useLanguage();

    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const pillsRef = useRef(null);

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

            tl.from(titleRef.current, {
                opacity: 0, y: -40, duration: 0.6, ease: "power3.out"
            })
            .from(textRef.current.children, {
                opacity: 0, x: -30, duration: 0.5, stagger: 0.12, ease: "power2.out"
            }, "-=0.2")
            .from(pillsRef.current.children, {
                opacity: 0, scale: 0.5, duration: 0.4, stagger: 0.07, ease: "back.out(1.7)"
            }, "-=0.3");
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id={idSection} className={`${classeCSS} ${SkillsCSS.Skills} items-center justify-center`}>
            <div className="mx-auto max-w-screen-lg md:px-3 sm:px-3 md:pb-5 pt-4 md:pt-5 w-full h-full justify-center py-10">

                <div className="flex flex-col space-y-5 h-full md:pb-8">
                    
                    <div ref={titleRef} className={`${SkillsCSS.skillsSectionTitle} flex flex-col py-4`}>
                        <h2 className="title-section text-[var(--text-heading)] font-bold text-4xl flex flex-col tracking-wide">
                            <span>{t('skills.title')}</span>
                        </h2>
                    </div>

                    <div className="grow grid sm:grid-cols-10 lg:grid-cols-12 md:pb-8 gap-x-6">

                        <div ref={textRef} className="lg:mt-0 sm:col-span-4 lg:col-span-5 flex flex-col justify-start px-3">

                            <div className="">
                                    <h2 className="title-section text-[var(--text-heading)] font-bold text-xl flex flex-col tracking-wide">
                                        <span>{t('skills.whatIKnow')}</span>
                                        <span></span>
                                    </h2>
                                </div>
                                <div className="py-4 text-[var(--text-primary)]">

                                    <p className="pb-4 text-justify">
                                        {t('skills.description1')}
                                    </p>

                                    <p className="pb-4 text-justify">
                                        {t('skills.description2')}
                                    </p>

                                    <p className="pb-4 text-justify">
                                        {t('skills.description3')}
                                    </p>
                                   
                                </div>
                            </div>

                        <div className="sm:col-span-6 lg:col-span-7 px-3 md:pe-7 flex flex-col justify-center">

                            <div ref={pillsRef} className="w-full flex flex-col gap-y-4">
                                
                                <div className="flex flex-col gap-y-2">
                                    <div>
                                        <h3 className="text-[var(--skill-text)] text-sm ps-2">{t('skills.categories.languagesFrameworks')}</h3>
                                    </div>
                                    <div className="w-full flex flex-wrap gap-2">
    
                                        <div className="h-[2.3rem] px-3 rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle ">
                                            <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                                PHP (Laravel, Symfony, CodeIgniter)
                                            </span>
                                        </div>

                                        <div className="h-[2.3rem] px-3 rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle ">
                                            <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                                JS/TS (Vanilla.js, React, Vue.js)
                                            </span>
                                        </div>

                                    </div>
                                </div>

                                <div className="flex flex-col gap-y-2">
                                    <div>
                                        <h3 className="text-[var(--skill-text)] text-sm ps-2">
                                            {t('skills.categories.architectureParadigms')}
                                        </h3>
                                    </div>
                                    <div className="w-full flex flex-wrap gap-2">
    

                                        <div className="h-[2.3rem] px-3  rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle ">
                                            <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                                Clean Architecture, MVC
                                            </span>
                                        </div>

                                        <div className="h-[2.3rem] px-3  rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle ">
                                            <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                                POO, DDD, DTO
                                            </span>
                                        </div>

                                        <div className="h-[2.3rem] px-3  rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle ">
                                            <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                                SOLID
                                            </span>
                                        </div>

                                    </div>
                                </div>

                                <div className="flex flex-col gap-y-2">
                                    <div>
                                        <h3 className="text-[var(--skill-text)] text-sm ps-2">{t('skills.categories.databases')}</h3>
                                    </div>
                                    <div className="w-full flex flex-wrap gap-2">
    
                                        <div className="h-[2.3rem] px-3 rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle ">
                                            <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                                MySQL, PostgreSQL, MongoDB
                                            </span>
                                        </div>
                                        <div className="h-[2.3rem] px-3 rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle ">
                                            <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                                Redis
                                            </span>
                                        </div>
                                        <div className="h-[2.3rem] px-3 rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle ">
                                            <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                                ORM
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-y-2">
                                    <div>
                                        <h3 className="text-[var(--skill-text)] text-sm ps-2">{t('skills.categories.apisComm')}</h3>
                                    </div>
                                    <div className="w-full flex flex-wrap gap-2">
    
                                        <div className="h-[2.3rem] px-3 rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle ">
                                            <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                                REST API, GraphQL, WebSocket
                                            </span>
                                        </div>
                                        <div className="h-[2.3rem] px-3 rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle ">
                                            <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                                JWT
                                            </span>
                                        </div>
                                        <div className="h-[2.3rem] px-3 rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle ">
                                            <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                                Cron scheduling
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-y-2">
                                    <div>
                                        <h3 className="text-[var(--skill-text)] text-sm ps-2">{t('skills.categories.uiDesign')}</h3>
                                    </div>
                                    <div className="w-full flex flex-wrap gap-2">

                                        <div className="h-[2.3rem] px-3  rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle ">
                                            <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                                Tailwind, Bootstrap
                                            </span>
                                        </div>

                                        <div className="h-[2.3rem] px-3  rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle ">
                                            <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                                shadcn/ui
                                            </span>
                                        </div>

                                    </div>
                                </div>

                                <div className="flex flex-col gap-y-2">
                                    <div>
                                        <h3 className="text-[var(--skill-text)] text-sm ps-2">{t('skills.categories.toolsDevops')}</h3>
                                    </div>
                                    <div className="w-full flex flex-wrap gap-2">

                                        <div className="h-[2.3rem] px-3  rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle ">
                                            <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                                Agile/Scrum, UML
                                            </span>
                                        </div>

                                        <div className="h-[2.3rem] px-3  rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle ">
                                            <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                                Jira, Trello 
                                            </span>
                                        </div>
    
                                        <div className="h-[2.3rem] px-3 rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle ">
                                            <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                                Git/Gitflow, Docker, Linux
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        
                    </div>
                </div>

            </div>
        </section>
    );
}

export default SkillsSection;
