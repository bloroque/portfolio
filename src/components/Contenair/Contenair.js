import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import contenairCSS from "./contenair.module.css";
import HomeSection from "./HomeSection/HomeSection";
import AboutSection from "./AboutSection/AboutSection";
import SkillsSection from "./SkillsSection/SkillsSection";
import ProjectSection from "./ProjectSection/ProjectSection";
import ContactSection from "./ContactSection/ContactSection";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({
    toggleActions: "restart pause resumer none",
    markers: false
});

const Contenair = () => {
    useEffect(() => {
        gsap.utils.toArray(`.${contenairCSS.section}`).forEach((section,i) => {
            ScrollTrigger.create({
                trigger : section,
                start: "top top",
                scroller : `.${contenairCSS.mainPage}`,
                // end : "+100vh",
                pin : false,
                pinSpacing:false
            });
        });
    }, []);

    return (
        <main className={contenairCSS.mainPage + " w-full"}>
            <HomeSection id="homeSection" className={`${contenairCSS.section} flex align-center justify-center`}/>
            <AboutSection id="aboutSection" className={`${contenairCSS.section} flex align-center justify-center`} />
            <SkillsSection id="skillsSection" className={`${contenairCSS.section} flex align-center justify-center`} />
            <ProjectSection id="projectsSection" className={`${contenairCSS.section} flex align-center justify-center`} />
            <ContactSection id="contactsSection" className={`${contenairCSS.section} flex align-center justify-center`} />
        </main>
    );
};

export default Contenair;
