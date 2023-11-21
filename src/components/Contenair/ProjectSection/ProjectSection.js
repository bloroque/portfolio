import React from "react";
import ProjetCSS from "./ProjectSection.module.css";

const ProjectSection  = (props) =>{
    const classeCSS = props.className;
    const idSection = props.id;
    return (
        <section id={idSection} className={classeCSS}>
            <div className="mx-auto max-w-screen-lg md:px-4 sm:px-3 md:pb-8 pt-4 md:pt-5 w-full ">
                
                <div className="w-full flex flex-col h-full justify-center">
                    <div className="grid grid-cols-4 w-full grid-rows-1">
                        <div className="col-span-1 img-zone">
                            
                        </div>
                        <div className="col-span-3 img-zone"> 
                        

                        
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default ProjectSection;