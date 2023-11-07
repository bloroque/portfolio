import React, { useState } from 'react';
import headerCSS from './header.module.css';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGithub } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  //const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <header className="top-0 w-full py-2">
      <div className="mx-auto flex max-w-screen-lg md:px-4 sm:px-3">
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
          <div className="flex-1 flex">
            <div className="relative hidden lg:flex items-center ml-auto">
              <nav className="text-sm leading-6 font-semibold uppercase text-slate-700 dark:text-slate-200 px-2">
                <ul className="flex space-x-8">
                  <li>
                    <a class="text-[#fff] hover:text-sky-500" href="/docs/installation">About</a>
                  </li>
                  <li>
                    <a class="text-[#fff] hover:text-sky-500" href="/docs/installation">Skills</a>
                  </li>
                  <li>
                    <a class="text-[#fff]  hover:text-sky-500" href="/docs/installation">Projects</a>
                  </li>
                  <li>
                    <a class="text-[#fff]  hover:text-sky-500" href="/docs/installation">Contact</a>
                  </li>
                </ul>
              </nav>
              <div className="flex items-center">
                <a href="" class="ml-6">
                    <span>
                      {/* <FontAwesomeIcon icon={faGithub} /> */}
                    </span>
                </a>
              </div>
            </div>
            
            {/* <div></div> */}
          </div>
      </div>
    </header>
  );
};

export default Header;
