import React, { useState, useEffect, useRef } from 'react';
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, MessageSquare, Video, Lightbulb, BookOpen, ThumbsUp, Send, Mic } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AICareerCoaching = () => {
  const [activeTab, setActiveTab] = useState("coaching");
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', content: 'Hello! I\'m your AI Career Coach. How can I help you today with your career development or job search?' },
  ]);
  const chatContainerRef = useRef(null);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false); // State to control animation

  // Intersection Observer to trigger animations when the section enters view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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

  // Scroll to bottom of chat messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (chatMessage.trim() === "") return;

    // Add user message
    setChatMessages(prev => [...prev, { sender: 'user', content: chatMessage }]);

    // Simulate AI response after a brief delay
    setTimeout(() => {
      let aiResponse;

      if (chatMessage.toLowerCase().includes('interview')) {
        aiResponse = "Preparing for interviews is crucial. I recommend researching the company, practicing common questions, and preparing stories that demonstrate your skills and experience. Would you like me to simulate some interview questions for your target role?";
      } else if (chatMessage.toLowerCase().includes('resume')) {
        aiResponse = "Your resume should highlight your achievements and be tailored for each application. Make sure to quantify your accomplishments and include relevant keywords. Have you tried our Resume Optimization tool?";
      } else if (chatMessage.toLowerCase().includes('career change') || chatMessage.toLowerCase().includes('switch')) {
        aiResponse = "Changing careers is a significant step. Let's analyze your transferable skills and identify gaps you might need to fill. What industry or role are you considering moving into?";
      } else {
        aiResponse = "That's a great question. I'd be happy to provide guidance on this topic. To give you the most relevant advice, could you share a bit more about your current situation and specific goals?";
      }

      setChatMessages(prev => [...prev, { sender: 'ai', content: aiResponse }]);
    }, 1000);

    setChatMessage("");
  };

  const commonQuestions = [
    "How do I prepare for a technical interview?",
    "What skills should I develop for data science?",
    "Tips for negotiating salary?",
    "How to address employment gaps?",
    "Should I include a cover letter?",
    "How to build a professional network?"
  ];

  return (
    <div ref={sectionRef} className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-white">
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
          border-radius: 0.75rem; /* Consistent rounded-xl */
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
          border-radius: 0.5rem; /* Added border-radius for buttons */
        }

        .glassy-button:hover {
          background: #00FFFF; /* Blue fill-up */
          border-color: #00FFFF; /* Cyan border on hover */
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.6); /* Blue glow effect */
          color: black; /* Changed text color to black on hover */
          transform: translateY(-2px);
        }

        /* Gradient Text */
        .gradient-text {
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
          background-image: linear-gradient(to right, #00FFFF, #00CCCC);
        }

        /* Custom styles for Shadcn Tabs */
        .tabs-list-custom {
          background-color: rgba(0, 0, 0, 0.2); /* Slightly darker transparent */
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          box-shadow: 0 2px 10px rgba(0, 251, 255, 0.1);
        }

        .tabs-trigger-custom {
          color: #FFFFFF; /* Changed to white */
          background-color: transparent;
          transition: all 0.3s ease-in-out;
          border-radius: 0.375rem; /* rounded-md */
          padding: 0.6rem 1.2rem;
          font-weight: 500;
        }

        .tabs-trigger-custom[data-state="active"] {
          background-color: rgba(0, 255, 255, 0.2); /* Cyan transparent fill */
          color: #00FFFF; /* Bright cyan text */
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.4); /* Cyan glow */
          border: 1px solid #00FFFF;
        }

        .tabs-trigger-custom:hover:not([data-state="active"]) {
          color: #00FFFF; /* Cyan text on hover */
          background-color: rgba(0, 255, 255, 0.08); /* Subtle cyan background on hover */
        }

        /* Input field focus glow */
        .input-glow:focus {
            outline: none;
            border-color: #00FBFF; /* Cyan border on focus */
            box-shadow: 0 0 0 3px rgba(0, 251, 255, 0.5); /* Cyan glow effect on focus */
        }

        /* Chat bubble animations */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .chat-message-animation {
          animation: fadeIn 0.3s ease-out forwards;
        }

        /* Progress Bar Customization */
        .progress-bar-custom {
          background-color: rgba(255, 255, 255, 0.1); /* Light transparent background for track */
          border-radius: 9999px; /* Full rounded */
        }
        .progress-bar-custom > div { /* The actual progress indicator */
          background: linear-gradient(to right, #00FFFF, #00CCCC); /* Cyan gradient fill */
          border-radius: 9999px;
          box-shadow: 0 0 8px rgba(0, 255, 255, 0.4); /* Glow effect */
        }
      `}</style>

      <Navbar />

      <main className="flex-grow py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className={`text-4xl font-bold mb-2 gradient-text ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>AI Career Coaching</h1>
          <p className={`text-lg text-white mb-8 max-w-2xl ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            Get personalized career advice, interview preparation, and professional development guidance from our AI coach.
          </p>

          <Tabs defaultValue="coaching" onValueChange={setActiveTab}>
            <TabsList className={`w-full max-w-lg mx-auto grid grid-cols-3 mb-6 tabs-list-custom ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              <TabsTrigger value="coaching" className="tabs-trigger-custom">Career Coaching</TabsTrigger>
              <TabsTrigger value="interview" className="tabs-trigger-custom">Interview Prep</TabsTrigger>
              <TabsTrigger value="learning" className="tabs-trigger-custom">Learning Paths</TabsTrigger>
            </TabsList>

            <TabsContent value="coaching">
              <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
                <div className="lg:col-span-2">
                  <Card className="glass-box h-[600px] flex flex-col">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-[#00FFFF]">
                        <Brain className="mr-2 h-5 w-5" />
                        <span>AI Career Coach</span>
                      </CardTitle>
                      <CardDescription className="text-white">Ask any career-related questions or get personalized advice</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col overflow-hidden">
                      <div ref={chatContainerRef} className="flex-grow overflow-y-auto mb-4 space-y-4 pr-2 custom-scrollbar"> {/* Added custom-scrollbar */}
                        {chatMessages.map((msg, index) => (
                          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} chat-message-animation`}>
                            <div className={`flex items-start max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                              <Avatar className="h-8 w-8 flex-shrink-0 mx-2">
                                {msg.sender === 'ai' ? (
                                  <>
                                    <AvatarFallback className="bg-cyan-700 text-white">AI</AvatarFallback>
                                    <AvatarImage src="https://placehold.co/32x32/00FFFF/000000?text=AI" alt="AI Avatar" />
                                  </>
                                ) : (
                                  <AvatarFallback className="bg-gray-700 text-white">You</AvatarFallback>
                                )}
                              </Avatar>
                              <div className={`p-3 rounded-lg ${msg.sender === 'user' ? 'bg-cyan-900 text-white border border-cyan-700' : 'bg-gray-800 text-white border border-gray-700'}`}>
                                <p className="text-sm">{msg.content}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="relative">
                        <Textarea
                          placeholder="Ask a question about your career path or job search..."
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          className="resize-none pr-12 w-full bg-gray-900 border border-gray-700 text-white focus:border-[#00FFFF] focus:ring-2 focus:ring-[#00FFFF] input-glow"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                        />
                        <div className="absolute right-3 bottom-3 flex items-center space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-white hover:bg-cyan-700 hover:text-black">
                            <Mic className="h-4 w-4" />
                          </Button>
                          <Button onClick={handleSendMessage} size="icon" className="h-8 w-8 rounded-full glassy-button">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-xs text-white mb-2">Common Questions:</p>
                        <div className="flex flex-wrap gap-2">
                          {commonQuestions.map((question, index) => (
                            <button
                              key={index}
                              className="glassy-button px-3 py-1.5 text-xs rounded-full"
                              onClick={() => setChatMessage(question)}
                            >
                              {question}
                            </button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="glass-box">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-[#00FFFF]">Career Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white mb-4 text-sm">
                        Take our comprehensive career assessment to get personalized insights and recommendations.
                      </p>
                      <ul className="space-y-3 mb-5">
                        <li className="flex items-start">
                          <Lightbulb className="h-5 w-5 mr-2 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span className="text-white text-sm">Discover your strengths and work style preferences</span>
                        </li>
                        <li className="flex items-start">
                          <Lightbulb className="h-5 w-5 mr-2 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span className="text-white text-sm">Identify careers that align with your personality</span>
                        </li>
                        <li className="flex items-start">
                          <Lightbulb className="h-5 w-5 mr-2 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span className="text-white text-sm">Get industry-specific advice for your career journey</span>
                        </li>
                      </ul>
                      <Button className="glassy-button w-full">
                        <span>Start Assessment</span>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="glass-box">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-[#00FFFF]">Upcoming Sessions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-3 border border-cyan-700 rounded-lg bg-cyan-900 bg-opacity-20">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-white">Mock Interview</h3>
                            <span className="text-xs bg-cyan-900 bg-opacity-50 px-2 py-0.5 rounded text-cyan-200 border border-cyan-600">Tomorrow</span>
                          </div>
                          <p className="text-xs text-white">10:00 AM - 11:00 AM</p>
                          <div className="flex justify-end mt-2">
                            <Button variant="outline" size="sm" className="glassy-button">Prepare</Button>
                          </div>
                        </div>

                        <div className="p-3 border border-cyan-700 rounded-lg bg-cyan-900 bg-opacity-20">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-white">Resume Review</h3>
                            <span className="text-xs bg-cyan-900 bg-opacity-50 px-2 py-0.5 rounded text-cyan-200 border border-cyan-600">Friday</span>
                          </div>
                          <p className="text-xs text-white">2:00 PM - 2:30 PM</p>
                          <div className="flex justify-end mt-2">
                            <Button variant="outline" size="sm" className="glassy-button">Prepare</Button>
                          </div>
                        </div>
                      </div>

                      <Button variant="outline" className="glassy-button w-full mt-4">
                        Schedule New Session
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="interview">
              <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
                <div className="lg:col-span-2">
                  <Card className="glass-box h-[600px] flex flex-col">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-[#00FFFF]">Interview Simulator</CardTitle>
                      <CardDescription className="text-white">Practice with AI-powered mock interviews tailored to your target role</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col">
                      <div className="flex-grow flex items-center justify-center">
                        <div className="text-center p-8">
                          <Video className="h-16 w-16 mx-auto mb-4 text-cyan-400" />
                          <h3 className="text-xl font-semibold mb-2 text-white">Ready for your mock interview?</h3>
                          <p className="text-white mb-6">
                            Our AI interviewer will ask you questions based on your target role and provide real-time feedback on your responses.
                          </p>
                          <div className="space-y-4">
                            <Button className="glassy-button">
                              <span>Start Mock Interview</span>
                            </Button>
                            <p className="text-sm text-white">
                              Sessions are recorded for your review (only accessible by you)
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="glass-box">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-[#00FFFF]">Interview Question Bank</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-4">
                        <div className="p-3 border border-cyan-700 rounded-lg bg-cyan-900 bg-opacity-20 hover:scale-[1.02] transition-transform duration-200 cursor-pointer">
                          <h3 className="font-medium text-sm mb-1 text-white">Technical Questions</h3>
                          <p className="text-xs text-white">85 questions specific to software engineering</p>
                        </div>
                        <div className="p-3 border border-cyan-700 rounded-lg bg-cyan-900 bg-opacity-20 hover:scale-[1.02] transition-transform duration-200 cursor-pointer">
                          <h3 className="font-medium text-sm mb-1 text-white">Behavioral Questions</h3>
                          <p className="text-xs text-white">50 questions for assessing soft skills and culture fit</p>
                        </div>
                        <div className="p-3 border border-cyan-700 rounded-lg bg-cyan-900 bg-opacity-20 hover:scale-[1.02] transition-transform duration-200 cursor-pointer">
                          <h3 className="font-medium text-sm mb-1 text-white">Situational Questions</h3>
                          <p className="text-xs text-white">35 questions for problem-solving scenarios</p>
                        </div>
                        <div className="p-3 border border-cyan-700 rounded-lg bg-cyan-900 bg-opacity-20 hover:scale-[1.02] transition-transform duration-200 cursor-pointer">
                          <h3 className="font-medium text-sm mb-1 text-white">Role-Specific Questions</h3>
                          <p className="text-xs text-white">Customized to your target position</p>
                        </div>
                      </div>
                      <Button className="glassy-button w-full">Access Question Bank</Button>
                    </CardContent>
                  </Card>

                  <Card className="glass-box">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-[#00FFFF]">Interview Tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <ThumbsUp className="h-5 w-5 mr-2 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-white">Research the company thoroughly before your interview</p>
                        </div>
                        <div className="flex items-start">
                          <ThumbsUp className="h-5 w-5 mr-2 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-white">Prepare specific examples of your achievements</p>
                        </div>
                        <div className="flex items-start">
                          <ThumbsUp className="h-5 w-5 mr-2 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <p className="text-sm">Follow the STAR method for behavioral questions</p>
                        </div>
                        <div className="flex items-start">
                          <ThumbsUp className="h-5 w-5 mr-2 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-white">Prepare thoughtful questions for the interviewer</p>
                        </div>
                        <div className="flex items-start">
                          <ThumbsUp className="h-5 w-5 mr-2 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-white">Practice your responses out loud before the interview</p>
                        </div>
                      </div>

                      <Button variant="outline" className="glassy-button w-full mt-4">
                        View All Tips
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="learning">
              <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
                <div className="lg:col-span-1">
                  <Card className="glass-box">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-[#00FFFF]">Personalized Learning Paths</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white mb-4 text-sm">
                        Based on your profile and career goals, we've created custom learning paths to help you develop the skills you need.
                      </p>

                      <div className="space-y-4">
                        <div className="p-4 border border-cyan-700 rounded-lg bg-cyan-900 bg-opacity-20 hover:scale-[1.02] transition-transform duration-200 cursor-pointer">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-white">Full Stack Development</h3>
                            <span className="text-xs bg-cyan-900 bg-opacity-50 px-2 py-0.5 rounded text-cyan-200 border border-cyan-600">Recommended</span>
                          </div>
                          <p className="text-xs text-white mt-1 mb-2">12 weeks, 24 courses</p>
                          <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#00FFFF] h-full" style={{ width: '35%' }}></div>
                          </div>
                          <p className="text-xs text-right mt-1 text-white">35% complete</p>
                        </div>

                        <div className="p-4 border border-cyan-700 rounded-lg bg-cyan-900 bg-opacity-20 hover:scale-[1.02] transition-transform duration-200 cursor-pointer">
                          <h3 className="font-medium text-white">Cloud Architecture</h3>
                          <p className="text-xs text-white mt-1 mb-2">8 weeks, 16 courses</p>
                          <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#00FFFF] h-full" style={{ width: '10%' }}></div>
                          </div>
                          <p className="text-xs text-right mt-1 text-white">10% complete</p>
                        </div>

                        <div className="p-4 border border-cyan-700 rounded-lg bg-cyan-900 bg-opacity-20 hover:scale-[1.02] transition-transform duration-200 cursor-pointer">
                          <h3 className="font-medium text-white">Product Management</h3>
                          <p className="text-xs text-white mt-1 mb-2">10 weeks, 20 courses</p>
                          <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#00FFFF] h-full" style={{ width: '0%' }}></div>
                          </div>
                          <p className="text-xs text-right mt-1 text-white">0% complete</p>
                        </div>
                      </div>

                      <Button className="glassy-button w-full mt-5">
                        <span>Create New Learning Path</span>
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-2">
                  <Card className="glass-box h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-[#00FFFF]">Current Learning: Full Stack Development</CardTitle>
                      <CardDescription className="text-white">Your progress in your recommended learning path</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-sm text-white">Module 1: Frontend Fundamentals</h3>
                          <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                            <div className="bg-[#00FFFF] h-full" style={{ width: '100%' }}></div>
                          </div>
                          <p className="text-xs text-right text-white">Completed</p>
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-semibold text-sm text-white">Module 2: React & Modern JavaScript</h3>
                          <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                            <div className="bg-[#00FFFF] h-full" style={{ width: '75%' }}></div>
                          </div>
                          <p className="text-xs text-right text-white">75% complete</p>

                          <div className="space-y-2 pl-4 mt-3">
                            <div className="flex items-center text-sm">
                              <BookOpen className="h-4 w-4 mr-2 text-cyan-400" />
                              <span className="line-through text-white">Advanced React Hooks</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <BookOpen className="h-4 w-4 mr-2 text-cyan-400" />
                              <span className="line-through text-white">Context API and Redux</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <BookOpen className="h-4 w-4 mr-2 text-white" />
                              <span>React Performance Optimization</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <BookOpen className="h-4 w-4 mr-2 text-cyan-400" />
                              <span className="text-white">Testing React Applications</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-semibold text-sm text-white">Module 3: Backend Development with Node.js</h3>
                          <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                            <div className="bg-[#00FFFF] h-full" style={{ width: '0%' }}></div>
                          </div>
                          <p className="text-xs text-right text-white">Not started</p>
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-semibold text-sm text-white">Module 4: Full Stack Integration</h3>
                          <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                            <div className="bg-[#00FFFF] h-full" style={{ width: '0%' }}></div>
                          </div>
                          <p className="text-xs text-right text-white">Not started</p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <Button className="glassy-button w-full">
                          <span>Continue Learning</span>
                        </Button>
                        <p className="text-xs text-center mt-2 text-white">
                          Next lesson: React Performance Optimization (25 minutes)
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AICareerCoaching;
