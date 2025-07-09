import React, { useState, useEffect } from 'react';

const steps = [
  {
    title: 'Welcome to CareerBoost!',
    description: 'Let us show you how to supercharge your job search and upskilling journey with AI.'
  },
  {
    title: 'Resume Analysis',
    description: 'Upload your resume and get instant, AI-powered feedback on strengths and areas for improvement.'
  },
  {
    title: 'Skill Gap Detection',
    description: 'See which skills you’re missing for your target roles and get personalized recommendations.'
  },
  {
    title: 'Personalized Learning Paths',
    description: 'Access curated courses and roadmaps to upskill efficiently and become a top candidate.'
  },
  {
    title: 'AI Chatbot Guidance',
    description: 'Chat with our AI-powered career coach for advice, resume tips, and personalized suggestions.'
  },
  {
    title: 'You are ready!',
    description: 'Start your journey and land your dream job with CareerBoost!'
  }
];

interface OnboardingProps {
  onClose: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // New state for transition
  const isFirst = step === 0;
  const isLast = step === steps.length - 1;

  useEffect(() => {
    // Trigger fade-in animation when component mounts
    setIsAnimating(true);
  }, []);

  const handleClose = () => {
    setIsAnimating(false); // Trigger fade-out animation
    // Call onClose after the animation duration
    setTimeout(onClose, 300); // Match this duration with the CSS transition duration
  };

  return (
    <div className={`relative flex flex-col items-center justify-between min-h-[400px] p-8 rounded-2xl border border-cyan-400 bg-black bg-opacity-40 backdrop-blur-xl shadow-2xl transition-all duration-300 ease-in-out ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <style jsx>{`
        /* Fade and Slide Animation for Step Content */
        @keyframes fadeInSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInSlideUp {
          animation: fadeInSlideUp 0.6s ease-out forwards;
        }

        /* Scale and Glow for Active Dot */
        @keyframes dotActive {
          0% { transform: scale(1); box-shadow: 0 0 0 rgba(0, 255, 255, 0); }
          50% { transform: scale(1.2); box-shadow: 0 0 8px rgba(0, 255, 255, 0.6); }
          100% { transform: scale(1); box-shadow: 0 0 0 rgba(0, 255, 255, 0); }
        }
        .dot-active-animation {
          animation: dotActive 0.6s ease-out;
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
          border-radius: 0.5rem; /* Added border-radius for buttons */
        }

        .glassy-button:hover {
          background: #00FFFF; /* Blue fill-up */
          border-color: #00FFFF; /* Cyan border on hover */
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.6); /* Blue glow effect */
          color: black; /* Changed text color to black on hover */
          transform: translateY(-2px);
        }
      `}</style>
      <button
        className="absolute top-4 right-4 text-3xl font-semibold glassy-button px-3 py-1 rounded-full" // Increased size, added glassy-button styles
        onClick={handleClose} // Use handleClose for animation
        aria-label="Close onboarding"
      >
        &times;
      </button>
      <div className="mb-8 text-center flex-grow flex flex-col justify-center"> {/* Added flex-grow and flex-col justify-center */}
        {/* Key prop forces re-render and animation on step change */}
        <h2 key={step} className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] mb-2 animate-fadeInSlideUp">
          {steps[step].title}
        </h2>
        <p key={`desc-${step}`} className="text-lg text-gray-200 max-w-md mx-auto animate-fadeInSlideUp" style={{ animationDelay: '0.1s' }}>
          {steps[step].description}
        </p>
      </div>
      <div className="flex items-center justify-between w-full max-w-xs mt-8">
        <button
          className="glassy-button px-4 py-2 rounded disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={isFirst}
        >
          Back
        </button>
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`inline-block w-2 h-2 rounded-full transition-all duration-300 ease-in-out
                ${i === step ? 'bg-cyan-400 dot-active-animation' : 'bg-cyan-900 border border-cyan-400'}`}
            />
          ))}
        </div>
        <button
          className="glassy-button px-4 py-2 rounded disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={() => isLast ? handleClose() : setStep(s => Math.min(steps.length - 1, s + 1))} // Use handleClose for last step
          disabled={isLast && !onClose} // Disable if last step and no onClose prop (shouldn't happen with current usage)
        >
          {isLast ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
