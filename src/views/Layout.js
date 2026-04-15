import React, { useEffect } from 'react'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Contenair from '../components/Contenair/Contenair';
import { useLanguage } from '../context/LanguageContext';


const Layout = () => {
    const { isTransitioning } = useLanguage();

    useEffect(() => {
        // Détecte si l'URL contient une ancre et scroll vers cette section
        const hash = window.location.hash;
        if (hash) {
            // Utilise un setTimeout pour s'assurer que le DOM est complètement chargé
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    }, []);

    return (
        <div className="bg-body min-h-screen transition-colors duration-300">
            <div className="fixed w-full z-50">   
                <Header/>
            </div>
            
            <div
                className="transition-opacity duration-300 ease-in-out"
                style={{ opacity: isTransitioning ? 0 : 1 }}
            >
                <Contenair/>
                <Footer/>
            </div>
        </div>
    );
}

export default Layout;