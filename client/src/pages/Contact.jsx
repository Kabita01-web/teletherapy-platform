import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for API call
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="bg-background min-h-screen font-body-md text-text-primary">
      {/* Hero Section */}
      <section className="bg-surface py-20 px-4 sm:px-6 lg:px-8 border-b border-outline-variant">
        <div className="max-w-container-max mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-headline-xl text-primary mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Have questions about our platform or need help finding the right therapist? Our support team is here for you.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-headline-lg text-primary mb-8">Contact Information</h2>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-headline-md text-text-primary">Email Us</h3>
                  <p className="mt-1 text-text-secondary">support@teletherapy.example.com</p>
                  <p className="text-sm text-text-muted mt-1">We aim to respond within 24 hours.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-headline-md text-text-primary">Call Us</h3>
                  <p className="mt-1 text-text-secondary">+1 (555) 123-4567</p>
                  <p className="text-sm text-text-muted mt-1">Mon-Fri, 9am to 6pm EST.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-headline-md text-text-primary">Headquarters</h3>
                  <p className="mt-1 text-text-secondary">
                    123 Wellness Avenue<br />
                    Suite 400<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-surface-container rounded-2xl p-8 border border-outline">
              <h3 className="text-xl font-headline-md text-primary mb-4">Looking for immediate support?</h3>
              <p className="text-text-secondary mb-6">
                If you are in a life-threatening situation or experiencing a mental health emergency, please call your local emergency services immediately.
              </p>
              <Link 
                to="/therapists" 
                className="text-primary font-medium hover:text-primary-container transition-colors flex items-center"
              >
                Find a Therapist →
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-surface rounded-2xl shadow-sm border border-outline p-8">
            <h2 className="text-2xl font-headline-lg text-primary mb-6">Send us a message</h2>
            
            {isSubmitted && (
              <div className="mb-6 p-4 bg-primary/10 border border-primary/20 text-primary rounded-lg">
                Thank you for your message! We will get back to you shortly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1.5">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-outline rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1.5">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-outline rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                  placeholder="jane@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-1.5">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-outline rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-1.5">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-outline rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-primary text-on-primary rounded-lg font-medium hover:bg-primary-container transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
