import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    // Let the form submit naturally via action attribute
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <div className="contact-animation">
        <span role="img" aria-label="mail" className="contact-emoji">📧</span>
        <span role="img" aria-label="robot" className="contact-emoji">🤖</span>
        <span role="img" aria-label="sparkles" className="contact-emoji">✨</span>
      </div>
      <form 
        className="contact-form" 
        action="https://formsubmit.co/yoginaik0212@gmail.com" 
        method="POST"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="_subject" value="New message from VEXcelerate Contact Form" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_next" value="https://vexcelerate.app/#contact" />
        
        <input name="name" type="text" placeholder="Your Name" required />
        <input name="email" type="email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" required />
        <button type="submit">Send Message</button>
      </form>
      {sent && <div className="contact-success">✅ Thank you! Message sent successfully. We'll get back to you soon! 🚀</div>}
      <div className="contact-footer" style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
        Or email us directly: <a href="mailto:yoginaik0212@gmail.com">yoginaik0212@gmail.com</a>
      </div>
    </div>
  );
};

export default Contact;
