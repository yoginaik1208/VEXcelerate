
import React from 'react';
import './Homepage.css';
import AdSenseAd from './components/AdSenseAd.jsx';

const Homepage = ({ onNavigate }) => {
  const features = [
    {
      id: 'timer',
      title: '🕐 Match Timer',
      description: 'Official VEX IQ match timer with driver switch alerts and audio cues. Features a 60-second countdown with precise timing for competition matches.',
      features: ['60-second official timer', 'Driver switch alerts at 35s and 25s', 'Audio announcements', 'Pause/resume functionality']
    },
    {
      id: 'mixmatch',
      title: '🧮 Mix & Match Calculator',
      description: 'Calculate optimal team pairings and score predictions for Mix & Match competitions. Analyze potential combinations and strategies.',
      features: ['Team pairing optimization', 'Score predictions', 'Strategy analysis', 'Performance calculations']
    },
    {
      id: 'datatracker',
      title: '📊 Data Tracker',
      description: 'Track and analyze team performance data across multiple matches. Monitor progress and identify improvement areas.',
      features: ['Match data tracking', 'Performance analytics', 'Progress monitoring', 'Statistical insights']
    },
    {
      id: 'analyzer',
      title: '📈 VEX IQ Score Analyzer',
      description: 'Comprehensive score analysis tool for VEX IQ teams. Review driving, autonomous, and teamwork scores for strategic planning.',
      features: ['Driving score analysis', 'Autonomous performance', 'Teamwork score tracking', 'Team comparison tools']
    }
  ];


  // Animated mascot emojis for excitement
  const mascots = [
    '🤖', '🚀', '🎉', '🏆', '🦾', '🧑‍💻', '🧠', '🦸‍♂️', '🦸‍♀️', '🦄'
  ];

  return (
    <div className="homepage-container">
      <div className="homepage-header">
        <div className="mascot-emoji-row">
          {mascots.map((emoji, idx) => (
            <span key={idx} className="mascot-emoji" style={{ animationDelay: `${idx * 0.12}s` }}>{emoji}</span>
          ))}
        </div>
        <h1>
          VEXcelerate <span className="app-emoji">⚡</span>
        </h1>
        <p className="homepage-subtitle">Your complete VEX IQ competition toolkit</p>
        <p className="homepage-description">
          <span className="desc-emoji">🏫</span> Enhance your VEX IQ experience with pro-grade tools for timing, scoring, and strategic analysis. <span style={{display:'block', marginTop:'6px'}}><span className="desc-emoji">👨‍🏫</span> Perfect for teams, coaches, and competition organizers.</span>
        </p>
      </div>

      <div className="features-grid">
        {features.map((feature, i) => (
          <div 
            key={feature.id} 
            className={`feature-box feature-color-${i % 4}`}
            onClick={() => onNavigate(feature.id)}
          >
            <div className="feature-header">
              <h2>{feature.title}</h2>
            </div>
            <div className="feature-content">
              <p className="feature-description">{feature.description}</p>
              <ul className="feature-list">
                {feature.features.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="feature-footer">
              <span className="launch-text">Click to launch</span>
            </div>
          </div>
        ))}
      </div>

      <div className="homepage-footer">
        <div style={{display:'flex', justifyContent:'center', gap:12, alignItems:'center', flexWrap:'wrap'}}>
          <div>
            <button className="donate-link" onClick={(e)=>{ e.preventDefault(); if(typeof onNavigate === 'function') onNavigate('privacy'); }} style={{background:'transparent', border:'none', color:'inherit', fontWeight:700, cursor:'pointer'}}>Privacy</button>
          </div>
        </div>

        <div style={{marginTop:12}}>
          {/* Test AdSense ad (uses data-adtest="on") */}
          <div style={{maxWidth:728, margin:'12px auto'}}>
            <AdSenseAd style={{display:'block', width:'100%', height:90}} />
          </div>
        </div>

        <p style={{marginTop:8}}>
          Built for VEX IQ teams and competitions • All tools follow official VEX guidelines
        </p>
      </div>
    </div>
  );
};

export default Homepage;
