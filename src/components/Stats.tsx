import React, { useEffect, useRef, useState } from 'react';
import { BarChart, Users, Building, Clock } from 'lucide-react';

const Stats = () => {
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

        /* Glass Box Styles - for stat cards */
        .glass-box {
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          box-shadow: 0 8px 32px 0 rgba(0, 251, 255, 0.2);
          transition: all 0.5s ease-in-out; /* Increased transition duration for smoother effects */
        }

        .glass-box:hover {
          background: rgba(0, 0, 0, 0.4);
          box-shadow: 0 12px 48px 0 rgba(0, 251, 255, 0.4), 0 0 40px rgba(0, 255, 255, 0.4); /* Added glow effect */
          transform: translateY(-2px);
          border-color: #00FFFF; /* Cyan border on hover */
        }
      `}</style>
      <div className="container mx-auto px-4">
        <h2 className={`text-4xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          Results that speak for themselves
        </h2>
        <p className={`text-lg text-white text-center mb-12 max-w-3xl mx-auto ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          MITS CareerBoost delivers measurable improvements to your job search success and career growth.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {/* Stat Card 1 */}
          <div className={`glass-box p-6 rounded-xl shadow-2xl flex flex-col ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <div className="flex justify-between items-start">
              <span className="text-gray-300 text-sm">Resume Success Rate</span>
              <BarChart className="h-5 w-5 text-[#00FFFF]" />
            </div>
            <div className="mt-4">
              <span className="text-4xl font-bold text-white">76%</span>
              <p className="text-sm text-gray-400 mt-1">Higher interview callback rate</p>
            </div>
            <div className="mt-auto pt-4">
              <span className="text-xs text-green-400 font-medium">+23.4% quarter-over-quarter</span>
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className={`glass-box p-6 rounded-xl shadow-2xl flex flex-col ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <div className="flex justify-between items-start">
              <span className="text-gray-300 text-sm">Users Helped</span>
              <Users className="h-5 w-5 text-[#00FFFF]" />
            </div>
            <div className="mt-4">
              <span className="text-4xl font-bold text-white">5,000+</span>
              <p className="text-sm text-gray-400 mt-1">Job seekers served successfully</p>
            </div>
            <div className="mt-auto pt-4">
              <span className="text-xs text-gray-400">Growing daily</span>
            </div>
          </div>

          {/* Stat Card 3 */}
          <div className={`glass-box p-6 rounded-xl shadow-2xl flex flex-col ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
            <div className="flex justify-between items-start">
              <span className="text-gray-300 text-sm">Companies Hiring</span>
              <Building className="h-5 w-5 text-[#00FFFF]" />
            </div>
            <div className="mt-4">
              <span className="text-4xl font-bold text-white">3,200+</span>
              <p className="text-sm text-gray-400 mt-1">Companies across industries</p>
            </div>
            <div className="mt-auto pt-4">
              <span className="text-xs text-gray-400">Including Fortune 500</span>
            </div>
          </div>

          {/* Stat Card 4 */}
          <div className={`glass-box p-6 rounded-xl shadow-2xl flex flex-col ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
            <div className="flex justify-between items-start">
              <span className="text-gray-300 text-sm">Time Saved</span>
              <Clock className="h-5 w-5 text-[#00FFFF]" />
            </div>
            <div className="mt-4">
              <span className="text-4xl font-bold text-white">65%</span>
              <p className="text-sm text-gray-400 mt-1">Reduction in job search time</p>
            </div>
            <div className="mt-auto pt-4">
              <span className="text-xs text-gray-400">Industry leading</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
