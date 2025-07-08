import React, { useState } from 'react';

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
  const isFirst = step === 0;
  const isLast = step === steps.length - 1;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[400px] p-8 rounded-2xl border border-cyan-400 bg-black bg-opacity-40 backdrop-blur-xl shadow-2xl">
      <button
        className="absolute top-4 right-4 text-white text-2xl font-bold"
        onClick={onClose}
        aria-label="Close onboarding"
      >
        &times;
      </button>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] mb-2">{steps[step].title}</h2>
        <p className="text-lg text-gray-200 max-w-md mx-auto">{steps[step].description}</p>
      </div>
      <div className="flex items-center justify-between w-full max-w-xs mt-8">
        <button
          className="px-4 py-2 rounded bg-cyan-900 bg-opacity-30 text-cyan-200 border border-cyan-400 disabled:opacity-40"
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={isFirst}
        >
          Back
        </button>
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`inline-block w-2 h-2 rounded-full ${i === step ? 'bg-cyan-400' : 'bg-cyan-900 border border-cyan-400'}`}
            />
          ))}
        </div>
        <button
          className="px-4 py-2 rounded bg-cyan-900 bg-opacity-30 text-cyan-200 border border-cyan-400 disabled:opacity-40"
          onClick={() => isLast ? onClose() : setStep(s => Math.min(steps.length - 1, s + 1))}
        >
          {isLast ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Onboarding; 