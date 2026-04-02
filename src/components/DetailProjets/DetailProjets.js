import React from "react";
import DetailProjetsCSS from "./DetailProjets.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const DetailProjets = () => {
    const projects = [
        {
            id: 1,
            title: "Projet 1",
            description: "Description du projet 1",
            image: "/images/project1.jpg",
            technologies: ["React", "Node.js", "MongoDB"],
        },
        {
            id: 2,
            title: "Projet 2",
            description: "Description du projet 2",
            image: "/images/project2.jpg",
            technologies: ["Vue.js", "Laravel", "MySQL"],
        },
        {
            id: 3,
            title: "Projet 3",
            description: "Description du projet 3",
            image: "/images/project3.jpg",
            technologies: ["React", "Symfony", "PostgreSQL"],
        },
        {
            id: 4,
            title: "Projet 4",
            description: "Description du projet 4",
            image: "/images/project4.jpg",
            technologies: ["JavaScript", "PHP", "MongoDB"],
        },
    ];

    return (
        <div className="bg-body min-h-screen transition-colors duration-300">
            <div className={DetailProjetsCSS.detailProjetsContainer}>
                {/* Header */}
                <Header />

                {/* Titre détail projet */}
                <section className={DetailProjetsCSS.titleSection}>
                <div className="mx-auto max-w-screen-lg px-4 py-8">
                    <h2 className="text-[var(--text-heading)] font-bold text-4xl text-center">
                        Détails des Projets
                    </h2>
                    <p className="text-[var(--text-primary)] text-center text-lg mt-4">
                        Découvrez mes réalisations et les technologies utilisées
                    </p>
                </div>
            </section>

            {/* Liste projets (grid col 2) */}
            <section className={DetailProjetsCSS.projectsSection}>
                <div className="mx-auto max-w-screen-lg px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.map((project) => (
                            <div key={project.id} className={DetailProjetsCSS.projectCard}>
                                <div className={DetailProjetsCSS.projectImage}>
                                    <div className="w-full h-48 bg-[var(--color-accent)] rounded-t-lg flex items-center justify-center">
                                        <span className="text-white text-lg font-bold">{project.title}</span>
                                    </div>
                                </div>
                                <div className={DetailProjetsCSS.projectContent}>
                                    <h3 className="text-[var(--text-heading)] font-bold text-xl mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-[var(--text-primary)] mb-4">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 text-xs font-semibold rounded-full bg-[var(--skill-border)] text-[var(--skill-text)]"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <button className="mt-4 px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg hover:opacity-90 transition-opacity">
                                        Voir plus
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
            </div>
        </div>
    );
};

export default DetailProjets;