
import { useState } from 'react';
import './App.css';
import Homepage from './Homepage.jsx';
import ScoreAnalyzer from './ScoreAnalyzer.jsx';
import Timer from './Timer.jsx';
import DataTracker from './DataTracker.jsx';
import MixMatchCalculator from './MixMatchCalculator.jsx';
import About from './About.jsx';
import Contact from './Contact.jsx';
import Support from './Support.jsx';
import PrivacyPolicy from './PrivacyPolicy.jsx';


function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Navigation handler that also notifies SPA listeners (for ad refreshes)
  const handleNavigation = (page) => {
    setCurrentPage(page);
    try {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('spa:navigate', { detail: { page } }));
      }
    } catch (e) {
      // ignore in SSR or older browsers
    }
  };

  // Top navigation bar
  const navTabs = [
    { id: 'home', label: '🏠 Home' },
    { id: 'about', label: '🤖 About' },
    { id: 'contact', label: '📬 Contact' },
    { id: 'support', label: '🛟 Support' },
    { id: 'privacy', label: '🔒 Privacy' }
  ];

  return (
    <div className="app-main-container">
      <nav className="app-navbar animated-navbar">
        <div className="nav-tabs nav-tabs-centered">
          {navTabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-tab${currentPage === tab.id ? ' active' : ''}`}
              onClick={() => handleNavigation(tab.id)}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="app-content app-content-padded">
  {currentPage === 'home' && <Homepage onNavigate={handleNavigation} />}
        {currentPage === 'about' && <About />}
        {currentPage === 'contact' && <Contact />}
        {currentPage === 'support' && <Support />}
  {currentPage === 'privacy' && <PrivacyPolicy />}

        {/* Feature pages (launched from homepage) - not shown in top-nav per request */}
  {currentPage === 'mixmatch' && <MixMatchCalculator onBackToAnalyzer={() => handleNavigation('home')} />}
  {currentPage === 'datatracker' && <DataTracker onBackToAnalyzer={() => handleNavigation('home')} />}
  {currentPage === 'analyzer' && <ScoreAnalyzer onBackToHome={() => handleNavigation('home')} />}

  {currentPage === 'timer' && <div className="timer-content-wrapper"><Timer onBackToAnalyzer={() => handleNavigation('home')} /></div>}
      </div>
    </div>
  );
}

export default App;
