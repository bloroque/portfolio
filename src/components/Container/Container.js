import React from "react";
import containerCSS from "./Container.module.css";
import AboutSection from "./AboutSection/AboutSection";
import SkillsSection from "./SkillsSection/SkillsSection";
import ExperienceSection from "./ExperienceSection/ExperienceSection";
import ProjectSection from "./ProjectSection/ProjectSection";
import ContactSection from "./ContactSection/ContactSection";
import HeroSection from "./HeroSection/HeroSection";
import useOverlappingSections from "@/hooks/useOverlappingSections";

const sections = [
    { key: "hero",       Component: HeroSection,       id: "homeSection" },
    { key: "about",      Component: AboutSection,      id: "aboutSection" },
    { key: "skills",     Component: SkillsSection,      id: "skillsSection" },
    { key: "experience", Component: ExperienceSection,  id: "experienceSection" },
    { key: "projects",   Component: ProjectSection,     id: "projectsSection" },
    { key: "contacts",   Component: ContactSection,     id: "contactsSection" },
];

const Container = () => {
    const overlappingRef = useOverlappingSections();

    return (
        <main ref={overlappingRef} className={containerCSS.mainPage + " w-full"}>
            {sections.map(({ key, Component, id }, index) => {
                const isFirst = index === 0;
                // Toutes les sections partagent le même fond, sauf la première
                // (Hero) qui reste transparente pour laisser voir le canvas.
                const bg = isFirst ? 'transparent' : 'var(--bg-section)';

                return (
                    <div
                        key={key}
                        data-section-overlay
                        className={containerCSS.sectionOverlay}
                        style={{ zIndex: index + 1, backgroundColor: bg }}
                    >
                        <Component
                            id={id}
                            className={`${containerCSS.section} ${key === 'contacts' ? containerCSS.sectionContact : ''} flex align-center justify-center`}
                            style={{ backgroundColor: bg }}
                        />
                    </div>
                );
            })}
        </main>
    );
};

export default Container;
