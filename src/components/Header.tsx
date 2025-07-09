import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ArrowRight } from 'lucide-react';
import SignUpModal from './SignUpModal'; // Assuming this component exists and is styled separately
import { useAuth } from '@/hooks/useAuth'; // Assuming this hook exists
import ProfileModal from './ProfileModal'; // Assuming this component exists and is styled separately
import { useNavigate } from 'react-router-dom'; // Assuming react-router-dom is used

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showSignUp, setShowSignUp] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showTranslate, setShowTranslate] = useState(false);
  const translateScriptLoadedRef = useRef(false);

  // Helper to initialize Google Translate widget
  const initGoogleTranslate = () => {
    const el = document.getElementById('google_translate_element');
    if (el) el.innerHTML = ''; // Clear previous widget if any
    if (window.google && window.google.translate && window.google.translate.TranslateElement) {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,hi,es,fr,de,zh-CN,ar,ru,ja,pt',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, 'google_translate_element');
    }
  };

  // Scroll to Pricing section with offset for fixed header
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      const headerHeight = 80; // Adjust if header height changes
      const elementPosition = pricingSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setIsMenuOpen(false);
  };

  // Active section highlight (optional, for Pricing only)
  useEffect(() => {
    const handleScroll = () => {
      const pricingSection = document.getElementById('pricing');
      if (pricingSection) {
        const rect = pricingSection.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection('pricing');
        } else {
          setActiveSection('home');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Preload Google Translate script on mount and always set callback before loading
  useEffect(() => {
    // Define the callback function globally
    window.googleTranslateElementInit = function() {
      translateScriptLoadedRef.current = true;
      // If the translate widget is already supposed to be shown, initialize it
      if (showTranslate) {
        // Use a small delay to give the widget components time to be fully ready
        setTimeout(initGoogleTranslate, 100);
      }
    };

    const scriptId = 'google-translate-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google && window.google.translate && window.google.translate.TranslateElement) {
      // If script is already loaded, call the callback directly
      window.googleTranslateElementInit();
    }
  }, [showTranslate]); // Add showTranslate to dependencies to re-trigger on visibility change

  return (
    <>
      <style jsx>{`
        /* Glass Header Background */
        .header-bg {
          background: rgba(0, 0, 0, 0.3); /* Dark transparent background */
          backdrop-filter: blur(10px); /* Glassmorphism blur effect */
          -webkit-backdrop-filter: blur(10px); /* Safari support */
          border-bottom: 1px solid rgba(255, 255, 255, 0.1); /* Subtle white border */
          box-shadow: 0 4px 15px rgba(0, 251, 255, 0.1); /* Subtle cyan glow shadow */
        }

        /* Navigation Link Styles */
        .nav-link {
          color: #D1D5DB; /* Light gray text */
          transition: all 0.3s ease-in-out;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          cursor: pointer;
        }
        .nav-link:hover {
          color: #00FBFF; /* Cyan text on hover */
          background: rgba(0, 251, 255, 0.1); /* Light cyan transparent background on hover */
        }
        .nav-link.active {
          color: #00FBFF; /* Active cyan text */
          background: rgba(0, 251, 255, 0.2); /* Active light cyan transparent background */
        }

        /* Mobile Menu Container Styles */
        .mobile-menu {
          background: rgba(0, 0, 0, 0.4); /* Darker transparent background for mobile menu */
          backdrop-filter: blur(15px); /* Stronger blur for mobile menu */
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          box-shadow: 0 8px 32px 0 rgba(0, 251, 255, 0.2);
          transition: all 0.3s ease-in-out; /* Smooth transition for mobile menu open/close */
        }

        /* Glassy Button Styles (re-defined for consistency) */
        .glassy-button {
          background: rgba(0, 0, 0, 0.2); /* Semi-transparent dark background */
          backdrop-filter: blur(8px); /* Blur effect */
          -webkit-backdrop-filter: blur(8px); /* Safari support */
          border: 1px solid rgba(255, 255, 255, 0.15); /* Subtle border */
          box-shadow: 0 4px 15px rgba(0, 251, 255, 0.1); /* Initial subtle cyan glow */
          transition: all 0.3s ease-in-out;
          color: white; /* Ensure text is white by default */
        }

        .glassy-button:hover {
          background: rgba(0, 0, 0, 0.4);
          border-color: rgba(0, 251, 255, 0.4);
          box-shadow: 0 6px 25px rgba(0, 251, 255, 0.3);
          transform: translateY(-2px);
        }

        /* Specific style for the "Get Started" button to match the glassy theme */
        .get-started-button {
          background: linear-gradient(to right, rgba(0, 255, 255, 0.3), rgba(0, 204, 204, 0.3)); /* Cyan gradient with transparency */
          color: white; /* White text for contrast */
          border: 1px solid rgba(0, 255, 255, 0.5); /* Cyan border with transparency */
          box-shadow: 0 4px 15px rgba(0, 251, 255, 0.2); /* Cyan glow */
          transition: all 0.3s ease-in-out;
        }

        .get-started-button:hover {
          background: linear-gradient(to right, rgba(0, 255, 255, 0.5), rgba(0, 204, 204, 0.5)); /* More opaque on hover */
          box-shadow: 0 6px 25px rgba(0, 251, 255, 0.4); /* Stronger glow on hover */
          transform: translateY(-1px);
        }

        /* Translate button style */
        .translate-button {
          background: rgba(0, 0, 0, 0.2);
          color: #00FFFF; /* Cyan text */
          border: 1px solid rgba(0, 255, 255, 0.3);
          box-shadow: 0 2px 8px rgba(0, 251, 255, 0.1);
          transition: all 0.3s ease-in-out;
        }
        .translate-button:hover {
          background: rgba(0, 0, 0, 0.4);
          box-shadow: 0 4px 12px rgba(0, 251, 255, 0.2);
          transform: translateY(-1px);
        }

        /* Profile button style */
        .profile-button {
          background: rgba(0, 0, 0, 0.2);
          color: #00FFFF; /* Cyan text */
          border: 1px solid rgba(0, 255, 255, 0.3);
          box-shadow: 0 2px 8px rgba(0, 251, 255, 0.1);
          transition: all 0.3s ease-in-out;
        }
        .profile-button:hover {
          background: rgba(0, 0, 0, 0.4);
          box-shadow: 0 4px 12px rgba(0, 251, 255, 0.2);
          transform: translateY(-1px);
        }

        /* Google Translate Widget Specific Styles */
        #google_translate_element .goog-te-gadget {
          font-family: 'Inter', sans-serif !important;
          color: #E2E8F0 !important; /* Light text for widget */
          background-color: transparent !important;
          border: none !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        #google_translate_element .goog-te-gadget select {
          background-color: rgba(0, 0, 0, 0.4) !important; /* Darker transparent background for select */
          color: #E2E8F0 !important; /* Light text for select options */
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          border-radius: 0.25rem !important;
          padding: 0.5rem 1rem !important;
          box-shadow: 0 2px 8px rgba(0, 251, 255, 0.1) !important;
          transition: all 0.3s ease-in-out !important;
        }

        #google_translate_element .goog-te-gadget select:hover {
          background-color: rgba(0, 0, 0, 0.6) !important;
          border-color: rgba(0, 251, 255, 0.4) !important;
        }

        #google_translate_element .goog-te-gadget a {
          color: #00FBFF !important; /* Cyan links */
          text-decoration: none !important;
          transition: color 0.3s ease-in-out !important;
        }
        #google_translate_element .goog-te-gadget a:hover {
          color: #00CCCC !important;
        }

        /* Hide the Google Translate branding link */
        .goog-logo-link {
          display: none !important;
        }
        .goog-te-gadget span {
          color: #E2E8F0 !important; /* Ensure text color for "Google Translate" is light */
        }

        /* Adjust the size of the translate element div to ensure the widget fits */
        .fixed.top-20.right-8.z-\[2000\] {
          min-width: 280px; /* Increased min-width */
          min-height: 140px; /* Increased min-height */
        }
          /* Navigation Link Styles */
  .nav-link {
    color: #D1D5DB; /* Light gray text */
    transition: all 0.3s ease-in-out;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transform: scale(1); /* Default scale */
    display: inline-block;
    position: relative;
  }

  .nav-link:hover {
    color: #00FBFF; /* Cyan text on hover */
    transform: scale(1.25); /* Mac-style dock grow effect */
    background: none; /* No background/border */
    text-shadow: 0 0 8px rgba(0, 251, 255, 0.4); /* Elegant glow */
  }

  .nav-link.active {
    color: #00FBFF; /* Active cyan text */
    background: none;
    text-shadow: 0 0 8px rgba(0, 251, 255, 0.5);
  }

  /* Ensure other interactions (buttons etc.) are unaffected */
  .nav-link:focus {
    outline: none;
  }

  /* Optional: make the transition smoother for the dock effect */
  @media (prefers-reduced-motion: no-preference) {
    .nav-link {
      transition: transform 0.2s ease, color 0.2s ease, text-shadow 0.2s ease;
    }
  }
      `}</style>
      <header className="fixed top-0 left-0 right-0 z-50 header-bg">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo Section */}
            <div className="flex flex-col items-start">
              <span className="text-xs uppercase tracking-widest text-blue-300 block">HackOrbit</span>
              <span className="text-xl font-bold text-white">
                MITS <span className="text-cyan-400">CareerBoost</span>
              </span>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="nav-link" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMenuOpen(false); }}>Home</a>
              <a href="#features" className="nav-link" onClick={e => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); }}>Features</a>
              <button
                onClick={e => { e.preventDefault(); scrollToPricing(); }}
                className={`nav-link ${activeSection === 'pricing' ? 'active' : ''}`}
              >
                Pricing
              </button>
              <a href="#future-scope" className="nav-link" onClick={e => { e.preventDefault(); document.getElementById('future-scope')?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); }}>Future Scope</a>
              <a href="#footer" className="nav-link" onClick={e => { e.preventDefault(); document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); }}>Contact</a>
            </nav>
            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                className="px-4 py-2 rounded-md font-bold transition-all duration-200 translate-button"
                onClick={() => setShowTranslate(v => !v)}
              >
                🌐 Translate
              </button>
              {user ? (
                <button
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg profile-button"
                  onClick={() => navigate('/profile')}
                  title={user.email}
                >
                  {user.email?.[0]?.toUpperCase() || 'U'}
                </button>
              ) : (
                <Button
                  size="sm"
                  className="rounded-md get-started-button"
                  onClick={() => setShowSignUp(true)}
                >
                  Get Started
                </Button>
              )}
            </div>
            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-4 right-4 mt-2 mobile-menu p-4">
              <nav className="flex flex-col space-y-4">
                <a href="#" className="nav-link" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMenuOpen(false); }}>Home</a>
                <a href="#features" className="nav-link" onClick={e => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); }}>Features</a>
                <button
                  onClick={e => { e.preventDefault(); scrollToPricing(); }}
                  className={`nav-link text-left ${activeSection === 'pricing' ? 'active' : ''}`}
                >
                  Pricing
                </button>
                <a href="#future-scope" className="nav-link" onClick={e => { e.preventDefault(); document.getElementById('future-scope')?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); }}>Future Scope</a>
                <a href="#footer" className="nav-link" onClick={e => { e.preventDefault(); document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); }}>Contact</a>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-700">
                  {user ? (
                    <button
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg profile-button"
                      onClick={() => { setIsMenuOpen(false); navigate('/profile'); }}
                      title={user.email}
                    >
                      {user.email?.[0]?.toUpperCase() || 'U'}
                    </button>
                  ) : (
                    <Button
                      size="sm"
                      className="rounded-md get-started-button"
                      onClick={() => setShowSignUp(true)}
                    >
                      Get Started
                    </Button>
                  )}
                  <button
                    className="px-4 py-2 rounded-md font-bold transition-all duration-200 translate-button"
                    onClick={() => setShowTranslate(v => !v)}
                  >
                    🌐 Translate
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
      {showSignUp && <SignUpModal onClose={() => setShowSignUp(false)} />}
      {/* Google Translate Widget */}
      {showTranslate && (
        <div className="fixed top-20 right-8 z-[2000] bg-black bg-opacity-80 p-4 rounded-xl border border-cyan-400 shadow-2xl min-w-[260px] min-h-[120px] flex flex-col items-center justify-center">
          <div id="google_translate_element" className="w-full" key={translateScriptLoadedRef.current ? 'loaded' : 'loading'}></div>
          {!translateScriptLoadedRef.current && (
            <div className="flex items-center justify-center gap-2 mt-2 text-cyan-200 text-sm">
              <svg className="animate-spin h-5 w-5 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
              Loading languages...
            </div>
          )}
          <button
            className="mt-2 px-3 py-1 rounded bg-cyan-900 text-cyan-200 border border-cyan-400 hover:bg-cyan-400 hover:text-black text-xs font-semibold"
            onClick={() => setShowTranslate(false)}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default Header;
