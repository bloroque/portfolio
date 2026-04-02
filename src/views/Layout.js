import React from 'react'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Contenair from '../components/Contenair/Contenair';


const Layout = () => {
    return (
        <div className="bg-body min-h-screen transition-colors duration-300">
            <Header/>
            <Contenair/>
            <Footer/>
        </div>
    );
}

export default Layout;