import React, { useEffect } from 'react'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Contenair from '../components/Contenair/Contenair';


const Layout = () => {
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
            <Header/>
            <Contenair/>
            <Footer/>
        </div>
    );
}

export default Layout;