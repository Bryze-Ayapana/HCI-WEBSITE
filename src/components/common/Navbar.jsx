import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSun, FiChevronDown, FiFileText, FiTarget, FiAward, FiLayers, FiUsers, FiInfo } from 'react-icons/fi';
import useDarkMode from '../../hooks/useDarkMode';

const MoonIcon = ({ size = 18 }) => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
    strokeLinecap="round" strokeLinejoin="round" height={size} width={size}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const Navbar = () => {
  const [theme, toggleTheme] = useDarkMode();
  const location = useLocation();

  const aboutLinks = [
    { name: 'RA6847',           desc: 'PSC Law',    icon: <FiFileText className="text-blue-500" />,  path: '/about/ra6847' },
    { name: 'Hall of Fame',    desc: 'Legends',    icon: <FiAward className="text-yellow-500" />,   path: '/about/hall-of-fame' },
    { name: 'Procurement',     desc: 'Logistics',  icon: <FiLayers className="text-gray-400" />,    path: '/about/procurement' },
    { name: 'Structure',       desc: 'Leadership', icon: <FiUsers className="text-indigo-400" />,   path: '/about/structure' },
    { name: 'PSC Profile',     desc: 'History',    icon: <FiInfo className="text-emerald-400" />,   path: '/about/psc-profile' },
  ];

  const isActive = (path) => location.pathname === path;
  const inAbout  = location.pathname.startsWith('/about');

  const getLogoTextFilter = () => {
    return theme === 'light' 
      ? 'brightness(0)' 
      : 'brightness(0) invert(1)'; 
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 font-poppins transition-all duration-300">

      <div className="
        relative z-30
        bg-white/50 dark:bg-[#0a0a0a]/60
        backdrop-blur-2xl
        border-b border-gray-200 dark:border-white/8
        shadow-[0_4px_30px_rgba(0,0,0,0.08)]
        px-4 md:px-10 py-2
        flex items-center justify-between
      ">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/" data-discover="true">
            <img
              src="/favicon.svg"
              alt="PSC Logo"
              className="h-8 md:h-12 w-auto object-contain block"
            />
          </Link>
          <Link to="/" data-discover="true">
            <img
              src="/logo_banner_text.png"
              alt="PSC Banner Text"
              className="h-5 md:h-8 w-auto object-contain block"
              style={{ filter: getLogoTextFilter() }}
            />
          </Link>
        </div>

        <button
          onClick={toggleTheme}
          className="
            p-1.5 rounded-full
            bg-white/50 dark:bg-white/10
            backdrop-blur-md
            border border-gray-200/60 dark:border-white/10
            text-gray-700 dark:text-white
            hover:text-ph-blue dark:hover:text-ph-yellow
            transition-all shadow-sm
          "
        >
          {theme === 'light' ? <MoonIcon size={17} /> : <FiSun size={17} />}
        </button>
      </div>

      <div className="
        hidden lg:flex
        relative z-20
        bg-gray-100/80 dark:bg-[#0a0a0a]/40
        backdrop-blur-lg
        border-b border-gray-300 dark:border-white/10
        px-10
        items-stretch
        text-[10px] font-bold uppercase tracking-tight
      ">
        <div className="flex items-stretch flex-1">
          
          <a
            href="https://www.gov.ph"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center px-4 py-2
              text-gray-700 dark:text-white
              hover:text-ph-blue dark:hover:text-ph-yellow
              border-r border-gray-300 dark:border-white/20
              transition-colors duration-200
            "
          >
            GOVPH
          </a>

          <NavItem to="/" label="Home" active={isActive('/')} />

          <div className="relative group flex items-stretch">
            <button className={`
              relative flex items-center gap-1 px-4 py-2
              border-r border-gray-300 dark:border-white/20
              transition-colors duration-200
              ${inAbout
                ? 'text-ph-blue dark:text-ph-yellow'
                : 'text-gray-700 dark:text-white hover:text-ph-blue dark:hover:text-ph-yellow'
              }
            `}>
              About Us
              <FiChevronDown size={11} className="transition-transform duration-300 group-hover:rotate-180" />
              {inAbout && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-ph-blue dark:bg-ph-yellow" />
              )}
            </button>

            <div className="
              absolute top-full left-0 pt-2
              opacity-0 invisible pointer-events-none
              group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto
              translate-y-2 group-hover:translate-y-0
              transition-all duration-300 ease-out z-50
            ">
              <div className="
                w-[380px]
                bg-white/70 dark:bg-[#0a0a0a]/80
                backdrop-blur-2xl
                rounded-2xl shadow-2xl
                border border-gray-200 dark:border-white/10
                p-4 text-left
              ">
                <h3 className="
                  text-ph-blue dark:text-ph-yellow
                  font-bold text-[11px] tracking-tight
                  border-b border-gray-200 dark:border-white/5
                  pb-2 mb-3
                ">
                  About the Commission
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {aboutLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="
                        flex items-center gap-3 p-2 rounded-xl
                        hover:bg-gray-100 dark:hover:bg-white/5
                        transition-all group/item
                      "
                    >
                      <div className="p-2 rounded-lg bg-gray-100 dark:bg-white/10 group-hover/item:bg-gray-200 dark:group-hover/item:bg-white/15 transition-colors">
                        {React.cloneElement(link.icon, { size: 14 })}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-gray-800 dark:text-gray-100 font-bold text-[10px] leading-none mb-1 truncate">
                          {link.name}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-[8px] font-medium truncate uppercase tracking-tighter">
                          {link.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Careers removed from mapping here */}
          {[
            { label: 'Transparency Seal', path: '/transparency' },
            { label: 'The Podium',         path: '/the-podium' },
            { label: 'Contact Us',        path: '/contact-us' },
          ].map((item) => (
            <NavItem key={item.path} to={item.path} label={item.label} active={isActive(item.path)} />
          ))}
        </div>
      </div>

      <div className="h-[2px] bg-gradient-to-r from-ph-blue via-ph-red to-ph-yellow w-full relative z-20" />

    </header>
  );
};

const NavItem = ({ to, label, active }) => (
  <Link
    to={to}
    className={`
      relative flex items-center px-4 py-2
      border-r border-gray-300 dark:border-white/20
      transition-colors duration-200 uppercase font-bold text-[10px]
      ${active
        ? 'text-ph-blue dark:text-ph-yellow'
        : 'text-gray-700 dark:text-white hover:text-ph-blue dark:hover:text-ph-yellow'
      }
    `}
  >
    {label}
    {active && (
      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-ph-blue dark:bg-ph-yellow" />
    )}
  </Link>
);

export default Navbar;