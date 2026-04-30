import React from 'react';
import Hero from '../components/sections/Hero';
import NewsUpdates from '../components/sections/NewsUpdates';
import SportsSection from '../components/sections/SportsSection'; // Import it here

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <NewsUpdates />
      <SportsSection />
      
    </div>
  );
};

export default Home;