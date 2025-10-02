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
      // Use FormSubmit.co - sends directly to yoginaik0212@gmail.com with zero setup
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('message', form.message);
      formData.append('_subject', `New message from ${form.name} via VEXcelerate`);
      formData.append('_captcha', 'false'); // Disable captcha for smooth UX
      formData.append('_template', 'table'); // Nice email template
      
      const response = await fetch('https://formsubmit.co/yoginaik0212@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
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
