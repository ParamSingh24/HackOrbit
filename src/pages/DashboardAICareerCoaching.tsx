import React from 'react';
import Chatbot from '@/components/Chatbot';

const DashboardAICareerCoaching = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-xl flex flex-col items-center mx-auto">
        <div className="bg-black bg-opacity-90 rounded-lg px-8 py-4 mb-10 shadow-lg" style={{ zIndex: 2, position: 'relative' }}>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] text-center">this is the AI Career Coaching area</h1>
        </div>
        <div className="flex justify-center items-center w-full">
          <div style={{ width: 340, minHeight: 420, marginTop: 32, background: 'rgba(0,0,0,0.7)', borderRadius: 16, boxShadow: '0 8px 32px 0 rgba(0,251,255,0.2)' }}>
            <Chatbot initialMessage="How can I help you" large noBackground openByDefault mode="dashboard" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAICareerCoaching; 