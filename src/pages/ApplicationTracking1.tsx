import React, { useState, useEffect, useRef } from 'react';
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ClipboardList, 
  Plus, 
  Search, 
  BarChart, 
  Building, 
  Calendar, 
  Clock, 
  ChevronDown, 
  ChevronRight, 
  MoreHorizontal,
  Star,
  ExternalLink,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  XCircle,
  FileText,
  Users,
  Bell
} from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ApplicationTracking = () => {
  const [activeTab, setActiveTab] = useState("applications");
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
  
  const applications = [
    { 
      id: 1,
      company: "TechCorp Inc.", 
      role: "Senior Frontend Developer", 
      location: "San Francisco, CA", 
      status: "Interview", 
      dateApplied: "2025-04-02", 
      lastUpdate: "1 day ago",
      starred: true,
      logo: "https://placehold.co/40x40/00FFFF/000000?text=TI" // Placeholder for TechCorp Inc.
    },
    { 
      id: 2,
      company: "DataViz Solutions", 
      role: "Full Stack Engineer", 
      location: "Remote", 
      status: "Applied", 
      dateApplied: "2025-04-05", 
      lastUpdate: "5 hours ago",
      starred: false,
      logo: "https://placehold.co/40x40/00FFFF/000000?text=DS" // Placeholder for DataViz Solutions
    },
    { 
      id: 3,
      company: "CloudNet Systems", 
      role: "Software Engineer II", 
      location: "Austin, TX", 
      status: "Assessment", 
      dateApplied: "2025-03-29", 
      lastUpdate: "2 days ago",
      starred: true,
      logo: "https://placehold.co/40x40/00FFFF/000000?text=CS" // Placeholder for CloudNet Systems
    },
    { 
      id: 4,
      company: "InnovateTech", 
      role: "UI/UX Developer", 
      location: "Seattle, WA", 
      status: "Rejected", 
      dateApplied: "2025-03-25", 
      lastUpdate: "3 days ago",
      starred: false,
      logo: "https://placehold.co/40x40/00FFFF/000000?text=IT" // Placeholder for InnovateTech
    },
    { 
      id: 5,
      company: "FinSoft Corp", 
      role: "Frontend Developer", 
      location: "New York, NY", 
      status: "Offer", 
      dateApplied: "2025-03-20", 
      lastUpdate: "12 hours ago",
      starred: false,
      logo: "https://placehold.co/40x40/00FFFF/000000?text=FC" // Placeholder for FinSoft Corp
    }
  ];
  
  const getStatusBadge = (status) => {
    switch(status) {
      case "Applied":
        return <Badge variant="outline" className="border-[#00FFFF] text-[#00FFFF] bg-cyan-900 bg-opacity-20">Applied</Badge>;
      case "Assessment":
        return <Badge variant="outline" className="border-purple-400 text-purple-400 bg-purple-900 bg-opacity-20">Assessment</Badge>;
      case "Interview":
        return <Badge variant="outline" className="border-amber-400 text-amber-400 bg-amber-900 bg-opacity-20">Interview</Badge>;
      case "Offer":
        return <Badge variant="outline" className="border-green-400 text-green-400 bg-green-900 bg-opacity-20">Offer</Badge>;
      case "Rejected":
        return <Badge variant="outline" className="border-red-400 text-red-400 bg-red-900 bg-opacity-20">Rejected</Badge>;
      default:
        return <Badge variant="outline" className="border-gray-500 text-gray-400 bg-gray-800 bg-opacity-20">{status}</Badge>;
    }
  };
  
  const upcoming = [
    { event: "Technical Interview", company: "TechCorp Inc.", date: "Tomorrow", time: "10:00 - 11:30 AM" },
    { event: "Coding Assessment", company: "CloudNet Systems", date: "April 15", time: "Due by 11:59 PM" }
  ];
  
  const tasks = [
    { task: "Send follow-up email", company: "DataViz Solutions", dueDate: "Today", completed: false, priority: "high" },
    { task: "Research interview panel", company: "TechCorp Inc.", dueDate: "Tomorrow", completed: false, priority: "medium" },
    { task: "Complete take-home project", company: "CloudNet Systems", dueDate: "April 14", completed: false, priority: "high" },
    { task: "Update resume with latest project", company: "", dueDate: "April 16", completed: true, priority: "low" }
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

        /* Glass Panel (for cards within tabs) */
        .glass-panel {
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem; /* Consistent rounded-xl */
          box-shadow: 0 4px 15px 0 rgba(0, 251, 255, 0.15);
          transition: all 0.2s ease-in-out;
        }

        .glass-panel:hover {
          background: rgba(0, 0, 0, 0.4);
          box-shadow: 0 8px 25px 0 rgba(0, 251, 255, 0.3);
          transform: translateY(-2px);
        }

        /* Table specific styles */
        .table-header-custom th {
            color: #00FFFF; /* Cyan text for headers */
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            background-color: rgba(0, 0, 0, 0.4);
        }
        .table-row-custom {
            transition: background-color 0.2s ease-in-out;
        }
        .table-row-custom:hover {
            background-color: rgba(0, 0, 0, 0.5);
        }
        .table-cell-text {
            color: white;
        }
        .table-cell-subtext {
            color: #D1D5DB; /* Lighter grey for subtext in table */
        }
        .table-divider {
            border-color: rgba(255, 255, 255, 0.1);
        }

        /* Timeline dot */
        .timeline-dot {
            background-color: #00FFFF; /* Cyan color for the dot */
            box-shadow: 0 0 0 4px rgba(0, 255, 255, 0.3); /* Cyan glow */
        }
        .timeline-line {
            background-color: rgba(255, 255, 255, 0.1);
        }

        /* Hover lift effect for events/tasks */
        .hover-lift {
            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            border: 1px solid rgba(255, 255, 255, 0.1);
            background-color: rgba(0, 0, 0, 0.2);
        }
        .hover-lift:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0, 251, 255, 0.3);
        }

        /* Custom checkbox styling */
        input[type="checkbox"] {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border: 1px solid rgba(0, 255, 255, 0.5); /* Cyan border */
          border-radius: 4px;
          background-color: rgba(0, 0, 0, 0.3); /* Dark transparent background */
          cursor: pointer;
          position: relative;
          transition: all 0.2s ease-in-out;
        }

        input[type="checkbox"]:checked {
          background-color: #00FFFF; /* Cyan fill when checked */
          border-color: #00FFFF;
        }

        input[type="checkbox"]:checked::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 5px;
          width: 4px;
          height: 8px;
          border: solid black; /* Black checkmark */
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        input[type="checkbox"]:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(0, 255, 255, 0.5); /* Cyan glow on focus */
        }

        /* Custom select styling */
        select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.5rem center;
          background-size: 1.2em;
          padding-right: 2rem; /* Make space for the custom arrow */
          color: #00FFFF; /* Cyan text */
        }
      `}</style>
      <Navbar />
      <div className="futuristic-grid"></div>
      
      <main className={`flex-grow py-12 px-4 pt-40 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 gradient-text">Application Tracking</h1>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl">
            Organize and monitor all your job applications in one place with status updates and reminders.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="w-full md:w-auto flex-grow relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                type="text" 
                placeholder="Search companies, positions, or locations" 
                className="pl-10 bg-gray-800 border-gray-700 text-white input-glow"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="whitespace-nowrap glassy-button text-white">
                Filter <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              <Button className="glassy-button whitespace-nowrap">
                <Plus className="mr-1 h-4 w-4" />
                <span>Add Application</span>
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="applications" onValueChange={setActiveTab}>
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 tabs-list-custom">
              <TabsTrigger value="applications" className="tabs-trigger-custom">Applications</TabsTrigger>
              <TabsTrigger value="analytics" className="tabs-trigger-custom">Analytics</TabsTrigger>
              <TabsTrigger value="tasks" className="tabs-trigger-custom">Tasks & Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value="applications">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <div className="lg:col-span-3">
                  <Card className="glass-panel">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center text-white">
                          <ClipboardList className="mr-2 h-5 w-5 text-[#00FFFF]" />
                          <span>Job Applications</span>
                        </CardTitle>
                        <div className="flex items-center text-sm text-gray-400">
                          <span>Sort by:</span>
                          <select className="ml-2 bg-transparent border-none focus:outline-none text-sm">
                            <option className="bg-gray-800 text-white">Date Applied</option>
                            <option className="bg-gray-800 text-white">Company Name</option>
                            <option className="bg-gray-800 text-white">Status</option>
                            <option className="bg-gray-800 text-white">Last Updated</option>
                          </select>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="text-xs text-gray-400 border-b table-header-custom">
                              <th className="px-4 py-3 text-left w-10"></th>
                              <th className="px-4 py-3 text-left">Company</th>
                              <th className="px-4 py-3 text-left">Position</th>
                              <th className="px-4 py-3 text-left hidden md:table-cell">Location</th>
                              <th className="px-4 py-3 text-left">Status</th>
                              <th className="px-4 py-3 text-left hidden md:table-cell">Date Applied</th>
                              <th className="px-4 py-3 text-left hidden lg:table-cell">Last Update</th>
                              <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-700">
                            {applications.map((application) => (
                              <tr key={application.id} className="table-row-custom">
                                <td className="px-4 py-4">
                                  <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <Star className={`h-4 w-4 ${application.starred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
                                  </Button>
                                </td>
                                <td className="px-4 py-4">
                                  <div className="flex items-center">
                                    <Avatar className="h-8 w-8 mr-3">
                                      <AvatarImage
                                        src={application.logo}
                                        alt={application.company}
                                        onError={(e) => {
                                          const img = e.target as HTMLImageElement;
                                          img.onerror = null;
                                          img.src = `https://placehold.co/40x40/00FFFF/000000?text=${application.company[0]}`;
                                        }}
                                      />
                                      <AvatarFallback className="bg-cyan-700 text-white">{application.company[0]}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium text-white">{application.company}</span>
                                  </div>
                                </td>
                                <td className="px-4 py-4 table-cell-text">
                                  {application.role}
                                </td>
                                <td className="px-4 py-4 hidden md:table-cell table-cell-subtext">
                                  {application.location}
                                </td>
                                <td className="px-4 py-4">
                                  {getStatusBadge(application.status)}
                                </td>
                                <td className="px-4 py-4 hidden md:table-cell table-cell-subtext">
                                  {new Date(application.dateApplied).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-4 hidden lg:table-cell table-cell-subtext">
                                  {application.lastUpdate}
                                </td>
                                <td className="px-4 py-4 text-right">
                                  <div className="flex justify-end space-x-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-[#00FFFF]">
                                      <ExternalLink className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-[#00FFFF]">
                                      <MessageSquare className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-[#00FFFF]">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
                        <span>Showing 5 of 12 applications</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" disabled className="glassy-button text-gray-500 border-gray-700">Previous</Button>
                          <Button variant="outline" size="sm" className="glassy-button">Next</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="lg:col-span-2">
                  <Card className="glass-panel">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-white">
                        <Building className="mr-2 h-5 w-5 text-[#00FFFF]" />
                        <span>TechCorp Inc.</span>
                      </CardTitle>
                      <CardDescription className="text-gray-400">Application for Senior Frontend Developer</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm font-semibold mb-3 text-white">Application Progress</h3>
                          <div className="flex items-center space-x-2 text-xs text-gray-400 mb-3">
                            <div className="flex items-center">
                              <span className="h-3 w-3 rounded-full bg-gray-700 mr-1"></span>
                              <span>Applied</span>
                            </div>
                            <ChevronRight className="h-3 w-3 text-gray-500" />
                            <div className="flex items-center">
                              <span className="h-3 w-3 rounded-full bg-gray-700 mr-1"></span>
                              <span>Assessment</span>
                            </div>
                            <ChevronRight className="h-3 w-3 text-gray-500" />
                            <div className="flex items-center">
                              <span className="h-3 w-3 rounded-full bg-amber-400 mr-1 timeline-dot"></span>
                              <span className="font-medium text-amber-400">Interview</span>
                            </div>
                            <ChevronRight className="h-3 w-3 text-gray-500" />
                            <div className="flex items-center">
                              <span className="h-3 w-3 rounded-full bg-gray-700 mr-1"></span>
                              <span>Offer</span>
                            </div>
                          </div>
                          <Progress value={60} className="h-2 progress-bar-custom" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-400">Date Applied</span>
                              <span className="text-sm text-white">April 2, 2025</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-400">Source</span>
                              <span className="text-sm text-white">LinkedIn</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-400">Salary Range</span>
                              <span className="text-sm text-white">$120K - $150K</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-400">Location</span>
                              <span className="text-sm text-white">San Francisco, CA (Hybrid)</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-400">Contact</span>
                              <span className="text-sm text-white">Sarah Johnson (Recruiter)</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-400">Resume Version</span>
                              <span className="text-sm text-white">Frontend-focused v2</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-semibold mb-3 text-white">Timeline</h3>
                          <div className="space-y-4">
                            <div className="flex">
                              <div className="flex flex-col items-center mr-4">
                                <div className="h-6 w-6 rounded-full bg-amber-900 border-2 border-amber-400 flex items-center justify-center timeline-dot">
                                  <Clock className="h-3 w-3 text-amber-400" />
                                </div>
                                <div className="flex-grow w-0.5 bg-gray-700 mt-1 timeline-line"></div>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-white">Technical Interview Scheduled</p>
                                <p className="text-xs text-gray-400">April 11, 2025 at 10:00 AM</p>
                                <p className="text-xs mt-1 text-gray-300">Interview with the Engineering Team (4 members)</p>
                              </div>
                            </div>
                            
                            <div className="flex">
                              <div className="flex flex-col items-center mr-4">
                                <div className="h-6 w-6 rounded-full bg-green-900 border-2 border-green-400 flex items-center justify-center timeline-dot">
                                  <CheckCircle className="h-3 w-3 text-green-400" />
                                </div>
                                <div className="flex-grow w-0.5 bg-gray-700 mt-1 timeline-line"></div>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-white">Initial Screening Completed</p>
                                <p className="text-xs text-gray-400">April 5, 2025</p>
                                <p className="text-xs mt-1 text-gray-300">30-minute call with HR recruiter</p>
                              </div>
                            </div>
                            
                            <div className="flex">
                              <div className="flex flex-col items-center mr-4">
                                <div className="h-6 w-6 rounded-full bg-cyan-900 border-2 border-[#00FFFF] flex items-center justify-center timeline-dot">
                                  <FileText className="h-3 w-3 text-[#00FFFF]" />
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-white">Application Submitted</p>
                                <p className="text-xs text-gray-400">April 2, 2025</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-3">
                          <Button variant="outline" className="flex items-center flex-grow glassy-button">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            <span>Add Note</span>
                          </Button>
                          <Button className="flex items-center flex-grow glassy-button">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            <span>View Job</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="lg:col-span-1 space-y-6">
                  <Card className="glass-panel">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-white">
                        <Calendar className="mr-2 h-5 w-5 text-[#00FFFF]" />
                        <span>Upcoming Events</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcoming.map((event, i) => (
                          <div key={i} className="border border-gray-700 rounded-lg p-3 hover-lift">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium text-sm text-white">{event.event}</h3>
                              <Badge variant="outline" className="text-amber-400 border-amber-400 bg-amber-900 bg-opacity-20">{event.date}</Badge>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">{event.company}</p>
                            <div className="flex items-center text-xs text-gray-500 mt-2">
                              <Clock className="h-3 w-3 mr-1 text-gray-500" />
                              <span>{event.time}</span>
                            </div>
                          </div>
                        ))}
                        
                        {upcoming.length === 0 && (
                          <div className="text-center py-6">
                            <Calendar className="h-10 w-10 mx-auto text-gray-700 mb-2" />
                            <p className="text-gray-500 text-sm">No upcoming events</p>
                          </div>
                        )}
                        
                        <Button variant="outline" className="w-full glassy-button">
                          <Plus className="mr-2 h-4 w-4" />
                          <span>Add Event</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass-panel">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-white">
                        <Bell className="mr-2 h-5 w-5 text-[#00FFFF]" />
                        <span>Reminders</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {tasks.filter(task => !task.completed).slice(0, 3).map((task, i) => (
                          <div key={i} className="flex items-start space-x-2 p-2 hover:bg-gray-800 rounded-md hover-lift">
                            <input 
                              type="checkbox" 
                              className="h-4 w-4 mt-1 rounded border-gray-600 text-black focus:ring-cyan-500"
                            />
                            <div>
                              <p className="text-sm font-medium text-white">{task.task}</p>
                              {task.company && <p className="text-xs text-gray-400">{task.company}</p>}
                              <div className="flex items-center mt-1">
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${
                                    task.priority === 'high' ? 'text-red-400 border-red-400 bg-red-900 bg-opacity-20' : 
                                    task.priority === 'medium' ? 'text-amber-400 border-amber-400 bg-amber-900 bg-opacity-20' : 
                                    'text-green-400 border-green-400 bg-green-900 bg-opacity-20'
                                  }`}
                                >
                                  {task.priority}
                                </Badge>
                                <span className="text-xs text-gray-500 ml-2">Due {task.dueDate}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Button variant="outline" className="w-full mt-4 glassy-button">
                        <Plus className="mr-2 h-4 w-4" />
                        <span>Add Reminder</span>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 mb-6">
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="glass-panel">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-3xl font-bold mb-1 text-white">24</p>
                        <p className="text-sm text-gray-400">Total Applications</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="glass-panel">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-3xl font-bold mb-1 text-white">8</p>
                        <p className="text-sm text-gray-400">Interviews Secured</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="glass-panel">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-3xl font-bold mb-1 text-white">33%</p>
                        <p className="text-sm text-gray-400">Response Rate</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="glass-panel">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-3xl font-bold mb-1 text-white">2</p>
                        <p className="text-sm text-gray-400">Active Offers</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="lg:col-span-2">
                  <Card className="glass-panel h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-white">
                        <BarChart className="mr-2 h-5 w-5 text-[#00FFFF]" />
                        <span>Application Status Breakdown</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        {/* Chart would go here */}
                        <div className="h-full flex items-center justify-center">
                          <div className="space-y-4 w-full">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm text-white">Applied</span>
                                <span className="text-sm text-white">10</span>
                              </div>
                              <div className="w-full bg-gray-700 h-4 rounded-sm overflow-hidden">
                                <div className="bg-[#00FFFF] h-full" style={{ width: '42%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm text-white">Assessment</span>
                                <span className="text-sm text-white">5</span>
                              </div>
                              <div className="w-full bg-gray-700 h-4 rounded-sm overflow-hidden">
                                <div className="bg-purple-400 h-full" style={{ width: '21%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm text-white">Interview</span>
                                <span className="text-sm text-white">4</span>
                              </div>
                              <div className="w-full bg-gray-700 h-4 rounded-sm overflow-hidden">
                                <div className="bg-amber-400 h-full" style={{ width: '17%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm text-white">Offer</span>
                                <span className="text-sm text-white">2</span>
                              </div>
                              <div className="w-full bg-gray-700 h-4 rounded-sm overflow-hidden">
                                <div className="bg-green-400 h-full" style={{ width: '8%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm text-white">Rejected</span>
                                <span className="text-sm text-white">3</span>
                              </div>
                              <div className="w-full bg-gray-700 h-4 rounded-sm overflow-hidden">
                                <div className="bg-red-400 h-full" style={{ width: '12%' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="lg:col-span-1">
                  <Card className="glass-panel h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white">Application Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-5">
                        <div>
                          <h3 className="text-sm font-semibold mb-2 text-white">Top Application Sources</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-300">LinkedIn</span>
                              <span className="text-sm text-white">42%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-300">Company Website</span>
                              <span className="text-sm text-white">25%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-300">Referrals</span>
                              <span className="text-sm text-white">17%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-300">Job Boards</span>
                              <span className="text-sm text-white">16%</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-700 pt-4">
                          <h3 className="text-sm font-semibold mb-2 text-white">Response Time</h3>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-gray-800 p-3 rounded-lg text-center">
                              <p className="text-xl font-semibold text-white">5.3</p>
                              <p className="text-xs text-gray-400">Avg. Days</p>
                            </div>
                            <div className="bg-gray-800 p-3 rounded-lg text-center">
                              <p className="text-xl font-semibold text-white">35%</p>
                              <p className="text-xs text-gray-400">Response Rate</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-700 pt-4">
                          <h3 className="text-sm font-semibold mb-2 text-white">Application Trends</h3>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            <span className="text-sm text-gray-300">+15% interviews this month</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="lg:col-span-3">
                  <Card className="glass-panel">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white">Skill Match Analysis</CardTitle>
                      <CardDescription className="text-gray-400">How your skills align with job requirements</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 border border-gray-700 rounded-lg bg-gray-800 bg-opacity-50">
                          <h3 className="font-medium mb-3 text-white">Technical Skills</h3>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-xs text-gray-300">JavaScript</span>
                                <span className="text-xs text-white">95%</span>
                              </div>
                              <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-[#00FFFF] h-full" style={{ width: '95%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-xs text-gray-300">React</span>
                                <span className="text-xs text-white">90%</span>
                              </div>
                              <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-[#00FFFF] h-full" style={{ width: '90%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-xs text-gray-300">Node.js</span>
                                <span className="text-xs text-white">75%</span>
                              </div>
                              <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-[#00FFFF] h-full" style={{ width: '75%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-xs text-gray-300">TypeScript</span>
                                <span className="text-xs text-white">70%</span>
                              </div>
                              <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-[#00FFFF] h-full" style={{ width: '70%' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border border-gray-700 rounded-lg bg-gray-800 bg-opacity-50">
                          <h3 className="font-medium mb-3 text-white">Experience Match</h3>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-xs text-gray-300">Frontend Development</span>
                                <span className="text-xs text-white">95%</span>
                              </div>
                              <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-[#00FFFF] h-full" style={{ width: '95%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-xs text-gray-300">UI/UX Implementation</span>
                                <span className="text-xs text-white">85%</span>
                              </div>
                              <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-[#00FFFF] h-full" style={{ width: '85%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-xs text-gray-300">State Management</span>
                                <span className="text-xs text-white">80%</span>
                              </div>
                              <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-[#00FFFF] h-full" style={{ width: '80%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-xs text-gray-300">API Integration</span>
                                <span className="text-xs text-white">90%</span>
                              </div>
                              <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-[#00FFFF] h-full" style={{ width: '90%' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border border-gray-700 rounded-lg bg-gray-800 bg-opacity-50">
                          <h3 className="font-medium mb-3 text-white">Skill Gap Analysis</h3>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-xs text-gray-300">GraphQL</span>
                                <span className="text-xs text-white">60%</span>
                              </div>
                              <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-red-400 h-full" style={{ width: '60%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-xs text-gray-300">Testing (Jest/Cypress)</span>
                                <span className="text-xs text-white">55%</span>
                              </div>
                              <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-red-400 h-full" style={{ width: '55%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-xs text-gray-300">CI/CD Pipelines</span>
                                <span className="text-xs text-white">45%</span>
                              </div>
                              <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-red-400 h-full" style={{ width: '45%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-xs text-gray-300">AWS/Cloud Services</span>
                                <span className="text-xs text-white">40%</span>
                              </div>
                              <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-red-400 h-full" style={{ width: '40%' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-6">
                        <Button className="glassy-button">
                          <Users className="mr-2 h-4 w-4" />
                          <span>Find Jobs Matching Your Skills</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="tasks">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 mb-6">
                <Card className="glass-panel">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center text-white">
                        <CheckCircle className="mr-2 h-5 w-5 text-[#00FFFF]" />
                        <span>Todo List</span>
                      </CardTitle>
                      <Button className="glassy-button">
                        <Plus className="h-4 w-4 mr-2" />
                        <span>Add Task</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">High Priority</span>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-[#00FFFF]">
                          <Plus className="h-3 w-3 mr-1" />
                          <span className="text-xs">Add</span>
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        {tasks.filter(task => task.priority === 'high').map((task, i) => (
                          <div key={i} className="flex items-start space-x-3 p-3 border border-gray-700 rounded-lg hover-lift">
                            <input 
                              type="checkbox" 
                              checked={task.completed}
                              className="h-4 w-4 mt-0.5 rounded border-gray-600 text-black focus:ring-cyan-500"
                              readOnly
                            />
                            <div className="flex-grow">
                              <div className="flex justify-between">
                                <p className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>{task.task}</p>
                                <Badge variant="outline" className="border-red-400 text-red-400 bg-red-900 bg-opacity-20">High</Badge>
                              </div>
                              {task.company && <p className="text-xs text-gray-400">{task.company}</p>}
                              <p className="text-xs text-gray-500 mt-1">Due {task.dueDate}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-[#00FFFF]">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between mt-6">
                        <span className="text-sm font-medium text-white">Medium Priority</span>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-[#00FFFF]">
                          <Plus className="h-3 w-3 mr-1" />
                          <span className="text-xs">Add</span>
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        {tasks.filter(task => task.priority === 'medium').map((task, i) => (
                          <div key={i} className="flex items-start space-x-3 p-3 border border-gray-700 rounded-lg hover-lift">
                            <input 
                              type="checkbox" 
                              checked={task.completed}
                              className="h-4 w-4 mt-0.5 rounded border-gray-600 text-black focus:ring-cyan-500"
                              readOnly
                            />
                            <div className="flex-grow">
                              <div className="flex justify-between">
                                <p className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>{task.task}</p>
                                <Badge variant="outline" className="border-amber-400 text-amber-400 bg-amber-900 bg-opacity-20">Medium</Badge>
                              </div>
                              {task.company && <p className="text-xs text-gray-400">{task.company}</p>}
                              <p className="text-xs text-gray-500 mt-1">Due {task.dueDate}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-[#00FFFF]">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between mt-6">
                        <span className="text-sm font-medium text-white">Completed</span>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-[#00FFFF]">
                          <XCircle className="h-3 w-3 mr-1" />
                          <span className="text-xs">Clear</span>
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        {tasks.filter(task => task.completed).map((task, i) => (
                          <div key={i} className="flex items-start space-x-3 p-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg">
                            <input 
                              type="checkbox" 
                              checked={task.completed}
                              className="h-4 w-4 mt-0.5 rounded border-gray-600 text-black focus:ring-cyan-500"
                              readOnly
                            />
                            <div className="flex-grow">
                              <div className="flex justify-between">
                                <p className="text-sm font-medium line-through text-gray-500">{task.task}</p>
                                <Badge variant="outline" className="border-gray-500 text-gray-400 bg-gray-800 bg-opacity-20">Completed</Badge>
                              </div>
                              {task.company && <p className="text-xs text-gray-500">{task.company}</p>}
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-[#00FFFF]">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-panel">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center text-white">
                        <Calendar className="mr-2 h-5 w-5 text-[#00FFFF]" />
                        <span>Calendar</span>
                      </CardTitle>
                      <Button className="glassy-button">
                        <Plus className="h-4 w-4 mr-2" />
                        <span>Add Event</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Calendar would go here */}
                      <div className="border border-gray-700 rounded-lg bg-gray-800 bg-opacity-50">
                        <div className="bg-gray-800 p-2 flex items-center justify-between border-b border-gray-700">
                          <Button variant="ghost" size="sm" className="text-white hover:text-[#00FFFF]">
                            <ChevronDown className="h-4 w-4 mr-1" />
                            <span>April 2025</span>
                          </Button>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-[#00FFFF]">
                              <ChevronDown className="h-4 w-4 rotate-90" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-[#00FFFF]">
                              <ChevronDown className="h-4 w-4 -rotate-90" />
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-7 text-center p-4 gap-2">
                          <div className="text-xs text-gray-400">Sun</div>
                          <div className="text-xs text-gray-400">Mon</div>
                          <div className="text-xs text-gray-400">Tue</div>
                          <div className="text-xs text-gray-400">Wed</div>
                          <div className="text-xs text-gray-400">Thu</div>
                          <div className="text-xs text-gray-400">Fri</div>
                          <div className="text-xs text-gray-400">Sat</div>
                          
                          {Array.from({ length: 30 }, (_, i) => (
                            <div 
                              key={i} 
                              className={`p-2 rounded-md text-xs text-white ${
                                i === 9 ? 'bg-cyan-700 text-white' : // Highlight current day
                                (i === 4 || i === 10 || i === 14) ? 'border border-amber-400 text-amber-400' : // Highlight days with events
                                'hover:bg-gray-700'
                              }`}
                            >
                              {i + 1}
                              {i === 10 && (
                                <div className="h-1 w-1 bg-amber-400 rounded-full mx-auto mt-1"></div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-semibold mb-3 text-white">Upcoming Events</h3>
                        <div className="space-y-3">
                          <div className="p-3 border-l-2 border-amber-400 bg-amber-900 bg-opacity-20 rounded-r-lg hover-lift">
                            <p className="text-sm font-medium text-white">Technical Interview</p>
                            <p className="text-xs text-gray-400">TechCorp Inc.</p>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                              <span>Apr 11</span>
                              <span className="mx-1">•</span>
                              <Clock className="h-3 w-3 mr-1 text-gray-500" />
                              <span>10:00 - 11:30 AM</span>
                            </div>
                          </div>
                          
                          <div className="p-3 border-l-2 border-[#00FFFF] bg-cyan-900 bg-opacity-20 rounded-r-lg hover-lift">
                            <p className="text-sm font-medium text-white">Coding Assessment</p>
                            <p className="text-xs text-gray-400">CloudNet Systems</p>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                              <span>Apr 15</span>
                              <span className="mx-1">•</span>
                              <Clock className="h-3 w-3 mr-1 text-gray-500" />
                              <span>Due by 11:59 PM</span>
                            </div>
                          </div>
                          
                          <div className="p-3 border-l-2 border-green-400 bg-green-900 bg-opacity-20 rounded-r-lg hover-lift">
                            <p className="text-sm font-medium text-white">Offer Discussion</p>
                            <p className="text-xs text-gray-400">FinSoft Corp</p>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                              <span>Apr 18</span>
                              <span className="mx-1">•</span>
                              <Clock className="h-3 w-3 mr-1 text-gray-500" />
                              <span>2:00 - 3:00 PM</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApplicationTracking;
