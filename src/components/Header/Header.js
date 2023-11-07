import React, { useState } from 'react';
import headerCSS from './header.module.css';

const Header = () => {
  //const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <header className="top-0 w-full py-2">
      <div className="mx-auto flex max-w-screen-lg">
          <div className={headerCSS.divLogo}>
            <div className={headerCSS.myLogo}>
              <div className={headerCSS.ligneLogo}></div>
              <div className={headerCSS.logoImg}>
                  <span>LB</span>
              </div>
              <div className={headerCSS.logoText+' flex flex-col pe-3'}>
                <span>LOROQUE</span>
                <span>BRILLANT</span>
              </div>
            </div>
          </div>
          <div className="flex-1">


          </div>
      </div>
    </header>
  );
};

export default Header;
