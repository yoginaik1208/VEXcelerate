import React from 'react';
import './Homepage.css';

export default function PrivacyPolicy() {
  return (
    <div className="homepage-container">
      <div style={{maxWidth:900, margin:'2rem auto', padding:'1rem'}}>
        <h1 style={{marginTop:0}}>Privacy Policy</h1>
        <p>
          VEXcelerate respects your privacy. This page summarizes the types of information we may collect and how we use it.
        </p>

        <h3>Information we collect</h3>
        <ul>
          <li>Non-personal usage data (page visits, analytics)</li>
          <li>Optional information you provide when contacting us</li>
        </ul>

        <h3>Third-party services</h3>
        <p>
          We may use third-party services (for example Google AdSense, analytics providers, and payment processors). These services have their own privacy policies and may collect data as described by them. For AdSense testing, a test ad is used until you replace the placeholder publisher ID.
        </p>

        <h3>Contact</h3>
        <p>If you have questions about this policy, please reach out via the Contact page.</p>

      </div>
    </div>
  );
}
