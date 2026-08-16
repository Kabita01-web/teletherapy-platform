import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { FaTwitter, FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";

/**
 * Typography: matches the rest of the site — Fraunces for the wordmark,
 * Plus Jakarta Sans for column headings, links, and the bottom bar.
 * Fonts load once, globally (see TrustFeatures.jsx for the <link> tags).
 *
 * Motion: a single, restrained whileInView fade-up for the whole grid —
 * a footer doesn't need the staggered card entrances used higher up the
 * page, just enough motion to not feel static compared to everything
 * above it.
 */

const footerLinks = {
  Platform: ["Find a Therapist", "How It Works", "Pricing", "For Therapists"],
  Resources: [
    "Mental Health Blog",
    "Self-Assessment",
    "Crisis Support",
    "Community Forum",
  ],
  Company: ["About Us", "Our Team", "Careers", "Press"],
  Legal: [
    "Privacy Policy",
    "Terms of Service",
    "Cookie Policy",
    "HIPAA Notice",
  ],
};

const socialLinks = [
  { icon: FaTwitter, label: "Twitter", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaLinkedin, label: "LinkedIn", href: "#" },
  { icon: FaFacebook, label: "Facebook", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-outline-variant" id="footer">
      {/* Main footer */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-14">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-4 h-4 text-white"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <span className="text-headline-md font-['Fraunces',serif] font-semibold text-primary tracking-tight">
                Inner Balance
              </span>
            </div>
            <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted leading-relaxed mb-6">
              Professional teletherapy, reimagined for the modern world. Your
              mind matters.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-label-md font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-on-surface uppercase tracking-[0.12em] mb-4">
                {category}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-outline-variant">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted text-center sm:text-left">
            © {new Date().getFullYear()} Inner Balance Teletherapy. All rights
            reserved.
          </p>
          <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted flex items-center gap-1.5">
            Made with{" "}
            <Heart size={12} fill="currentColor" className="text-error" /> for
            mental wellness
          </p>
        </div>
      </div>
    </footer>
  );
}
