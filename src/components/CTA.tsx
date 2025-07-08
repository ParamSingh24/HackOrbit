import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';

const CTA = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false); // State to control animation

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
    <section ref={sectionRef} className="py-16 bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden border-t border-[#008080]">
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

        /* Glass Box Styles */
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

        /* Glassy Button Styles */
        .glassy-button {
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 4px 15px rgba(0, 251, 255, 0.1);
          transition: all 0.3s ease-in-out;
          color: white; /* Ensure text is white by default */
        }

        .glassy-button:hover {
          background: rgba(0, 0, 0, 0.4);
          border-color: rgba(0, 251, 255, 0.4);
          box-shadow: 0 6px 25px rgba(0, 251, 255, 0.3);
          transform: translateY(-2px);
        }
      `}</style>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left section with features and buttons */}
          <div className={`space-y-8 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00CCCC]">
                Start optimizing your career journey today
              </h2>
              <p className="text-gray-300 mb-6">
                Join thousands of professionals who have accelerated their job search with MITS CareerBoost. Get started with a free account in less than 2 minutes.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <Check className="mr-3 h-5 w-5 text-[#00FFFF] flex-shrink-0 mt-0.5" />
                <span className="text-white">Resume optimization with AI feedback</span>
              </div>
              <div className="flex items-start">
                <Check className="mr-3 h-5 w-5 text-[#00FFFF] flex-shrink-0 mt-0.5" />
                <span className="text-white">Job trends and market insights</span>
              </div>
              <div className="flex items-start">
                <Check className="mr-3 h-5 w-5 text-[#00FFFF] flex-shrink-0 mt-0.5" />
                <span className="text-white">Personalized career coaching</span>
              </div>
              <div className="flex items-start">
                <Check className="mr-3 h-5 w-5 text-[#00FFFF] flex-shrink-0 mt-0.5" />
                <span className="text-white">Application tracking dashboard</span>
              </div>
              <div className="flex items-start">
                <Check className="mr-3 h-5 w-5 text-[#00FFFF] flex-shrink-0 mt-0.5" />
                <span className="text-white">Free basic account available</span>
              </div>
            </div>

            <div className="pt-4">
              <Button className="mr-4 glassy-button">
                Sign up free
              </Button>
              <Button variant="outline" className="glassy-button" style={{color:'white'}}>
                Learn more
              </Button>
            </div>
          </div>

          {/* Right section with the form */}
          <div className={`glass-box p-8 rounded-lg shadow-2xl ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-medium mb-6 text-[#00FFFF]">Get a free resume analysis</h3>
            <p className="text-sm text-gray-300 mb-8">See how your resume scores against industry standards</p>

            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className="w-full p-3 bg-transparent border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FFFF] focus:border-[#00FFFF]"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full p-3 bg-transparent border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FFFF] focus:border-[#00FFFF]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Upload Resume</label>
                <div className="border border-dashed border-gray-600 rounded-md p-4 text-center bg-gray-900 bg-opacity-20 backdrop-filter backdrop-blur-sm">
                  <div className="flex items-center justify-center mb-2">
                    <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center border border-gray-600">
                      <span className="text-xs text-[#00FFFF]">PDF</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">Drag and drop your resume, or <span className="text-[#00FFFF]">browse</span></p>
                </div>
              </div>

              <Button className="w-full glassy-button">
                Get Free Analysis
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
