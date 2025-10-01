
import React from 'react';
import './Homepage.css';

const Homepage = ({ onNavigate }) => {
  const features = [
    {
      id: 'timer',
      icon: '⏱️',
      title: 'Match Timer',
      description: 'Official 60-second VEX IQ timer with driver switch alerts and audio cues for competition-ready timing.',
      highlights: ['Driver switch alerts', 'Audio announcements', 'Pause/resume'],
      color: 'purple'
    },
    {
      id: 'mixmatch',
      icon: '🔢',
      title: 'Mix & Match',
      description: 'Calculate optimal team pairings and score predictions for strategic competition planning.',
      highlights: ['Team optimization', 'Score predictions', 'Strategy analysis'],
      color: 'blue'
    },
    {
      id: 'datatracker',
      icon: '📊',
      title: 'Data Tracker',
      description: 'Track and analyze team performance across matches with detailed statistical insights.',
      highlights: ['Match tracking', 'Performance analytics', 'Progress monitoring'],
      color: 'pink'
    },
    {
      id: 'analyzer',
      icon: '📈',
      title: 'Score Analyzer',
      description: 'Comprehensive analysis of driving, autonomous, and teamwork scores for strategic improvement.',
      highlights: ['Detailed scoring', 'Team comparison', 'Performance trends'],
      color: 'teal'
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
          {features.map((feature) => (
            <article 
              key={feature.id} 
              className={`feature-card feature-${feature.color}`}
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
              <button className="launch-button">
                <span>Launch Tool</span>
                <span className="arrow">→</span>
              </button>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Homepage;
