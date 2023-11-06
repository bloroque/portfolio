import React from 'react'
import layoutCSS from './layout.module.css';
import Header from '../components/Header/Header';


const Layout = () => {
    return (
        <div className="bg-body py-4">
            <Header/>
        </div>
    );
}
// <React.Fragment> == <>
export default Layout;