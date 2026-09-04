import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import ComingSoon from '../components/ComingSoon';

const ProblemStatements: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-transparent relative">
      <ComingSoon
        title="Problem Statements Coming Soon"
        description="We are curating cutting-edge problem statements across various technological domains. Stay tuned for the full list!"
      />
      <Footer />
    </div>
  );
};

export default ProblemStatements;