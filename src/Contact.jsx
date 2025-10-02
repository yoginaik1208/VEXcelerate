import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    
    try {
      // Use Formspree endpoint - sends to yoginaik0212@gmail.com
      const response = await fetch('https://formspree.io/f/xnnqanre', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _replyto: form.email,
        }),
      });

      if (response.ok) {
        setSent(true);
        setForm({ name: '', email: '', message: '' }); // Clear form
        setTimeout(() => setSent(false), 5000);
      } else {
        setError(true);
        setTimeout(() => setError(false), 5000);
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError(true);
      setTimeout(() => setError(false), 5000);
    } finally {
      setSending(false);
    }
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
        <button type="submit" disabled={sending}>
          {sending ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      {sent && <div className="contact-success">✅ Thank you! Message sent successfully. We'll get back to you soon! 🚀</div>}
      {error && <div className="contact-error">❌ Oops! Something went wrong. Please try again or email us directly at yoginaik0212@gmail.com</div>}
    </div>
  );
};

export default Contact;
