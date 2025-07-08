import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ArrowRight } from 'lucide-react';
import SignUpModal from './SignUpModal';
import { useAuth } from '@/hooks/useAuth';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';

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
    if (el) el.innerHTML = '';
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
    window.googleTranslateElementInit = function() {
      translateScriptLoadedRef.current = true;
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
  }, []);

  // Show/hide widget and always re-init
  useEffect(() => {
    if (showTranslate) {
      // Always clear and re-init
      initGoogleTranslate();
      if (window.google && window.google.translate && window.google.translate.TranslateElement) {
        window.googleTranslateElementInit();
      }
    }
  }, [showTranslate]);

  return (
    <>
      <style jsx>{`
        .header-bg {
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .nav-link {
          color: #D1D5DB;
          transition: all 0.3s ease-in-out;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          cursor: pointer;
        }
        .nav-link:hover {
          color: #00FBFF;
          background: rgba(0, 251, 255, 0.1);
        }
        .nav-link.active {
          color: #00FBFF;
          background: rgba(0, 251, 255, 0.2);
        }
        .mobile-menu {
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          box-shadow: 0 8px 32px 0 rgba(0, 251, 255, 0.2);
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
              <a href="#footer" className="nav-link" onClick={e => { e.preventDefault(); document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); }}>Contact</a>
            </nav>
            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                className="px-4 py-2 rounded-md font-bold text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 border-2 border-cyan-400 shadow transition-all duration-200"
                onClick={() => setShowTranslate(v => !v)}
              >
                🌐 Translate
              </button>
              {user ? (
                <button
                  className="w-10 h-10 rounded-full bg-cyan-900 flex items-center justify-center text-lg text-cyan-300 border-2 border-cyan-400 hover:shadow-lg transition-all"
                  onClick={() => navigate('/profile')}
                  title={user.email}
                >
                  {user.email?.[0]?.toUpperCase() || 'U'}
                </button>
              ) : (
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:from-cyan-500 hover:to-blue-600"
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
                <a href="#footer" className="nav-link" onClick={e => { e.preventDefault(); document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); }}>Contact</a>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-700">
                  {user ? (
                    <button
                      className="w-10 h-10 rounded-full bg-cyan-900 flex items-center justify-center text-lg text-cyan-300 border-2 border-cyan-400 hover:shadow-lg transition-all"
                      onClick={() => { setIsMenuOpen(false); navigate('/profile'); }}
                      title={user.email}
                    >
                      {user.email?.[0]?.toUpperCase() || 'U'}
                    </button>
                  ) : (
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:from-cyan-500 hover:to-blue-600"
                      onClick={() => setShowSignUp(true)}
                    >
                      Get Started
                    </Button>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
      {showSignUp && <SignUpModal onClose={() => setShowSignUp(false)} />}
      {/* Google Translate Widget */}
      {showTranslate && (
        <div className="fixed top-20 right-8 z-[2000] bg-black bg-opacity-80 p-4 rounded-xl border border-cyan-400 shadow-2xl min-w-[260px] min-h-[80px] flex flex-col items-center justify-center">
          <div id="google_translate_element" className="w-full"></div>
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
