import React from 'react';
import Hero from '../components/Hero';
import TypographyMask from "../components/TypographyMask";

import Timeline from '../components/Timeline';
import Prizes from '../components/Prizes';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen relative">
      <Hero />
      <TypographyMask />
      <Timeline />
      <Prizes />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;
