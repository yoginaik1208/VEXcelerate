import { useState } from 'react';
import './App.css';
import Homepage from './Homepage.jsx';
import ScoreAnalyzer from './ScoreAnalyzer.jsx';
import Timer from './Timer.jsx';
import DataTracker from './DataTracker.jsx';
import MixMatchCalculator from './MixMatchCalculator.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'analyzer', 'timer', 'dataTracker', 'mixMatch'

  // Navigation handler
  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  // Render components based on current page
  if (currentPage === 'home') {
    return <Homepage onNavigate={handleNavigation} />;
  }

  if (currentPage === 'analyzer') {
    return <ScoreAnalyzer onBackToHome={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'timer') {
    return <Timer onBackToAnalyzer={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'mixmatch') {
    return <MixMatchCalculator onBackToAnalyzer={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'datatracker') {
    return <DataTracker onBackToAnalyzer={() => setCurrentPage('home')} />;
  }

  // Default fallback
  return <Homepage onNavigate={handleNavigation} />;
}

export default App;
