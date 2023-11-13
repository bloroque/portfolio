import React from "react";
import HomeCSS from "./HomeSection.module.css";
import {FaFileDownload } from "react-icons/fa";

const HomeSection = (props) => {
    const classeCSS = props.className;
    const idSection = props.id;
    return (
        <section id={idSection} className={classeCSS}>
            <div className="mx-auto max-w-screen-lg md:px-4 sm:px-3 md:pb-8 pt-4 md:pt-20 w-full ">
                
                <div className="grid sm:grid-cols-6 lg:grid-cols-7 h-full  md:pb-8">

                    <div className="sm:col-span-3 lg:col-span-3 px-3 md:pe-7 flex flex-col justify-center">
                        <div className="md:pb-6">
                            <h2 className="text-slate-300 text-right">Bonjour, je suis </h2>
                        </div>
                        <div className={HomeCSS.homeSectionName}>
                            <h1 class="text-5xl md:text-6xl font-extrabold flex flex-col justify-end text-white">
                                <span className="text-right uppercase tracking-wide py-1">Loroque</span> 
                                <span className="text-right uppercase tracking-wide py-1 whitespace-nowrap">Brillant . A</span>
                            </h1>
                        </div>

                        <div className="flex  pt-2  md:pt-5">
                            <div className="grow flex flex-col justify-center pe-2">
                                <h2 className="text-slate-300 text-right flex flex-col">
                                    <span>Dévéloppeur Fullstack</span>
                                    <span></span>
                                </h2>
                            </div>
                            <div className="relative">
                                <div className="w-14 h-14 bg-white rounded-full border-2 border-[#3767D2] relative"></div>
                            </div>
                        </div>

                        <div className="flex flex-col pt-2 md:pt-5">
                            <div className="flex flex-row-reverse">
                                <button className="relative flex   rounded text-[#2445A6]" type="button">
                                    <div className="h-full relative w-10 bg-[#3767D2] rounded-s rounded-s flex items-center justify-center">
                                        <FaFileDownload size="25" className="text-white" />
                                    </div>
                                    <div className="text-md font-bold ps-2 bg-white flex items-center h-11 pe-4 ms-1">
                                        <span >Télécharger Mon CV</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                    </div>

                    <div className="lg:mt-0 sm:col-span-3 lg:col-span-4 flex flex-col justify-center px-4 md:ps-7">
                        <div className="w-full h-full img-zone  ml-auto"> </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default HomeSection;