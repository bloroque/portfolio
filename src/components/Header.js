import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white p-4 flex flex-col md:flex-row md:justify-between items-center">
      <div className="flex items-center space-x-2">
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        <div className="hidden md:flex items-center space-x-2">
          <div className="bg-white text-gray-900 p-2 rounded-full">LB</div>
          <div className="hidden md:block">Loroque Brillant</div>
        </div>
      </div>

      <nav
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:flex md:space-x-4 mt-4 md:mt-0`}
      >
        <a href="#" className="hover:underline">Works</a>
        <a href="#" className="hover:underline">About</a>
        <a href="#" className="hover:underline">Aword</a>
      </nav>

      <div className={`${
        isMenuOpen ? 'block' : 'hidden'
      } md:flex space-x-4 mt-4 md:mt-0`}>
        <button className="hover:bg-white hover:text-gray-900 border border-white px-2 rounded-full">
          Contact
        </button>
        <button className="hover:bg-white hover:text-gray-900 border border-white px-2 rounded-full">
          Workspace
        </button>
      </div>
    </header>
  );
};

export default Header;
