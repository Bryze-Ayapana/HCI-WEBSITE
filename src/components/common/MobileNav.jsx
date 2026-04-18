import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiLayers, FiShield, FiBookOpen, FiPhone } from 'react-icons/fi';

const MobileNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { name: 'Home', path: '/', icon: <FiHome size={16} /> },
    { name: 'Procure', path: '/about/procurement', icon: <FiLayers size={16} /> },
    { name: 'Seal', path: '/transparency', icon: <FiShield size={16} /> },
    { name: 'Podium', path: '/the-podium', icon: <FiBookOpen size={16} /> },
    { name: 'Contact', path: '/contact-us', icon: <FiPhone size={16} /> },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full z-50 bg-[#0a0a0a] text-gray-400 rounded-t-2xl shadow-[0_-5px_20px_rgba(0,0,0,0.3)] pt-1 pb-safe px-3 h-14">
      
      <div className="flex justify-between items-center max-w-md mx-auto h-full">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`flex flex-col items-center justify-center p-1 min-w-[50px] transition-all duration-300 ${
                isActive ? 'text-white scale-105' : 'hover:text-gray-200'
              }`}
            >
              <div className="mb-[2px]">
                {item.icon}
              </div>
              <span className={`text-[9px] ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;