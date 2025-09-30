import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Simulate sending email
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    // In production, use a backend or service like Formspree/EmailJS
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <div className="contact-animation">
        <span role="img" aria-label="mail" className="contact-emoji">📧</span>
        <span role="img" aria-label="robot" className="contact-emoji">🤖</span>
        <span role="img" aria-label="sparkles" className="contact-emoji">✨</span>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Your Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
        <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required />
        <button type="submit">Send Message</button>
      </form>
  {sent && <div className="contact-success">Thank you! We'll get back to you soon. 🚀</div>}
    </div>
  );
};

export default Contact;
