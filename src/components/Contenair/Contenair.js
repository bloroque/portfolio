import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import contenairCSS from "./contenair.module.css";
import HomeSection from "./HomeSection/HomeSection";
import AboutSection from "./AboutSection/AboutSection";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({
    toggleActions: "restart pause resumer none",
    markers: false
});

const Contenair = () => {
    useEffect(() => {
        gsap.utils.toArray(`.${contenairCSS.section}`).forEach((section,i) => {
            ScrollTrigger.create({
                trigger : section,
                start: "top top",
                scroller : `.${contenairCSS.mainPage}`,
                // end : "+100vh",
                pin : false,
                pinSpacing:false
            });
        });
    }, []);

    return (
        <main className={contenairCSS.mainPage + " w-full"}>
            <HomeSection id="homeSection" className={`${contenairCSS.section} flex align-center justify-center`}/>
            <AboutSection id="aboutSection" className={`${contenairCSS.section} flex align-center justify-center`} />
          
            <section id="section2" className={`${contenairCSS.section} flex align-center justify-center`}>
                <h1>Section 2</h1>
            </section>
            <section id="section3" className={`${contenairCSS.section} flex align-center justify-center`}>
                <h1>Section 3</h1>
            </section>
            <section id="section4" className={`${contenairCSS.section} flex align-center justify-center`}>
                <h1>Section 3</h1>
            </section>
        </main>
    );
};

export default Contenair;
