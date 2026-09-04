import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import ProblemStatementsContent from '../components/ProblemStatementsContent';

const ProblemStatements: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-transparent relative">
      <ProblemStatementsContent />
      <Footer />
    </div>
  );
};

export default ProblemStatements;