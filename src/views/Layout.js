import React from 'react'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Contenair from '../components/Contenair/Contenair';


const Layout = () => {
    return (
        <div className="bg-body">
            <Header/>
            <Contenair/>
            <Footer/>
        </div>
    );
}
// <React.Fragment> == <>
export default Layout;