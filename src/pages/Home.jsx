import React from 'react';

import Hero from '../components/sections/Hero';
import NewsUpdates from '../components/sections/NewsUpdates';
import SportsSection from '../components/sections/SportsSection';
import MVPSection from '../components/sections/MVPSection';

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <NewsUpdates />
      <SportsSection />
      <MVPSection />
    </div>
  );
};

export default Home;