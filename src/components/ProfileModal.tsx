import React, { useState } from 'react';

interface ProfileModalProps {
  user: any;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ user, onClose }) => {
  const [tab, setTab] = useState<'profile' | 'settings' | 'dashboard'>('profile');

  const handleSignOut = async () => {
    // @ts-ignore
    const { getAuth, signOut } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js');
    // @ts-ignore
    const auth = getAuth();
    await signOut(auth);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative max-w-md w-full rounded-2xl shadow-2xl border border-cyan-400 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f2027 0%, #2c5364 100%)' }}>
        {/* Close button */}
        <button className="absolute top-4 right-4 text-white text-2xl font-bold z-10" onClick={onClose}>&times;</button>
        {/* Avatar and user info */}
        <div className="flex flex-col items-center pt-10 pb-6 px-6 bg-gradient-to-r from-[#00FFFF33] to-[#00CCCC33]">
          <div className="relative mb-3">
            <div className="w-24 h-24 rounded-full bg-cyan-900 flex items-center justify-center text-4xl text-cyan-200 font-bold border-4 border-cyan-400 shadow-lg ring-4 ring-cyan-200/30">
              {user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></span>
          </div>
          <div className="text-xl font-bold text-white mb-1">{user?.email?.split('@')[0] || 'User'}</div>
          <div className="text-sm text-cyan-200 mb-1">{user?.email}</div>
          <div className="text-xs text-gray-400 mb-2">Role: <span className="text-cyan-300 font-semibold">Innovator</span></div>
        </div>
        {/* Tabs */}
        <div className="flex justify-center gap-2 bg-black bg-opacity-40 border-b border-cyan-900 px-6">
          <button
            className={`px-4 py-2 font-semibold border-b-2 transition-all ${tab === 'profile' ? 'border-cyan-400 text-cyan-200' : 'border-transparent text-gray-400 hover:text-cyan-200'}`}
            onClick={() => setTab('profile')}
          >
            Profile
          </button>
          <button
            className={`px-4 py-2 font-semibold border-b-2 transition-all ${tab === 'settings' ? 'border-cyan-400 text-cyan-200' : 'border-transparent text-gray-400 hover:text-cyan-200'}`}
            onClick={() => setTab('settings')}
          >
            Settings
          </button>
          <button
            className={`px-4 py-2 font-semibold border-b-2 transition-all ${tab === 'dashboard' ? 'border-cyan-400 text-cyan-200' : 'border-transparent text-gray-400 hover:text-cyan-200'}`}
            onClick={() => setTab('dashboard')}
          >
            Innovator Dashboard
          </button>
        </div>
        {/* Tab content */}
        <div className="px-8 py-6 bg-black bg-opacity-60 min-h-[220px]">
          {tab === 'profile' && (
            <>
              <h2 className="text-2xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00CCCC]">Profile Overview</h2>
              <div className="mb-6 text-left text-gray-200">
                <div className="mb-2"><span className="font-semibold text-cyan-300">Email:</span> {user?.email}</div>
                <div className="mb-2"><span className="font-semibold text-cyan-300">Role:</span> Innovator</div>
                <div className="mb-2"><span className="font-semibold text-cyan-300">Member since:</span> Jan 2024</div>
                <div className="mb-2"><span className="font-semibold text-cyan-300">Status:</span> <span className="text-green-400 font-semibold">Active</span></div>
              </div>
            </>
          )}
          {tab === 'settings' && (
            <>
              <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00CCCC]">Settings</h2>
              <div className="mb-6 text-left text-gray-200">
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Notification Preferences</label>
                  <select className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:border-[#00FFFF]">
                    <option>Email Only</option>
                    <option>SMS Only</option>
                    <option>Email & SMS</option>
                    <option>None</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Theme</label>
                  <select className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:border-[#00FFFF]">
                    <option>System Default</option>
                    <option>Light</option>
                    <option>Dark</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Change Password</label>
                  <input type="password" className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:border-[#00FFFF]" placeholder="New Password" />
                </div>
                <button className="w-full glassy-button px-4 py-2 rounded text-white font-semibold border border-cyan-400 hover:bg-[#00FFFF] hover:text-black transition-all duration-200 mt-2">Save Settings</button>
              </div>
            </>
          )}
          {tab === 'dashboard' && (
            <>
              <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00CCCC]">Innovator Dashboard</h2>
              <div className="mb-6 text-left text-gray-200">
                <div className="mb-4">
                  <div className="font-semibold mb-1">Your Innovations</div>
                  <ul className="list-disc ml-6">
                    <li>AI Resume Analyzer - <span className="text-green-400">Active</span></li>
                    <li>Job Market Trends Widget - <span className="text-yellow-400">In Review</span></li>
                    <li>Smart Outreach Tool - <span className="text-red-400">Draft</span></li>
                  </ul>
                </div>
                <div className="mb-4">
                  <div className="font-semibold mb-1">Stats</div>
                  <div className="flex gap-4">
                    <div className="bg-cyan-900 bg-opacity-30 rounded-lg px-4 py-2 text-center">
                      <div className="text-2xl font-bold text-[#00FFFF]">3</div>
                      <div className="text-xs text-gray-400">Projects</div>
                    </div>
                    <div className="bg-cyan-900 bg-opacity-30 rounded-lg px-4 py-2 text-center">
                      <div className="text-2xl font-bold text-[#00FFFF]">1.2k</div>
                      <div className="text-xs text-gray-400">Views</div>
                    </div>
                    <div className="bg-cyan-900 bg-opacity-30 rounded-lg px-4 py-2 text-center">
                      <div className="text-2xl font-bold text-[#00FFFF]">5</div>
                      <div className="text-xs text-gray-400">Feedback</div>
                    </div>
                  </div>
                </div>
                <button className="w-full glassy-button px-4 py-2 rounded text-white font-semibold border border-cyan-400 hover:bg-[#00FFFF] hover:text-black transition-all duration-200 mt-2">Create New Innovation</button>
              </div>
            </>
          )}
          <button
            className="w-full glassy-button px-4 py-2 rounded text-white font-semibold border border-cyan-400 hover:bg-[#00FFFF] hover:text-black transition-all duration-200 mt-4"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal; 