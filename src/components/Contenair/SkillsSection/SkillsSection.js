import React from "react";
import SkillsCSS from "./SkillsSection.module.css";

const SkillsSection = (props) => {
    const classeCSS = props.className;
    const idSection = props.id;
    return (
        <section id={idSection} className={`${classeCSS} ${SkillsCSS.Skills}`}>
            <div className="mx-auto max-w-screen-lg md:px-4 sm:px-3 md:pb-5 pt-4 md:pt-5 w-full h-full py-10">

                <div className="flex flex-col h-full  md:pb-8">
                    
                    <div className={`${SkillsCSS.skillsSectionTitle} flex flex-col `}>
                        <h2 className="title-section text-white font-bold text-3xl flex flex-col tracking-wide text-center">
                            <span> ― Development Expertise  ― </span>
                        </h2>
                        <p className="text-center text-white py-4 text-lg">
                            One of US's Most Development Firm is up-to-date <br/> on all the very latest app languages and innovations
                        </p>
                    </div>

                    <div className="grow">




                    </div>
                </div>

            </div>
        </section>
    );
}

export default SkillsSection;