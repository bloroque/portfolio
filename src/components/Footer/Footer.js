import React  from "react";
import footerCSS from './footer.module.css';

const Footer = () => {
    return (
        <footer className="top-0 w-full py-3 bg-theme-2 px-2">
             <div className="w-full">
                <div className={footerCSS.footerSection+' mx-auto flex max-w-screen-lg md:px-4 sm:px-3 justify-between'}>
                    <div className="">
                        
                    </div>
                </div>
            </div>
            
            <div className="w-full">
                <div className={footerCSS.footerSection+' mx-auto flex max-w-screen-lg md:px-4 sm:px-3 justify-between'}>
                    <div className={footerCSS.divLogo+' px-2 py-2 md:px-6 lg:px-8 lg:py-[.8rem] '}>
                        <div className={footerCSS.myLogo}>
                            <div className={footerCSS.logoImg}>
                                <span>LB</span>
                            </div>
                            <div className={footerCSS.logoText+' flex flex-col pe-1 sm:pe-2 md:pe-3 text-[.7rem] md:text-[.8rem]'}>
                                <span>LOROQUE</span>
                                <span>BRILLANT</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="relative flex items-center ml-auto">
                            <nav className="hidden sm:flex text-sm leading-6 font-semibold uppercase text-slate-700 dark:text-slate-200 px-2">
                                <ul className="flex sm:space-x-4 md:space-x-8">
                                <li>
                                    <a class="text-[#fff] hover:text-sky-500" href="/docs/installation">About</a>
                                </li>
                                <li>
                                    <a class="text-[#fff] hover:text-sky-500" href="/docs/installation">Skills</a>
                                </li>
                                <li>
                                    <a class="text-[#fff]  hover:text-sky-500" href="/docs/installation">Projects</a>
                                </li>
                                <li>
                                    <a class="text-[#fff]  hover:text-sky-500" href="/docs/installation">Contact</a>
                                </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="flex justify-center flex-col leading-tight text-white text-xs pe-4 sm:pe-6 ml-4 sm:ml-6 uppercase">
                        <span className="text-left">Copyright © 2023</span>
                        <span className="text-left">All rights reserved</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;