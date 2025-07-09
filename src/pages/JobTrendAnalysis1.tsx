import React, { useState, useEffect, useRef } from 'react';
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Import CardDescription
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, BarChart, PieChart, AreaChart } from 'recharts';
import { Line, Bar, Pie, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Search, TrendingUp, Filter, Download, Share2, Bookmark } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data for charts
const jobTrendData = [
  { month: 'Jan', 'Software Engineer': 1200, 'Data Scientist': 850, 'Product Manager': 640 },
  { month: 'Feb', 'Software Engineer': 1300, 'Data Scientist': 900, 'Product Manager': 700 },
  { month: 'Mar', 'Software Engineer': 1150, 'Data Scientist': 950, 'Product Manager': 650 },
  { month: 'Apr', 'Software Engineer': 1400, 'Data Scientist': 1000, 'Product Manager': 680 },
  { month: 'May', 'Software Engineer': 1500, 'Data Scientist': 1200, 'Product Manager': 700 },
  { month: 'Jun', 'Software Engineer': 1350, 'Data Scientist': 1100, 'Product Manager': 740 },
];

const skillTrendData = [
  { name: 'React', value: 85 },
  { name: 'Python', value: 70 },
  { name: 'AWS', value: 65 },
  { name: 'Machine Learning', value: 55 },
  { name: 'Docker', value: 45 },
];

const salaryData = [
  { role: 'Junior Developer', salary: 70000 },
  { role: 'Mid-level Developer', salary: 95000 },
  { role: 'Senior Developer', salary: 130000 },
  { role: 'Tech Lead', salary: 155000 },
  { role: 'Engineering Manager', salary: 185000 },
];

const locationData = [
  { name: 'San Francisco', value: 25 },
  { name: 'New York', value: 20 },
  { name: 'Seattle', value: 18 },
  { name: 'Austin', value: 14 },
  { name: 'Boston', value: 12 },
  { name: 'Other', value: 11 },
];

const COLORS = ['#00FFFF', '#00CCCC', '#009999', '#006666', '#003333', '#333333']; // Cyan shades for charts

const JobTrendAnalysis = () => {
  const [activeTab, setActiveTab] = useState("trends");
  const [searchQuery, setSearchQuery] = useState("");
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
          color: #FFFFFF; /* Changed from #D1D5DB to white */
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

        /* Chart Tooltip Customization */
        .recharts-tooltip-wrapper .recharts-tooltip-item {
          color: #333 !important; /* Ensure text is dark inside tooltip */
        }
        .recharts-tooltip-wrapper .recharts-tooltip-label {
          color: #333 !important; /* Ensure label is dark inside tooltip */
        }
      `}</style>

      <Navbar />

      <main className="flex-grow py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className={`text-4xl font-bold mb-2 gradient-text ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>Job Trend Analysis</h1>
          <p className={`text-lg text-white mb-8 max-w-2xl ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            Explore real-time insights into job market trends, in-demand skills, and emerging opportunities.
          </p>

          <div className={`glass-box p-4 mb-8 flex flex-col md:flex-row gap-4 items-center ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <div className="relative flex-grow w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
              <Input
                type="text"
                placeholder="Search job roles, skills, or industries"
                className="pl-10 w-full bg-gray-900 border border-gray-700 text-white focus:border-[#00FFFF] focus:ring-2 focus:ring-[#00FFFF] input-glow"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-shrink-0 w-full md:w-auto justify-center">
              <Select defaultValue="software">
                <SelectTrigger className="w-full md:w-[180px] glassy-button"> {/* Applied glassy-button */}
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white border border-gray-700"> {/* Themed select content */}
                  <SelectGroup>
                    <SelectLabel className="text-white">Industries</SelectLabel>
                    <SelectItem value="software" className="hover:bg-gray-700 focus:bg-gray-700">Software Development</SelectItem>
                    <SelectItem value="data" className="hover:bg-gray-700 focus:bg-gray-700">Data Science</SelectItem>
                    <SelectItem value="design" className="hover:bg-gray-700 focus:bg-gray-700">UI/UX Design</SelectItem>
                    <SelectItem value="marketing" className="hover:bg-gray-700 focus:bg-gray-700">Digital Marketing</SelectItem>
                    <SelectItem value="finance" className="hover:bg-gray-700 focus:bg-gray-700">Finance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Button variant="outline" className="glassy-button flex items-center"> {/* Applied glassy-button */}
                <Filter className="mr-2 h-4 w-4" />
                <span>Filters</span>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="trends" onValueChange={setActiveTab}>
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-4 mb-6 tabs-list-custom"> {/* Custom tabs list */}
              <TabsTrigger value="trends" className="tabs-trigger-custom">Job Trends</TabsTrigger>
              <TabsTrigger value="skills" className="tabs-trigger-custom">Skills</TabsTrigger>
              <TabsTrigger value="salary" className="tabs-trigger-custom">Salary Data</TabsTrigger>
              <TabsTrigger value="location" className="tabs-trigger-custom">Locations</TabsTrigger>
            </TabsList>

            <TabsContent value="trends">
              <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
                <Card className="glass-box lg:col-span-2"> {/* Applied glass-box */}
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-[#00FFFF]">
                      <TrendingUp className="mr-2 h-5 w-5" />
                      <span>Job Posting Trends (Last 6 Months)</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={jobTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" /> {/* Lighter grid */}
                          <XAxis dataKey="month" tick={{ fill: '#FFFFFF' }} /> {/* Changed to white */}
                          <YAxis tick={{ fill: '#FFFFFF' }} /> {/* Changed to white */}
                          <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.7)', borderColor: '#00FFFF', borderRadius: '0.5rem', boxShadow: '0 4px 15px rgba(0, 251, 255, 0.2)', color: 'white' }} />
                          <Legend wrapperStyle={{ color: 'white' }} /> {/* Legend text color */}
                          <Line type="monotone" dataKey="Software Engineer" stroke={COLORS[0]} strokeWidth={2} activeDot={{ r: 8 }} />
                          <Line type="monotone" dataKey="Data Scientist" stroke={COLORS[1]} strokeWidth={2} activeDot={{ r: 8 }} />
                          <Line type="monotone" dataKey="Product Manager" stroke={COLORS[2]} strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-box"> {/* Applied glass-box */}
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[#00FFFF]">Key Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-cyan-900 bg-opacity-20 rounded-lg border border-cyan-700"> {/* Themed insight box */}
                        <h3 className="text-sm font-semibold mb-1 text-[#00FFFF]">Software Engineer</h3>
                        <p className="text-sm text-white">Demand increased by 25% in the past 6 months, with a particular focus on full-stack developers.</p>
                      </div>
                      <div className="p-3 bg-cyan-900 bg-opacity-20 rounded-lg border border-cyan-700">
                        <h3 className="text-sm font-semibold mb-1 text-[#00FFFF]">Data Scientist</h3>
                        <p className="text-sm text-white">Job postings have risen steadily, with 41% growth year-over-year.</p>
                      </div>
                      <div className="p-3 bg-cyan-900 bg-opacity-20 rounded-lg border border-cyan-700">
                        <h3 className="text-sm font-semibold mb-1 text-[#00FFFF]">Emerging Roles</h3>
                        <p className="text-sm text-white">AI Engineering and Cloud Security have seen the fastest growth in the past quarter.</p>
                      </div>
                      <div className="p-3 bg-cyan-900 bg-opacity-20 rounded-lg border border-cyan-700">
                        <h3 className="text-sm font-semibold mb-1 text-[#00FFFF]">Industry Shifts</h3>
                        <p className="text-sm text-white">Healthcare tech and fintech sectors are posting the most new positions.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className={`glass-box mb-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#00FFFF]">Recommended Jobs Based on Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((job) => (
                      <div key={job} className="glass-box p-4 hover:scale-105"> {/* Applied glass-box and hover effect */}
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-[#00FFFF]">Senior Software Engineer</h3>
                            <p className="text-sm text-white">TechCorp Inc.</p>
                          </div>
                          <Button variant="ghost" size="icon" className="text-white hover:text-[#00FFFF] hover:bg-transparent">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center text-sm text-white mb-3">
                          <span className="mr-3">San Francisco, CA</span>
                          <span>$130K - $160K</span>
                        </div>
                        <p className="text-sm text-white mb-3">
                          Looking for a skilled software engineer with expertise in distributed systems and cloud architecture...
                        </p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          <span className="px-2 py-0.5 bg-cyan-900 bg-opacity-30 text-cyan-200 text-xs rounded-full border border-cyan-700">React</span>
                          <span className="px-2 py-0.5 bg-cyan-900 bg-opacity-30 text-cyan-200 text-xs rounded-full border border-cyan-700">AWS</span>
                          <span className="px-2 py-0.5 bg-cyan-900 bg-opacity-30 text-cyan-200 text-xs rounded-full border border-cyan-700">Node.js</span>
                        </div>
                        <Button className="glassy-button w-full mt-2">View Job</Button> {/* Applied glassy-button */}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills">
              <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
                <Card className="glass-box"> {/* Applied glass-box */}
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[#00FFFF]">Top In-Demand Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={skillTrendData}
                          margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                          <XAxis type="number" tick={{ fill: '#FFFFFF' }} /> {/* Changed to white */}
                          <YAxis dataKey="name" type="category" tick={{ fill: '#FFFFFF' }} /> {/* Changed to white */}
                          <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.7)', borderColor: '#00FFFF', borderRadius: '0.5rem', boxShadow: '0 4px 15px rgba(0, 251, 255, 0.2)', color: 'white' }} />
                          <Bar dataKey="value" fill={COLORS[0]} /> {/* Cyan bar */}
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-box lg:col-span-2"> {/* Applied glass-box */}
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[#00FFFF]">Skills Gap Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-white mb-4">
                        Based on current market trends and your profile, here are the key skills you should consider developing:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-cyan-900 bg-opacity-20 rounded-lg border border-cyan-700"> {/* Themed skill box */}
                          <h3 className="font-semibold mb-2 text-[#00FFFF]">Technical Skills</h3>
                          <ul className="space-y-2">
                            <li className="flex justify-between items-center">
                              <span className="text-sm text-white">Cloud Architecture (AWS)</span>
                              <span className="text-xs px-2 py-1 bg-red-900 bg-opacity-30 text-red-400 rounded-full border border-red-700">High Priority</span> {/* Themed priority tag */}
                            </li>
                            <li className="flex justify-between items-center">
                              <span className="text-sm text-white">Containerization (Docker)</span>
                              <span className="text-xs px-2 py-1 bg-amber-900 bg-opacity-30 text-amber-400 rounded-full border border-amber-700">Medium Priority</span>
                            </li>
                            <li className="flex justify-between items-center">
                              <span className="text-sm text-white">TypeScript</span>
                              <span className="text-xs px-2 py-1 bg-amber-900 bg-opacity-30 text-amber-400 rounded-full border border-amber-700">Medium Priority</span>
                            </li>
                            <li className="flex justify-between items-center">
                              <span className="text-sm text-white">GraphQL</span>
                              <span className="text-xs px-2 py-1 bg-green-900 bg-opacity-30 text-green-400 rounded-full border border-green-700">Low Priority</span>
                            </li>
                          </ul>
                        </div>

                        <div className="p-4 bg-cyan-900 bg-opacity-20 rounded-lg border border-cyan-700"> {/* Themed skill box */}
                          <h3 className="font-semibold mb-2 text-[#00FFFF]">Soft Skills</h3>
                          <ul className="space-y-2">
                            <li className="flex justify-between items-center">
                              <span className="text-sm text-white">Agile Project Management</span>
                              <span className="text-xs px-2 py-1 bg-red-900 bg-opacity-30 text-red-400 rounded-full border border-red-700">High Priority</span>
                            </li>
                            <li className="flex justify-between items-center">
                              <span className="text-sm text-white">Cross-functional Collaboration</span>
                              <span className="text-xs px-2 py-1 bg-amber-900 bg-opacity-30 text-amber-400 rounded-full border border-amber-700">Medium Priority</span>
                            </li>
                            <li className="flex justify-between items-center">
                              <span className="text-sm text-white">Technical Writing</span>
                              <span className="text-xs px-2 py-1 bg-green-900 bg-opacity-30 text-green-400 rounded-full border border-green-700">Low Priority</span>
                            </li>
                            <li className="flex justify-between items-center">
                              <span className="text-sm text-white">Presentation Skills</span>
                              <span className="text-xs px-2 py-1 bg-green-900 bg-opacity-30 text-green-400 rounded-full border border-green-700">Low Priority</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex justify-center mt-4">
                        <Button className="glassy-button"> {/* Applied glassy-button */}
                          <span>Generate Personalized Learning Path</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="salary">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
                <Card className="glass-box"> {/* Applied glass-box */}
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[#00FFFF]">Salary Trends by Role</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={salaryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDashArray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                          <XAxis dataKey="role" tick={{ fill: '#FFFFFF' }} /> {/* Changed to white */}
                          <YAxis tick={{ fill: '#FFFFFF' }} /> {/* Changed to white */}
                          <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Salary']} contentStyle={{ backgroundColor: 'rgba(0,0,0,0.7)', borderColor: '#00FFFF', borderRadius: '0.5rem', boxShadow: '0 4px 15px rgba(0, 251, 255, 0.2)', color: 'white' }} />
                          <Bar dataKey="salary" fill={COLORS[0]} /> {/* Cyan bar */}
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-box"> {/* Applied glass-box */}
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[#00FFFF]">Salary Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-white mb-4">
                        Based on market data across the software engineering field:
                      </p>

                      <div className="p-4 bg-cyan-900 bg-opacity-20 rounded-lg border border-cyan-700 mb-4"> {/* Themed insight box */}
                        <h3 className="font-semibold mb-2 text-[#00FFFF]">Factors Affecting Salary</h3>
                        <ul className="space-y-2 text-sm text-white">
                          <li className="flex items-start">
                            <span className="font-medium mr-2 text-[#00CCCC]">•</span>
                            <span>Experience level (4-7 years typically sees the largest percentage jumps)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-medium mr-2 text-[#00CCCC]">•</span>
                            <span>Technical expertise in high-demand areas (AI/ML, Cloud Security)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-medium mr-2 text-[#00CCCC]">•</span>
                            <span>Industry (fintech and healthcare leading in compensation)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-medium mr-2 text-[#00CCCC]">•</span>
                            <span>Company size and funding stage</span>
                          </li>
                        </ul>
                      </div>

                      <div className="p-4 bg-cyan-900 bg-opacity-20 rounded-lg border border-cyan-700"> {/* Themed insight box */}
                        <h3 className="font-semibold mb-2 text-[#00FFFF]">Salary Negotiation Tips</h3>
                        <ul className="space-y-2 text-sm text-white">
                          <li className="flex items-start">
                            <span className="font-medium mr-2 text-[#00CCCC]">•</span>
                            <span>Research salary ranges for your role, experience, and location</span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-medium mr-2 text-[#00CCCC]">•</span>
                            <span>Highlight specific accomplishments and their business impact</span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-medium mr-2 text-[#00CCCC]">•</span>
                            <span>Consider total compensation (equity, benefits, bonuses)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-medium mr-2 text-[#00CCCC]">•</span>
                            <span>Practice your negotiation pitch and anticipate objections</span>
                          </li>
                        </ul>
                      </div>

                      <div className="flex justify-center mt-4">
                        <Button className="glassy-button"> {/* Applied glassy-button */}
                          <span>Get Personalized Salary Report</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="location">
              <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
                <Card className="glass-box"> {/* Applied glass-box */}
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[#00FFFF]">Job Distribution by Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={locationData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {locationData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> 
                            ))}
                          </Pie>
                          <Tooltip formatter={(value, name) => [`${value}%`, name]} contentStyle={{ backgroundColor: 'rgba(0,0,0,0.7)', borderColor: '#00FFFF', borderRadius: '0.5rem', boxShadow: '0 4px 15px rgba(0, 251, 255, 0.2)', color: 'white' }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-box lg:col-span-2"> {/* Applied glass-box */}
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[#00FFFF]">Remote Work Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={[
                            { year: '2019', remote: 15, hybrid: 25, onsite: 60 },
                            { year: '2020', remote: 60, hybrid: 30, onsite: 10 },
                            { year: '2021', remote: 50, hybrid: 40, onsite: 10 },
                            { year: '2022', remote: 40, hybrid: 45, onsite: 15 },
                            { year: '2023', remote: 35, hybrid: 50, onsite: 15 },
                            { year: '2024', remote: 30, hybrid: 55, onsite: 15 },
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                            <XAxis dataKey="year" tick={{ fill: '#FFFFFF' }} /> {/* Changed to white */}
                            <YAxis tick={{ fill: '#FFFFFF' }} /> {/* Changed to white */}
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.7)', borderColor: '#00FFFF', borderRadius: '0.5rem', boxShadow: '0 4px 15px rgba(0, 251, 255, 0.2)', color: 'white' }} />
                            <Area type="monotone" dataKey="remote" stackId="1" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.8} />
                            <Area type="monotone" dataKey="hybrid" stackId="1" stroke={COLORS[1]} fill={COLORS[1]} fillOpacity={0.8} />
                            <Area type="monotone" dataKey="onsite" stackId="1" stroke={COLORS[2]} fill={COLORS[2]} fillOpacity={0.8} />
                            <Legend wrapperStyle={{ color: 'white' }} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="p-4 bg-cyan-900 bg-opacity-20 rounded-lg border border-cyan-700"> {/* Themed insight box */}
                          <h3 className="font-semibold mb-2 text-[#00FFFF]">Remote Work Insights</h3>
                          <p className="text-sm text-white">
                            Remote work opportunities have stabilized at 30-35% of tech job postings, with hybrid roles becoming the new standard at 55%. Companies are finding a balance between flexibility and in-person collaboration.
                          </p>
                        </div>

                        <div className="p-4 bg-cyan-900 bg-opacity-20 rounded-lg border border-cyan-700"> {/* Themed insight box */}
                          <h3 className="font-semibold mb-2 text-[#00FFFF]">Location Strategy</h3>
                          <p className="text-sm text-white">
                            Consider targeting companies with distributed teams or those with offices in tech hubs outside traditional centers like San Francisco and New York, where competition is less intense but salary ranges remain competitive.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className={`flex justify-between items-center mt-8 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
            <div>
              <Button variant="outline" className="glassy-button mr-2 flex items-center"> {/* Applied glassy-button */}
                <Download className="mr-2 h-4 w-4" />
                <span>Download Report</span>
              </Button>
              <Button variant="outline" className="glassy-button flex items-center"> {/* Applied glassy-button */}
                <Share2 className="mr-2 h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
            <Button className="glassy-button"> {/* Applied glassy-button */}
              <span>Set Job Alerts</span>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobTrendAnalysis;
