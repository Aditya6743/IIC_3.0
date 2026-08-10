import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GuestsContent from "../components/GuestsContent";

const Guests: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-transparent relative">
      <Navbar />
      <GuestsContent />
      <Footer />
    </div>
  );
};

export default Guests;
