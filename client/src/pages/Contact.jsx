import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin } from 'lucide-react';



export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    <div className="bg-surface min-h-screen">
      {/* ================================================================ */}
      {/* HERO — background image with overlay                             */}
      {/* ================================================================ */}
      <section
  className="relative h-[520px] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
>
  {/* Background Image */}
  <img
    src="https://images.pexels.com/photos/221043/pexels-photo-221043.jpeg"
    alt=""
    className="absolute inset-0 w-full h-full object-cover object-center"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-on-background/70 via-on-background/55 to-on-background/70" />

  {/* Hero Content */}
  <motion.div
    className="max-w-[1280px] mx-auto text-center relative z-10"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    }}
  >
    <h1 className="text-headline-xl font-['Fraunces',serif] font-medium text-white mb-6 tracking-tight">
      Get in{' '}
      <span className="italic text-secondary-container">
        Touch
      </span>
    </h1>

    <p className="text-body-lg font-['Plus_Jakarta_Sans',sans-serif] text-white/85 max-w-2xl mx-auto leading-relaxed">
      Have questions about our platform or need help finding the right
      therapist? Our support team is here for you.
    </p>
  </motion.div>
</section>

      {/* ================================================================ */}
      {/* CONTACT INFO + FORM                                               */}
      {/* ================================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-headline-lg font-['Fraunces',serif] font-medium text-on-background mb-8 tracking-tight">
              Contact Information
            </h2>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div className="ml-4">
                  <h3 className="text-body-lg font-['Fraunces',serif] font-medium text-on-background">Email Us</h3>
                  <p className="mt-1 text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-text-muted">support@innerbalance.example.com</p>
                  <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted mt-1">We aim to respond within 24 hours.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div className="ml-4">
                  <h3 className="text-body-lg font-['Fraunces',serif] font-medium text-on-background">Call Us</h3>
                  <p className="mt-1 text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-text-muted">+1 (555) 123-4567</p>
                  <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted mt-1">Mon–Fri, 9am to 6pm EST.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div className="ml-4">
                  <h3 className="text-body-lg font-['Fraunces',serif] font-medium text-on-background">Headquarters</h3>
                  <p className="mt-1 text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-text-muted">
                    123 Wellness Avenue<br />
                    Suite 400<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-surface-container-low rounded-2xl p-8 border border-surface-variant">
              <h3 className="text-headline-md font-['Fraunces',serif] font-medium text-on-background mb-4 tracking-tight">
                Looking for immediate support?
              </h3>
              <p className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-text-muted mb-6 leading-relaxed">
                If you are in a life-threatening situation or experiencing a mental health emergency, please call your local emergency services immediately.
              </p>
              <Link
                to="/therapists"
                className="text-label-md font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-primary hover:text-primary-container transition-colors flex items-center gap-1.5 group w-fit"
              >
                Find a Therapist
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-surface-container-lowest rounded-3xl shadow-sm border border-surface-variant p-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <h2 className="text-headline-md font-['Fraunces',serif] font-medium text-on-background mb-6 tracking-tight">
              Send us a message
            </h2>

            {isSubmitted && (
              <div className="mb-6 p-4 bg-primary/10 border border-primary/20 text-primary rounded-xl text-body-sm font-['Plus_Jakarta_Sans',sans-serif]">
                Thank you for your message! We will get back to you shortly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-medium text-on-surface mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-surface border border-surface-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-on-surface"
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-medium text-on-surface mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-surface border border-surface-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-on-surface"
                  placeholder="jane@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-medium text-on-surface mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-surface border border-surface-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-on-surface"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-medium text-on-surface mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-surface border border-surface-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors resize-none text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-on-surface"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-primary text-on-primary rounded-full text-label-md font-['Plus_Jakarta_Sans',sans-serif] font-semibold hover:bg-primary-container hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-sm"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}