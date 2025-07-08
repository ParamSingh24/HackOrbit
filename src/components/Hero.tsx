import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, BarChart } from 'lucide-react';

const Hero = () => {
  const scrollToUpload = () => {
    const uploadSection = document.getElementById('upload');
    uploadSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Custom CSS for Glass UI Effect, overall theme, and animations */}
      <style jsx>{`
        /* Overall Dark Background for the Section with Radial Gradient Glow */
        .hero-section-bg {
          background: radial-gradient(
            circle at 30% 70%,
            #1E293B 0%, /* Lighter navy for center glow */
            #0F172A 80%  /* Deep navy for edges */
          );
          /* Fallback for browsers that don't support radial-gradient or for initial load */
          background-color: #0A1128;
          min-height: 80vh; /* Ensure it covers full viewport height */
          display: flex;
          align-items: center; /* Center content vertically */
          justify-content: center; /* Center content horizontally */
          overflow: hidden; /* Hide any overflow from animations */
          perspective: 1000px; /* Added perspective for 3D effect */
        }

        /* Keyframe for title animation - Arriving from left */
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100px); /* Start further off-screen to the left */
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Apply animation to the main heading */
        .animate-slide-in-left {
          animation: slideInFromLeft 1s ease-out forwards;
        }

        /* Glass Box Styles */
        .glass-box {
          /* Darker, more prominent transparent background to match the dark theme */
          background: rgba(0, 0, 0, 0.3); /* Transparent dark */
          backdrop-filter: blur(10px); /* Blur effect for the glass look */
          -webkit-backdrop-filter: blur(10px); /* Safari support for backdrop-filter */
          border: 1px solid rgba(255, 255, 255, 0.1); /* Subtle, transparent light border for definition */
          border-radius: 0.5rem; /* Matches Tailwind's rounded-lg */
          /* Cyan glow shadow */
          box-shadow: 0 8px 32px 0 rgba(0, 251, 255, 0.2); /* Cyan shadow with opacity */
          transition: all 0.8s ease-in-out; /* Increased transition duration for smoother rotation */
          transform-style: preserve-3d; /* Preserve 3D transformations for children */
          transform-origin: right center; /* Set transform origin to right center for rotation effect */
        }

        .glass-box:hover {
          background: rgba(0, 0, 0, 0.4); /* Slightly less transparent on hover */
          /* Stronger cyan glow shadow on hover */
          box-shadow: 0 12px 48px 0 rgba(0, 251, 255, 0.4); /* More intense cyan glow */
          transform: translateY(-2px) rotateY(-45deg); /* Increased rotation for better visibility */
        }

        /* Glass Bubble Styles (for inner elements like AI messages) */
        .glass-bubble {
            /* Darker transparent background for inner bubbles, creating hierarchy */
            background: rgba(0, 0, 0, 0.4); /* Slightly more opaque than glass-box for readability */
            border: 1px solid rgba(255, 255, 255, 0.08); /* Even subtler transparent border */
            backdrop-filter: blur(5px); /* Lighter blur for internal elements */
            -webkit-backdrop-filter: blur(5px); /* Safari support */
            transition: background 0.3s ease-in-out, box-shadow 0.3s ease-in-out; /* Smooth transition for hover and shadow */
            box-shadow: 0 2px 8px rgba(0, 251, 255, 0.1); /* Subtle cyan glow for bubbles */
        }
        .glass-bubble:hover {
            background: rgba(0, 0, 0, 0.5); /* Slightly more opaque on hover */
            box-shadow: 0 4px 12px rgba(0, 251, 255, 0.2); /* Slightly stronger cyan glow on hover */
        }

        /* Input field focus glow */
        .input-glow:focus {
            outline: none;
            border-color: #00FBFF; /* Cyan border on focus */
            box-shadow: 0 0 0 3px rgba(0, 251, 255, 0.5); /* Cyan glow effect on focus */
        }

        /* Glassy Button Styles */
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
      `}</style>

      <section className="hero-section-bg py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Main Heading - Vibrant Cyan/Light Blue with new animation */}
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] animate-slide-in-left">
                Supercharge your CareerBoost journey with AI
              </h1>
              {/* Paragraph Text - Lighter Gray for readability on dark background */}
              <p className="text-lg text-gray-300 mb-8 max-w-lg">
                Upload your resume, get AI-powered optimization, track job trends, automate applications, and land your dream job faster with MITS CareerBoost.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Primary Button - Glassy style */}
                <Button
                  size="lg"
                  className="glassy-button text-white rounded-md"
                  onClick={scrollToUpload}
                >
                  Get started for free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                {/* Secondary Button - Glassy style */}
                <Button
                  variant="outline"
                  size="lg"
                  className="glassy-button text-[#00FFFF] rounded-md hover:text-white"
                >
                  See how it works
                </Button>
              </div>

              {/* Job Seekers Count - Lighter Gray text */}
              <div className="mt-10 flex items-center text-sm text-gray-400">
                <div className="flex -space-x-2 mr-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-gray-700 border border-gray-600 transition-colors duration-300" />
                  ))}
                </div>
                <span>3,500+ job seekers already using CareerBoost</span>
              </div>
            </div>

            {/* Resume Analyser Box - Glass UI Applied, with consistent dark theme colors and cyan glow */}
            <div className="glass-box p-6 shadow-md border border-gray-800">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                {/* Text color for "Resume Analysis" to match other light text */}
                <span className="text-sm text-gray-300 ml-2">Resume Analysis</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  {/* AI Bubble Icon - Dark background, white text */}
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white">
                    <span className="text-xs">AI</span>
                  </div>
                  {/* AI Message Bubbles - Glass Bubble style and light text color */}
                  <div className="glass-bubble rounded-lg p-3 text-sm max-w-sm text-gray-200">
                    I've analyzed your resume. Here are 3 key improvements to increase your interview chances by 65%.
                  </div>
                </div>

                <div className="glass-bubble rounded-lg p-3 text-sm text-gray-200">
                  <div className="font-medium">Quantify your achievements with specific metrics</div>
                </div>

                <div className="glass-bubble rounded-lg p-3 text-sm text-gray-200">
                  <div className="font-medium">Add key industry keywords to pass ATS systems</div>
                </div>

                <div className="glass-bubble rounded-lg p-3 text-sm text-gray-200">
                  <div className="font-medium">Highlight your leadership experience more prominently</div>
                </div>

                <div className="relative">
                  {/* Input field - Transparent background, light text, darker border, with focus glow */}
                  <input
                    type="text"
                    placeholder="Ask follow-up questions..."
                    className="w-full p-3 pr-10 border border-gray-700 rounded-lg text-sm bg-transparent
                                 text-gray-200 placeholder-gray-500 input-glow" /* Added input-glow class */
                  />
                  <ArrowRight className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
