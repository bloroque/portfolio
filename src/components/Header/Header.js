import React, { useState } from 'react';
import headerCSS from './header.module.css';

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <header className="top-0 w-full">
      <div className="mx-auto flex max-w-screen-xl p-4">
          <div className={headerCSS.divLogo}>
            <div className={headerCSS.myLogo}>
              <div className={headerCSS.ligne}></div>
              <div className={headerCSS.logoImg}>
                  <span>LB</span>
              </div>
              <div className={headerCSS.logoText+' flex flex-col'}>
                <span>LOROQUE</span>
                <span>BRILLANT</span>
              </div>
            </div>
          </div>


          <div className="">

          </div>
          <div className="">

          </div>
      </div>
    </header>
  );
};

export default Header;
