import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Container from '../components/Container/Container';
import { useLanguage } from '../context/LanguageContext';
import CustomCursor from '../components/CustomCursor/CustomCursor';
import useSmoothScroll from '../hooks/useSmoothScroll';


const Layout = () => {
    const { isTransitioning } = useLanguage();
    const smoothRef = useSmoothScroll(0.08);
    const location = useLocation();

    useEffect(() => {
        const scrollTo = location.state?.scrollTo;
        const hash = scrollTo ? `#${scrollTo}` : window.location.hash;

        // Always scroll to top on initial load (no hash, no state)
        if (!hash) {
            window.scrollTo(0, 0);
            return;
        }

        // Reset scroll to top first
        window.scrollTo(0, 0);

        // Wait for smooth scroll hook to initialize and content to render
        const tryScroll = () => {
            const element = document.querySelector(hash);
            if (element) {
                // Trigger a click on an anchor so useSmoothScroll's onHashClick handles it
                const tempLink = document.createElement('a');
                tempLink.href = hash;
                tempLink.style.display = 'none';
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
            }
        };
        // Delay to let smooth scroll hook set up and content render
        setTimeout(tryScroll, 400);
    }, [location]);

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