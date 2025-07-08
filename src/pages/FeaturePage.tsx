import React, { useState, useEffect, useRef } from 'react';
import { BarChart2, Filter, Search, Download, Share2, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const jobTrendsData = [
  { month: 'Jan', SoftwareEngineer: 1200, DataScientist: 900, ProductManager: 600 },
  { month: 'Feb', SoftwareEngineer: 1300, DataScientist: 950, ProductManager: 650 },
  { month: 'Mar', SoftwareEngineer: 1100, DataScientist: 1000, ProductManager: 700 },
  { month: 'Apr', SoftwareEngineer: 1400, DataScientist: 1100, ProductManager: 800 },
  { month: 'May', SoftwareEngineer: 1500, DataScientist: 1200, ProductManager: 850 },
  { month: 'Jun', SoftwareEngineer: 1350, DataScientist: 1150, ProductManager: 800 },
];

const keyInsights = [
  { title: 'Software Engineer', text: 'Demand increased by 25% in the past 6 months, with a particular focus on full stack developers.' },
  { title: 'Data Scientist', text: 'Job postings have risen steadily, with 41% growth year over year.' },
  { title: 'Emerging Roles', text: 'AI Engineering and Cloud Security have seen the fastest growth in the past quarter.' },
  { title: 'Industry Shifts', text: 'Healthcare tech and fintech sectors are posting the most new positions.' },
];

const recommendedJobs = [
  { title: 'Senior Software Engineer', company: 'TechCorp Inc.', location: 'San Francisco, CA', salary: '$130K - $160K', description: 'Looking for a skilled software engineer with expertise in distributed systems and cloud architecture...', skills: ['React', 'AWS', 'Node.js'] },
  { title: 'Senior Software Engineer', company: 'TechCorp Inc.', location: 'San Francisco, CA', salary: '$130K - $160K', description: 'Looking for a skilled software engineer with expertise in distributed systems and cloud architecture...', skills: ['React', 'AWS', 'Node.js'] },
  { title: 'Senior Software Engineer', company: 'TechCorp Inc.', location: 'San Francisco, CA', salary: '$130K - $160K', description: 'Looking for a skilled software engineer with expertise in distributed systems and cloud architecture...', skills: ['React', 'AWS', 'Node.js'] },
];

const tabs = ['Job Trends', 'Skills', 'Salary Data', 'Locations'];

const FeaturePage = () => {
  const [activeTab, setActiveTab] = useState('Job Trends');
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false); // State to control animation

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
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-2 sm:px-4 md:px-8 py-8 overflow-hidden">
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
          border-radius: 0.75rem; /* Rounded-xl */
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
          color: white; /* Changed text color to white on hover */
          transform: translateY(-2px);
        }

        /* Input field focus glow */
        .input-glow:focus {
            outline: none;
            border-color: #00FBFF; /* Cyan border on focus */
            box-shadow: 0 0 0 3px rgba(0, 251, 255, 0.5); /* Cyan glow effect on focus */
        }

        /* Tab Button Styles */
        .tab-button {
          transition: all 0.3s ease-in-out;
          border-radius: 0.5rem;
          font-weight: 500;
        }
        .tab-button.active {
          background: linear-gradient(to right, #00FFFF, #00CCCC);
          color: black; /* Text color for active tab */
          box-shadow: 0 4px 15px rgba(0, 251, 255, 0.3);
        }
        .tab-button:not(.active) {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #E2E8F0;
        }
        .tab-button:not(.active):hover {
          background: rgba(0, 0, 0, 0.4);
          border-color: rgba(0, 251, 255, 0.4);
          box-shadow: 0 6px 25px rgba(0, 251, 255, 0.3);
          transform: translateY(-2px);
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        <h1 className={`text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          Job Trend Analysis
        </h1>
        <p className={`text-gray-300 mb-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
          Explore real-time insights into job market trends, in-demand skills, and emerging opportunities.
        </p>

        {/* Search and Filter Bar */}
        <div className={`glass-box rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-4 mb-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <div className="flex-1 flex items-center gap-2">
            <Search className="text-gray-400" />
            <input className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 input-glow" placeholder="Search job roles, skills, or industries" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="glassy-button flex items-center gap-2">
              Software...
            </Button>
            <Button variant="outline" className="glassy-button flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filters
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className={`flex gap-2 mb-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
          {tabs.map(tab => (
            <button
              key={tab}
              className={`px-4 py-2 tab-button ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Chart Area */}
          <div className={`lg:col-span-2 glass-box rounded-xl p-6 flex flex-col ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <h2 className="text-lg font-semibold mb-4 text-white">Job Posting Trends (Last 6 Months)</h2>
            {/* Simple Line Chart Mockup */}
            <div className="h-64 flex items-end">
              <svg viewBox="0 0 400 200" className="w-full h-full">
                {/* Axes */}
                <line x1="40" y1="10" x2="40" y2="180" stroke="#4B5563" strokeWidth="2" /> {/* Darker gray for axes */}
                <line x1="40" y1="180" x2="380" y2="180" stroke="#4B5563" strokeWidth="2" />
                {/* Software Engineer Line (Cyan) */}
                <polyline fill="none" stroke="#00FFFF" strokeWidth="3" points="40,80 100,70 160,100 220,60 280,40 340,60" />
                {/* Data Scientist Line (Indigo/Purple) */}
                <polyline fill="none" stroke="#8A2BE2" strokeWidth="3" points="40,120 100,110 160,130 220,100 280,80 340,100" />
                {/* Product Manager Line (Yellow/Orange) */}
                <polyline fill="none" stroke="#FFA500" strokeWidth="3" points="40,160 100,150 160,170 220,140 280,120 340,140" />
                {/* Labels */}
                <text x="40" y="195" fontSize="12" fill="#9CA3AF">Jan</text>
                <text x="100" y="195" fontSize="12" fill="#9CA3AF">Feb</text>
                <text x="160" y="195" fontSize="12" fill="#9CA3AF">Mar</text>
                <text x="220" y="195" fontSize="12" fill="#9CA3AF">Apr</text>
                <text x="280" y="195" fontSize="12" fill="#9CA3AF">May</text>
                <text x="340" y="195" fontSize="12" fill="#9CA3AF">Jun</text>
              </svg>
            </div>
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-300">
              <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-[#00FFFF]"></span> Software Engineer</span>
              <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-[#8A2BE2]"></span> Data Scientist</span>
              <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-[#FFA500]"></span> Product Manager</span>
            </div>
          </div>

          {/* Key Insights */}
          <div className={`glass-box rounded-xl p-6 flex flex-col gap-4 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
            <h2 className="text-lg font-semibold mb-4 text-white">Key Insights</h2>
            {keyInsights.map((insight, i) => (
              <div key={i} className="mb-2">
                <div className="font-semibold text-cyan-400">{insight.title}</div>
                <div className="text-gray-300 text-sm">{insight.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Jobs */}
        <div className={`glass-box rounded-xl p-6 mb-8 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          <h2 className="text-lg font-semibold mb-4 text-white">Recommended Jobs Based on Trends</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedJobs.map((job, i) => (
              <div key={i} className="glass-box p-4 flex flex-col"> {/* Nested glass-box for job cards */}
                <div className="font-semibold text-white mb-1">{job.title}</div>
                <div className="text-gray-400 text-sm mb-1">{job.company}</div>
                <div className="text-gray-400 text-xs mb-2">{job.location} &bull; {job.salary}</div>
                <div className="text-gray-300 text-sm mb-2 flex-1">{job.description}</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {job.skills.map(skill => (
                    <span key={skill} className="bg-cyan-900 bg-opacity-40 text-cyan-300 px-2 py-1 rounded text-xs font-medium border border-cyan-700">{skill}</span>
                  ))}
                </div>
                <Button className="w-full mt-auto glassy-button">View Job</Button>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className={`flex flex-wrap gap-2 mb-4 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.7s' }}>
          <Button variant="outline" className="glassy-button flex items-center gap-2">
            <Download className="w-4 h-4" /> Download Report
          </Button>
          <Button variant="outline" className="glassy-button flex items-center gap-2">
            <Share2 className="w-4 h-4" /> Share
          </Button>
          <Button className="glassy-button flex items-center gap-2">
            <Bell className="w-4 h-4" /> Set Job Alerts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturePage;
