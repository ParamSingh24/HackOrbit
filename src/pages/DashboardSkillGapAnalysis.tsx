import React, { useState } from 'react';

// Mock required skills for demonstration
const requiredSkillsMap: Record<string, string[]> = {
  'Frontend Developer': ['React', 'TypeScript', 'CSS', 'Testing', 'GraphQL'],
  'Backend Developer': ['Node.js', 'Express', 'MongoDB', 'API Design', 'Testing'],
  'Data Scientist': ['Python', 'Machine Learning', 'Pandas', 'SQL', 'Statistics'],
};

const DashboardSkillGapAnalysis = () => {
  const [skillsInput, setSkillsInput] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [result, setResult] = useState<{ extracted: string[]; missing: string[]; recommendations: string[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    setError(null);
    setLoading(true);
    if (!skillsInput || !jobTitle || !company) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }
    // Basic local skill extraction: split by comma
    const extractedSkills = skillsInput.split(',').map(s => s.trim()).filter(Boolean);
    // Get required skills for the job title
    const requiredSkills = requiredSkillsMap[jobTitle] || ['Communication', 'Teamwork', 'Problem Solving'];
    // Find missing skills
    const missing = requiredSkills.filter(
      skill => !extractedSkills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
    );
    // Recommendations
    const recommendations = missing.map(skill => `Take an online course or project to improve your ${skill} skills.`);
    setResult({ extracted: extractedSkills, missing, recommendations });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-xl glass-box rounded-lg shadow-lg p-8 border border-cyan-400">
        <h1 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00CCCC]">Skill Gap Analysis Dashboard</h1>
        <p className="mb-6 text-gray-300">Enter your current skills, job title, and target company to see what skills you need to improve.</p>
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <input
            value={skillsInput}
            onChange={e => setSkillsInput(e.target.value)}
            placeholder="Current skills (comma separated)"
            className="w-full p-2 rounded bg-gray-800 border border-cyan-700 text-white"
            required
          />
          <input
            value={jobTitle}
            onChange={e => setJobTitle(e.target.value)}
            placeholder="Job Title (e.g. Frontend Developer)"
            className="w-full p-2 rounded bg-gray-800 border border-cyan-700 text-white"
            required
          />
          <input
            value={company}
            onChange={e => setCompany(e.target.value)}
            placeholder="Company"
            className="w-full p-2 rounded bg-gray-800 border border-cyan-700 text-white"
            required
          />
          <button type="submit" className="glassy-button px-4 py-2 rounded text-white font-semibold w-full" disabled={loading}>{loading ? 'Analyzing...' : 'Analyze Skill Gap'}</button>
        </form>
        {error && <div className="text-red-400 mb-4">{error}</div>}
        {result && (
          <div className="mt-6 p-4 bg-gray-800 bg-opacity-60 rounded-lg border border-cyan-700 text-cyan-100">
            <strong>Extracted Skills:</strong>
            <ul className="list-disc list-inside mt-2 text-cyan-200">
              {result.extracted.length === 0 ? <li>None detected.</li> : result.extracted.map((skill, idx) => <li key={idx}>{skill}</li>)}
            </ul>
            <div className="mt-4">
              <strong>Missing Skills:</strong>
              <ul className="list-disc list-inside mt-2 text-cyan-200">
                {result.missing.length === 0 ? <li>None! You match all required skills.</li> : result.missing.map((skill, idx) => <li key={idx}>{skill}</li>)}
              </ul>
            </div>
            <div className="mt-4">
              <strong>Recommendations:</strong>
              <ul className="list-disc list-inside mt-2 text-cyan-200">
                {result.recommendations.length === 0 ? <li>No recommendations needed.</li> : result.recommendations.map((rec, idx) => <li key={idx}>{rec}</li>)}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardSkillGapAnalysis; 