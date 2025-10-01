
import React from 'react';
import './Homepage.css';
import AdSenseAd from './components/AdSenseAd.jsx';

const Homepage = ({ onNavigate }) => {
  const features = [
    {
      id: 'timer',
      icon: '⏱️',
      title: 'Match Timer',
      description: 'Official 60-second VEX IQ timer with driver switch alerts and audio cues for competition-ready timing.',
      highlights: ['Driver switch alerts', 'Audio announcements', 'Pause/resume']
    },
    {
      id: 'mixmatch',
      icon: '🔢',
      title: 'Mix & Match',
      description: 'Calculate optimal team pairings and score predictions for strategic competition planning.',
      highlights: ['Team optimization', 'Score predictions', 'Strategy analysis']
    },
    {
      id: 'datatracker',
      icon: '📊',
      title: 'Data Tracker',
      description: 'Track and analyze team performance across matches with detailed statistical insights.',
      highlights: ['Match tracking', 'Performance analytics', 'Progress monitoring']
    },
    {
      id: 'analyzer',
      icon: '📈',
      title: 'Score Analyzer',
      description: 'Comprehensive analysis of driving, autonomous, and teamwork scores for strategic improvement.',
      highlights: ['Detailed scoring', 'Team comparison', 'Performance trends']
    }
  ];

  return (
    <div className="homepage-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="brand-name">VEXcelerate</span>
            <span className="brand-icon">⚡</span>
          </h1>
          <p className="hero-tagline">Professional VEX IQ Competition Toolkit</p>
          <p className="hero-description">
            Precision tools for timing, scoring, and strategic analysis—built for teams, coaches, and organizers.
          </p>
        </div>
      </header>

      <main className="features-section">
        <div className="features-grid">
          {features.map((feature, i) => (
            <article 
              key={feature.id} 
              className="feature-card"
              onClick={() => onNavigate(feature.id)}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h2 className="feature-title">{feature.title}</h2>
              <p className="feature-description">{feature.description}</p>
              <ul className="feature-highlights">
                {feature.highlights.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <div className="feature-action">
                <span className="action-text">Launch Tool →</span>
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className="homepage-footer">
        <div className="ad-container">
          <AdSenseAd style={{display:'block', width:'100%', height:90}} />
        </div>
        <p className="footer-text">Built for VEX IQ • Following Official Guidelines</p>
      </footer>
    </div>
  );
};

export default Homepage;
