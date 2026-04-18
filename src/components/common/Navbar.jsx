import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSun, FiChevronDown, FiFileText, FiTarget, FiAward, FiLayers, FiUsers, FiInfo } from 'react-icons/fi';
import useDarkMode from '../../hooks/useDarkMode';

const MoonIcon = ({ size = 18 }) => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={size} width={size} xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const Navbar = () => {
  const [theme, toggleTheme] = useDarkMode();
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  const formatDate = (date) => date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const aboutLinks = [
    { name: 'RA6847', desc: 'PSC Law', icon: <FiFileText className="text-blue-600" /> },
    { name: 'Mission & Vision', desc: 'Our Goals', icon: <FiTarget className="text-red-600" /> },
    { name: 'Hall of Fame', desc: 'Legends', icon: <FiAward className="text-yellow-600" /> },
    { name: 'Procurement', desc: 'Logistics', icon: <FiLayers className="text-gray-600" /> },
    { name: 'Structure', desc: 'Leadership', icon: <FiUsers className="text-indigo-600" /> },
    { name: 'PSC Profile', desc: 'History', icon: <FiInfo className="text-emerald-600" /> },
  ];

  const isActive = (path) => location.pathname === path;

  const navItemClass = (path) => `
    relative flex items-center justify-center h-full px-4 py-1 uppercase font-bold tracking-tight transition-colors duration-200 text-[10px] text-center
    ${isActive(path) ? 'text-ph-blue dark:text-ph-yellow' : 'text-gray-700 dark:text-white hover:text-ph-blue dark:hover:text-ph-yellow'}
  `;

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 font-poppins">
      
      {/* 1. TOP BAR (HIDDEN ON MOBILE, VISIBLE ON LG+) */}
      <div className="hidden lg:flex bg-gray-100/80 dark:bg-[#0a0a0a]/40 backdrop-blur-lg text-gray-800 dark:text-white text-[10px] py-0 px-10 justify-between items-stretch font-sans tracking-tight border-b border-gray-300 dark:border-white/10 relative z-30"> 
        <div className="flex items-center">
          <a href="https://www.gov.ph" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-ph-blue dark:hover:text-ph-yellow transition-colors pr-4 flex items-center h-full">
            GOVPH
          </a>
          
          <nav className="flex items-stretch border-l border-gray-300 dark:border-white/20">
            <div className="relative flex items-center justify-center border-r border-gray-300 dark:border-white/20">
              <Link className={navItemClass('/')} to="/">Home</Link>
              {isActive('/') && <div className="absolute bottom-0 w-full h-[2px] bg-ph-blue dark:bg-ph-yellow" />}
            </div>
            
            <div className="relative group border-r border-gray-300 dark:border-white/20 flex items-center justify-center">
              <button className={`flex items-center justify-center px-4 py-1 gap-1 uppercase font-bold text-[10px] transition-all group-hover:text-ph-blue dark:group-hover:text-ph-yellow ${location.pathname.includes('/about') ? 'text-ph-blue dark:text-ph-yellow' : ''}`}>
                About Us <FiChevronDown className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              {location.pathname.includes('/about') && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-ph-blue dark:bg-ph-yellow" />}
              
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out translate-y-2 group-hover:translate-y-0 z-50">
                <div className="w-[380px] bg-white/70 dark:bg-[#0a0a0a]/80 backdrop-blur-2xl rounded-2xl shadow-2xl overflow-hidden p-4 border border-gray-200 dark:border-white/10 text-left">
                  <div className="mb-3">
                    <h3 className="text-ph-blue dark:text-ph-yellow font-bold text-[12px] tracking-tight border-b border-gray-200 dark:border-white/5 pb-2">
                      About the Commission
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {aboutLinks.map((link) => (
                      <Link key={link.name} to={`/about/${link.name.toLowerCase().replace(/ /g, '-')}`} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-white/10">
                          {React.cloneElement(link.icon, { size: 14 })}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-gray-800 dark:text-gray-100 font-bold text-[10px] leading-none mb-1 truncate">{link.name}</p>
                          <p className="text-gray-500 text-[8px] font-medium truncate uppercase tracking-tighter">{link.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>        
                </div>
              </div>
            </div>

            {['Transparency Seal', 'The Podium', 'Careers', 'Contact Us'].map((item) => {
              const path = item === 'Transparency Seal' ? '/transparency' : `/${item.toLowerCase().replace(/ /g, '-')}`;
              return (
                <div key={item} className="relative flex items-center justify-center border-r border-gray-300 dark:border-white/20 last:border-r-0">
                  <Link className={navItemClass(path)} to={path}>{item}</Link>
                  {isActive(path) && <div className="absolute bottom-0 w-full h-[2px] bg-ph-blue dark:bg-ph-yellow" />}
                </div>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center opacity-80 uppercase font-medium">
          PST: <span className="font-bold text-ph-blue dark:text-ph-yellow ml-1">{formatDate(currentTime)} | {formatTime(currentTime)}</span>
        </div>
      </div>

      {/* 2. MAIN BRANDING BAR (VISIBLE ON ALL SCREENS) */}
      <div className="relative z-20 bg-white/50 dark:bg-[#0a0a0a]/60 backdrop-blur-2xl py-3 px-4 md:px-10 flex justify-between items-center border-b border-gray-200 dark:border-transparent shadow-[0_4px_30px_rgba(0,0,0,0.1)]"> 
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/">
            <img alt="PSC Favicon" className="h-8 md:h-12 w-auto object-contain block" src="/favicon.svg" />
          </Link>
          <Link to="/">
            <img 
              alt="PSC Banner Text" 
              className="h-5 md:h-8 w-auto object-contain block" 
              style={{ filter: theme === 'light' ? 'brightness(0)' : 'none' }} 
              src="/logo_banner_text.png" 
            />
          </Link>
        </div>
        
        <div className="flex items-center">
          <button onClick={toggleTheme} className="p-2 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-md border border-gray-200/50 dark:border-white/10 text-gray-800 dark:text-white hover:text-ph-blue dark:hover:text-ph-yellow transition-all shadow-sm">
            {theme === 'light' ? <MoonIcon size={20} /> : <FiSun size={20} />}
          </button>
        </div>
      </div>

      {/* BOTTOM GRADIENT BORDER */}
      <div className="h-[2px] bg-gradient-to-r from-ph-blue via-ph-red to-ph-yellow w-full relative z-20" />
    </header>
  );
};

export default Navbar;