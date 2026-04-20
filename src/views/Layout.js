import React, { useEffect } from 'react'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Container from '../components/Container/Container';
import { useLanguage } from '../context/LanguageContext';
import CustomCursor from '../components/CustomCursor/CustomCursor';
import useSmoothScroll from '../hooks/useSmoothScroll';


const Layout = () => {
    const { isTransitioning } = useLanguage();
    const smoothRef = useSmoothScroll(0.08);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    }, []);

    return (
        <div className="min-h-screen transition-colors duration-300">
            <CustomCursor />
            {/* Header stays outside smoothRef so it remains truly fixed */}
            <div className="fixed w-full z-50">   
                <Header/>
            </div>
            <div ref={smoothRef}>
                <div
                    className="transition-opacity duration-300 ease-in-out relative z-[1]"
                    style={{ opacity: isTransitioning ? 0 : 1 }}
                >
                    <Container/>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default Layout;