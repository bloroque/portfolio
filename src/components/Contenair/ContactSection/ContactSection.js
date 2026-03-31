import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../../../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = (props) => {
    const classeCSS = props.className;
    const idSection = props.id;
    const { t } = useLanguage();

    const sectionRef = useRef(null);
    const titleBlockRef = useRef(null);
    const formRef = useRef(null);

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

            tl.from(titleBlockRef.current, {
                opacity: 0, x: -60, duration: 0.7, ease: "power3.out"
            })
            .from(formRef.current.children, {
                opacity: 0, y: 30, duration: 0.5, stagger: 0.12, ease: "power2.out"
            }, "-=0.3");
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id={idSection} className={classeCSS}>
            <div className="mx-auto max-w-screen-lg md:px-4 sm:px-3 md:pb-8 pt-4 md:pt-10 w-full">
                <div className="grid sm:grid-cols-6 lg:grid-cols-7 h-full md:pb-8">

                    <div ref={titleBlockRef} className="sm:col-span-3 lg:col-span-3 px-3 md:pe-7 flex flex-col justify-center">
                        <h2 className="title-section text-[var(--text-heading)] font-bold text-4xl flex flex-col tracking-wide">
                            <span>{t('contact.title')}</span>
                        </h2>
                        <p className="py-4 text-[var(--text-primary)] text-justify">
                            {t('contact.description')}
                        </p>
                    </div>

                    <div className="lg:mt-0 sm:col-span-3 lg:col-span-4 flex flex-col justify-center px-4 md:ps-7">
                        <form ref={formRef} className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="flex flex-col gap-1">
                                <label className="text-[var(--text-secondary)] text-sm font-semibold">{t('contact.nameLabel')}</label>
                                <input
                                    type="text"
                                    placeholder={t('contact.namePlaceholder')}
                                    className="px-4 py-3 rounded border border-[var(--border-theme)] bg-[var(--bg-card)] text-[var(--text-primary)] outline-none focus:border-[var(--color-accent)] transition-colors"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[var(--text-secondary)] text-sm font-semibold">{t('contact.emailLabel')}</label>
                                <input
                                    type="email"
                                    placeholder={t('contact.emailPlaceholder')}
                                    className="px-4 py-3 rounded border border-[var(--border-theme)] bg-[var(--bg-card)] text-[var(--text-primary)] outline-none focus:border-[var(--color-accent)] transition-colors"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[var(--text-secondary)] text-sm font-semibold">{t('contact.messageLabel')}</label>
                                <textarea
                                    rows="5"
                                    placeholder={t('contact.messagePlaceholder')}
                                    className="px-4 py-3 rounded border border-[var(--border-theme)] bg-[var(--bg-card)] text-[var(--text-primary)] outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
                                ></textarea>
                            </div>
                            <div className="flex flex-row-reverse">
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-[var(--color-accent)] text-white font-bold rounded hover:opacity-90 transition-opacity"
                                >
                                    {t('contact.sendButton')}
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default ContactSection;