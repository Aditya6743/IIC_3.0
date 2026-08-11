import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Sponsors from './pages/Sponsors';
import Gallery from './pages/Gallery';
import JudgesMentors from './pages/JudgesMentors';
import Guests from './pages/Guests';
import ProblemStatements from './pages/ProblemStatements';
import Ambassador from './pages/Ambassador';
import PageTransition from './components/PageTransition';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/sponsors"
          element={
            <PageTransition>
              <Sponsors />
            </PageTransition>
          }
        />
        <Route
          path="/gallery"
          element={
            <PageTransition>
              <Gallery />
            </PageTransition>
          }
        />
        <Route
          path="/judges-mentors"
          element={
            <PageTransition>
              <JudgesMentors />
            </PageTransition>
          }
        />
        <Route
          path="/guests"
          element={
            <PageTransition>
              <Guests />
            </PageTransition>
          }
        />
        <Route
          path="/problem-statements"
          element={
            <PageTransition>
              <ProblemStatements />
            </PageTransition>
          }
        />
        <Route
          path="/ambassador"
          element={
            <PageTransition>
              <Ambassador />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="relative z-10">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;