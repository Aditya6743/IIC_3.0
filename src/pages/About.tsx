import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import AboutContent from '../components/AboutContent';

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-transparent relative">
      <AboutContent />
      <Footer />
    </div>
  );
};

export default About;
