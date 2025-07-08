import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, User, Settings, BarChart2, ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState<'profile' | 'settings' | 'dashboard'>('profile');
  const navigate = useNavigate();
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

  const handleSignOut = async () => {
    // @ts-ignore
    const { getAuth, signOut } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js');
    // @ts-ignore
    const auth = getAuth();
    await signOut(auth);
    navigate('/');
  };

  return (
    <div ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white py-12 overflow-hidden">
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

        /* Tab Button Styles */
        .tab-button {
          transition: all 0.3s ease-in-out;
          font-weight: 600; /* Semibold */
          border-bottom-width: 2px;
          border-bottom-style: solid;
        }
        .tab-button.active {
          border-color: #00FFFF; /* Cyan border for active tab */
          color: #00FFFF; /* Cyan text for active tab */
          background: rgba(0, 255, 255, 0.1); /* Subtle cyan background for active */
        }
        .tab-button:not(.active) {
          border-color: transparent;
          color: #9CA3AF; /* Gray text for inactive tabs */
        }
        .tab-button:not(.active):hover {
          color: #00FFFF; /* Cyan text on hover for inactive tabs */
          background: rgba(0, 255, 255, 0.05); /* Very subtle cyan background on hover */
        }
      `}</style>
      <button
        className={`fixed top-8 left-8 glassy-button flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 z-20 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
        onClick={() => navigate('/')}
        style={{ animationDelay: '0.2s' }}
      >
        <Home className="w-5 h-5 text-white" />Back to Home
      </button>
      <div className={`relative max-w-2xl w-full rounded-2xl shadow-2xl border border-cyan-400 overflow-hidden glass-box ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ background: 'linear-gradient(135deg, #0f2027 0%, #2c5364 100%)', animationDelay: '0.4s' }}>
        {/* Avatar and user info */}
        <div className="flex flex-col items-center pt-12 pb-8 px-8 bg-gradient-to-r from-[#00FFFF33] to-[#00CCCC33]">
          <div className="relative mb-3">
            <div className="w-32 h-32 rounded-full bg-cyan-900 flex items-center justify-center text-5xl text-cyan-200 font-bold border-4 border-cyan-400 shadow-lg ring-8 ring-cyan-200/30">
              {user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <span className="absolute bottom-4 right-4 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{user?.email?.split('@')[0] || 'User'}</div>
          <div className="text-base text-cyan-200 mb-1">{user?.email}</div>
          <div className="text-xs text-gray-400 mb-2">Role: <span className="text-cyan-300 font-semibold">Innovator</span></div>
          <div className="flex gap-4 mt-2">
            <div className="bg-cyan-900 bg-opacity-30 rounded-lg px-6 py-2 text-center border border-cyan-700 shadow-md">
              <div className="text-2xl font-bold text-[#00FFFF]">3</div>
              <div className="text-xs text-gray-400">Projects</div>
            </div>
            <div className="bg-cyan-900 bg-opacity-30 rounded-lg px-6 py-2 text-center border border-cyan-700 shadow-md">
              <div className="text-2xl font-bold text-[#00FFFF]">1.2k</div>
              <div className="text-xs text-gray-400">Views</div>
            </div>
            <div className="bg-cyan-900 bg-opacity-30 rounded-lg px-6 py-2 text-center border border-cyan-700 shadow-md">
              <div className="text-2xl font-bold text-[#00FFFF]">5</div>
              <div className="text-xs text-gray-400">Feedback</div>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex justify-center gap-2 bg-black bg-opacity-40 border-b border-cyan-900 px-8">
          <button
            className={`flex items-center gap-2 px-4 py-3 tab-button ${tab === 'profile' ? 'active' : ''}`}
            onClick={() => setTab('profile')}
          >
            <User size={18} /> Profile
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-3 tab-button ${tab === 'settings' ? 'active' : ''}`}
            onClick={() => setTab('settings')}
          >
            <Settings size={18} /> Settings
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-3 tab-button ${tab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setTab('dashboard')}
          >
            <BarChart2 size={18} /> Innovator Dashboard
          </button>
        </div>
        {/* Tab content */}
        <div className="px-10 py-8 bg-black bg-opacity-60 min-h-[320px]">
          {tab === 'profile' && (
            <>
              <h2 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00CCCC]">Profile Overview</h2>
              <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-200">
                <div>
                  <div className="mb-2"><span className="font-semibold text-cyan-300">Email:</span> {user?.email}</div>
                  <div className="mb-2"><span className="font-semibold text-cyan-300">Role:</span> Innovator</div>
                  <div className="mb-2"><span className="font-semibold text-cyan-300">Member since:</span> Jan 2024</div>
                  <div className="mb-2"><span className="font-semibold text-cyan-300">Status:</span> <span className="text-green-400 font-semibold">Active</span></div>
                  <div className="mb-2"><span className="font-semibold text-cyan-300">Location:</span> New Delhi, India</div>
                  <div className="mb-2"><span className="font-semibold text-cyan-300">Phone:</span> +91 98765 43210</div>
                </div>
                <div>
                  <div className="mb-2"><span className="font-semibold text-cyan-300">Bio:</span></div>
                  <div className="text-sm text-gray-400 mb-2">Passionate about AI, career growth, and building tools that empower job seekers. Loves hackathons and innovation.</div>
                  <div className="mb-2"><span className="font-semibold text-cyan-300">Skills:</span></div>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'AI', 'Resume Parsing', 'UI/UX', 'APIs', 'Career Coaching'].map(skill => (
                      <span key={skill} className="bg-cyan-900 bg-opacity-30 border border-cyan-400 rounded-full px-3 py-1 text-xs text-cyan-200">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-cyan-200 mb-2">Recent Activity</h3>
                <ul className="list-disc ml-6 text-sm text-gray-300">
                  <li>Submitted "AI Resume Analyzer" for review</li>
                  <li>Received feedback on "Job Market Trends Widget"</li>
                  <li>Completed "GraphQL Mastery" course</li>
                  <li>Updated profile picture</li>
                </ul>
              </div>
            </>
          )}
          {tab === 'settings' && (
            <>
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00CCCC]">Settings</h2>
              <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-200">
                <div>
                  <label className="block mb-1 font-medium">Notification Preferences</label>
                  <select className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:border-[#00FFFF]">
                    <option>Email Only</option>
                    <option>SMS Only</option>
                    <option>Email & SMS</option>
                    <option>None</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-medium">Theme</label>
                  <select className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:border-[#00FFFF]">
                    <option>System Default</option>
                    <option>Light</option>
                    <option>Dark</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block mb-1 font-medium">Change Password</label>
                  <input type="password" className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:border-[#00FFFF]" placeholder="New Password" />
                </div>
                <div className="col-span-2">
                  <button className="w-full glassy-button px-4 py-2 rounded text-white font-semibold mt-2">Save Settings</button>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-cyan-200 mb-2">Connected Accounts</h3>
                <div className="flex gap-4">
                  <div className="bg-cyan-900 bg-opacity-30 border border-cyan-400 rounded-lg px-4 py-2 text-center">
                    <div className="text-sm text-cyan-200">Google</div>
                    <div className="text-xs text-green-400">Connected</div>
                  </div>
                  <div className="bg-cyan-900 bg-opacity-30 border border-cyan-400 rounded-lg px-4 py-2 text-center">
                    <div className="text-sm text-cyan-200">GitHub</div>
                    <div className="text-xs text-red-400">Not Connected</div>
                  </div>
                </div>
              </div>
            </>
          )}
          {tab === 'dashboard' && (
            <>
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00CCCC]">Innovator Dashboard</h2>
              <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-200">
                <div>
                  <div className="font-semibold mb-1">Your Innovations</div>
                  <ul className="list-disc ml-6">
                    <li>AI Resume Analyzer - <span className="text-green-400">Active</span></li>
                    <li>Job Market Trends Widget - <span className="text-yellow-400">In Review</span></li>
                    <li>Smart Outreach Tool - <span className="text-red-400">Draft</span></li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold mb-1">Stats</div>
                  <div className="flex gap-4">
                    <div className="bg-cyan-900 bg-opacity-30 rounded-lg px-4 py-2 text-center border border-cyan-700 shadow-md">
                      <div className="text-2xl font-bold text-[#00FFFF]">3</div>
                      <div className="text-xs text-gray-400">Projects</div>
                    </div>
                    <div className="bg-cyan-900 bg-opacity-30 rounded-lg px-4 py-2 text-center border border-cyan-700 shadow-md">
                      <div className="text-2xl font-bold text-[#00FFFF]">1.2k</div>
                      <div className="text-xs text-gray-400">Views</div>
                    </div>
                    <div className="bg-cyan-900 bg-opacity-30 rounded-lg px-4 py-2 text-center border border-cyan-700 shadow-md">
                      <div className="text-2xl font-bold text-[#00FFFF]">5</div>
                      <div className="text-xs text-gray-400">Feedback</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-cyan-200 mb-2">Recent Achievements</h3>
                <ul className="list-disc ml-6 text-sm text-gray-300">
                  <li>Won 1st place in HackOrbit 2024</li>
                  <li>Launched "CareerBoost AI" beta</li>
                  <li>Reached 1,000+ users milestone</li>
                  <li>Received "Innovator of the Month" badge</li>
                </ul>
              </div>
              <button className="w-full glassy-button px-4 py-2 rounded text-white font-semibold mt-2">Create New Innovation</button>
            </>
          )}
          <button
            className="w-full glassy-button px-4 py-2 rounded text-white font-semibold mt-6 flex items-center justify-center gap-2"
            onClick={handleSignOut}
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
