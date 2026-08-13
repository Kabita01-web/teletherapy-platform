import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();

  // Pages that have a full-screen hero at the top
  const heroPages = ['/', '/about', '/contact', '/therapists'];

  const isHeroPage = heroPages.includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem('token')));
  }, []);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Find a Therapist', to: '/therapists' },
    { label: 'Contact Us', to: '/contact' },
  ];

  /*
   * Hero pages:
   *
   * At the very top:
   * transparent navbar over image
   *
   * After scrolling:
   * solid blurred navbar
   */

  const transparentNavbar =
    isHeroPage && !isScrolled;

  return (
    <nav
      className={`
        top-0
        left-0
        w-full
        z-50
        transition-all
        duration-300
        ${
          isHeroPage
            ? 'fixed'
            : 'sticky'
        }
        ${
          transparentNavbar
            ? 'bg-transparent'
            : 'bg-surface/95 backdrop-blur-md shadow-md border-b border-surface-variant'
        }
      `}
    >
      <div
        className="
          max-w-[1280px]
          mx-auto
          px-6
          md:px-16
          h-20
          flex
          items-center
          justify-between
        "
      >

        {/* LOGO */}

        <Link
          to="/"
          className="flex items-center gap-2 group"
        >
          <div
            className={`
              w-10
              h-10
              rounded-full
              flex
              items-center
              justify-center
              transition-all
              duration-300
              ${
                transparentNavbar
                  ? 'bg-white/20 backdrop-blur-sm'
                  : 'bg-primary'
              }
            `}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className={`
                w-5
                h-5
                transition-colors
                ${
                  transparentNavbar
                    ? 'text-white'
                    : 'text-white'
                }
              `}
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

          <span
            className={`
              text-[24px]
              font-['Fraunces',serif]
              font-semibold
              leading-none
              tracking-tight
              transition-colors
              duration-300
              ${
                transparentNavbar
                  ? 'text-white'
                  : 'text-primary'
              }
            `}
          >
            Inner Balance
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`
                text-label-md
                font-['Plus_Jakarta_Sans',sans-serif]
                font-medium
                transition-colors
                duration-200
                ${
                  transparentNavbar
                    ? 'text-white hover:text-white/75'
                    : 'text-on-surface-variant hover:text-primary'
                }
              `}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ACTIONS */}

        <div className="hidden sm:flex items-center gap-4">

          {isLoggedIn ? (
            <Link
              to="/dashboard"
              className="
                text-label-md
                font-['Plus_Jakarta_Sans',sans-serif]
                font-semibold
                bg-primary
                text-on-primary
                px-6
                py-2.5
                rounded-full
                hover:bg-primary-container
                hover:shadow-md
                transition-all
              "
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className={`
                  text-label-md
                  font-['Plus_Jakarta_Sans',sans-serif]
                  font-semibold
                  transition-colors
                  duration-200
                  ${
                    transparentNavbar
                      ? 'text-white hover:text-white/75'
                      : 'text-primary hover:text-primary-container'
                  }
                `}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                  text-label-md
                  font-['Plus_Jakarta_Sans',sans-serif]
                  font-semibold
                  bg-primary
                  text-white
                  px-6
                  py-2.5
                  rounded-full
                  hover:bg-primary-container
                  hover:shadow-md
                  transition-all
                "
              >
                Get Started
              </Link>
            </>
          )}

        </div>

        {/* MOBILE */}

        <button
          className={`
            md:hidden
            p-2
            transition-colors
            ${
              transparentNavbar
                ? 'text-white'
                : 'text-primary'
            }
          `}
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

      </div>

      {/* MOBILE MENU */}

      {mobileOpen && (
        <div
          className="
            md:hidden
            bg-surface
            border-t
            border-outline-variant
            px-6
            py-4
            flex
            flex-col
            gap-3
          "
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() =>
                setMobileOpen(false)
              }
              className="
                text-label-md
                font-['Plus_Jakarta_Sans',sans-serif]
                font-medium
                text-on-surface
                hover:text-primary
                py-2
              "
            >
              {link.label}
            </Link>
          ))}

          <div
            className="
              flex
              gap-3
              pt-3
              border-t
              border-outline-variant
            "
          >
            <Link
              to="/login"
              onClick={() =>
                setMobileOpen(false)
              }
              className="
                flex-1
                text-center
                border
                border-primary
                text-primary
                py-2.5
                rounded-full
                font-semibold
              "
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() =>
                setMobileOpen(false)
              }
              className="
                flex-1
                text-center
                bg-primary
                text-white
                py-2.5
                rounded-full
                font-semibold
              "
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}