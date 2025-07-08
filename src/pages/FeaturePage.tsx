import React, { useState } from 'react';
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-900 px-2 sm:px-4 md:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">Job Trend Analysis</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Explore real-time insights into job market trends, in-demand skills, and emerging opportunities.</p>
        <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-4 flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="flex-1 flex items-center gap-2">
            <Search className="text-gray-400" />
            <input className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400" placeholder="Search job roles, skills, or industries" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2 border-gray-300 dark:border-gray-700">
              Software...
            </Button>
            <Button variant="outline" className="flex items-center gap-2 border-gray-300 dark:border-gray-700">
              <Filter className="w-4 h-4" /> Filters
            </Button>
          </div>
        </div>
        <div className="flex gap-2 mb-6">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${activeTab === tab ? 'bg-cyan-500 text-white shadow' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-cyan-100 dark:hover:bg-cyan-900'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Chart Area */}
          <div className="lg:col-span-2 bg-white/80 dark:bg-gray-900/80 rounded-xl p-6 shadow-lg flex flex-col">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Job Posting Trends (Last 6 Months)</h2>
            {/* Simple Line Chart Mockup */}
            <div className="h-64 flex items-end">
              <svg viewBox="0 0 400 200" className="w-full h-full">
                {/* Axes */}
                <line x1="40" y1="10" x2="40" y2="180" stroke="#888" strokeWidth="2" />
                <line x1="40" y1="180" x2="380" y2="180" stroke="#888" strokeWidth="2" />
                {/* Software Engineer Line */}
                <polyline fill="none" stroke="#06b6d4" strokeWidth="3" points="40,80 100,70 160,100 220,60 280,40 340,60" />
                {/* Data Scientist Line */}
                <polyline fill="none" stroke="#818cf8" strokeWidth="3" points="40,120 100,110 160,130 220,100 280,80 340,100" />
                {/* Product Manager Line */}
                <polyline fill="none" stroke="#fbbf24" strokeWidth="3" points="40,160 100,150 160,170 220,140 280,120 340,140" />
                {/* Labels */}
                <text x="40" y="195" fontSize="12" fill="#888">Jan</text>
                <text x="100" y="195" fontSize="12" fill="#888">Feb</text>
                <text x="160" y="195" fontSize="12" fill="#888">Mar</text>
                <text x="220" y="195" fontSize="12" fill="#888">Apr</text>
                <text x="280" y="195" fontSize="12" fill="#888">May</text>
                <text x="340" y="195" fontSize="12" fill="#888">Jun</text>
              </svg>
            </div>
            <div className="flex gap-4 mt-4 text-sm">
              <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-cyan-400"></span> Software Engineer</span>
              <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-indigo-400"></span> Data Scientist</span>
              <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-yellow-400"></span> Product Manager</span>
            </div>
          </div>
          {/* Key Insights */}
          <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl p-6 shadow-lg flex flex-col gap-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Key Insights</h2>
            {keyInsights.map((insight, i) => (
              <div key={i} className="mb-2">
                <div className="font-semibold text-gray-800 dark:text-cyan-400">{insight.title}</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">{insight.text}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Recommended Jobs */}
        <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl p-6 shadow-lg mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recommended Jobs Based on Trends</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedJobs.map((job, i) => (
              <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col">
                <div className="font-semibold text-gray-900 dark:text-white mb-1">{job.title}</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">{job.company}</div>
                <div className="text-gray-500 dark:text-gray-400 text-xs mb-2">{job.location} &bull; {job.salary}</div>
                <div className="text-gray-700 dark:text-gray-300 text-sm mb-2 flex-1">{job.description}</div>
                <div className="flex gap-2 mb-2">
                  {job.skills.map(skill => (
                    <span key={skill} className="bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300 px-2 py-1 rounded text-xs font-medium">{skill}</span>
                  ))}
                </div>
                <Button className="w-full mt-auto">View Job</Button>
              </div>
            ))}
          </div>
        </div>
        {/* Actions */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button variant="outline" className="flex items-center gap-2 border-gray-300 dark:border-gray-700">
            <Download className="w-4 h-4" /> Download Report
          </Button>
          <Button variant="outline" className="flex items-center gap-2 border-gray-300 dark:border-gray-700">
            <Share2 className="w-4 h-4" /> Share
          </Button>
          <Button className="flex items-center gap-2 bg-cyan-500 text-white">
            <Bell className="w-4 h-4" /> Set Job Alerts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturePage; 