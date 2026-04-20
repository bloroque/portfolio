import React from "react";
import containerCSS from "./Container.module.css";
import AboutSection from "./AboutSection/AboutSection";
import SkillsSection from "./SkillsSection/SkillsSection";
import ExperienceSection from "./ExperienceSection/ExperienceSection";
import ProjectSection from "./ProjectSection/ProjectSection";
import ContactSection from "./ContactSection/ContactSection";
import HeroSection from "./HeroSection/HeroSection";
const Container = () => {
    return (
        <main className={containerCSS.mainPage + " w-full"}>
            <HeroSection id="homeSection" className={`${containerCSS.section} flex align-center justify-center`}/>
            <AboutSection id="aboutSection" className={`${containerCSS.section} flex align-center justify-center`} />
            <SkillsSection id="skillsSection" className={`${containerCSS.section} flex align-center justify-center`} />
            <ExperienceSection id="experienceSection" className={`${containerCSS.section} flex align-center justify-center`} />
            <ProjectSection id="projectsSection" className={`${containerCSS.section} flex align-center justify-center`} />
            <ContactSection id="contactsSection" className={`${containerCSS.section} flex align-center justify-center`} />
        </main>
    );
};

export default Container;
