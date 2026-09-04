import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import SponsorsContent from '../components/SponsorsContent';

const Sponsors: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-transparent relative">
      <SponsorsContent />
      <Footer />
    </div>
  );
};

export default Sponsors;