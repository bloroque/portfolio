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
            <div className="mx-auto max-w-screen-lg md:px-4 sm:px-3 md:pb-5 pt-4 md:pt-5 w-full h-full justify-center py-10">

                <div className="flex flex-col h-full  md:pb-8">
                    
                    <div ref={titleRef} className={`${SkillsCSS.skillsSectionTitle} flex flex-col `}>
                        <h2 className="title-section text-[var(--text-heading)] font-bold text-3xl flex flex-col tracking-wide text-center">
                            <span>{t('skills.title')}</span>
                        </h2>
                        <p className="text-center text-[var(--text-primary)] py-4 text-lg">
                            {t('skills.subtitle')}
                        </p>
                    </div>

                    <div className="grow grid sm:grid-cols-10 lg:grid-cols-12 md:pb-8">

                        <div ref={textRef} className="lg:mt-0 sm:col-span-4 lg:col-span-5 flex flex-col justify-center px-4 md:ps-7">

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

                                    <p className="text-right font-bold pt-3">
                                        <span>{t('skills.cta')}</span>
                                    </p>

                                </div>


                        </div>

                        <div className="sm:col-span-6 lg:col-span-7 px-3 md:pe-7 flex flex-col justify-center">

                            <div ref={pillsRef} className="w-full flex flex-wrap py-2 ps-2">

                                <div className="h-[2.5rem] px-4 mx-2 rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle my-2">
                                    <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                        VueJS, React, AlpineJs
                                    </span>
                                </div>

                                <div className="h-[2.5rem] px-4 mx-2 rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle my-2">
                                    <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                        Laravel, Symfony, Codeigniter
                                    </span>
                                </div>

                                <div className="h-[2.5rem] px-4 mx-2 rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle my-2">
                                    <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                        Javascript, Typescript
                                    </span>
                                </div>

                                <div className="h-[2.5rem] px-4 mx-2 rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle my-2">
                                    <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                        NodeJs/NestJs/PHP/WebSocket
                                    </span>
                                </div>

                                <div className="h-[2.5rem] px-4 mx-2 rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle my-2">
                                    <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                        VueJS, React, AlpineJs
                                    </span>
                                </div>

                                <div className="h-[2.5rem] px-4 mx-2 rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle my-2">
                                    <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                        API REST, API Graphql
                                    </span>
                                </div>

                                <div className="h-[2.5rem] px-4 mx-2 rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle my-2">
                                    <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                        Livewire
                                    </span>
                                </div>

                                <div className="h-[2.5rem] px-4 mx-2 rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle my-2">
                                    <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                        Agile, UML
                                    </span>
                                </div>

                                <div className="h-[2.5rem] px-4 mx-2 rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle my-2">
                                    <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                        Mysql, PostgreSql, MongoDb, PLSql
                                    </span>
                                </div>

                                <div className="h-[2.5rem] px-4 mx-2 rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle my-2">
                                    <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                        Jira, Trello, Notion    
                                    </span>
                                </div>

                                <div className="h-[2.5rem] px-4 mx-2 rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle my-2">
                                    <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                        Tailwind CSS, Sass, Bootstrap, Material ui
                                    </span>
                                </div>

                                <div className="h-[2.5rem] px-4 mx-2 rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle my-2">
                                    <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                        Linux, Docker, Cron sheduling    
                                    </span>
                                </div>

                                <div className="h-[2.5rem] px-4 mx-2 rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle my-2">
                                    <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                        React Native, Ionic
                                    </span>
                                </div>

                                <div className="h-[2.5rem] px-4 mx-2 rounded-3xl border border-[var(--skill-border)] flex flex-col justify-center align-middle my-2">
                                    <span className="text-[var(--skill-text)] font-bold text-sm flex flex-col tracking-wide">
                                        Mongoose, Sequilize and Prisma ORM   
                                    </span>
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
