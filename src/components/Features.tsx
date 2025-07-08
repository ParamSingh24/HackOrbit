import React, { useEffect, useRef, useState } from 'react';
import { FileText, BarChart2, Users, Mail, ClipboardList, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Features = () => {
  const features = [
    {
      icon: <FileText className="h-8 w-8 text-[#00FFFF]" />, // Specific cyan color
      title: 'Resume Optimization',
      description: 'AI-powered resume analysis and optimization to match job descriptions and increase interview chances.',
      buttonText: 'Learn More'
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-[#00FFFF]" />, // Specific cyan color
      title: 'Job Trend Analysis',
      description: 'Track industry trends, in-demand skills, and salary insights to make informed career decisions.',
      buttonText: 'Learn More'
    },
    {
      icon: <Users className="h-8 w-8 text-[#00FFFF]" />, // Specific cyan color
      title: 'AI Career Coaching',
      description: 'Get personalized advice, interview tips, and guided feedback to improve your professional presence.',
      buttonText: 'Learn More'
    },
    {
      icon: <Mail className="h-8 w-8 text-[#00FFFF]" />, // Specific cyan color
      title: 'Email Outreach',
      description: 'AI-generated personalized emails to recruiters that highlight your relevant skills and experience.',
      buttonText: 'Learn More'
    },
    {
      icon: <ClipboardList className="h-8 w-8 text-[#00FFFF]" />, // Specific cyan color
      title: 'Application Tracking',
      description: 'Track all your job applications, interviews, and follow-ups in one personalized dashboard.',
      buttonText: 'Learn More'
    },
    {
      icon: <Clock className="h-8 w-8 text-[#00FFFF]" />, // Specific cyan color
      title: 'Skill Gap Analysis',
      description: 'Identify missing skills and get recommendations for courses to become more competitive.',
      buttonText: 'Learn More'
    }
  ];

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
        <h2 className={`text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          Everything you need to accelerate your career
        </h2>
        <p className={`text-lg text-white text-center mb-12 max-w-3xl mx-auto ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          MITS CareerBoost combines cutting-edge AI with practical tools to help you navigate the job market with confidence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`glass-box flex flex-col p-6 rounded-xl shadow-2xl border border-gray-700 border-opacity-60
                         transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-[0_0_40px_rgba(0,255,255,0.4)] hover:rotate-1 hover:border-[#00FFFF]
                         ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} // Apply animation based on isVisible
              style={{ animationDelay: `${0.3 + index * 0.1}s` }} // Staggered animation
            >
              <div className="mb-4 p-3 bg-gray-800 bg-opacity-60 rounded-lg w-fit shadow-inner border border-gray-700 border-opacity-50">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-[#00FFFF]">{feature.title}</h3>
              <p className="text-white mb-6 flex-grow">{feature.description}</p>
              <Button
                variant="outline"
                className="w-fit justify-center mt-auto px-6 py-2
                           bg-gray-900 bg-opacity-30 backdrop-filter backdrop-blur-md text-white border border-[#00FFFF] border-opacity-60 rounded-md shadow-lg
                           hover:bg-[#00FFFF] hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] hover:border-[#00FFFF] transform hover:scale-105 transition-all duration-300 ease-in-out"
              >
                {feature.buttonText}
              </Button>
            </div>
          ))}
        </div>

        <div className={`mt-16 text-center ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.7s' }}>
          <Button
            variant="link"
            className="text-[#00FFFF] font-medium text-lg
                       hover:text-white hover:underline underline-offset-4 transition-colors duration-300 ease-in-out"
          >
            Explore all features →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;
