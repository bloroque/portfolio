import React from 'react';
import './Loader.css';

const Loader = ({ onFinish }) => {
    return (
        <div className="loader-overlay" onAnimationEnd={(e) => {
            if (e.target.classList.contains('loader-overlay')) onFinish?.();
        }}>
            <div className="loader-content">
                {/* Rotating ring */}
                <div className="loader-ring">
                    <div className="loader-ring-inner"></div>
                </div>

                {/* Logo text */}
                <div className="loader-logo">
                    <span className="loader-letter" style={{ animationDelay: '0.1s' }}>L</span>
                    <span className="loader-letter" style={{ animationDelay: '0.2s' }}>B</span>
                </div>

                {/* Loading bar */}
                <div className="loader-bar-track">
                    <div className="loader-bar-fill"></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
