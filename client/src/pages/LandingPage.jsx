import Hero from "../components/landing/Hero";
import TrustFeatures from "../components/landing/TrustFeatures";
import Services from "../components/landing/Services";
import About from "../components/landing/About";
import HowItWorks from "../components/landing/HowItWorks";
import Testimonials from "../components/landing/Testimonials";
import FinalCTA from "../components/landing/FinalCTA";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        <TrustFeatures />
        <Services />
        <About />
        <HowItWorks />
        <Testimonials />
        <FinalCTA />
      </main>
    </div>
  );
}
