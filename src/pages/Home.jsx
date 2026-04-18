import React from 'react';
import Hero from '../components/sections/Hero';
import NewsUpdates from '../components/sections/NewsUpdates'; // Import it here
import OfficialsSection from '../components/home/OfficialsSection';

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <NewsUpdates />
      <OfficialsSection />
    </div>
  );
};

export default Home;