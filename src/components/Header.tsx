import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ArrowRight } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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
              <a href="#" className="nav-link">Home</a>
              <a href="#" className="nav-link">Features</a>
              <a href="#" className="nav-link">How it Works</a>
              <button
                onClick={scrollToPricing}
                className={`nav-link ${activeSection === 'pricing' ? 'active' : ''}`}
              >
                Pricing
              </button>
              <a href="#" className="nav-link">About</a>
              <a href="#" className="nav-link">Contact</a>
            </nav>
            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300"
              >
                Sign In
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:from-cyan-500 hover:to-blue-600 transition-all duration-300"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
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
                <a href="#" className="nav-link">Home</a>
                <a href="#" className="nav-link">Features</a>
                <a href="#" className="nav-link">How it Works</a>
                <button
                  onClick={scrollToPricing}
                  className={`nav-link text-left ${activeSection === 'pricing' ? 'active' : ''}`}
                >
                  Pricing
                </button>
                <a href="#" className="nav-link">About</a>
                <a href="#" className="nav-link">Contact</a>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-700">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
                  >
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:from-cyan-500 hover:to-blue-600"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
