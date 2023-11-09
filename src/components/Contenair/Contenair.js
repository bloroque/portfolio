import React  from "react";
import contenairCSS from './contenair.module.css';

const Contenair = () => {
    return (
        <main className={contenairCSS.mainPage+' w-full'}>
            <section id="section1" className="bg-slate-400"></section>
            <section id="section2" className="bg-slate-100"></section>
            <section id="section3" className="bg-red-600"></section>
            <section id="section4" className="bg-green-600"></section>
        </main>
    );
};

export default Contenair;