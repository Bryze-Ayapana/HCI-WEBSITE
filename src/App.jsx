import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Home from './pages/Home';
import SplashScreen from './components/common/SplashScreen';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CustomCursor from './components/common/CustomCursor';
import ScrollToTop from './components/common/ScrollToTop'; 
import MobileNav from './components/common/MobileNav'; // <-- NEW IMPORT
import Procurement from './pages/Procurement';
import Contact from './pages/Contact';
import Transparency from './pages/Transparency';
import Podium from './pages/Podium';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <ScrollToTop /> 
      <CustomCursor />
      
      <div className="min-h-screen w-full bg-transparent transition-colors duration-300 overflow-x-hidden">
        <AnimatePresence>
          {isLoading && <SplashScreen />}
        </AnimatePresence>

        {!isLoading && (
          <div className="flex flex-col min-h-screen relative">
            <Navbar />
            
            {/* Added pb-20 on mobile so the MobileNav doesn't cover content */}
            <main className="flex-grow pb-24 lg:pb-0">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about/procurement" element={<Procurement />} />
                <Route path="/contact-us" element={<Contact />} />
                <Route path="/transparency" element={<Transparency />} />
                <Route path="/the-podium" element={<Podium />} />
              </Routes>
            </main>

            <Footer />
            
            {/* NEW BOTTOM NAVIGATION */}
            <MobileNav />

          </div>
        )}
      </div>
    </Router>
  );
}

export default App;