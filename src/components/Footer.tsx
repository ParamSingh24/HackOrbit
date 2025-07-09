import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import SignUpModal from './SignUpModal';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';
import FutureScope from './FutureScope';

const Footer = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false); // State to control animation
  const { user } = useAuth();
  const [showSignUp, setShowSignUp] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // Set visibility to true when section is in view
            observer.unobserve(entry.target); // Stop observing once animated
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <FutureScope />
      <footer id="footer" ref={sectionRef} className="bg-gradient-to-br from-gray-900 to-black text-white py-12 overflow-hidden border-t border-[#008080]"> {/* Added border-t with a dark cyan color */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }

        /* Glass Box Styles - for general sections */
        .glass-box {
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          box-shadow: 0 8px 32px 0 rgba(0, 251, 255, 0.2);
          transition: all 0.3s ease-in-out;
        }

        .glass-box:hover {
          background: rgba(0, 0, 0, 0.4);
          box-shadow: 0 12px 48px 0 rgba(0, 251, 255, 0.4);
          transform: translateY(-2px);
        }
      `}</style>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <div className="font-bold">
                <span className="text-xs uppercase tracking-widest text-blue-300 block">MITS CareerBoost</span>
                <span className="text-lg text-white">MITS CareerBoost</span>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              AI-powered career acceleration platform that helps job seekers optimize resumes,
              track applications, and land their dream jobs faster.
            </p>
            <div className="flex space-x-4">
              {['Twitter', 'LinkedIn', 'Facebook', 'Instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-gray-400 hover:text-[#00FFFF] text-sm transition-colors duration-300"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase text-gray-300">Product</h4>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'Testimonials', 'For Teams', 'For Enterprise'].map((item) => (
                <li key={item}>
                  {item === 'Pricing' ? (
                    <a
                      href="#pricing"
                      onClick={e => {
                        e.preventDefault();
                        const section = document.getElementById('pricing');
                        section?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                    >
                      {item}
                    </a>
                  ) : (
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                      {item}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase text-gray-300">Company</h4>
            <ul className="space-y-3">
              {['About', 'Careers', 'Privacy', 'Terms', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 md:mt-0">
            {user ? (
              <button
                className="w-10 h-10 rounded-full bg-cyan-900 flex items-center justify-center text-lg text-cyan-300 border-2 border-cyan-400 hover:shadow-lg transition-all"
                onClick={() => navigate('/profile')}
                title={user.email}
              >
                {user.email?.[0]?.toUpperCase() || 'U'}
              </button>
            ) : (
              <button
                className="glassy-button px-6 py-2 rounded text-white font-semibold border border-cyan-400 hover:bg-[#00FFFF] hover:text-black transition-all duration-200"
                onClick={() => setShowSignUp(true)}
              >
                Get Started
              </button>
            )}
          </div>
        </div>

        <div className={`border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between text-gray-500 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} CareerBoost. All rights reserved.
          </p>
          <p className="text-sm mt-2 md:mt-0">
            Hackorbit MITS CareerBoost.
          </p>
        </div>
      </div>
      {showSignUp && <SignUpModal onClose={() => setShowSignUp(false)} />}
    </footer>
    </>
  );
};

export default Footer;
