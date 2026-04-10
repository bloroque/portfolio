import React from "react";
import headerCSS from './header.module.css';
import { FaGithub , FaLinkedin, FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";


const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();
  
  // Détection de la page actuelle pour adapter les liens
  const isDetailPage = window.location.pathname === '/detail-projets';
  const linkPrefix = isDetailPage ? '/' : '';

  return (
    <header className={headerCSS.stickyHeader + ' sticky top-0 w-full pt-4 pb-2 px-2 z-50'}>
      
      <div className={headerCSS.menuHeader+' mx-auto flex max-w-screen-lg shadow-md bg-[var(--header-bg)] backdrop-blur-sm transition-colors duration-300'}>
          <div className={headerCSS.divLogo+' px-2 py-2 md:px-6 lg:px-8 lg:py-[.8rem]'}>
            <a href={isDetailPage ? '/' : '#homeSection'} className={headerCSS.myLogo}>
              <div className={headerCSS.ligneLogo}></div>
              <div className={headerCSS.logoImg}>
                  <span>LB</span>
              </div>
              <div className={headerCSS.logoText+' flex flex-col pe-1 sm:pe-2 md:pe-3 text-[.7rem] md:text-[.8rem]'}>
                <span>LOROQUE</span>
                <span>BRILLANT</span>
              </div>
            </a>
          </div>
          <div className="flex-1 flex">
            <div className="relative flex items-center ml-auto">
              <nav className="hidden sm:flex text-sm leading-6 font-semibold  px-2">
                <ul className="flex sm:space-x-4">
                  <li>
                    <a className="text-[var(--text-nav)] hover:text-[var(--text-nav-hover)] transition-colors" href={`${linkPrefix}#aboutSection`}>{t('nav.about')}</a>
                  </li>
                  <li>
                    <a className="text-[var(--text-nav)] hover:text-[var(--text-nav-hover)] transition-colors" href={`${linkPrefix}#skillsSection`}>{t('nav.skills')}</a>
                  </li>
                  <li>
                    <a className="text-[var(--text-nav)] hover:text-[var(--text-nav-hover)] transition-colors" href={`${linkPrefix}#experienceSection`}>{t('nav.experience')}</a>
                  </li>
                  <li>
                    <a className="text-[var(--text-nav)] hover:text-[var(--text-nav-hover)] transition-colors" href={`${linkPrefix}#projectsSection`}>{t('nav.projects')}</a>
                  </li>
                  <li>
                    <a className="text-[var(--text-nav)] hover:text-[var(--text-nav-hover)] transition-colors" href={`${linkPrefix}#contactsSection`}>{t('nav.contact')}</a>
                  </li>
                </ul>
              </nav>
              <div className="flex items-center pe-4 sm:pe-6 ml-4 sm:ml-6 sm:border-l-2 border-[var(--border-theme)]">
                <a href="https://www.linkedin.com/in/loroquebrillant" className="ml-4 sm:ml-6">
                    <span>
                        <FaLinkedin className="text-[var(--icon-color)]" size="25"/>
                    </span>
                </a>
                <a href="https://github.com/bloroque" className="ml-4 sm:ml-6">
                    <span>
                        <FaGithub className="text-[var(--icon-color)]" size="25"/>
                    </span>
                </a>
              </div>
            </div>
          </div>
      </div>

      {/* Floating buttons — fixed right */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5">
        <button
          onClick={toggleTheme}
          className="group w-9 h-9 rounded-xl bg-[var(--bg-card)]/80 backdrop-blur-md border-[var(--border-theme)] border-2 dark:border-white shadow-md flex items-center justify-center hover:border-[var(--color-accent)] hover:shadow-lg hover:shadow-[var(--color-accent)]/10 transition-all duration-300"
          aria-label={isDark ? t('header.lightMode') : t('header.darkMode')}
          title={isDark ? t('header.lightMode') : t('header.darkMode')}
        >
          {isDark
            ? <FaMoon size="14" className="text-white group-hover:text-[var(--color-accent)] transition-colors" />
            : <FaSun size="14" className="text-yellow-500 group-hover:text-yellow-400 transition-colors" />
          }
        </button>
        <button
          onClick={toggleLang}
          className="group w-9 h-9 rounded-xl bg-[var(--bg-card)]/80 backdrop-blur-md  border-[var(--border-theme)] border-2 dark:border-white shadow-md flex items-center justify-center hover:border-[var(--color-accent)] hover:shadow-lg hover:shadow-[var(--color-accent)]/10 transition-all duration-300"
          aria-label={lang === 'en' ? 'Passer en français' : 'Switch to English'}
          title={lang === 'en' ? 'Français' : 'English'}
        >
          <span className="text-[11px] font-bold tracking-wide text-[var(--text-secondary)] group-hover:text-[var(--color-accent)] transition-colors">{lang === 'en' ? 'FR' : 'EN'}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;