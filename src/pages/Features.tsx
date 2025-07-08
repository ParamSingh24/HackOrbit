import React from 'react';
import Features from '@/components/Features';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#00FFFF" className="w-5 h-5 mr-2 inline-block align-middle">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4.5 10.5V21h15V10.5" />
  </svg>
);

const FeaturesPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col">
      <header className="py-8 text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00CCCC]">All Features</h1>
        <p className="text-lg text-gray-300 mt-2">Explore all the powerful features of MITS CareerBoost</p>
      </header>
      <main className="flex-grow">
        <Features
          onEmailOutreachLearnMore={() => {}}
          onCareerCoachingLearnMore={() => {
            const btn = document.getElementById('chatbot-button');
            if (btn) btn.click();
          }}
        />
      </main>
      {/* Animated Return Home Button at the bottom */}
      <div className="w-full flex justify-center pb-10">
        <Button
          onClick={() => navigate('/')}
          className="mt-8 bg-transparent backdrop-filter backdrop-blur-md text-white rounded-md transition-all duration-500 ease-in-out transform hover:scale-105
            hover:bg-gradient-to-r hover:from-[#00FFFF] hover:to-[#00CCCC] hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] border border-[#00FFFF] border-opacity-60
            opacity-0 translate-y-8 animate-fade-slide-up flex items-center"
        >
          <HomeIcon />
          Return Home
        </Button>
        <style>{`
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(32px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-slide-up {
            animation: fadeSlideUp 0.8s cubic-bezier(0.4,0,0.2,1) 0.2s forwards;
          }
        `}</style>
      </div>
    </div>
  );
};

export default FeaturesPage; 