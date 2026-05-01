import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSun, FiChevronDown, FiMenu, FiX, FiFacebook, FiYoutube, FiInstagram, FiTwitter, FiFileText, FiAward, FiLayers, FiUsers, FiInfo } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import useDarkMode from '../../hooks/useDarkMode';

const MoonIcon = ({ size = 18 }) => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={size} width={size}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const Navbar = () => {
  const [theme, toggleTheme] = useDarkMode();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const location = useLocation();

  const aboutLinks = [
    { name: 'RA6847', desc: 'PSC Law', icon: <FiFileText className="text-blue-500" />, path: '/about/ra6847' },
    { name: 'Hall of Fame', desc: 'Legends', icon: <FiAward className="text-yellow-500" />, path: '/about/hall-of-fame' },
    { name: 'Procurement', desc: 'Logistics', icon: <FiLayers className="text-gray-400" />, path: '/about/procurement' },
    { name: 'PSC Officials', desc: 'Leadership', icon: <FiUsers className="text-indigo-400" />, path: '/about/structure' },
    { name: 'PSC Profile', desc: 'History', icon: <FiInfo className="text-emerald-400" />, path: '/about/psc-profile' },
  ];

  const isActive = (path) => location.pathname === path;
  const inAbout = location.pathname.startsWith('/about');

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const getLogoTextFilter = () => theme === 'light' ? 'brightness(0)' : 'brightness(0) invert(1)';

  return (
    <header className="fixed top-0 left-0 w-full z-50 font-poppins transition-all duration-300">
      
      {/* ── MAIN TOP BAR ── */}
      <div className="relative z-50 bg-white/50 dark:bg-[#0a0a0a]/60 backdrop-blur-2xl border-b border-gray-200 dark:border-white/10 px-4 md:px-10 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link data-discover="true" to="/">
            <img alt="PSC Logo" className="h-8 md:h-12 w-auto object-contain block" src="/favicon.svg" />
          </Link>
          <Link data-discover="true" to="/">
            <img alt="PSC Banner Text" className="h-5 md:h-8 w-auto object-contain block" src="/logo_banner_text.png" style={{ filter: getLogoTextFilter() }} />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Custom Toggle Switch (Matches image_76d857.png) */}
          <button 
            onClick={toggleTheme}
            className="relative w-10 h-5 rounded-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/20 transition-colors duration-300"
          >
            <div className={`absolute top-[2px] w-3.5 h-3.5 rounded-full bg-[#030A17] dark:bg-white flex items-center justify-center transition-all duration-300 ${theme === 'light' ? 'left-[3px]' : 'left-[21px]'}`}>
              {theme === 'light' ? <div className="w-2 h-2 rounded-full bg-white" /> : <MoonIcon size={8} />}
            </div>
            <div className="absolute right-1.5 top-[5px] text-gray-400 dark:hidden">
              <MoonIcon size={8} />
            </div>
          </button>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-gray-800 dark:text-white">
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* ── DESKTOP SECONDARY NAV (RESTORED) ── */}
      <div className="hidden lg:flex relative z-20 bg-gray-100/80 dark:bg-[#0a0a0a]/40 backdrop-blur-lg border-b border-gray-300 dark:border-white/10 px-10 text-[10px] font-bold uppercase tracking-tight">
        <div className="flex items-stretch flex-1">
          <a href="https://www.gov.ph" target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 text-gray-700 dark:text-white hover:text-ph-blue dark:hover:text-ph-yellow border-r border-gray-300 dark:border-white/20 transition-colors duration-200">
            GOVPH
          </a>

          <NavItem to="/" label="Home" active={isActive('/')} />

          {/* Desktop About Us Dropdown */}
          <div className="relative group flex items-stretch">
            <button className={`relative flex items-center gap-1 px-4 py-2 border-r border-gray-300 dark:border-white/20 transition-colors duration-200 ${inAbout ? 'text-ph-blue dark:text-ph-yellow' : 'text-gray-700 dark:text-white hover:text-ph-blue dark:hover:text-ph-yellow'}`}>
              About Us
              <FiChevronDown size={11} className="transition-transform duration-300 group-hover:rotate-180" />
              {inAbout && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-ph-blue dark:bg-ph-yellow" />}
            </button>

            <div className="absolute top-full left-0 pt-2 opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
              <div className="relative w-[210px] bg-white dark:bg-[#0f141e] shadow-xl dark:shadow-2xl rounded-md border border-gray-200 dark:border-white/10 mt-1">
                <div className="absolute -top-2 left-6 w-4 h-4 bg-white dark:bg-[#0f141e] transform rotate-45 border-t border-l border-gray-200 dark:border-white/10" />
                <div className="relative z-10 flex flex-col py-1.5">
                  {aboutLinks.map((link) => (
                    <Link key={link.name} to={link.path} className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-100 dark:border-white/5 last:border-none border-l-[3px] border-transparent hover:border-ph-blue dark:hover:border-ph-yellow hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-200 group/item">
                      <div className="flex-shrink-0 opacity-80 group-hover/item:opacity-100 transition-opacity">
                        {React.cloneElement(link.icon, { size: 15 })}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-gray-700 dark:text-gray-200 text-[10px] font-bold leading-none uppercase tracking-wide">{link.name}</span>
                        {link.desc && <span className="text-gray-400 dark:text-gray-500 text-[8px] font-medium uppercase tracking-widest mt-0.5">{link.desc}</span>}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <NavItem to="/transparency" label="Transparency Seal" active={isActive('/transparency')} />
          <NavItem to="/the-podium" label="The Podium" active={isActive('/the-podium')} />
          <NavItem to="/contact-us" label="Contact Us" active={isActive('/contact-us')} />
        </div>
      </div>

      {/* ── MOBILE FULLSCREEN MENU ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed inset-0 z-40 bg-white/90 dark:bg-[#0a0a0a]/95 backdrop-blur-3xl lg:hidden flex flex-col pt-32 px-10">
            <div className="flex flex-col gap-6 overflow-y-auto pb-10">
              <MobileLink to="/" label="HOME" />
              <div className="flex flex-col">
                <button onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)} className="flex items-center justify-between text-left text-lg font-bold text-gray-800 dark:text-gray-300 tracking-widest uppercase">
                  ABOUT US
                  <FiChevronDown className={`transition-transform duration-300 ${isMobileAboutOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isMobileAboutOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-gray-100 dark:bg-white/5 rounded-xl mt-2">
                      {aboutLinks.map((link) => (
                        <Link key={link.name} to={link.path} className="block px-6 py-4 text-sm font-bold text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-white/5 last:border-none uppercase">{link.name}</Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <MobileLink to="/transparency" label="TRANSPARENCY SEAL" />
              <MobileLink to="/the-podium" label="THE PODIUM" />
              <MobileLink to="/contact-us" label="CONTACT US" />
              <div className="mt-8 flex justify-center gap-4">
                <SocialIcon icon={<FiFacebook />} /> <SocialIcon icon={<FiYoutube />} /> <SocialIcon icon={<FiInstagram />} /> <SocialIcon icon={<FiTwitter />} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-[2px] bg-gradient-to-r from-ph-blue via-ph-red to-ph-yellow w-full relative z-20" />
    </header>
  );
};

const NavItem = ({ to, label, active }) => (
  <Link to={to} className={`relative flex items-center px-4 py-2 border-r border-gray-300 dark:border-white/20 transition-colors duration-200 uppercase font-bold text-[10px] ${active ? 'text-ph-blue dark:text-ph-yellow' : 'text-gray-700 dark:text-white hover:text-ph-blue dark:hover:text-ph-yellow'}`}>
    {label}
    {active && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-ph-blue dark:bg-ph-yellow" />}
  </Link>
);

const MobileLink = ({ to, label }) => (
  <Link to={to} className="text-lg font-bold text-gray-800 dark:text-gray-300 tracking-widest uppercase hover:text-ph-blue dark:hover:text-ph-yellow transition-colors">{label}</Link>
);

const SocialIcon = ({ icon }) => (
  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-white border border-gray-200 dark:border-white/10">{icon}</div>
);

export default Navbar;