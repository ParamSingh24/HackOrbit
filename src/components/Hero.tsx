import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { useChatbot } from "@/hooks/useChatbot";
import Onboarding from './Onboarding';
import SignUpModal from './SignUpModal';

const Hero = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const {
    messages,
    input,
    setInput,
    loading,
    error,
    sendMessage,
    messagesEndRef,
  } = useChatbot();

  return (
    <>
      <style jsx>{`
        .hero-section-bg {
          background: radial-gradient(circle at 30% 70%, #1E293B 0%, #0F172A 80%);
          background-color: #0A1128;
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          perspective: 1000px;
        }

        /* Keyframes */
        @keyframes slideInFromLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInFromRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeZoomIn {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Animation utility classes */
        .animate-slide-in-left {
          animation: slideInFromLeft 1s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slideInFromRight 1s ease-out forwards;
        }
        .animate-fade-zoom-in {
          animation: fadeZoomIn 1.2s ease-out forwards;
        }

        /* Glass UI box */
        .glass-box {
          margin-top: 4rem;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          box-shadow: 0 8px 32px 0 rgba(0, 251, 255, 0.2);
          transform-style: preserve-3d;
          transform-origin: right center;
          transition: all 0.8s ease-in-out;
        }

        .glass-box:hover {
          background: rgba(0, 0, 0, 0.4);
          box-shadow: 0 12px 48px 0 rgba(0, 251, 255, 0.4);
          transform: translateY(-2px) rotateY(-45deg);
        }

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

        .input-glow:focus {
          outline: none;
          border-color: #00FBFF;
          box-shadow: 0 0 0 3px rgba(0, 251, 255, 0.5);
        }

        .glassy-button {
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 4px 15px rgba(0, 251, 255, 0.1);
          transition: all 0.3s ease-in-out;
          color: white;
        }

        .glassy-button:hover {
          background: rgba(0, 0, 0, 0.4);
          border-color: rgba(0, 251, 255, 0.4);
          box-shadow: 0 6px 25px rgba(0, 251, 255, 0.3);
          transform: translateY(-2px);
          color : white !important; /* Ensure text remains white on hover */
        }
      `}</style>

      <section className="hero-section-bg py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] animate-slide-in-right">
                Supercharge your CareerBoost journey with AI
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-lg animate-slide-in-left">
                Upload your resume, get AI-powered optimization, track job trends, automate applications, and land your dream job faster with MITS CareerBoost.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-zoom-in">
                <Button size="lg" className="glassy-button text-white rounded-md" onClick={() => setShowSignUp(true)}>
                  Get started for free
                </Button>
                <Button variant="outline" size="lg" className="glassy-button text-[#00FFFF] rounded-md hover:text-white" onClick={() => setShowOnboarding(true)}>
                  See how it works
                </Button>
              </div>

              <div className="mt-10 flex items-center text-sm text-gray-400 animate-fade-zoom-in">
                <div className="flex -space-x-2 mr-3">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-gray-700 border-2 border-white" style={{ boxShadow: '0 0 0 2px #0F172A' }} />
                  ))}
                </div>
                <span>3,500+ job seekers already using CareerBoost</span>
              </div>
            </div>

            <div className="glass-box p-6 shadow-md border border-gray-800 animate-fade-zoom-in">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-300 ml-2">Resume Analysis</span>
              </div>

              <div className="space-y-4 pr-2">
                {messages.length === 0 && (
                  <>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white text-xs">AI</div>
                      <div className="glass-bubble rounded-lg p-3 text-sm max-w-sm text-gray-200">
                        I've analyzed your resume. Here are 3 key improvements to increase your interview chances by 65%.
                      </div>
                    </div>
                    <div className="glass-bubble rounded-lg p-3 text-sm text-gray-200 font-medium">
                      Quantify your achievements with specific metrics
                    </div>
                    <div className="glass-bubble rounded-lg p-3 text-sm text-gray-200 font-medium">
                      Add key industry keywords to pass ATS systems
                    </div>
                    <div className="glass-bubble rounded-lg p-3 text-sm text-gray-200 font-medium">
                      Highlight your leadership experience more prominently
                    </div>
                  </>
                )}
                {messages.map((msg, idx) => (
                  <div key={idx} className={`glass-bubble rounded-lg p-3 text-sm max-w-sm text-gray-200 ${msg.role === 'user' ? 'user-message' : 'assistant-message'}`}>
                    {msg.content}
                  </div>
                ))}
                <div ref={messagesEndRef} />
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ask follow-up questions..."
                    className="w-full p-3 pr-10 border border-gray-700 rounded-lg text-sm bg-transparent text-gray-200 placeholder-gray-500 input-glow"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    disabled={loading}
                  />
                  <Button
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 glassy-button"
                    onClick={e => {
                      e.preventDefault();
                      sendMessage();
                    }}
                    disabled={loading || !input.trim()}
                    type="button"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                {error && <div className="text-red-400 text-xs mt-2">{error}</div>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {showOnboarding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-transparent w-full max-w-2xl mx-4">
            <Onboarding onClose={() => setShowOnboarding(false)} />
          </div>
        </div>
      )}
      {showSignUp && <SignUpModal onClose={() => setShowSignUp(false)} />}
    </>
  );
};

export default Hero;
