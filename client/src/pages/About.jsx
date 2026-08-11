import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="bg-background min-h-screen font-body-md text-text-primary">
      {/* Hero Section */}
      <section className="bg-surface py-20 px-4 sm:px-6 lg:px-8 border-b border-outline-variant">
        <div className="max-w-container-max mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-headline-xl text-primary mb-6">
            About Teletherapy
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            We believe that mental wellness is a fundamental human right. Our platform connects you with licensed professionals who are dedicated to helping you find your inner balance.
          </p>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-headline-lg text-primary mb-6">Our Approach to Mental Wellness</h2>
            <p className="text-text-secondary mb-4">
              Healing is not a linear journey, and it doesn't look the same for everyone. We provide a personalised approach to mental health, ensuring that you receive the right care, at the right time, in the right way.
            </p>
            <p className="text-text-secondary">
              By combining modern technology with compassionate, evidence-based care, we create a safe space for you to grow, heal, and thrive.
            </p>
          </div>
          <div className="bg-surface-container rounded-2xl p-8 shadow-sm border border-outline">
            <ul className="space-y-6">
              <li>
                <h3 className="font-headline-md text-xl text-primary mb-2">Licensed & Experienced</h3>
                <p className="text-text-secondary text-sm">Every therapist on our platform is fully licensed and vetted, ensuring you receive the highest standard of care.</p>
              </li>
              <li>
                <h3 className="font-headline-md text-xl text-primary mb-2">Confidential & Safe</h3>
                <p className="text-text-secondary text-sm">Your privacy is our priority. We use end-to-end encryption to ensure your sessions and data remain completely confidential.</p>
              </li>
              <li>
                <h3 className="font-headline-md text-xl text-primary mb-2">Personalised Approach</h3>
                <p className="text-text-secondary text-sm">We match you with professionals who specialize in your specific needs, creating a tailored treatment plan just for you.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Mission / Values */}
      <section className="bg-primary text-on-primary py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-container-max mx-auto text-center">
          <h2 className="text-3xl font-headline-lg mb-6">Our Mission</h2>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed opacity-90">
            To make high-quality, compassionate mental healthcare accessible to everyone, everywhere. We envision a world where seeking support for your mental health is as normal and accessible as visiting a doctor for a physical ailment.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center max-w-container-max mx-auto">
        <h2 className="text-3xl font-headline-lg text-primary mb-6">Ready to start your journey?</h2>
        <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
          Take the first step towards better mental health today. Browse our directory of licensed therapists and find the perfect match for your needs.
        </p>
        <Link 
          to="/therapists" 
          className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg text-on-primary bg-primary hover:bg-primary-container transition-colors shadow-sm"
        >
          Find a Therapist
        </Link>
      </section>
    </div>
  );
}
