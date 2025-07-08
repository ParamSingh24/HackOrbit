import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Stats from '@/components/Stats';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import ResumeUploader from '@/components/ResumeUploader';
import AnalysisResults from '@/components/AnalysisResults';
import LearningPaths from '@/components/LearningPaths';
import Pricing from '@/components/Pricing';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

// Mock data for analysis results
const mockAnalysisData = {
  jobTitle: "Senior Frontend Developer",
  skills: [
    { name: "React.js", level: 85, required: 80, gap: 0 },
    { name: "TypeScript", level: 70, required: 75, gap: 5 },
    { name: "UI/UX Design", level: 60, required: 70, gap: 10 },
    { name: "Testing", level: 40, required: 65, gap: 25 },
    { name: "GraphQL", level: 30, required: 60, gap: 30 },
  ],
  strengths: [
    "Strong proficiency in React.js and component architecture",
    "Good understanding of state management with Redux",
    "Experience with responsive design and cross-browser compatibility",
    "Solid HTML5, CSS3, and JavaScript fundamentals"
  ],
  weaknesses: [
    "Limited experience with automated testing frameworks",
    "Needs improvement in GraphQL and API integration",
    "Could strengthen TypeScript type system knowledge",
    "Minimal experience with CI/CD pipelines"
  ],
  recommendations: [
    "Add specific metrics and outcomes to your project descriptions",
    "Include more testing experience in your resume",
    "Develop a portfolio showcasing your UI/UX skills",
    "Consider pursuing a certification in GraphQL"
  ],
};

// Mock data for learning paths
const mockCoursesData = [
  {
    id: "course1",
    title: "Advanced TypeScript Masterclass",
    provider: "Frontend Masters",
    duration: "15 hours",
    level: "Intermediate" as const,
    description: "Learn advanced TypeScript features including generics, utility types, and complex type definitions.",
    link: "#",
    skills: ["TypeScript", "Type Systems", "JavaScript", "Web Development"]
  },
  {
    id: "course2",
    title: "Testing React Applications",
    provider: "Kent C. Dodds",
    duration: "12 hours",
    level: "Intermediate" as const,
    description: "Comprehensive guide to testing React applications with Jest, React Testing Library, and Cypress.",
    link: "#",
    skills: ["React", "Testing", "Jest", "Cypress"]
  },
  {
    id: "course3",
    title: "GraphQL API Development",
    provider: "Apollo",
    duration: "20 hours",
    level: "Advanced" as const,
    description: "Build, query, and maintain GraphQL APIs for modern web applications.",
    link: "#",
    skills: ["GraphQL", "APIs", "Node.js", "Apollo Server"]
  }
];

const API_KEY = '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';
const API_URL = 'https://api.perplexity.ai/chat/completions';
const MODEL = 'sonar';

const APILAYER_KEY = 'z44Z2rxT20nSjo1dnLSV4tpd6H1da5Ed';
const APILAYER_URL = 'https://api.apilayer.com/resume_parser/url';

const combinedPrompt = (resumeText: string) => `You are a resume analysis expert. Given the following resume, do the following in JSON format:\n\n1. Parse the resume and extract: skills, education, work experience, certifications, and contact details.\n2. Assess the resume's compatibility with Applicant Tracking Systems (ATS) and provide feedback.\n3. Suggest specific improvements to make the resume more ATS-friendly and effective for recruiters.\n\nReturn your response as a JSON object with keys: parsed, ats_feedback, suggestions.\n\nResume:\n${resumeText}`;

const Index = () => {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>('');
  const [resumeUrl, setResumeUrl] = useState('');

  const handleAnalyze = async (file: File) => {
    setIsUploading(true);
    setError(null);
    setProgress('Parsing resume file...');

    // Debug: log file info
    console.log('Uploading file:', file.name, file.type, file.size);

    if (!file || file.size === 0) {
      setError('File is empty.');
      setIsUploading(false);
      setProgress('');
      return;
    }

    // Only allow PDF, DOC, DOCX
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (!allowedTypes.includes(file.type)) {
      setError('Only PDF, DOC, and DOCX files are supported.');
      setIsUploading(false);
      setProgress('');
      return;
    }

    try {
      const res = await fetch('https://api.apilayer.com/resume_parser/upload', {
        method: 'POST',
        headers: {
          'apikey': APILAYER_KEY,
          'Content-Type': 'application/octet-stream',
        },
        body: file, // send the File/Blob directly
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to parse resume file. Please try again.');
        setProgress('');
        setIsUploading(false);
        return;
      }

      setAnalysisData({ parsed: data });
      setShowAnalysis(true);
      setProgress('');
      toast.success('Resume parsed from file successfully!');
    } catch (err) {
      setError('Failed to parse resume file. Please try again.');
      setProgress('');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAnalyzeText = async (resumeText: string) => {
    setIsUploading(true);
    setError(null);
    setProgress('Analyzing your resume...');
    try {
      // Single API call with combined prompt
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: 'system', content: 'You are a resume analysis expert.' },
            { role: 'user', content: combinedPrompt(resumeText) },
          ],
        }),
      });
      setProgress('Processing analysis results...');
      const data = await res.json();
      const content = data.choices?.[0]?.message?.content || '';
      let parsed: any = {};
      try {
        parsed = JSON.parse(content);
      } catch {
        parsed = { raw: content };
      }
      setAnalysisData(parsed);
      setShowAnalysis(true);
      setProgress('');
      toast.success("Resume analyzed successfully!");
    } catch (err: any) {
      setError('Failed to analyze resume. Please try again.');
      setProgress('');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAnalyzeUrl = async () => {
    if (!resumeUrl) return;
    setIsUploading(true);
    setError(null);
    setProgress('Parsing resume from URL...');
    try {
      const res = await fetch(`${APILAYER_URL}?url=${encodeURIComponent(resumeUrl)}`, {
        method: 'GET',
        headers: {
          'apikey': APILAYER_KEY,
        },
      });
      const data = await res.json();
      setAnalysisData({ parsed: data });
      setShowAnalysis(true);
      setProgress('');
      toast.success('Resume parsed from URL successfully!');
    } catch (err: any) {
      setError('Failed to parse resume from URL. Please try again.');
      setProgress('');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-16 bg-gradient-to-br from-gray-900 to-black text-white">
      <style jsx>{`
        /* Glass Box Styles */
        .glass-box {
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          box-shadow: 0 8px 32px 0 rgba(0, 251, 255, 0.2);
          transition: all 0.3s ease-in-out;
        }

        .glass-box:hover {
          background: rgba(0, 0, 0, 0.4);
          box-shadow: 0 12px 48px 0 rgba(0, 251, 255, 0.4);
          transform: translateY(-2px);
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
      `}</style>
      <Header />

      <main className="flex-grow">
        <Hero />

        <Features />

        <div id="upload" className="py-16 bg-gradient-to-br from-gray-900 to-black border-t border-[#008080]">
          <div className="container mx-auto px-4">
            {!showAnalysis ? (
              <>
                <div className="mb-8 glass-box p-6">
                  <label htmlFor="resume-url" className="block mb-2 font-medium text-white">Or analyze a resume from a URL:</label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      id="resume-url"
                      type="url"
                      value={resumeUrl}
                      onChange={e => setResumeUrl(e.target.value)}
                      placeholder="Paste resume file URL (PDF, DOCX, etc.)"
                      className="flex-1 border border-gray-700 rounded px-3 py-2 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFFF] focus:shadow-[0_0_0_3px_rgba(0,255,255,0.5)] transition-all duration-200"
                      disabled={isUploading}
                    />
                    <Button
                      onClick={handleAnalyzeUrl}
                      disabled={!resumeUrl || isUploading}
                      className="glassy-button text-white px-4 py-2 rounded hover:text-white"
                    >
                      Analyze URL
                    </Button>
                  </div>
                </div>
                <ResumeUploader onAnalyze={handleAnalyze} onAnalyzeText={handleAnalyzeText} />
              </>
            ) : (
              <div className="space-y-16">
                {analysisData ? (
                  <div className="space-y-8">
                    <div className="glass-box rounded-lg shadow p-6">
                      <h2 className="text-2xl font-bold mb-4 text-[#00FFFF]">Resume Parsing Result</h2>
                      <pre className="glass-bubble p-4 rounded text-sm overflow-x-auto text-white">{JSON.stringify(analysisData.parsed || analysisData.raw, null, 2)}</pre>
                    </div>
                    {analysisData.ats_feedback && (
                      <div className="glass-box rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold mb-4 text-[#00FFFF]">ATS Compatibility Feedback</h2>
                        <div className="glass-bubble p-4 rounded text-sm whitespace-pre-line text-white">{analysisData.ats_feedback}</div>
                      </div>
                    )}
                    {analysisData.suggestions && (
                      <div className="glass-box rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold mb-4 text-[#00FFFF]">Improvement Suggestions</h2>
                        <div className="glass-bubble p-4 rounded text-sm whitespace-pre-line text-white">{analysisData.suggestions}</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-white">Loading analysis...</div>
                )}
                {/* Ensure LearningPaths is styled consistently or is a separate component that will be styled */}
                <LearningPaths courses={mockCoursesData} />
              </div>
            )}
            {(isUploading || progress) && <div className="text-center mt-6 text-[#00FFFF]">{progress || 'Analyzing your resume, please wait...'}</div>}
            {error && <div className="text-center mt-6 text-red-500">{error}</div>}
          </div>
        </div>

        {/* These components would also need to be updated to match the theme */}
        <Stats />

        <Testimonials />

        <Pricing />

        <CTA />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
