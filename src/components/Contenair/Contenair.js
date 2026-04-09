import React from "react";
import contenairCSS from "./contenair.module.css";
import HomeSection from "./HomeSection/HomeSection";
import AboutSection from "./AboutSection/AboutSection";
import SkillsSection from "./SkillsSection/SkillsSection";
import ProjectSection from "./ProjectSection/ProjectSection";
import ContactSection from "./ContactSection/ContactSection";
import HeroSection from "./HeroSection/HeroSection";
const Contenair = () => {
    return (
        <main className={contenairCSS.mainPage + " w-full"}>
            <HeroSection id="homeSection" className={`${contenairCSS.section} flex align-center justify-center`}/>
            {/* <HomeSection id="homeSection" className={`${contenairCSS.section} flex align-center justify-center`}/> */}
            <AboutSection id="aboutSection" className={`${contenairCSS.section} flex align-center justify-center`} />
            <SkillsSection id="skillsSection" className={`${contenairCSS.section} flex align-center justify-center`} />
            <ProjectSection id="projectsSection" className={`${contenairCSS.section} flex align-center justify-center`} />
            <ContactSection id="contactsSection" className={`${contenairCSS.section} flex align-center justify-center`} />
        </main>
    );
};

export default Contenair;
