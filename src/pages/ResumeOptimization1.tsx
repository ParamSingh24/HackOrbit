import React, { useState, useEffect, useRef } from 'react';
import Navbar from "@/components/Header"; // Assuming Navbar is already styled to match
import Footer from "@/components/Footer"; // Assuming Footer is already styled to match
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUp, Check, AlertCircle, UploadCloud, Download, FileText } from 'lucide-react';

const ResumeOptimization = () => {
  const [activeTab, setActiveTab] = useState("analysis"); // Default to analysis tab
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
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

  // Simulate upload when button is clicked
  const handleUpload = () => {
    setUploadProgress(0);
    setIsUploaded(false);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploaded(true);
          return 100;
        }
        return prev + 10;
      });
    }, 250);
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

        /* Glass Box Styles - Reused from other components */
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

        /* Glassy Button Styles - Reused from other components */
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
          color: #D1D5DB; /* Light gray text */
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

        /* Inner card content styling */
        .inner-card-content {
          background: rgba(0, 0, 0, 0.2); /* Darker transparent background */
          border: 1px solid rgba(255, 255, 255, 0.08); /* Subtle border */
          border-radius: 0.5rem;
          box-shadow: 0 2px 8px rgba(0, 251, 255, 0.05);
        }
      `}</style>

      <Navbar />

      <main className="flex-grow py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className={`text-4xl font-bold mb-2 gradient-text ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>Resume Optimization</h1>
          <p className={`text-lg text-gray-300 mb-8 max-w-2xl ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            Upload your resume and let our AI analyze and optimize it to increase your chances of landing interviews.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className={`lg:col-span-1 space-y-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              <Card className="glass-box"> {/* Applied glass-box */}
                <CardHeader>
                  <CardTitle className="flex items-center text-[#00FFFF]"> {/* Cyan title */}
                    <FileUp className="mr-2 h-5 w-5" />
                    <span>Upload Resume</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center"> {/* Darker border */}
                    <UploadCloud className="h-10 w-10 text-cyan-400 mx-auto mb-4" /> {/* Cyan icon */}
                    <p className="text-sm text-gray-300 mb-4">Drag and drop your resume file here, or click to browse</p> {/* Lighter text */}
                    <input type="file" className="hidden" id="resume-upload" />
                    <label htmlFor="resume-upload">
                      <Button onClick={handleUpload} className="glassy-button"> {/* Applied glassy-button */}
                        <span>Select File</span>
                      </Button>
                    </label>
                    <p className="text-xs text-gray-400 mt-2">Supports PDF, DOCX (Max 5MB)</p>

                    {uploadProgress > 0 && !isUploaded && (
                      <div className="mt-4">
                        <p className="text-sm mb-2 text-gray-200">Uploading... {uploadProgress}%</p> {/* Lighter text */}
                        <Progress value={uploadProgress} className="h-2 progress-bar-custom" /> {/* Custom progress bar */}
                      </div>
                    )}

                    {isUploaded && (
                      <div className="mt-4 p-3 bg-green-900 bg-opacity-30 rounded-lg flex items-center border border-green-700"> {/* Themed success message */}
                        <Check className="text-green-400 h-5 w-5 mr-2" />
                        <span className="text-sm text-green-200">Resume uploaded successfully</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-box"> {/* Applied glass-box */}
                <CardHeader>
                  <CardTitle className="text-[#00FFFF]">Resume Score</CardTitle> {/* Cyan title */}
                  <CardDescription className="text-gray-300">How your resume ranks against industry standards</CardDescription> {/* Lighter text */}
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center h-28 w-28 rounded-full bg-cyan-900 bg-opacity-30 border border-cyan-700 text-cyan-200 relative shadow-lg"> {/* Themed score circle */}
                      <span className="text-3xl font-bold">76</span>
                      <span className="text-sm absolute -bottom-1">/ 100</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">Your resume needs some improvements</p> {/* Lighter text */}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-200">Content Quality</span> {/* Lighter text */}
                        <span className="text-sm font-medium text-[#00FFFF]">80%</span> {/* Cyan percentage */}
                      </div>
                      <Progress value={80} className="h-2 progress-bar-custom" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-200">ATS Compatibility</span>
                        <span className="text-sm font-medium text-[#00FFFF]">65%</span>
                      </div>
                      <Progress value={65} className="h-2 progress-bar-custom" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-200">Keyword Optimization</span>
                        <span className="text-sm font-medium text-[#00FFFF]">70%</span>
                      </div>
                      <Progress value={70} className="h-2 progress-bar-custom" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-200">Visual Structure</span>
                        <span className="text-sm font-medium text-[#00FFFF]">90%</span>
                      </div>
                      <Progress value={90} className="h-2 progress-bar-custom" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className={`glass-box h-full ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}> {/* Applied glass-box and animation */}
                <CardHeader>
                  <Tabs defaultValue="analysis" onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 tabs-list-custom"> {/* Custom tabs list */}
                      <TabsTrigger value="analysis" className="tabs-trigger-custom">AI Analysis</TabsTrigger>
                      <TabsTrigger value="suggestions" className="tabs-trigger-custom">Improvement Suggestions</TabsTrigger>
                      <TabsTrigger value="preview" className="tabs-trigger-custom">Resume Preview</TabsTrigger>
                    </TabsList>

                    <CardContent className="h-[calc(100%-80px)] overflow-y-auto mt-4 text-white"> {/* Adjusted height and text color */}
                      <TabsContent value="analysis" className="mt-0">
                        <div className="p-4 border border-gray-700 rounded-lg mb-4 inner-card-content"> {/* Themed inner card */}
                          <h3 className="font-semibold mb-2 text-[#00FFFF]">Overall Analysis</h3> {/* Cyan title */}
                          <p className="text-gray-200 mb-4"> {/* Lighter text */}
                            Your resume demonstrates solid experience and skills, but could benefit from more quantifiable achievements and targeted keywords for your industry. The AI has detected that your resume might not pass some ATS systems due to formatting issues.
                          </p>

                          <h4 className="font-medium text-sm text-gray-400 mb-2">Key Findings:</h4> {/* Lighter text */}
                          <ul className="space-y-2 mb-4">
                            <li className="flex items-start">
                              <AlertCircle className="h-5 w-5 text-amber-400 mr-2 flex-shrink-0 mt-0.5" /> {/* Amber icon */}
                              <span className="text-gray-200">Missing quantifiable achievements in your most recent role</span>
                            </li>
                            <li className="flex items-start">
                              <AlertCircle className="h-5 w-5 text-amber-400 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-200">Skills section could be more targeted to job descriptions</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" /> {/* Green icon */}
                              <span className="text-gray-200">Education section is well structured and complete</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-200">Contact information is clear and professional</span>
                            </li>
                          </ul>
                        </div>

                        <div className="p-4 border border-gray-700 rounded-lg mb-4 inner-card-content"> {/* Themed inner card */}
                          <h3 className="font-semibold mb-2 text-[#00FFFF]">Keyword Analysis</h3> {/* Cyan title */}
                          <p className="text-gray-200 mb-3"> {/* Lighter text */}
                            Common keywords in your industry that are missing from your resume:
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-2 py-1 bg-cyan-900 bg-opacity-30 text-cyan-200 text-xs rounded-full border border-cyan-700">Data Analysis</span> {/* Themed tags */}
                            <span className="px-2 py-1 bg-cyan-900 bg-opacity-30 text-cyan-200 text-xs rounded-full border border-cyan-700">Project Management</span>
                            <span className="px-2 py-1 bg-cyan-900 bg-opacity-30 text-cyan-200 text-xs rounded-full border border-cyan-700">Agile</span>
                            <span className="px-2 py-1 bg-cyan-900 bg-opacity-30 text-cyan-200 text-xs rounded-full border border-cyan-700">Cross-functional</span>
                            <span className="px-2 py-1 bg-cyan-900 bg-opacity-30 text-cyan-200 text-xs rounded-full border border-cyan-700">ROI</span>
                            <span className="px-2 py-1 bg-cyan-900 bg-opacity-30 text-cyan-200 text-xs rounded-full border border-cyan-700">Strategic Planning</span>
                          </div>
                        </div>

                        <Button className="glassy-button w-full"> {/* Applied glassy-button */}
                          <span>Generate Optimized Resume</span>
                        </Button>
                      </TabsContent>

                      <TabsContent value="suggestions" className="mt-0">
                        <div className="space-y-6">
                          <div className="p-4 border-l-4 border-cyan-400 bg-cyan-900 bg-opacity-20 rounded-r-lg inner-card-content"> {/* Themed suggestion box */}
                            <h3 className="font-semibold mb-1 text-[#00FFFF]">Professional Summary</h3>
                            <p className="text-sm text-gray-200 mb-3">
                              Your summary could be more impactful by highlighting your unique value proposition.
                            </p>
                            <div className="p-3 bg-black bg-opacity-30 border border-gray-700 rounded-lg text-sm text-gray-200"> {/* Themed inner suggestion */}
                              <p className="font-medium mb-1 text-[#00CCCC]">Suggested Improvement:</p>
                              <p className="text-gray-200">
                                "Results-driven software engineer with 5+ years of experience in building scalable web applications using modern JavaScript frameworks. Specialized in optimizing application performance and implementing CI/CD pipelines that reduced deployment time by 40%."
                              </p>
                            </div>
                          </div>

                          <div className="p-4 border-l-4 border-cyan-400 bg-cyan-900 bg-opacity-20 rounded-r-lg inner-card-content">
                            <h3 className="font-semibold mb-1 text-[#00FFFF]">Work Experience</h3>
                            <p className="text-sm text-gray-200 mb-3">
                              Add more measurable achievements to showcase your impact.
                            </p>
                            <div className="p-3 bg-black bg-opacity-30 border border-gray-700 rounded-lg text-sm text-gray-200">
                              <p className="font-medium mb-1 text-[#00CCCC]">Suggested Improvement:</p>
                              <p className="text-gray-200">
                                "Led a team of 5 developers to redesign the company's e-commerce platform, resulting in a 30% increase in conversion rate and 25% reduction in bounce rate within 3 months."
                              </p>
                            </div>
                          </div>

                          <div className="p-4 border-l-4 border-cyan-400 bg-cyan-900 bg-opacity-20 rounded-r-lg inner-card-content">
                            <h3 className="font-semibold mb-1 text-[#00FFFF]">Skills Section</h3>
                            <p className="text-sm text-gray-200 mb-3">
                              Reorganize skills into categories and add missing relevant skills.
                            </p>
                            <div className="p-3 bg-black bg-opacity-30 border border-gray-700 rounded-lg text-sm text-gray-200">
                              <p className="font-medium mb-1 text-[#00CCCC]">Suggested Improvement:</p>
                              <p className="text-gray-200">
                                Group your skills into: Technical Skills (JavaScript, React, Node.js), Project Management (Agile, Scrum, JIRA), and Soft Skills (Leadership, Communication, Problem-solving).
                              </p>
                            </div>
                          </div>

                          <Button className="glassy-button w-full"> {/* Applied glassy-button */}
                            <span>Apply All Suggestions</span>
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="preview" className="mt-0">
                        <div className="bg-white border border-gray-200 rounded-lg p-6 text-white" style={{ backgroundColor: "#18181b" }}> {/* Changed text to white for preview, dark background */}
                          <div className="flex justify-between items-center mb-6">
                            <div>
                              <h2 className="text-2xl font-bold">John Anderson</h2>
                              <p className="text-gray-300">Senior Software Engineer</p>
                            </div>
                            <div className="text-right text-sm text-gray-300">
                              <p>john.anderson@email.com</p>
                              <p>(555) 123-4567</p>
                              <p>San Francisco, CA</p>
                            </div>
                          </div>

                          <div className="mb-5">
                            <h3 className="text-lg font-semibold border-b border-gray-700 pb-1 mb-3">Professional Summary</h3>
                            <p className="text-gray-200 text-sm">
                              Software engineer with 5 years of experience in web development. Skilled in JavaScript, React, and Node.js. Passionate about building user-friendly applications.
                            </p>
                          </div>

                          <div className="mb-5">
                            <h3 className="text-lg font-semibold border-b border-gray-700 pb-1 mb-3">Work Experience</h3>

                            <div className="mb-4">
                              <div className="flex justify-between">
                                <h4 className="font-medium">Senior Software Engineer</h4>
                                <span className="text-sm text-gray-400">Jan 2020 - Present</span>
                              </div>
                              <p className="text-sm font-medium text-gray-300 mb-1">TechCorp Inc., San Francisco, CA</p>
                              <ul className="text-sm text-gray-200 list-disc pl-5 space-y-1">
                                <li>Developed web applications using React and Node.js</li>
                                <li>Collaborated with design team to implement user interfaces</li>
                                <li>Maintained and updated existing codebases</li>
                              </ul>
                            </div>

                            <div>
                              <div className="flex justify-between">
                                <h4 className="font-medium">Software Developer</h4>
                                <span className="text-sm text-gray-400">Mar 2017 - Dec 2019</span>
                              </div>
                              <p className="text-sm font-medium text-gray-300 mb-1">WebSolutions Co., Seattle, WA</p>
                              <ul className="text-sm text-gray-200 list-disc pl-5 space-y-1">
                                <li>Built responsive websites for clients in various industries</li>
                                <li>Assisted senior developers with complex features</li>
                                <li>Participated in code reviews and team meetings</li>
                              </ul>
                            </div>
                          </div>

                          <div className="mb-5">
                            <h3 className="text-lg font-semibold border-b border-gray-700 pb-1 mb-3">Education</h3>
                            <div className="flex justify-between">
                              <h4 className="font-medium">Bachelor of Science in Computer Science</h4>
                              <span className="text-sm text-gray-400">2013 - 2017</span>
                            </div>
                            <p className="text-sm text-gray-300">University of Washington, Seattle, WA</p>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold border-b border-gray-700 pb-1 mb-3">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-2 py-1 bg-gray-800 text-gray-200 text-xs rounded-full">JavaScript</span>
                              <span className="px-2 py-1 bg-gray-800 text-gray-200 text-xs rounded-full">React</span>
                              <span className="px-2 py-1 bg-gray-800 text-gray-200 text-xs rounded-full">Node.js</span>
                              <span className="px-2 py-1 bg-gray-800 text-gray-200 text-xs rounded-full">HTML/CSS</span>
                              <span className="px-2 py-1 bg-gray-800 text-gray-200 text-xs rounded-full">Git</span>
                              <span className="px-2 py-1 bg-gray-800 text-gray-200 text-xs rounded-full">RESTful APIs</span>
                              <span className="px-2 py-1 bg-gray-800 text-gray-200 text-xs rounded-full">MongoDB</span>
                              <span className="px-2 py-1 bg-gray-800 text-gray-200 text-xs rounded-full">Express</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end mt-4 space-x-3">
                          <Button variant="outline" className="glassy-button flex items-center">
                            <FileText className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </Button>
                          <Button className="glassy-button flex items-center">
                            <Download className="mr-2 h-4 w-4" />
                            <span>Download</span>
                          </Button>
                        </div>
                      </TabsContent>
                    </CardContent>
                  </Tabs>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResumeOptimization;
