import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, X, Send, Volume2, Mic, MicOff, VolumeX } from 'lucide-react'; // Using MessageSquare for chatbot icon
import ReactMarkdown from 'react-markdown'; // Import react-markdown
import { useChatbot } from "@/hooks/useChatbot";

const API_KEY = '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';
const API_URL = 'https://api.perplexity.ai/chat/completions';
const MODEL = 'sonar';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatbotProps {
  initialMessage?: string;
  large?: boolean;
  noBackground?: boolean;
  openByDefault?: boolean;
  mode?: 'dashboard' | 'modal';
}

const Chatbot: React.FC<ChatbotProps> = ({ initialMessage, large, noBackground, openByDefault, mode }) => {
  const {
    messages,
    input,
    setInput,
    loading,
    error,
    sendMessage,
    messagesEndRef,
  } = useChatbot();
  const [open, setOpen] = useState(mode === 'dashboard' ? true : !!openByDefault); // Controls the visual open/close state for transitions
  const [modalVisible, setModalVisible] = useState(false); // Controls actual rendering after transition
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef(window.speechSynthesis);

  // Effect to handle modal visibility for smooth transitions
  useEffect(() => {
    if (open) {
      setModalVisible(true); // Show modal immediately when 'open' is true
    } else {
      // Hide modal after transition completes when 'open' is false
      const timer = setTimeout(() => setModalVisible(false), 300); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  // Close chat when clicking outside the chat window
  useEffect(() => {
    if (!modalVisible) return; // Only add listener if modal is potentially visible
    const handleClick = (e: MouseEvent) => {
      const chat = document.getElementById('chatbot-modal');
      const chatbotButton = document.getElementById('chatbot-button');
      if (chat && !chat.contains(e.target as Node) && chatbotButton && !chatbotButton.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [modalVisible]); // Depend on modalVisible to add/remove listener

  // Add initial assistant message if provided
  useEffect(() => {
    if (initialMessage && messages.length === 0) {
      // Directly add the assistant message to the chat
      messages.push({ role: 'assistant', content: initialMessage });
    }
    // eslint-disable-next-line
  }, []);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  // Voice input: Speech-to-text
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => prev ? prev + ' ' + transcript : transcript);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  };
  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  // Voice output: Text-to-speech
  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }
    stopSpeaking();
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    setSpeaking(true);
    synthRef.current.speak(utter);
  };
  const stopSpeaking = () => {
    synthRef.current.cancel();
    setSpeaking(false);
  };

  const getSimpleAIResponse = (question: string): string => {
    const q = question.toLowerCase();
    
    // Resume and CV related
    if (q.includes('resume') || q.includes('cv') || q.includes('curriculum vitae')) {
      return 'To improve your resume, focus on quantifying achievements with specific numbers, using strong action verbs, and tailoring content to each job description. Highlight relevant skills and experiences that match the role requirements.';
    }
    
    // Interview preparation
    if (q.includes('interview') || q.includes('interviewing')) {
      return 'Prepare for interviews by practicing common questions, researching the company thoroughly, preparing STAR method examples of your achievements, and having thoughtful questions ready for the interviewer.';
    }
    
    // Skills and development
    if (q.includes('skill') || q.includes('skills') || q.includes('learn') || q.includes('learning') || q.includes('develop')) {
      return 'Identify in-demand skills for your target role through job postings and industry research. Focus on both technical and soft skills. Consider online courses, certifications, and hands-on projects to build your expertise.';
    }
    
    // Job search strategies
    if ((q.includes('job') || q.includes('position') || q.includes('role')) && (q.includes('search') || q.includes('find') || q.includes('apply'))) {
      return 'For a successful job search, network actively on LinkedIn and at industry events, customize each application, follow up with recruiters, and maintain a consistent personal brand across all platforms.';
    }
    
    // Cover letters
    if (q.includes('cover letter') || q.includes('coverletter') || q.includes('application letter')) {
      return 'A great cover letter should be concise (under 300 words), tailored to the specific job and company, highlight your most relevant achievements, and explain why you\'re excited about the opportunity.';
    }
    
    // LinkedIn optimization
    if (q.includes('linkedin') || q.includes('linked in') || q.includes('profile')) {
      return 'Optimize your LinkedIn by using a professional photo, writing a compelling headline and summary, listing key skills and experiences, and regularly sharing industry-relevant content to build your network.';
    }
    
    // Career changes
    if (q.includes('career change') || q.includes('switch career') || q.includes('new career') || q.includes('transition')) {
      return 'For a career change, identify your transferable skills, seek out projects or courses in your new field, network with professionals in the target industry, and consider starting with entry-level positions to gain experience.';
    }
    
    // Salary negotiation
    if (q.includes('salary') || q.includes('pay') || q.includes('compensation') || q.includes('negotiate') || q.includes('money')) {
      return 'Research market rates for your role and experience level. Practice your negotiation pitch, focus on your value and achievements, and be prepared to discuss benefits and other compensation elements beyond just salary.';
    }
    
    // Networking
    if (q.includes('network') || q.includes('networking') || q.includes('connect') || q.includes('relationship')) {
      return 'Build your professional network by attending industry events, joining relevant online communities, reaching out to alumni, and offering value to others before asking for help. Follow up and maintain relationships.';
    }
    
    // Remote work
    if (q.includes('remote') || q.includes('work from home') || q.includes('wfh') || q.includes('telecommute')) {
      return 'For remote work success, demonstrate strong communication skills, show you can work independently, highlight any previous remote experience, and emphasize your ability to stay organized and productive without supervision.';
    }
    
    // Company research
    if (q.includes('company') || q.includes('organization') || q.includes('employer') || q.includes('research')) {
      return 'Research companies by reading their website, checking recent news, reviewing employee feedback on Glassdoor, understanding their mission and values, and identifying how your skills align with their needs.';
    }
    
    // Application tracking
    if (q.includes('application') || q.includes('apply') || q.includes('track') || q.includes('follow up')) {
      return 'Track your applications in a spreadsheet or app, follow up within a week of applying, keep records of all communications, and maintain a consistent follow-up schedule without being pushy.';
    }
    
    // Personal branding
    if (q.includes('brand') || q.includes('personal brand') || q.includes('reputation') || q.includes('online presence')) {
      return 'Build your personal brand by creating consistent messaging across platforms, sharing valuable content, engaging with industry discussions, and showcasing your expertise through thought leadership.';
    }
    
    // Time management
    if (q.includes('time') || q.includes('schedule') || q.includes('balance') || q.includes('manage')) {
      return 'Manage your job search time by setting daily goals, prioritizing high-impact activities like networking, using productivity tools, and maintaining a structured approach to avoid burnout.';
    }
    
    // Confidence and mindset
    if (q.includes('confidence') || q.includes('nervous') || q.includes('anxiety') || q.includes('stress') || q.includes('mindset')) {
      return 'Build confidence by practicing regularly, focusing on your achievements, preparing thoroughly, and remembering that rejection is part of the process. Celebrate small wins and maintain a growth mindset.';
    }
    
    // Entry level positions
    if (q.includes('entry level') || q.includes('entry-level') || q.includes('junior') || q.includes('first job') || q.includes('graduate')) {
      return 'For entry-level positions, emphasize internships, projects, volunteer work, and relevant coursework. Show enthusiasm, willingness to learn, and transferable skills from academic or extracurricular activities.';
    }
    
    // Industry specific
    if (q.includes('tech') || q.includes('technology') || q.includes('software') || q.includes('programming')) {
      return 'In tech, focus on building a strong portfolio, contributing to open source projects, staying updated with latest technologies, and demonstrating problem-solving skills through coding challenges or projects.';
    }
    
    if (q.includes('marketing') || q.includes('advertising') || q.includes('brand')) {
      return 'For marketing roles, showcase campaigns you\'ve worked on, demonstrate understanding of digital tools, show creativity through portfolio pieces, and stay updated with industry trends and platforms.';
    }
    
    if (q.includes('finance') || q.includes('accounting') || q.includes('banking')) {
      return 'In finance, emphasize analytical skills, attention to detail, relevant certifications, and understanding of financial principles. Show interest in the specific sector and demonstrate strong quantitative abilities.';
    }
    
    // Fuzzy matching for common variations
    const fuzzyMatches = {
      'resume': ['resume', 'cv', 'curriculum vitae', 'application'],
      'interview': ['interview', 'meeting', 'conversation', 'discussion'],
      'skill': ['skill', 'ability', 'competency', 'expertise'],
      'job': ['job', 'position', 'role', 'opportunity', 'career'],
      'salary': ['salary', 'pay', 'compensation', 'income', 'wage'],
      'network': ['network', 'connect', 'relationship', 'contact']
    };
    
    // Check fuzzy matches
    for (const [category, keywords] of Object.entries(fuzzyMatches)) {
      if (keywords.some(keyword => q.includes(keyword))) {
        return getSimpleAIResponse(category + ' question'); // Recursive call with the category
      }
    }
    
    // Improved fallback message
    return "That's a great question! I'd be happy to provide guidance on this topic. To give you the most relevant advice, could you share a bit more about your current situation and specific goals? For example, are you looking for help with resumes, interviews, job searching, career changes, or something else?";
  };

  // Find the latest assistant message
  const latestAssistantMsg = messages.slice().reverse().find(m => m.role === 'assistant')?.content;

  return (
    <>
      <style jsx>{`
        /* Glass Box Styles */
        .glass-box {
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem; /* Rounded-xl */
          box-shadow: 0 8px 32px 0 rgba(0, 251, 255, 0.2);
          transition: all 0.3s ease-in-out;
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

        /* Input field focus glow */
        .input-glow:focus {
            outline: none;
            border-color: #00FBFF; /* Cyan border on focus */
            box-shadow: 0 0 0 3px rgba(0, 251, 255, 0.5); /* Cyan glow effect on focus */
        }

        /* User message bubble specific style */
        .user-message {
          background-color: rgba(0, 191, 255, 0.2); /* Light cyan transparent */
          border-color: rgba(0, 191, 255, 0.3);
          color: white;
          border-radius: 0.75rem 0.25rem 0.75rem 0.75rem; /* Rounded-xl top-left, rounded-sm top-right, rounded-xl bottom-left, rounded-xl bottom-right */
        }

        /* Assistant message bubble specific style */
        .assistant-message {
          background-color: rgba(128, 128, 128, 0.2); /* Grey transparent */
          border-color: rgba(128, 128, 128, 0.3);
          color: white;
          border-radius: 0.25rem 0.75rem 0.75rem 0.75rem; /* Rounded-sm top-left, rounded-xl top-right, rounded-xl bottom-left, rounded-xl bottom-right */
        }

        /* Chatbot Modal Transition Styles */
        .chatbot-modal-transition {
          transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        }
        .chatbot-modal-enter {
          opacity: 0;
          transform: translateY(20px);
        }
        .chatbot-modal-enter-active {
          opacity: 1;
          transform: translateY(0);
        }
        .chatbot-modal-exit {
          opacity: 1;
          transform: translateY(0);
        }
        .chatbot-modal-exit-active {
          opacity: 0;
          transform: translateY(20px);
        }

        /* Hide scrollbar for Webkit browsers */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for Firefox */
        .hide-scrollbar {
          scrollbar-width: none; /* Firefox */
        }
        .chatbot-header-title {
          font-size: 1rem;
          padding: 0.5rem 1rem;
        }
        .chatbot-large {
          width: 100%;
          max-width: 100vw;
          min-width: 0;
          margin: 0 auto;
        }
      `}</style>

      {mode === 'dashboard' ? (
        <div className={`glass-box ${large ? 'chatbot-large' : ''}`} style={{ width: '100%', maxWidth: '100%', minWidth: 0, margin: '0 auto' }}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900 bg-opacity-40 rounded-t-xl">
            <span className="font-semibold text-white chatbot-header-title">MITS CareerBoost AI</span>
          </div>
          {/* Message Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-900 bg-opacity-20 rounded-b-xl min-h-[200px] max-h-[300px] hide-scrollbar">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3 max-w-[80%] text-sm border glass-bubble
                    ${msg.role === 'user' ? 'user-message' : 'assistant-message'}`}
                >
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                  {/* Voice output button for assistant messages */}
                  {msg.role === 'assistant' && idx === messages.length - 1 && (
                    <div className="flex gap-2 mt-2 justify-end">
                      {!speaking ? (
                        <button
                          className="text-cyan-400 hover:text-cyan-200"
                          title="Read aloud"
                          onClick={() => speak(msg.content)}
                        >
                          <Volume2 size={20} />
                        </button>
                      ) : (
                        <button
                          className="text-red-400 hover:text-red-200"
                          title="Stop reading"
                          onClick={stopSpeaking}
                        >
                          <VolumeX size={20} />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="p-3 max-w-[80%] text-sm border glass-bubble assistant-message">
                  Bot is typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} /> {/* For auto-scrolling */}
          </div>
          {/* Input Area */}
          <div className="flex gap-2 p-4 border-t border-gray-700 bg-gray-900 bg-opacity-40 rounded-b-xl">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Type your message..."
              className="flex-1 p-3 rounded-lg border border-gray-700 bg-transparent text-white placeholder-gray-500
                         focus:outline-none input-glow transition-all duration-200"
              disabled={loading}
              autoFocus
            />
            <Button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="glassy-button text-white px-4 py-2 rounded-lg flex items-center justify-center"
            >
              <Send size={20} />
            </Button>
            {/* Voice input button */}
            {!listening ? (
              <button
                className="ml-2 text-cyan-400 hover:text-cyan-200 bg-transparent border-none outline-none"
                title="Start voice input"
                onClick={startListening}
                disabled={loading}
              >
                <Mic size={22} />
              </button>
            ) : (
              <button
                className="ml-2 text-red-400 hover:text-red-200 bg-transparent border-none outline-none"
                title="Stop voice input"
                onClick={stopListening}
              >
                <MicOff size={22} />
              </button>
            )}
          </div>
          {error && <div className="text-red-400 text-sm mt-2 text-center">{error}</div>}
        </div>
      ) : (
        <>
          {/* Floating Chatbot Icon Button */}
          <button
            id="chatbot-button"
            aria-label="Open chatbot"
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-[1000] bg-gradient-to-r from-[#00FFFF] to-[#00CCCC]
                       rounded-full w-14 h-14 flex items-center justify-center cursor-pointer
                       shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl
                       focus:outline-none focus:ring-2 focus:ring-[#00FFFF] focus:ring-opacity-75"
            style={{ display: open ? 'none' : 'flex' }} // Hide button when modal is open
          >
            <MessageSquare size={28} className="text-white" />
          </button>

          {/* Chatbot Modal/Popover */}
          {modalVisible && (
            <div
              id="chatbot-modal"
              className={`
                fixed bottom-24 right-6 z-[1001] w-[360px] max-w-[90vw]
                flex flex-col
                glass-box
                chatbot-modal-transition
                ${open ? 'chatbot-modal-enter-active' : 'chatbot-modal-exit-active'}
                ${large ? 'chatbot-large' : ''}
              `}
              // The 'pointer-events-none' should only be active when fully hidden,
              // but for simplicity with pure CSS transitions, we rely on opacity.
              // If interaction is needed during fade-out, a more complex state management
              // or a library like react-transition-group would be needed.
              style={{ pointerEvents: open ? 'auto' : 'none' }}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900 bg-opacity-40 rounded-t-xl">
                <span className="font-semibold text-white chatbot-header-title">MITS CareerBoost AI</span>
                <Button
                  onClick={() => setOpen(false)}
                  aria-label="Close chatbot"
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white hover:bg-transparent transition-colors duration-200"
                >
                  <X size={20} />
                </Button>
              </div>

              {/* Message Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-900 bg-opacity-20 rounded-b-xl min-h-[200px] max-h-[300px] hide-scrollbar">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`p-3 max-w-[80%] text-sm border glass-bubble
                        ${msg.role === 'user' ? 'user-message' : 'assistant-message'}`}
                    >
                      <ReactMarkdown>{msg.content}</ReactMarkdown> {/* Render markdown content */}
                      {/* Voice output button for assistant messages */}
                      {msg.role === 'assistant' && idx === messages.length - 1 && (
                        <div className="flex gap-2 mt-2 justify-end">
                          {!speaking ? (
                            <button
                              className="text-cyan-400 hover:text-cyan-200"
                              title="Read aloud"
                              onClick={() => speak(msg.content)}
                            >
                              <Volume2 size={20} />
                            </button>
                          ) : (
                            <button
                              className="text-red-400 hover:text-red-200"
                              title="Stop reading"
                              onClick={stopSpeaking}
                            >
                              <VolumeX size={20} />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="p-3 max-w-[80%] text-sm border glass-bubble assistant-message">
                      Bot is typing...
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} /> {/* For auto-scrolling */}
              </div>

              {/* Input Area */}
              <div className="flex gap-2 p-4 border-t border-gray-700 bg-gray-900 bg-opacity-40 rounded-b-xl">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 p-3 rounded-lg border border-gray-700 bg-transparent text-white placeholder-gray-500
                             focus:outline-none input-glow transition-all duration-200"
                  disabled={loading}
                  autoFocus
                />
                <Button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="glassy-button text-white px-4 py-2 rounded-lg flex items-center justify-center"
                >
                  <Send size={20} />
                </Button>
                {/* Voice input button */}
                {!listening ? (
                  <button
                    className="ml-2 text-cyan-400 hover:text-cyan-200 bg-transparent border-none outline-none"
                    title="Start voice input"
                    onClick={startListening}
                    disabled={loading}
                  >
                    <Mic size={22} />
                  </button>
                ) : (
                  <button
                    className="ml-2 text-red-400 hover:text-red-200 bg-transparent border-none outline-none"
                    title="Stop voice input"
                    onClick={stopListening}
                  >
                    <MicOff size={22} />
                  </button>
                )}
              </div>
              {error && <div className="text-red-400 text-sm mt-2 text-center">{error}</div>}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Chatbot;
