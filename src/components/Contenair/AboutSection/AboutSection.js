import React from 'react';


const AboutSection = (props) => {
    const classeCSS = props.className;
    const idSection = props.id;

    return (
        <section id={idSection} className={classeCSS}>
            <h1>About</h1>
        </section>
    );
}

export default AboutSection;