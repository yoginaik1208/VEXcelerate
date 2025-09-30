import React from 'react';
import './About.css';

const About = () => (
  <div className="about-container">
    <h1 className="about-title">About VEXcelerate</h1>
    <div className="about-animated">
      <span role="img" aria-label="rocket" className="about-emoji">🚀</span>
      <span role="img" aria-label="robot" className="about-emoji">🤖</span>
      <span role="img" aria-label="star" className="about-emoji">🌟</span>
    </div>
    <ul className="about-list">
      <li>Empowers kids and teens to master robotics competitions with pro-grade tools.</li>
      <li>Gives schools and clubs a strategic edge with analytics, timers, and score calculators.</li>
  <li>Transforms robotics teamwork into a fun, data-driven, and winning experience.</li>
    </ul>
  </div>
);

export default About;
