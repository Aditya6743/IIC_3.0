import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Prizes from '../components/Prizes';
import Themes from '../components/Themes';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import SpotlightGridBackground from '../components/background/SpotlightGridBackground';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen relative">
      <SpotlightGridBackground />
      <Navbar />
      <Hero />
      <About />
      <Themes />
      <Prizes />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;
