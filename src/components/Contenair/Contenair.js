import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import contenairCSS from "./contenair.module.css";

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
                pin : true,
                pinSpacing:false
            });
        });
    }, []);

    return (
        <main className={contenairCSS.mainPage + " w-full"}>
            <section id="section1" className={`${contenairCSS.section} bg-slate-400 flex align-center justify-center`}>
                <h1>Section 1</h1>
            </section>
            <section id="section2" className={`${contenairCSS.section} bg-slate-100 flex align-center justify-center`}>
                <h1>Section 2</h1>
            </section>
            <section id="section3" className={`${contenairCSS.section} bg-red-600 flex align-center justify-center`}>
                <h1>Section 3</h1>
            </section>
            <section id="section4" className={`${contenairCSS.section} bg-green-600 flex align-center justify-center`}>
                <h1>Section 3</h1>
            </section>
        </main>
    );
};

export default Contenair;
