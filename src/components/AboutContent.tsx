import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import About from './About';

const AboutContent: React.FC = () => {
  return (
    <div className="min-h-screen relative pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >

          
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 tracking-tight uppercase mb-6">
            About IIC 3.0
          </h1>
          
          <p className="text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed">            The International Innovation Challenge (IIC) is an empowering platform for young minds to address real-world challenges. The event brings together exceptional talents in a 36-hour hackathon, allowing participants to brainstorm and devise impactful solutions under the mentorship of industry leaders. We will also feature a startup carnival and international conference to foster innovation and collaboration.
</p>
        </motion.div>

        <About />



      </div>
    </div>
  );
};

export default AboutContent;
