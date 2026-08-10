import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GalleryContent from '../components/GalleryContent';

const Gallery: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-transparent relative">
      <Navbar />
      <GalleryContent />
      <Footer />
    </div>
  );
};

export default Gallery;
