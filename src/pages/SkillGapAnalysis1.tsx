import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  FileText, 
  BarChart3,
  Upload, 
  Check, 
  AlertCircle,
  GraduationCap,
  Briefcase,
  Star,
  Award,
  Target,
  Users,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

const SkillGapAnalysis = () => {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);
  const [activeTab, setActiveTab] = useState("skills-gap");
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
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleAnalyze = () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsAnalysisComplete(true);
    }, 2500);
  };
  
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

        /* Circular Progress Bar */
        .circular-progress-bg {
          stroke: rgba(255, 255, 255, 0.1);
        }
        .circular-progress-fill {
          stroke: url(#cyanGradient); /* Use gradient for fill */
          transition: stroke-dashoffset 0.5s ease-in-out;
        }
        .circular-progress-text {
          fill: white;
        }

        /* Timeline dot */
        .timeline-dot {
            background-color: #00FFFF; /* Cyan color for the dot */
            box-shadow: 0 0 0 4px rgba(0, 255, 255, 0.3); /* Cyan glow */
        }
        .timeline-line {
            background-color: rgba(255, 255, 255, 0.1);
        }
      `}</style>

      <Navbar />
      
      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Brand Header */}
          <div className={`text-center mb-12 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <h1 className="text-4xl font-bold gradient-text mb-1">Kalpathon</h1>
            <h2 className="text-xl text-white mb-1">BBD careerpulse</h2>
            <p className="text-sm text-gray-400">Akhil Jyot 2025</p>
          </div>
          
          <div className={`mb-8 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <h2 className="text-3xl font-bold text-white mb-3">Skills Gap Analysis</h2>
            <p className="text-gray-400 max-w-3xl">
              Upload your resume and job descriptions to discover what skills you're missing for your dream role. 
              Get personalized recommendations for courses, projects, and experiences to help you stand out.
            </p>
          </div>
          
          <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <div className="lg:col-span-1">
              <Card className="glass-box h-full">
                <CardHeader className="bg-transparent rounded-t-lg border-b border-gray-700">
                  <CardTitle className="flex items-center text-xl font-bold text-[#00FFFF]">
                    <FileText className="mr-2 h-6 w-6 text-[#00FFFF]" />
                    <span>Upload Your Resume</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {!file ? (
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-800 transition-colors"
                         onClick={() => document.getElementById('resume-upload')?.click()}
                    >
                      <Upload className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400 mb-4 font-medium">
                        Drag and drop your resume here, or click to browse
                      </p>
                      <Button variant="outline" className="relative glassy-button">
                        Select File
                        <Input 
                          type="file" 
                          id="resume-upload" 
                          className="absolute inset-0 opacity-0 cursor-pointer" 
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                        />
                      </Button>
                      <p className="text-xs text-gray-500 mt-3">
                        PDF, DOC, DOCX (Max 5MB)
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center mb-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
                        <FileText className="h-8 w-8 text-[#00FFFF] mr-3" />
                        <div className="flex-grow">
                          <p className="font-medium text-white truncate">{file.name}</p>
                          <p className="text-sm text-gray-400">{Math.round(file.size / 1024)} KB</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="ml-2 glassy-button"
                          onClick={() => setFile(null)}
                        >
                          Change
                        </Button>
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-white mb-2">
                          Target Job Role
                        </label>
                        <Input 
                          type="text" 
                          placeholder="e.g. Frontend Developer, Product Manager..."
                          className="bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-[#00FFFF] focus:ring-2 focus:ring-[#00FFFF] input-glow"
                        />
                        <p className="mt-2 text-sm text-gray-500">
                          For better results, specify your desired role
                        </p>
                      </div>
                      
                      <Button 
                        className="w-full glassy-button"
                        disabled={isAnalyzing}
                        onClick={handleAnalyze}
                      >
                        {isAnalyzing ? (
                          <>
                            <span className="mr-2">Analyzing Resume</span>
                            <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                          </>
                        ) : (
                          'Analyze Resume'
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card className="glass-box h-full">
                <CardHeader className="bg-transparent rounded-t-lg border-b border-gray-700">
                  <Tabs defaultValue="skills-gap" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="tabs-list-custom">
                      <TabsTrigger value="skills-gap" className="tabs-trigger-custom">
                        Skills Gap
                      </TabsTrigger>
                      <TabsTrigger value="learning-path" className="tabs-trigger-custom">
                        Learning Path
                      </TabsTrigger>
                      <TabsTrigger value="job-match" className="tabs-trigger-custom">
                        Job Match
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent className="p-6">
                  {!isAnalysisComplete ? (
                    <div className="text-center py-16 px-4">
                      <div className="mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 text-gray-500 mb-4">
                          <FileText className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Resume Analysis</h3>
                        <p className="text-gray-400 max-w-md mx-auto">
                          Upload your resume and specify your target job role to get personalized skills gap analysis and learning recommendations.
                        </p>
                      </div>
                      
                      <div className="max-w-md mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div className="glass-box p-4 text-center">
                          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-cyan-900 text-[#00FFFF] mb-2">
                            <Target className="h-5 w-5" />
                          </div>
                          <p className="text-sm font-medium text-white">Identify Skills Gaps</p>
                        </div>
                        <div className="glass-box p-4 text-center">
                          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-cyan-900 text-[#00FFFF] mb-2">
                            <BookOpen className="h-5 w-5" />
                          </div>
                          <p className="text-sm font-medium text-white">Custom Learning Path</p>
                        </div>
                        <div className="glass-box p-4 text-center">
                          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-cyan-900 text-[#00FFFF] mb-2">
                            <Users className="h-5 w-5" />
                          </div>
                          <p className="text-sm font-medium text-white">Compare to Top Candidates</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <TabsContent value="skills-gap" className="mt-0">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-3 text-white">Skills Gap Analysis</h3>
                            <p className="text-gray-400 mb-4">
                              Based on your resume and target role as a Senior Frontend Developer, we've identified the following skill gaps:
                            </p>
                            
                            <div className="space-y-4 mb-6">
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium flex items-center text-white">
                                    <span className="h-2.5 w-2.5 rounded-full bg-red-600 mr-2"></span>
                                    TypeScript
                                  </span>
                                  <span className="text-sm font-medium text-white">Missing</span>
                                </div>
                                <Progress value={0} className="h-2 progress-bar-custom" indicatorClassName="bg-red-600" />
                                <p className="text-xs text-gray-500 mt-1">
                                  Highly requested in 87% of Senior Frontend Developer job postings
                                </p>
                              </div>
                              
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium flex items-center text-white">
                                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500 mr-2"></span>
                                    React Testing Library
                                  </span>
                                  <span className="text-sm font-medium text-white">Basic</span>
                                </div>
                                <Progress value={30} className="h-2 progress-bar-custom" indicatorClassName="bg-amber-500" />
                                <p className="text-xs text-gray-500 mt-1">
                                  Your experience shows basic knowledge, but 65% of roles require advanced testing skills
                                </p>
                              </div>
                              
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium flex items-center text-white">
                                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500 mr-2"></span>
                                    State Management (Redux)
                                  </span>
                                  <span className="text-sm font-medium text-white">Intermediate</span>
                                </div>
                                <Progress value={60} className="h-2 progress-bar-custom" indicatorClassName="bg-amber-500" />
                                <p className="text-xs text-gray-500 mt-1">
                                  You have some experience, but senior roles typically require advanced knowledge
                                </p>
                              </div>
                              
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium flex items-center text-white">
                                    <span className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></span>
                                    HTML/CSS
                                  </span>
                                  <span className="text-sm font-medium text-white">Expert</span>
                                </div>
                                <Progress value={95} className="h-2 progress-bar-custom" indicatorClassName="bg-green-500" />
                                <p className="text-xs text-gray-500 mt-1">
                                  Your expertise exceeds requirements for most senior roles
                                </p>
                              </div>
                              
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium flex items-center text-white">
                                    <span className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></span>
                                    JavaScript
                                  </span>
                                  <span className="text-sm font-medium text-white">Expert</span>
                                </div>
                                <Progress value={90} className="h-2 progress-bar-custom" indicatorClassName="bg-green-500" />
                                <p className="text-xs text-gray-500 mt-1">
                                  Your JavaScript skills are strong and meet senior role requirements
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-cyan-900 bg-opacity-20 p-5 rounded-lg border border-cyan-700">
                            <h4 className="font-semibold text-[#00FFFF] mb-2 flex items-center">
                              <AlertCircle className="h-5 w-5 mr-2 text-[#00FFFF]" />
                              Key Recommendation
                            </h4>
                            <p className="text-white mb-3">
                              Focus on learning TypeScript and improving your testing skills to significantly increase your job match rate for senior positions.
                            </p>
                            <Button variant="outline" className="glassy-button">
                              View Detailed Learning Path
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="learning-path" className="mt-0">
                        <div className="space-y-5">
                          <div className="border-b border-gray-700 pb-5">
                            <h3 className="text-lg font-semibold mb-3 text-white">Personalized Learning Path</h3>
                            <p className="text-gray-400">
                              Based on your skills gap analysis, we recommend the following learning path to boost your qualifications for Senior Frontend Developer roles.
                            </p>
                          </div>
                          
                          <div className="space-y-6">
                            <div className="relative">
                              <div className="absolute left-3.5 top-5 bottom-0 w-0.5 timeline-line"></div>
                              
                              <div className="relative flex items-start gap-4 pb-8">
                                <div className="h-7 w-7 rounded-full border-2 border-gray-800 timeline-dot flex items-center justify-center">
                                  <span className="text-black text-xs font-bold">1</span>
                                </div>
                                
                                <div className="flex-1 glass-box p-5">
                                  <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center">
                                      <BookOpen className="h-5 w-5 text-[#00FFFF] mr-2" />
                                      <h4 className="font-semibold text-white">TypeScript Fundamentals</h4>
                                    </div>
                                    <span className="bg-cyan-900 text-[#00FFFF] text-xs font-medium px-2.5 py-0.5 rounded border border-cyan-700">4 Weeks</span>
                                  </div>
                                  
                                  <p className="text-gray-400 mb-3">
                                    Learn TypeScript fundamentals and how to apply it to React projects. Focus on type systems, interfaces, and generics.
                                  </p>
                                  
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded border border-gray-700">TypeScript Handbook</span>
                                    <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded border border-gray-700">React & TypeScript</span>
                                    <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded border border-gray-700">Type Systems</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="relative flex items-start gap-4 pb-8">
                                <div className="h-7 w-7 rounded-full border-2 border-gray-800 timeline-dot flex items-center justify-center">
                                  <span className="text-black text-xs font-bold">2</span>
                                </div>
                                
                                <div className="flex-1 glass-box p-5">
                                  <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center">
                                      <BookOpen className="h-5 w-5 text-[#00FFFF] mr-2" />
                                      <h4 className="font-semibold text-white">Frontend Testing</h4>
                                    </div>
                                    <span className="bg-cyan-900 text-[#00FFFF] text-xs font-medium px-2.5 py-0.5 rounded border border-cyan-700">3 Weeks</span>
                                  </div>
                                  
                                  <p className="text-gray-400 mb-3">
                                    Advance your testing skills with React Testing Library and Jest. Learn component testing, mocking, and integration testing.
                                  </p>
                                  
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded border border-gray-700">Jest</span>
                                    <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded border border-gray-700">React Testing Library</span>
                                    <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded border border-gray-700">Mocking</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="relative flex items-start gap-4">
                                <div className="h-7 w-7 rounded-full border-2 border-gray-800 timeline-dot flex items-center justify-center">
                                  <span className="text-black text-xs font-bold">3</span>
                                </div>
                                
                                <div className="flex-1 glass-box p-5">
                                  <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center">
                                      <BookOpen className="h-5 w-5 text-[#00FFFF] mr-2" />
                                      <h4 className="font-semibold text-white">Advanced State Management</h4>
                                    </div>
                                    <span className="bg-cyan-900 text-[#00FFFF] text-xs font-medium px-2.5 py-0.5 rounded border border-cyan-700">5 Weeks</span>
                                  </div>
                                  
                                  <p className="text-gray-400 mb-3">
                                    Deepen your Redux knowledge and learn modern alternatives like Redux Toolkit, Context API with hooks, and Zustand.
                                  </p>
                                  
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded border border-gray-700">Redux Toolkit</span>
                                    <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded border border-gray-700">Context API</span>
                                    <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded border border-gray-700">Zustand</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                            <p className="text-sm text-gray-400">
                              Estimated time to complete: <span className="font-semibold text-white">12 weeks</span>
                            </p>
                            <Button className="glassy-button">
                              Get Full Learning Path
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="job-match" className="mt-0">
                        <div>
                          <div className="border-b border-gray-700 pb-5 mb-6">
                            <h3 className="text-lg font-semibold mb-3 text-white">Job Match Analysis</h3>
                            <p className="text-gray-400">
                              How your current skills match against requirements for Senior Frontend Developer roles.
                            </p>
                          </div>
                          
                          <div className="flex justify-center mb-8">
                            <div className="relative">
                              <svg className="w-40 h-40">
                                <defs>
                                  <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#00FFFF" />
                                    <stop offset="100%" stopColor="#00CCCC" />
                                  </linearGradient>
                                </defs>
                                <circle 
                                  className="circular-progress-bg" 
                                  strokeWidth="10" 
                                  stroke="currentColor" 
                                  fill="transparent" 
                                  r="65" 
                                  cx="80" 
                                  cy="80" 
                                />
                                <circle 
                                  className="circular-progress-fill" 
                                  strokeWidth="10" 
                                  strokeDasharray="408" 
                                  strokeDashoffset="153" /* (1 - 0.62) * 408 = 155.04 */
                                  strokeLinecap="round" 
                                  fill="transparent" 
                                  r="65" 
                                  cx="80" 
                                  cy="80" 
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <p className="text-4xl font-bold text-white">62%</p>
                                <p className="text-sm text-gray-400">Match Rate</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="glass-box rounded-lg overflow-hidden mb-6">
                            <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
                              <h4 className="font-medium text-white">Skills Match Analysis</h4>
                            </div>
                            <div className="p-4">
                              <div className="space-y-4">
                                <div>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-white">Technical Skills</span>
                                    <span className="text-sm font-medium text-white">75%</span>
                                  </div>
                                  <Progress value={75} className="h-2 progress-bar-custom" />
                                </div>
                                
                                <div>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-white">Experience Level</span>
                                    <span className="text-sm font-medium text-white">60%</span>
                                  </div>
                                  <Progress value={60} className="h-2 progress-bar-custom" />
                                </div>
                                
                                <div>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-white">Education & Certifications</span>
                                    <span className="text-sm font-medium text-white">90%</span>
                                  </div>
                                  <Progress value={90} className="h-2 progress-bar-custom" />
                                </div>
                                
                                <div>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-white">Industry Knowledge</span>
                                    <span className="text-sm font-medium text-white">50%</span>
                                  </div>
                                  <Progress value={50} className="h-2 progress-bar-custom" />
                                </div>
                                
                                <div>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-white">Soft Skills</span>
                                    <span className="text-sm font-medium text-white">70%</span>
                                  </div>
                                  <Progress value={70} className="h-2 progress-bar-custom" />
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-green-900 bg-opacity-20 p-5 rounded-lg border border-green-700 mb-6">
                            <h4 className="font-semibold text-green-400 mb-2 flex items-center">
                              <Check className="h-5 w-5 mr-2 text-green-400" />
                              Competitive Strengths
                            </h4>
                            <ul className="space-y-2 text-white">
                              <li className="flex">
                                <Star className="h-4 w-4 text-yellow-400 mt-1 mr-2 flex-shrink-0" />
                                <span>Your expertise in CSS animations and responsive design is in the top 15% of applicants</span>
                              </li>
                              <li className="flex">
                                <Star className="h-4 w-4 text-yellow-400 mt-1 mr-2 flex-shrink-0" />
                                <span>Your portfolio demonstrates strong UI implementation skills</span>
                              </li>
                              <li className="flex">
                                <Star className="h-4 w-4 text-yellow-400 mt-1 mr-2 flex-shrink-0" />
                                <span>Your experience with modern JavaScript frameworks is valuable</span>
                              </li>
                            </ul>
                          </div>
                          
                          <div className="text-right">
                            <Link to="/resume-optimization">
                              <Button className="glassy-button">
                                Get Resume Optimization Tips
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </TabsContent>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className={`glass-box p-6 mb-8 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
            <h3 className="text-xl font-semibold mb-4 text-[#00FFFF]">How It Works</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-cyan-900 text-[#00FFFF] flex items-center justify-center mx-auto mb-4 border border-cyan-700">
                  <FileText className="h-6 w-6" />
                </div>
                <h4 className="font-semibold mb-2 text-white">Upload Resume</h4>
                <p className="text-gray-400 text-sm">
                  Upload your current resume and select your target job role to begin analysis
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-cyan-900 text-[#00FFFF] flex items-center justify-center mx-auto mb-4 border border-cyan-700">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h4 className="font-semibold mb-2 text-white">AI Analysis</h4>
                <p className="text-gray-400 text-sm">
                  Our system analyzes your skills, experience, and compares them to industry requirements
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-cyan-900 text-[#00FFFF] flex items-center justify-center mx-auto mb-4 border border-cyan-700">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h4 className="font-semibold mb-2 text-white">Custom Learning Path</h4>
                <p className="text-gray-400 text-sm">
                  Get a personalized development plan with resources to build the skills you need
                </p>
              </div>
            </div>
          </div>
          
          <div className={`glass-box p-8 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-[#00FFFF] mb-4">Ready to bridge your skills gap?</h3>
              <p className="text-white mb-6">
                Upload your resume today and discover exactly what you need to stand out from the competition and land your dream job.
              </p>
              <Button className="glassy-button text-lg px-8 py-6 h-auto">
                Start Your Skills Analysis
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SkillGapAnalysis;
