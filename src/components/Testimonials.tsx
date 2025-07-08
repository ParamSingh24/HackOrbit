import React, { useState, useRef, useEffect } from 'react';
import { Quote } from 'lucide-react'; // Using Quote icon for the testimonial

type Career = 'Recent Graduate' | 'Career Changer' | 'Executive';

const Testimonials = () => {
  const [activeTab, setActiveTab] = useState<Career>('Recent Graduate');
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

  // Testimonial data based on activeTab
  const testimonialsData = {
    'Recent Graduate': {
      avatarColor: 'bg-blue-600',
      quote: "As a recent CS graduate with no industry experience, I was getting zero callbacks. CareerBoost helped optimize my resume and taught me how to highlight my projects effectively. Within 3 weeks, I landed 5 interviews and got my dream job offer!",
      author: "Alex Chen",
      role: "Software Engineer",
    },
    'Career Changer': {
      avatarColor: 'bg-purple-600',
      quote: "Transitioning from marketing to tech seemed impossible. CareerBoost provided invaluable AI coaching and skill gap analysis, guiding me to relevant courses. I successfully pivoted into a Data Analyst role, something I never thought possible!",
      author: "Maria Rodriguez",
      role: "Data Analyst",
    },
    'Executive': {
      avatarColor: 'bg-green-600',
      quote: "Even at an executive level, staying competitive is key. The job trend analysis and personalized email outreach features of CareerBoost streamlined my search for leadership roles. It's an indispensable tool for career advancement.",
      author: "David Lee",
      role: "VP of Product",
    },
  };

  const currentTestimonial = testimonialsData[activeTab];

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

        /* Glass Bubble Styles (for inner elements like AI messages) */
        .glass-bubble {
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            transition: background 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
            box-shadow: 0 2px 8px rgba(0, 251, 255, 0.1);
        }
        .glass-bubble:hover {
            background: rgba(0, 0, 0, 0.5);
            box-shadow: 0 4px 12px rgba(0, 251, 255, 0.2);
        }
      `}</style>
      <div className="container mx-auto px-4">
        <h2 className={`text-4xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          Trusted by job seekers at every career stage
        </h2>
        <p className={`text-lg text-white text-center mb-12 max-w-3xl mx-auto ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          See how CareerBoost has helped professionals from different backgrounds achieve their career goals.
        </p>

        <div className={`max-w-3xl mx-auto mt-10 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
          <div className="flex border-b border-gray-700 mb-8 glass-box rounded-t-lg overflow-hidden p-2">
            {(['Recent Graduate', 'Career Changer', 'Executive'] as Career[]).map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-3 px-6 text-sm font-medium rounded-md transition-all duration-300 ease-in-out transform hover:scale-105
                  ${activeTab === tab
                    ? 'bg-gray-800 text-[#00FFFF] shadow-inner border border-[#00FFFF] border-opacity-50'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700 hover:bg-opacity-30'
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="glass-box rounded-lg p-8 border border-gray-700">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-6">
                {/* Placeholder for avatar, could be replaced with actual images */}
                <div className={`w-16 h-16 rounded-full ${currentTestimonial.avatarColor} flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
                  {currentTestimonial.author.charAt(0)}
                </div>
              </div>
              <div>
                <Quote size={36} className="text-[#00FFFF] mb-2" /> {/* Cyan quote icon */}
                <p className="text-gray-200 mb-4 text-lg">
                  {currentTestimonial.quote}
                </p>
                <div className="mt-4">
                  <h4 className="font-medium text-white">{currentTestimonial.author}</h4>
                  <p className="text-sm text-gray-400">{currentTestimonial.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
