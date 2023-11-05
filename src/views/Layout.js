import React from 'react'
import layoutCSS from './layout.module.css';
import Header from '../components/Header';


const Layout = () => {
    return (
        <div className={layoutCSS.app_main}>
            <React.Fragment> 
                <Header/>
            </React.Fragment>
        </div>
    );
}
// <React.Fragment> == <>
export default Layout;