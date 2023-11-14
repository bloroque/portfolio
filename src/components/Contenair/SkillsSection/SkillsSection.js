import React from "react";

const SkillsSection = (props) => {
    const classeCSS = props.className;
    const idSection = props.id;
    return (
        <section id={idSection} className={classeCSS}>
            <h1> Section skills</h1>
        </section>
    );
}

export default SkillsSection;