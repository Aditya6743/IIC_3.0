import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JudgesMentorsContent from "../components/JudgesMentorsContent";

const JudgesMentors: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-transparent relative">
      <JudgesMentorsContent />
      <Footer />
    </div>
  );
};

export default JudgesMentors;
