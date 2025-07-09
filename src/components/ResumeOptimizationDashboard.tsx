import React, { useState } from 'react';
import ResumeUploader from '@/components/ResumeUploader';
import AnalysisResults from '@/components/AnalysisResults';

const ResumeOptimizationDashboard = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col">
      <header className="py-8 text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00CCCC]">Resume Optimization Dashboard</h1>
        <p className="text-lg text-gray-300 mt-2">Upload your resume PDF to get instant AI-powered optimization and feedback.</p>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl">
          <ResumeUploader onAnalyze={(data) => { setAnalysisData(data); setShowAnalysis(true); }} />
          {showAnalysis && analysisData && (
            <div className="mt-10">
              <AnalysisResults {...analysisData} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ResumeOptimizationDashboard; 