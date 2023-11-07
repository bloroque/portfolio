import React from 'react'
import layoutCSS from './layout.module.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';


const Layout = () => {
    return (
        <div className="bg-body py-5">
            <Header/>

            <Footer/>
        </div>
    );
}
// <React.Fragment> == <>
export default Layout;