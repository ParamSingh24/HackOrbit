import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    // Fixed header with a dark, semi-transparent background and glassmorphism effect
    <header className="fixed top-0 left-0 right-0 z-50 bg-blue-950 bg-opacity-30 backdrop-filter backdrop-blur-lg border-b border-blue-800 border-opacity-50 rounded-b-lg shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="font-bold">
              {/* Brand name with light text color, using the specific cyan for the main title */}
              <span className="text-xs uppercase tracking-widest text-blue-300 block">HackOrbit</span>
              <span className="text-lg text-[#00FFFF]">MITS CareerBoost</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Navigation links with light text, increased hover scale, and no underline */}
            <a href="#" className="text-sm font-medium text-blue-100 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110">Features</a>
            <a href="#" className="text-sm font-medium text-blue-100 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110">Pricing</a>
            <a href="#" className="text-sm font-medium text-blue-100 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110">Resources</a>
            {/* Adjusted spacing */}
            <div className="pl-4 flex items-center space-x-4">
              <a href="#" className="text-sm font-medium text-blue-100 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110">Log in</a>
              {/* Sign up button with glassy look, no border, and cyan fill/glow on hover */}
              <Button
                size="sm"
                className="bg-transparent backdrop-filter backdrop-blur-md text-white rounded-md transition-all duration-500 ease-in-out transform hover:scale-100
                           hover:bg-gradient-to-r hover:from-[#00FFFF] hover:to-[#00CCCC] hover:shadow-[0_0_20px_rgba(0,255,255,0.6)]"
              >
                Sign up
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-white hover:bg-blue-700 transition-colors duration-200"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation - styled with glassmorphism principles and slide/fade animation */}
        {/* Added transition for smooth appearance/disappearance */}
        <div
          className={`md:hidden py-4 border-t border-blue-800 border-opacity-50 bg-blue-950 bg-opacity-40 backdrop-filter backdrop-blur-md rounded-b-lg shadow-inner
            ${mobileMenuOpen ? 'max-h-screen opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2 overflow-hidden'}
            transition-all duration-300 ease-in-out`}
        >
          <nav className="flex flex-col space-y-4 px-4">
            {/* Mobile navigation links with increased hover scale and no underline */}
            <a href="#" className="text-sm font-medium text-blue-100 px-2 py-2 rounded-md hover:bg-blue-700 hover:text-white transition-colors duration-200 transform hover:scale-105">Features</a>
            <a href="#" className="text-sm font-medium text-blue-100 px-2 py-2 rounded-md hover:bg-blue-700 hover:text-white transition-colors duration-200 transform hover:scale-105">Pricing</a>
            <a href="#" className="text-sm font-medium text-blue-100 px-2 py-2 rounded-md hover:bg-blue-700 hover:text-white transition-colors duration-200 transform hover:scale-105">Resources</a>
            <a href="#" className="text-sm font-medium text-blue-100 px-2 py-2 rounded-md hover:bg-blue-700 hover:text-white transition-colors duration-200 transform hover:scale-105">Log in</a>
            <Button
              size="sm"
              className="bg-transparent backdrop-filter backdrop-blur-md text-white rounded-md transition-all duration-500 ease-in-out transform hover:scale-100 w-full
                         hover:bg-gradient-to-r hover:from-[#00FFFF] hover:to-[#00CCCC] hover:shadow-[0_0_20px_rgba(0,255,255,0.6)]"
            >
              Sign up
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
