"use client"

import { FileText } from 'lucide-react';
import { FC, useState } from 'react';
import ThemeDropdown from './ThemeDropdown';
import { useMe } from '@/hooks/auth/useAuth';
import ProfileDropdown from '../auth/ProfileDropdown';

const Navigation: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: user } = useMe();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="absolute bg-[#fafafa] dark:bg-background inset-0 w-full md:relative md:h-auto md:flex md:items-center md:justify-between md:px-8 md:py-4">

      {/* Logo and icon */}
      <div className="absolute top-6 left-6 z-20 md:static md:top-auto md:left-auto flex items-center space-x-3">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
          <FileText className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent select-none">
          DocSpace
        </h1>
      </div>
	  
      <button
        onClick={toggleMenu}
        className="md:hidden absolute top-6 right-6 z-20 p-2"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        <div
          className={`w-6 h-0.5 bg-[#262626] mb-1.5 transition-transform duration-300 ${
            isMenuOpen ? 'transform rotate-45 translate-y-2' : ''
          }`}
        />
        <div
          className={`w-6 h-0.5 bg-[#262626] mb-1.5 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-0' : ''
          }`}
        />
        <div
          className={`w-6 h-0.5 bg-[#262626] transition-transform duration-300 ${
            isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      {/* Menu items */}
      <div
        className={`
          ${isMenuOpen ? 'block' : 'hidden'}
          md:block md:flex md:items-center md:space-x-6
          w-full h-full md:h-auto md:w-auto
          pt-20 md:pt-0
          bg-[#fafafa] md:bg-transparent
          absolute inset-0 md:static
          flex flex-col md:flex-row
          items-center
        `}
      >
        <ul className="flex flex-col md:flex-row md:space-x-6 items-center space-y-6 md:space-y-0">
          <li className="list-none">
            <a
              href="#"
              className="relative inline-block group"
              onClick={() => setIsMenuOpen(false)}
            >
              <span
                className="
                  relative z-10 block uppercase text-[#262626] dark:text-sky-50
                  font-sans font-semibold transition-colors duration-300 
                  group-hover:text-white
                  text-xl py-2 px-3
                  md:text-base md:py-2 md:px-3
                  lg:text-lg lg:py-2 lg:px-4
                "
              >
                Register
              </span>
              <span
                className="
                  absolute inset-0 border-t-2 border-b-2 border-[#262626]
                  transform scale-y-[2] opacity-0 
                  transition-all duration-300 origin-center
                  group-hover:scale-y-100 group-hover:opacity-100
                "
              />
              <span
                className="
                  absolute top-[2px] left-0 w-full h-full bg-[#262626]
                  transform scale-0 opacity-0
                  transition-all duration-300 origin-top
                  group-hover:scale-100 group-hover:opacity-100
                "
              />
            </a>
          </li>
          <li className="list-none">
            <a
              href="#"
              className="relative inline-block group"
              onClick={() => setIsMenuOpen(false)}
            >
              <span
                className="
                  relative z-10 block uppercase text-[#262626] dark:text-sky-50
                  font-sans font-semibold transition-colors duration-300 
                  group-hover:text-white
                  text-xl py-2 px-3
                  md:text-base md:py-2 md:px-3
                  lg:text-lg lg:py-2 lg:px-4
                "
              >
                Login
              </span>
              <span
                className="
                  absolute inset-0 border-t-2 border-b-2 border-[#262626] dark:text-sky-50
                  transform scale-y-[2] opacity-0 
                  transition-all duration-300 origin-center
                  group-hover:scale-y-100 group-hover:opacity-100
                "
              />
              <span
                className="
                  absolute top-[2px] left-0 w-full h-full bg-[#262626] dark:text-sky-50
                  transform scale-0 opacity-0
                  transition-all duration-300 origin-top
                  group-hover:scale-100 group-hover:opacity-100
                "
              />
            </a>
          </li>

          <ThemeDropdown />
          {user && <ProfileDropdown />}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
