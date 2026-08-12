import { Heart, ArrowRight } from 'lucide-react';
import { FaTwitter, FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';

const footerLinks = {
  Platform: ['Find a Therapist', 'How It Works', 'Pricing', 'For Therapists'],
  Resources: ['Mental Health Blog', 'Self-Assessment', 'Crisis Support', 'Community Forum'],
  Company: ['About Us', 'Our Team', 'Careers', 'Press'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'HIPAA Notice'],
};

const socialLinks = [
  { icon: FaTwitter, label: 'Twitter', href: '#' },
  { icon: FaInstagram, label: 'Instagram', href: '#' },
  { icon: FaLinkedin, label: 'LinkedIn', href: '#' },
  { icon: FaFacebook, label: 'Facebook', href: '#' },
];
export default function Footer() {
  return (
    <footer className="bg-surface border-t border-outline-variant" id="footer">
     

      {/* Main footer */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-headline-md font-headline-md text-primary font-bold">Inner Balance</span>
            </div>
            <p className="text-body-sm font-body-sm text-text-muted leading-relaxed mb-6">
              Professional teletherapy, reimagined for the modern world. Your mind matters.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-label-md font-label-md text-on-surface uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-body-sm font-body-sm text-text-muted hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-outline-variant">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-body-sm font-body-sm text-text-muted text-center sm:text-left">
            © {new Date().getFullYear()} Inner Balance Teletherapy. All rights reserved.
          </p>
          <p className="text-body-sm font-body-sm text-text-muted flex items-center gap-1.5">
            Made with <Heart size={12} fill="currentColor" className="text-error" /> for mental wellness
          </p>
        </div>
      </div>
    </footer>
  );
}
