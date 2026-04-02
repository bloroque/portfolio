import React  from "react";
import footerCSS from './footer.module.css';
import { useLanguage } from "../../context/LanguageContext";

const Footer = () => {
    const { t } = useLanguage();
    
    // Détection de la page actuelle pour adapter les liens
    const isDetailPage = window.location.pathname === '/detail-projets';
    const linkPrefix = isDetailPage ? '/' : '';

    return (
        <footer className="top-0 w-full py-3 px-2 transition-colors duration-300">
             <div className="w-full">
                <div className={footerCSS.footerSection+' mx-auto flex max-w-screen-lg md:px-4 sm:px-3 justify-between'}>
                    <div className="">
                        
                    </div>
                </div>
            </div>
            
            <div className="w-full">
                <div className={footerCSS.footerSection+' mx-auto flex max-w-screen-lg md:px-4 sm:px-3 justify-between'}>
                    <div className={footerCSS.divLogo+' px-2 py-2 md:px-6 lg:px-8 lg:py-[.8rem] '}>
                        <a href={isDetailPage ? '/' : '#homeSection'} className={footerCSS.myLogo}>
                            <div className={footerCSS.logoImg}>
                                <span>LB</span>
                            </div>
                            <div className={footerCSS.logoText+' flex flex-col pe-1 sm:pe-2 md:pe-3 text-[.7rem] md:text-[.8rem]'}>
                                <span>LOROQUE</span>
                                <span>BRILLANT</span>
                            </div>
                        </a>
                    </div>
                    <div className="flex">
                        <div className="relative flex items-center ml-auto">
                            <nav className="hidden sm:flex text-sm leading-6 font-semibold uppercase px-2">
                                <ul className="flex sm:space-x-4 md:space-x-8">
                                <li>
                                    <a className="text-[var(--footer-text)] hover:text-sky-300 transition-colors" href={`${linkPrefix}#aboutSection`}>{t('nav.about')}</a>
                                </li>
                                <li>
                                    <a className="text-[var(--footer-text)] hover:text-sky-300 transition-colors" href={`${linkPrefix}#skillsSection`}>{t('nav.skills')}</a>
                                </li>
                                <li>
                                    <a className="text-[var(--footer-text)] hover:text-sky-300 transition-colors" href={`${linkPrefix}#projectsSection`}>{t('nav.projects')}</a>
                                </li>
                                <li>
                                    <a className="text-[var(--footer-text)] hover:text-sky-300 transition-colors" href={`${linkPrefix}#contactsSection`}>{t('nav.contact')}</a>
                                </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="flex justify-center flex-col leading-tight text-[var(--footer-text)] text-xs pe-4 sm:pe-6 ml-4 sm:ml-6 uppercase">
                        <span className="text-left">{t('footer.copyright')} © {new Date().getFullYear()}</span>
                        <span className="text-left">{t('footer.rights')}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;