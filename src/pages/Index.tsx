import React, { useState, useRef } from 'react';
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
import { FileText, Clock, BarChart2, ClipboardList, Mail, MessageSquare } from 'lucide-react';

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
  const [emailLoading, setEmailLoading] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState('');
  const outreachSectionRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const [showStory, setShowStory] = useState(false);

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

  // Email Outreach logic
  const handleEmailOutreach = async () => {
    if (!analysisData) {
      toast.error('No analysis data available.');
      return;
    }
    setEmailLoading(true);
    setGeneratedEmail('');
    try {
      // Compose prompt for AI email generation
      const prompt = `You are an expert career assistant. Write a personalized outreach email to a recruiter, highlighting the candidate's most relevant skills and experience for a job opportunity. Use the following resume analysis data:\n\n${JSON.stringify(analysisData, null, 2)}\n\nThe email should be professional, concise, and tailored to impress a recruiter. Include a subject line. Return only the email text.`;
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: 'system', content: 'You are an expert career assistant.' },
            { role: 'user', content: prompt },
          ],
        }),
      });
      const data = await res.json();
      const emailText = data.choices?.[0]?.message?.content || 'Could not generate email.';
      setGeneratedEmail(emailText);
      // Extract subject and body
      let subject = 'Job Opportunity';
      let body = emailText;
      const subjectMatch = emailText.match(/^Subject:(.*)$/im);
      if (subjectMatch) {
        subject = subjectMatch[1].trim();
        body = emailText.replace(/^Subject:.*$/im, '').trim();
      }
      // Send email via backend
      const backendRes = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: 'raghuvanshiranapratapsingh@gmail.com', subject, text: body }),
      });
      if (!backendRes.ok) {
        throw new Error('Backend email send failed');
      }
      toast.success('Email sent to recruiter!');
    } catch (err) {
      toast.error('Failed to generate or send email.');
    } finally {
      setEmailLoading(false);
    }
  };

  const handleEmailOutreachLearnMore = () => {
    if (outreachSectionRef.current) {
      outreachSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add handler for Hero's 'See how it works' button
  const handleSeeHowItWorks = () => {
    setShowStory(true);
  };

  return (
    <>
      <Header />
      {/* Updated landing intro */}
      <div className="bg-gradient-to-br from-gray-900 to-black text-white py-8 border-b border-[#008080]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00CCCC]">MITS CareerBoost</h1>
          <p className="text-lg md:text-xl mb-4">Made for the HackOrbit hackathon, MITS CareerBoost is designed to help students and job seekers supercharge their careers with AI-powered tools, resume analysis, and personalized learning paths.</p>
          <p className="text-base text-gray-300 max-w-2xl mx-auto">Our mission is to empower everyone to become the best-fit candidate for their dream job by providing actionable insights, upskilling recommendations, and a seamless job application experience—all in one place.</p>
        </div>
      </div>
      {/* Hero with see how it works handler */}
      <Hero onSeeHowItWorks={handleSeeHowItWorks} />
      {/* Story Modal Overlay */}
      {showStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="relative bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl shadow-2xl p-8 max-w-5xl w-full mx-4 border border-[#00FFFF]">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
              onClick={() => setShowStory(false)}
              aria-label="Close story"
            >
              &times;
            </button>
            <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00CCCC]">How MITS CareerBoost Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              <div className="glass-box flex flex-col items-center text-center p-6 rounded-xl shadow-2xl border border-gray-700 border-opacity-60 min-h-[340px]">
                <FileText className="h-10 w-10 text-[#00FFFF] mb-4" />
                <h3 className="text-2xl font-semibold mb-3 text-[#00FFFF]">1. Upload & Analyze Resume</h3>
                <p className="text-white mb-4">Easily upload your resume and get instant, AI-powered feedback on strengths, weaknesses, and ATS compatibility.</p>
              </div>
              <div className="glass-box flex flex-col items-center text-center p-6 rounded-xl shadow-2xl border border-gray-700 border-opacity-60 min-h-[340px]">
                <Clock className="h-10 w-10 text-[#00FFFF] mb-4" />
                <h3 className="text-2xl font-semibold mb-3 text-[#00FFFF]">2. Discover Skill Gaps</h3>
                <p className="text-white mb-4">See which skills you’re missing for your target roles and get personalized recommendations for improvement.</p>
              </div>
              <div className="glass-box flex flex-col items-center text-center p-6 rounded-xl shadow-2xl border border-gray-700 border-opacity-60 min-h-[340px]">
                <BarChart2 className="h-10 w-10 text-[#00FFFF] mb-4" />
                <h3 className="text-2xl font-semibold mb-3 text-[#00FFFF]">3. Explore Learning Paths</h3>
                <p className="text-white mb-4">Access curated courses and roadmaps to upskill efficiently and become a top candidate in your field.</p>
              </div>
              <div className="glass-box flex flex-col items-center text-center p-6 rounded-xl shadow-2xl border border-gray-700 border-opacity-60 min-h-[340px]">
                <ClipboardList className="h-10 w-10 text-[#00FFFF] mb-4" />
                <h3 className="text-2xl font-semibold mb-3 text-[#00FFFF]">4. Track Applications</h3>
                <p className="text-white mb-4">Keep all your job applications, interviews, and follow-ups organized in one dashboard.</p>
              </div>
              <div className="glass-box flex flex-col items-center text-center p-6 rounded-xl shadow-2xl border border-gray-700 border-opacity-60 min-h-[340px]">
                <Mail className="h-10 w-10 text-[#00FFFF] mb-4" />
                <h3 className="text-2xl font-semibold mb-3 text-[#00FFFF]">5. Smart Email Outreach</h3>
                <p className="text-white mb-4">Send personalized emails to recruiters and hiring managers with AI-generated content and resume attachments.</p>
              </div>
              <div className="glass-box flex flex-col items-center text-center p-6 rounded-xl shadow-2xl border border-gray-700 border-opacity-60 min-h-[340px]">
                <MessageSquare className="h-10 w-10 text-[#00FFFF] mb-4" />
                <h3 className="text-2xl font-semibold mb-3 text-[#00FFFF]">6. Get AI Career Coaching</h3>
                <p className="text-white mb-4">Chat with our AI Career Coach for instant advice, interview tips, and personalized feedback on your career journey.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <main className="flex-grow">
        <Features
          onEmailOutreachLearnMore={handleEmailOutreachLearnMore}
          onCareerCoachingLearnMore={() => {
            const btn = document.getElementById('chatbot-button');
            if (btn) btn.click();
          }}
        />

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
              <div className="space-y-16" ref={outreachSectionRef}>
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
                {/* Email Outreach Feature */}
                <div className="glass-box rounded-lg shadow p-6 mt-8">
                  <h2 className="text-2xl font-bold mb-4 text-[#00FFFF]">Email Outreach</h2>
                  <p className="mb-4 text-white">AI-generated personalized emails to recruiters that highlight your relevant skills and experience. The email will be sent to <span className='text-[#00FFFF] font-semibold'>raghuvanshiranapratapsingh@gmail.com</span> when you click send:</p>
                  <div className="flex flex-col sm:flex-row gap-2 mb-4">
                    <Button
                      onClick={handleEmailOutreach}
                      disabled={emailLoading}
                      className="glassy-button text-white px-4 py-2 rounded hover:text-white"
                    >
                      {emailLoading ? 'Sending...' : 'Send Email'}
                    </Button>
                  </div>
                  {generatedEmail && (
                    <div className="glass-bubble p-4 rounded text-sm overflow-x-auto text-white mt-4">
                      <strong>Generated Email:</strong>
                      <pre className="whitespace-pre-wrap mt-2">{generatedEmail}</pre>
                    </div>
                  )}
                </div>
                {/* End Email Outreach Feature */}
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
    </>
  );
};

export default Index;
