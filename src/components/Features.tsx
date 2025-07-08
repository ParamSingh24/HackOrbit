import React, { useEffect, useRef, useState } from 'react';
import { FileText, BarChart2, Users, Mail, ClipboardList, Clock, MessageSquare, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Chart from './ui/chart'; // If you have a chart component, otherwise will use inline
import { useNavigate } from 'react-router-dom';

const Features = ({ onEmailOutreachLearnMore, onCareerCoachingLearnMore }) => {
  const features = [
    {
      icon: <FileText className="h-8 w-8 text-[#00FFFF]" />,
      title: 'Resume Optimization',
      description: 'AI-powered resume analysis and optimization to match job descriptions and increase interview chances.',
      buttonText: 'Learn More',
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-[#00FFFF]" />,
      title: 'Job Trend Analysis',
      description: 'Track industry trends, in-demand skills, and salary insights to make informed career decisions.',
      buttonText: 'Learn More',
    },
    {
      icon: <ClipboardList className="h-8 w-8 text-[#00FFFF]" />,
      title: 'Application Tracking',
      description: 'Track all your job applications, interviews, and follow-ups in one personalized dashboard. Stay organized and never miss an opportunity!',
      buttonText: 'Open Application Dashboard',
      isCustom: true,
      customContent: null, // Placeholder for future dashboard/modal
    },
    {
      icon: <Clock className="h-8 w-8 text-[#00FFFF]" />,
      title: 'Skill Gap Analysis',
      description: 'Identify missing skills and get recommendations for courses to become more competitive. Enter your current skills and the company you\'re interested in, then click below to see your personalized skill gap analysis!',
      buttonText: 'Show Skill Gap Analysis',
      isCustom: true,
      customContent: (
        <>
          <input type="text" placeholder="Your current skills (comma separated)" className="flex-1 px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:border-[#00FFFF] focus:ring-2 focus:ring-[#00FFFF] mb-2" />
          <select className="px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:border-[#00FFFF] focus:ring-2 focus:ring-[#00FFFF] mb-2">
            <option>Google</option>
            <option>Amazon</option>
            <option>Microsoft</option>
            <option>Facebook</option>
          </select>
        </>
      ),
    },
    {
      icon: <Mail className="h-8 w-8 text-[#00FFFF]" />,
      title: 'Email Outreach',
      description: 'Instantly send your resume to recruiters using your own Gmail account. Upload your resume and click send—Gmail will open with a personalized message. Remember to attach your resume before sending!',
      buttonText: 'Send Resume to Recruiter',
      isCustom: true,
      customContent: (
        <input type="file" accept=".pdf,.doc,.docx,.rtf,.txt" className="mb-4 text-white mx-auto" />
      ),
      onClick: onEmailOutreachLearnMore,
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-[#00FFFF]" />,
      title: 'AI Career Coaching',
      description: 'Get personalized advice, interview tips, and guided feedback to improve your professional presence. Click below to chat with our AI Career Coach and get instant answers to your career questions!',
      buttonText: 'Open AI Career Coach',
      isCustom: true,
      customContent: null, // Placeholder for chatbot/modal
      onClick: onCareerCoachingLearnMore,
    },
  ];

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false); // State to control animation
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // Set visibility to true when section is in view
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

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden border-t border-[#008080]">
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
          border-radius: 0.5rem;
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
        }

        .glassy-button:hover {
          background: rgba(0, 0, 0, 0.4);
          border-color: rgba(0, 251, 255, 0.4);
          box-shadow: 0 6px 25px rgba(0, 251, 255, 0.3);
          transform: translateY(-2px);
        }
      `}</style>
      <div className="container mx-auto px-4">
        <h2 className={`text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          Everything you need to accelerate your career
        </h2>
        <p className={`text-lg text-white text-center mb-12 max-w-3xl mx-auto ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          MITS CareerBoost combines cutting-edge AI with practical tools to help you navigate the job market with confidence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`glass-box flex flex-col justify-between items-center text-center p-6 rounded-xl shadow-2xl border border-gray-700 border-opacity-60
                        min-h-[420px] h-full w-full
                        transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-[0_0_40px_rgba(0,255,255,0.4)] hover:rotate-1 hover:border-[#00FFFF]
                        ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="mb-4 p-3 bg-gray-800 bg-opacity-60 rounded-lg w-fit shadow-inner border border-gray-700 border-opacity-50 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-[#00FFFF]">{feature.title}</h3>
              <p className="text-white mb-6 flex-grow">{feature.description}</p>
              {feature.isCustom && feature.customContent && (
                <div className="w-full flex flex-col items-center">{feature.customContent}</div>
              )}
              <div className="mt-auto w-full flex justify-center">
                <Button
                  variant="outline"
                  className="w-fit px-6 py-2
                           bg-gray-900 bg-opacity-30 backdrop-filter backdrop-blur-md text-white border border-[#00FFFF] border-opacity-60 rounded-md shadow-lg
                           hover:bg-[#00FFFF] hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] hover:border-[#00FFFF] transform hover:scale-105 transition-all duration-300 ease-in-out"
                  onClick={feature.onClick}
                >
                  {feature.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const EmailOutreachSection = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSend = () => {
    if (!file) {
      toast.error('Please upload your resume first.');
      return;
    }
    // Compose Gmail URL
    const recruiterEmail = 'raghuvanshiranapratapsingh@gmail.com';
    const subject = encodeURIComponent('Resume Submission from CareerBoost');
    const body = encodeURIComponent(
      `Dear Recruiter,%0D%0A%0D%0APlease find my resume attached for your consideration. I believe my skills and experience are a great fit for your requirements.%0D%0A%0D%0AThank you for your time!%0D%0A%0D%0ABest regards,%0D%0A[Your Name]%0D%0A%0D%0A(P.S. Please ensure your resume is attached before sending.)`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recruiterEmail}&su=${subject}&body=${body}`;
    toast.info('Gmail will open in a new tab. Please attach your resume before sending.');
    window.open(gmailUrl, '_blank');
  };

  return (
    <div className={`mt-20 flex flex-col items-center justify-center glass-box p-10 rounded-2xl shadow-2xl border border-[#00FFFF] border-opacity-60 max-w-2xl mx-auto`}>
      <div className="flex items-center mb-4">
        <Mail className="h-10 w-10 text-[#00FFFF] mr-3" />
        <h3 className="text-3xl font-bold text-[#00FFFF]">Email Outreach</h3>
      </div>
      <p className="text-lg text-white mb-6 text-center max-w-xl">
        Instantly send your resume to recruiters using your own Gmail account. Upload your resume and click send&mdash;Gmail will open with a personalized message. <span className="text-[#00FFFF] font-semibold">Remember to attach your resume before sending!</span>
      </p>
      <input
        type="file"
        accept=".pdf,.doc,.docx,.rtf,.txt"
        onChange={handleFileChange}
        className="mb-4 text-white"
      />
      <Button
        onClick={handleSend}
        disabled={!file}
        className="glassy-button text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg border border-[#00FFFF] border-opacity-60
          hover:bg-[#00FFFF] hover:text-black hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] hover:border-[#00FFFF] transform hover:scale-105 transition-all duration-300 ease-in-out"
      >
        <Mail className="inline-block mr-2 w-5 h-5 align-middle" />
        Send Resume to Recruiter
      </Button>
    </div>
  );
};

const IndustryTrendsSection = () => {
  const [showGraph, setShowGraph] = useState(false);
  // Mock data for industry trends
  const data = [
    { label: 'AI/ML', value: 85 },
    { label: 'Cloud', value: 75 },
    { label: 'Cybersecurity', value: 65 },
    { label: 'Web Dev', value: 90 },
    { label: 'Data Science', value: 80 },
    { label: 'Blockchain', value: 55 },
  ];

  return (
    <div className={`mt-20 flex flex-col items-center justify-center glass-box p-10 rounded-2xl shadow-2xl border border-[#00FFFF] border-opacity-60 max-w-2xl mx-auto`}>
      <div className="flex items-center mb-4">
        <BarChart2 className="h-10 w-10 text-[#00FFFF] mr-3" />
        <h3 className="text-3xl font-bold text-[#00FFFF]">Industry Trends & Insights</h3>
      </div>
      <p className="text-lg text-white mb-6 text-center max-w-xl">
        Track industry trends, discover in-demand skills, and get salary insights to make informed career decisions. Click below to view the latest industry statistics.
      </p>
      <Button
        onClick={() => setShowGraph(true)}
        disabled={showGraph}
        className="glassy-button text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg border border-[#00FFFF] border-opacity-60
          hover:bg-[#00FFFF] hover:text-black hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] hover:border-[#00FFFF] transform hover:scale-105 transition-all duration-300 ease-in-out"
      >
        <BarChart2 className="inline-block mr-2 w-5 h-5 align-middle" />
        Show Industry Statistics
      </Button>
      {showGraph && (
        <div className="w-full mt-8">
          {/* Use Chart component if available, else render inline bar chart */}
          <div className="flex flex-col gap-4">
            {data.map((item) => (
              <div key={item.label} className="flex items-center">
                <span className="w-32 text-white text-sm font-medium">{item.label}</span>
                <div className="flex-1 bg-gray-800 rounded h-5 mx-2">
                  <div
                    className="h-5 rounded bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] shadow"
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
                <span className="text-[#00FFFF] font-bold w-10 text-right">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const AICareerCoachingSection = ({ onOpenChatbot }) => {
  return (
    <div className={`mt-20 flex flex-col items-center justify-center glass-box p-10 rounded-2xl shadow-2xl border border-[#00FFFF] border-opacity-60 max-w-2xl mx-auto`}>
      <div className="flex items-center mb-4">
        <MessageSquare className="h-10 w-10 text-[#00FFFF] mr-3" />
        <h3 className="text-3xl font-bold text-[#00FFFF]">AI Career Coaching</h3>
      </div>
      <p className="text-lg text-white mb-6 text-center max-w-xl">
        Get personalized advice, interview tips, and guided feedback to improve your professional presence. Click below to chat with our AI Career Coach and get instant answers to your career questions!
      </p>
      <Button
        onClick={onOpenChatbot}
        className="glassy-button text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg border border-[#00FFFF] border-opacity-60
          hover:bg-[#00FFFF] hover:text-black hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] hover:border-[#00FFFF] transform hover:scale-105 transition-all duration-300 ease-in-out"
      >
        <MessageSquare className="inline-block mr-2 w-5 h-5 align-middle" />
        Open AI Career Coach
      </Button>
    </div>
  );
};

const ApplicationTrackerSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [applications, setApplications] = useState([
    { id: 1, company: 'Google', position: 'Frontend Engineer', status: 'Interview Scheduled' },
    { id: 2, company: 'Amazon', position: 'SDE 1', status: 'Applied' },
    { id: 3, company: 'Microsoft', position: 'UI/UX Designer', status: 'Offer Received' },
  ]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ company: '', position: '', status: '' });
  const [search, setSearch] = useState('');

  const openAdd = () => {
    setEditing(null);
    setForm({ company: '', position: '', status: '' });
    setModalOpen(true);
  };
  const openEdit = (app) => {
    setEditing(app.id);
    setForm({ company: app.company, position: app.position, status: app.status });
    setModalOpen(true);
  };
  const handleDelete = (id) => setApplications(applications.filter(a => a.id !== id));
  const handleSave = () => {
    if (!form.company || !form.position || !form.status) return;
    if (editing) {
      setApplications(applications.map(a => a.id === editing ? { ...a, ...form } : a));
    } else {
      setApplications([...applications, { id: Date.now(), ...form }]);
    }
    setModalOpen(false);
  };

  // Filtering logic
  const filteredApps = applications.filter(app =>
    app.company.toLowerCase().includes(search.toLowerCase()) ||
    app.position.toLowerCase().includes(search.toLowerCase()) ||
    app.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`mt-20 flex flex-col items-center justify-center glass-box p-10 rounded-2xl shadow-2xl border border-[#00FFFF] border-opacity-60 max-w-3xl mx-auto`}>
      <div className="flex items-center mb-4">
        <ClipboardList className="h-10 w-10 text-[#00FFFF] mr-3" />
        <h3 className="text-3xl font-bold text-[#00FFFF]">Application Tracker</h3>
      </div>
      <p className="text-lg text-white mb-6 text-center max-w-xl">
        Track all your job applications, interviews, and follow-ups in one personalized dashboard. Stay organized and never miss an opportunity!
      </p>
      <Button
        onClick={() => setModalOpen(true)}
        className="glassy-button text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg border border-[#00FFFF] border-opacity-60
          hover:bg-[#00FFFF] hover:text-black hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] hover:border-[#00FFFF] transform hover:scale-105 transition-all duration-300 ease-in-out"
      >
        <ClipboardList className="inline-block mr-2 w-5 h-5 align-middle" />
        Open Application Dashboard
      </Button>
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="glass-box p-8 rounded-xl max-w-2xl w-full relative">
            <button className="absolute top-4 right-4 text-white text-2xl" onClick={() => setModalOpen(false)}>&times;</button>
            <h4 className="text-2xl font-bold mb-4 text-[#00FFFF]">Job Applications</h4>
            {/* Search/filter input */}
            <input
              type="text"
              placeholder="Search by company, position, or status..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="mb-4 w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:border-[#00FFFF] focus:ring-2 focus:ring-[#00FFFF]"
            />
            <table className="w-full mb-4 text-white">
              <thead>
                <tr className="border-b border-[#00FFFF]">
                  <th className="py-2 text-left">Company</th>
                  <th className="py-2 text-left">Position</th>
                  <th className="py-2 text-left">Status</th>
                  <th className="py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.map(app => (
                  <tr key={app.id} className="border-b border-gray-700">
                    <td className="py-2">{app.company}</td>
                    <td className="py-2">{app.position}</td>
                    <td className="py-2">{app.status}</td>
                    <td className="py-2 flex gap-2">
                      <button onClick={() => openEdit(app)} className="text-[#00FFFF] hover:text-white"><Edit size={18} /></button>
                      <button onClick={() => handleDelete(app.id)} className="text-red-400 hover:text-white"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
                {filteredApps.length === 0 && (
                  <tr><td colSpan={4} className="py-4 text-center text-gray-400">No applications found.</td></tr>
                )}
              </tbody>
            </table>
            <button
              onClick={openAdd}
              className="mb-4 flex items-center px-4 py-2 bg-[#00FFFF] text-black rounded hover:bg-[#00CCCC] transition"
            >
              <Plus className="mr-2 w-4 h-4" /> Add Application
            </button>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Company"
                value={form.company}
                onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                className="flex-1 px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:border-[#00FFFF] focus:ring-2 focus:ring-[#00FFFF]"
              />
              <input
                type="text"
                placeholder="Position"
                value={form.position}
                onChange={e => setForm(f => ({ ...f, position: e.target.value }))}
                className="flex-1 px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:border-[#00FFFF] focus:ring-2 focus:ring-[#00FFFF]"
              />
              <input
                type="text"
                placeholder="Status"
                value={form.status}
                onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                className="flex-1 px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:border-[#00FFFF] focus:ring-2 focus:ring-[#00FFFF]"
              />
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#00FFFF] text-black rounded hover:bg-[#00CCCC] transition font-semibold"
              >
                {editing ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SkillGapAnalysisSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [userSkills, setUserSkills] = useState('');
  const [company, setCompany] = useState('Google');
  const [missingSkills, setMissingSkills] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Mock company required skills
  const companySkills: Record<string, string[]> = {
    Google: ['React', 'TypeScript', 'GraphQL', 'Automated Testing', 'CI/CD', 'Cloud Deployment'],
    Amazon: ['Java', 'AWS', 'Microservices', 'CI/CD', 'System Design'],
    Microsoft: ['C#', '.NET', 'Azure', 'Unit Testing', 'DevOps'],
    Facebook: ['React', 'Hack', 'GraphQL', 'Automated Testing', 'Distributed Systems'],
  };
  const recommendedCourses = [
    { name: 'GraphQL Fundamentals', provider: 'Coursera', link: '#' },
    { name: 'Automated Testing with Jest', provider: 'Udemy', link: '#' },
    { name: 'CI/CD Pipelines', provider: 'Pluralsight', link: '#' },
    { name: 'Cloud Deployment Basics', provider: 'edX', link: '#' },
    { name: 'AWS for Developers', provider: 'Coursera', link: '#' },
    { name: 'System Design Primer', provider: 'Udemy', link: '#' },
    { name: 'Azure Fundamentals', provider: 'edX', link: '#' },
    { name: 'DevOps Essentials', provider: 'Pluralsight', link: '#' },
    { name: 'Distributed Systems', provider: 'Coursera', link: '#' },
  ];

  const handleAnalyze = () => {
    const userSkillArr = userSkills.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    const required = (companySkills[company] || []).map(s => s.toLowerCase());
    const missing = required.filter(skill => !userSkillArr.includes(skill));
    setMissingSkills(missing);
    setShowResults(true);
    setModalOpen(true);
  };

  return (
    <div className={`mt-20 flex flex-col items-center justify-center glass-box p-10 rounded-2xl shadow-2xl border border-[#00FFFF] border-opacity-60 max-w-3xl mx-auto`}>
      <div className="flex items-center mb-4">
        <Clock className="h-10 w-10 text-[#00FFFF] mr-3" />
        <h3 className="text-3xl font-bold text-[#00FFFF]">Skill Gap Analysis</h3>
      </div>
      <p className="text-lg text-white mb-6 text-center max-w-xl">
        Identify missing skills and get recommendations for courses to become more competitive. Enter your current skills and the company you're interested in, then click below to see your personalized skill gap analysis!
      </p>
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl mb-4">
        <input
          type="text"
          placeholder="Your current skills (comma separated)"
          value={userSkills}
          onChange={e => setUserSkills(e.target.value)}
          className="flex-1 px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:border-[#00FFFF] focus:ring-2 focus:ring-[#00FFFF]"
        />
        <select
          value={company}
          onChange={e => setCompany(e.target.value)}
          className="px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:border-[#00FFFF] focus:ring-2 focus:ring-[#00FFFF]"
        >
          {Object.keys(companySkills).map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <Button
        onClick={handleAnalyze}
        className="glassy-button text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg border border-[#00FFFF] border-opacity-60
          hover:bg-[#00FFFF] hover:text-black hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] hover:border-[#00FFFF] transform hover:scale-105 transition-all duration-300 ease-in-out"
      >
        <Clock className="inline-block mr-2 w-5 h-5 align-middle" />
        Show Skill Gap Analysis
      </Button>
      {modalOpen && showResults && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="glass-box p-8 rounded-xl max-w-2xl w-full relative">
            <button className="absolute top-4 right-4 text-white text-2xl" onClick={() => setModalOpen(false)}>&times;</button>
            <h4 className="text-2xl font-bold mb-4 text-[#00FFFF]">Skill Gap Analysis for {company}</h4>
            <div className="mb-6">
              <h5 className="text-lg font-semibold text-[#00CCCC] mb-2">Missing Skills</h5>
              {missingSkills.length > 0 ? (
                <ul className="list-disc list-inside text-white">
                  {missingSkills.map(skill => (
                    <li key={skill}>{skill.charAt(0).toUpperCase() + skill.slice(1)}</li>
                  ))}
                </ul>
              ) : (
                <div className="text-green-400">No skill gaps! You match all required skills for {company}.</div>
              )}
            </div>
            <div>
              <h5 className="text-lg font-semibold text-[#00CCCC] mb-2">Recommended Courses</h5>
              <ul className="list-disc list-inside text-white">
                {recommendedCourses
                  .filter(course => missingSkills.some(skill => course.name.toLowerCase().includes(skill)))
                  .map(course => (
                    <li key={course.name}>
                      <a href={course.link} target="_blank" rel="noopener noreferrer" className="text-[#00FFFF] hover:underline">{course.name}</a> <span className="text-gray-400">({course.provider})</span>
                    </li>
                  ))}
                {missingSkills.length === 0 && (
                  <li className="text-green-400">No additional courses needed.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Features;
