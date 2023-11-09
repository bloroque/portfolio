import React, { useEffect } from "react";
import headerCSS from './header.module.css';
import { FaGithub , FaLinkedin } from "react-icons/fa";


const Header = () => {
  //const [isMenuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    //Code use effect
  }, []);

  return (
    <header className="top-0 w-full pt-8 pb-2 px-2">
      <div className={headerCSS.menuHeader+' mx-auto flex max-w-screen-lg md:px-4 sm:px-3'}>
          <div className={headerCSS.divLogo+' px-2 py-2 md:px-6 lg:px-8 lg:py-[.8rem]'}>
            <div className={headerCSS.myLogo}>
              <div className={headerCSS.ligneLogo}></div>
              <div className={headerCSS.logoImg}>
                  <span>LB</span>
              </div>
              <div className={headerCSS.logoText+' flex flex-col pe-1 sm:pe-2 md:pe-3 text-[.7rem] md:text-[.8rem]'}>
                <span>LOROQUE</span>
                <span>BRILLANT</span>
              </div>
            </div>
          </div>
          <div className="flex-1 flex">
            <div className="relative flex items-center ml-auto">
              <nav className="hidden sm:flex text-sm leading-6 font-semibold uppercase text-slate-700 dark:text-slate-200 px-2">
                <ul className="flex sm:space-x-4 md:space-x-8">
                  <li>
                    <a class="text-[#fff] hover:text-sky-500" href="#section1">About</a>
                  </li>
                  <li>
                    <a class="text-[#fff] hover:text-sky-500" href="#section2">Skills</a>
                  </li>
                  <li>
                    <a class="text-[#fff]  hover:text-sky-500" href="#section3">Projects</a>
                  </li>
                  <li>
                    <a class="text-[#fff]  hover:text-sky-500" href="#section4">Contact</a>
                  </li>
                </ul>
              </nav>
              <div className="flex items-center pe-4 sm:pe-6 ml-4 sm:ml-6 sm:border-l-2">
                <a href="https://www.linkedin.com/in/loroquebrillant" class="ml-4 sm:ml-6">
                    <span>
                        <FaLinkedin className="text-[#fff]" size="25"/>
                    </span>
                </a>
                <a href="https://github.com/bloroque" class="ml-4 sm:ml-6">
                    <span>
                        <FaGithub className="text-[#fff]" size="25"/>
                    </span>
                </a>
              </div>
            </div>
          </div>
      </div>
    </header>
  );
};

export default Header;