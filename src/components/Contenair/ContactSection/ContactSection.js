import React from "react";

const ContactSection = (props) => {
    const classeCSS = props.className;
    const idSection = props.id;

    return (
        <section id={idSection} className={classeCSS}>
            <h1>Section 3</h1>
        </section>
    );
}

export default ContactSection;