import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import Home from './pages/Home';
import About from './pages/About';
import Sponsors from './pages/Sponsors';
import Gallery from './pages/Gallery';
import JudgesMentors from './pages/JudgesMentors';
import Guests from './pages/Guests';
import ProblemStatements from './pages/ProblemStatements';
import Ambassador from './pages/Ambassador';

import PageTransition from './components/PageTransition';
import Preloader from './components/Preloader';
import MatrixEasterEgg from './components/MatrixEasterEgg';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import SmoothScroll from './components/SmoothScroll';

import SpotlightGridBackground from './components/background/SpotlightGridBackground';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/sponsors" element={<PageTransition><Sponsors /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
        <Route path="/judges-mentors" element={<PageTransition><JudgesMentors /></PageTransition>} />
        <Route path="/guests" element={<PageTransition><Guests /></PageTransition>} />
        <Route path="/problem-statements" element={<PageTransition><ProblemStatements /></PageTransition>} />
        <Route path="/ambassador" element={<PageTransition><Ambassador /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(() => {
    // Check if the user has already seen the preloader in this session
    return sessionStorage.getItem('hasSeenPreloader') ? false : true;
  });

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem('hasSeenPreloader', 'true');
  };

  return (
    <Router>
      <Analytics />
      <CustomCursor />
      
      <div className="relative z-10 bg-black min-h-screen select-none">
        <SpotlightGridBackground />
        {/* Render routes immediately behind preloader so there is no black flash */}
        <Navbar />
        <SmoothScroll>
          <AnimatedRoutes />
        </SmoothScroll>
        
        <AnimatePresence>
          {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
        </AnimatePresence>
      </div>
      
      <MatrixEasterEgg />
    </Router>
  );
}

export default App;