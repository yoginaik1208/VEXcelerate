import React from 'react';
import './Support.css';

const Support = () => (
  <div className="support-container">
    <h1 className="support-title">Support VEXcelerate</h1>
    <div className="support-animation">
      <span role="img" aria-label="heart" className="support-emoji">💖</span>
      <span role="img" aria-label="robot" className="support-emoji">🤖</span>
      <span role="img" aria-label="trophy" className="support-emoji">🏆</span>
    </div>
    <p className="support-text">If you love VEXcelerate, help us grow! Your contribution keeps the app free and awesome for everyone.</p>
    <a className="paypal-button" href="https://www.paypal.com/donate?business=yoginaik0212@gmail.com" target="_blank" rel="noopener noreferrer">
      <span role="img" aria-label="paypal">🤑</span> Support via PayPal
    </a>
  </div>
);

export default Support;
