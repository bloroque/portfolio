import React from 'react';
import AboutCSS from "./AboutSection.module.css";

const AboutSection = (props) => {
    const classeCSS = props.className;
    const idSection = props.id;

    return (
        <section id={idSection} className={`${classeCSS} ${AboutCSS.About}`}>
            <div className="mx-auto max-w-screen-lg md:px-4 sm:px-3 md:pb-5 pt-4 md:pt-5 w-full ">
                
                <div className="grid sm:grid-cols-6 lg:grid-cols-7 h-full  md:pb-8">

                    <div className="sm:col-span-3 lg:col-span-3 px-3 md:pe-7 flex flex-col justify-center">
                        <div className="w-full h-full h-3/4 img-zone  ml-auto"> </div>
                    </div>

                    <div className="lg:mt-0 sm:col-span-3 lg:col-span-4 flex flex-col justify-center px-4 md:ps-7">
                        <div className={AboutCSS.homeSectionTitle}>
                            <h2 className="title-section text-slate-300 font-bold text-4xl flex flex-col">
                                <span> ― About me</span>
                                <span></span>
                            </h2>
                        </div>
                        <div className="py-4 text-white">

                            <p className="pb-4 text-justify">
                                Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. 
                                Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, 
                                quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.
                            </p>

                            <p className="pb-4 text-justify">
                                Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. 
                                Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500.
                            </p>

                            <p className="pb-4 text-justify">
                                Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.
                            </p>

                            <p className="text-right font-bold pt-3">
                                <span>Let's work together !</span>
                            </p>

                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}

export default AboutSection;