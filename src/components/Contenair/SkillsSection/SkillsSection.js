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

                    <div className="grow grid sm:grid-cols-10 lg:grid-cols-12 md:pb-8">

                        <div className="lg:mt-0 sm:col-span-4 lg:col-span-5 flex flex-col justify-center px-4 md:ps-7">

                            <div className="">
                                    <h2 className="title-section text-white font-bold text-xl flex flex-col tracking-wide">
                                        <span> ― what i know</span>
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

                        <div className="sm:col-span-6 lg:col-span-7 px-3 md:pe-7 flex flex-col justify-center">

                            <div className="w-full flex flex-wrap py-2 ps-2">

                                <div className="h-[2.5rem] px-4 mx-2 rounded-3xl border border-[#ffffff] flex flex-col justify-center align-middle my-2">
                                    <span className="text-white font-bold text-sm flex flex-col tracking-wide">
                                        VueJS, React, AlpineJs
                                    </span>
                                </div>

                                <div className="h-[2.5rem] px-4 mx-2 rounded-3xl border border-[#ffffff] flex flex-col justify-center align-middle my-2">
                                    <span className="text-white font-bold text-sm flex flex-col tracking-wide">
                                        Laravel, Symfony, Codeigniter
                                    </span>
                                </div>

                                <div className="h-[2.5rem] px-4 mx-2 rounded-3xl border border-[#ffffff] flex flex-col justify-center align-middle my-2">
                                    <span className="text-white font-bold text-sm flex flex-col tracking-wide">
                                        Javascript, Typescript
                                    </span>
                                </div>

                                <div className="h-[2.5rem] px-4 mx-2 rounded-3xl border border-[#ffffff] flex flex-col justify-center align-middle my-2">
                                    <span className="text-white font-bold text-sm flex flex-col tracking-wide">
                                        NodeJs/NestJs/PHP/WebSocket
                                    </span>
                                </div>

                                <div className="h-[2.5rem] px-4 mx-2 rounded-3xl border border-[#ffffff] flex flex-col justify-center align-middle my-2">
                                    <span className="text-white font-bold text-sm flex flex-col tracking-wide">
                                        VueJS, React, AlpineJs
                                    </span>
                                </div>

                                <div className="h-[2.5rem] px-4 mx-2 rounded-3xl border border-[#ffffff] flex flex-col justify-center align-middle my-2">
                                    <span className="text-white font-bold text-sm flex flex-col tracking-wide">
                                        API REST, API Graphql
                                    </span>
                                </div>

                                <div className="h-[2.5rem] px-4 mx-2 rounded-3xl border border-[#ffffff] flex flex-col justify-center align-middle my-2">
                                    <span className="text-white font-bold text-sm flex flex-col tracking-wide">
                                        Livewire
                                    </span>
                                </div>

                                <div className="h-[2.5rem] px-4 mx-2 rounded-3xl border border-[#ffffff] flex flex-col justify-center align-middle my-2">
                                    <span className="text-white font-bold text-sm flex flex-col tracking-wide">
                                        Agile, UML
                                    </span>
                                </div>

                                <div className="h-[2.5rem] px-4 mx-2 rounded-3xl border border-[#ffffff] flex flex-col justify-center align-middle my-2">
                                    <span className="text-white font-bold text-sm flex flex-col tracking-wide">
                                        Mysql, PostgreSql, MongoDb, PLSql
                                    </span>
                                </div>

                                <div className="h-[2.5rem] px-4 mx-2 rounded-3xl border border-[#ffffff] flex flex-col justify-center align-middle my-2">
                                    <span className="text-white font-bold text-sm flex flex-col tracking-wide">
                                        Jira, Trello, Notion    
                                    </span>
                                </div>

                                <div className="h-[2.5rem] px-4 mx-2 rounded-3xl border border-[#ffffff] flex flex-col justify-center align-middle my-2">
                                    <span className="text-white font-bold text-sm flex flex-col tracking-wide">
                                        Tailwind CSS, Sass, Bootstrap, Material ui
                                    </span>
                                </div>

                                <div className="h-[2.5rem] px-4 mx-2 rounded-3xl border border-[#ffffff] flex flex-col justify-center align-middle my-2">
                                    <span className="text-white font-bold text-sm flex flex-col tracking-wide">
                                        Linux, Docker, Cron sheduling    
                                    </span>
                                </div>

                                <div className="h-[2.5rem] px-4 mx-2 rounded-3xl border border-[#ffffff] flex flex-col justify-center align-middle my-2">
                                    <span className="text-white font-bold text-sm flex flex-col tracking-wide">
                                        React Native, Ionic
                                    </span>
                                </div>

                                <div className="h-[2.5rem] px-4 mx-2 rounded-3xl border border-[#ffffff] flex flex-col justify-center align-middle my-2">
                                    <span className="text-white font-bold text-sm flex flex-col tracking-wide">
                                        Mongoose, Sequilize and Prisma ORM   
                                    </span>
                                </div>



                            </div>
                        </div>
                        
                    </div>
                </div>

            </div>
        </section>
    );
}

export default SkillsSection;