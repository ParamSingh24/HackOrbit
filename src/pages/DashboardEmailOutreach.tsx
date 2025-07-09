import React, { useState } from 'react';

const recruiterEmail = 'raghuvanshiranapratapsingh@gmail.com';
const companies = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Other'];

const smartEmailTemplate = ({ name, userEmail, jobTitle, company, resumeFile }) => `
Subject: Application for ${jobTitle} at ${company}

Dear Recruiter,

I hope this message finds you well. My name is ${name || '[Your Name]'}, and I am excited to apply for the position of ${jobTitle} at ${company}. I have attached my resume (${resumeFile}) for your review.

With a strong background in ${jobTitle}, I am confident that my skills and experience align well with the requirements of your team. I am particularly drawn to ${company} because of its reputation for innovation and excellence.

Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to your organization.

Best regards,
${name || '[Your Name]'}
${userEmail}

(P.S. Please ensure your resume is attached before sending.)
`;

const DashboardEmailOutreach = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [name, setName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [customCompany, setCustomCompany] = useState('');
  const [emailText, setEmailText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sendStatus, setSendStatus] = useState<string | null>(null);

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const selectedCompany = company === 'Other' ? customCompany : company;
    if (!resume || !userEmail || !jobTitle || !selectedCompany) {
      setError('Please fill in all fields and upload your resume.');
      return;
    }
    setEmailText(smartEmailTemplate({
      name,
      userEmail,
      jobTitle,
      company: selectedCompany,
      resumeFile: resume.name,
    }));
  };

  const handleOpenMail = () => {
    if (!emailText) return;
    const subjectMatch = emailText.match(/^Subject:(.*)$/m);
    const subject = subjectMatch ? subjectMatch[1].trim() : 'Job Application';
    const body = encodeURIComponent(emailText.replace(/^Subject:.*$/m, '').trim());
    window.open(`mailto:${recruiterEmail}?subject=${encodeURIComponent(subject)}&body=${body}`);
  };

  const handleSend = async () => {
    if (!emailText || !userEmail) return;
    setSendStatus(null);
    const subjectMatch = emailText.match(/^Subject:(.*)$/m);
    const subject = subjectMatch ? subjectMatch[1].trim() : 'Job Application';
    const body = emailText.replace(/^Subject:.*$/m, '').trim();
    try {
      const res = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: userEmail, subject, text: body }),
      });
      if (res.ok) {
        setSendStatus('Email sent successfully!');
      } else {
        setSendStatus('Failed to send email. Please try again.');
      }
    } catch (err) {
      setSendStatus('Failed to send email. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-xl glass-box rounded-lg shadow-lg p-8 border border-cyan-400">
        <h1 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00CCCC]">Email Outreach Dashboard</h1>
        <p className="mb-6 text-gray-300">Upload your resume, enter your email, and select the company to send your application to.</p>
        <form onSubmit={handleGenerate} className="mb-8 space-y-4">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeChange}
            className="w-full text-white"
          />
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your Name"
            className="w-full p-2 rounded bg-gray-800 border border-cyan-700 text-white"
          />
          <input
            value={userEmail}
            onChange={e => setUserEmail(e.target.value)}
            placeholder="Your Email"
            className="w-full p-2 rounded bg-gray-800 border border-cyan-700 text-white"
            required
          />
          <input
            value={jobTitle}
            onChange={e => setJobTitle(e.target.value)}
            placeholder="Job Title"
            className="w-full p-2 rounded bg-gray-800 border border-cyan-700 text-white"
            required
          />
          <select
            value={company}
            onChange={e => setCompany(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-cyan-700 text-white"
            required
          >
            <option value="">Select Company</option>
            {companies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {company === 'Other' && (
            <input
              value={customCompany}
              onChange={e => setCustomCompany(e.target.value)}
              placeholder="Enter Company Name"
              className="w-full p-2 rounded bg-gray-800 border border-cyan-700 text-white"
              required
            />
          )}
          <button type="submit" className="glassy-button px-4 py-2 rounded text-white font-semibold w-full">Generate Email</button>
        </form>
        {error && <div className="text-red-400 mb-4">{error}</div>}
        {emailText && (
          <div className="mt-6 p-4 bg-gray-800 bg-opacity-60 rounded-lg border border-cyan-700 text-cyan-100">
            <strong>Email Preview:</strong>
            <pre className="whitespace-pre-wrap mt-2 text-cyan-200">{emailText}</pre>
            <div className="flex gap-2 mt-4">
              <button onClick={() => {navigator.clipboard.writeText(emailText);}} className="glassy-button px-4 py-2 rounded text-white font-semibold">Copy Email</button>
              <button onClick={handleOpenMail} className="glassy-button px-4 py-2 rounded text-white font-semibold">Open in Mail App</button>
              <button onClick={handleSend} className="glassy-button px-4 py-2 rounded text-white font-semibold" disabled={!emailText}>Send</button>
            </div>
            {sendStatus && <div className={sendStatus.includes('success') ? 'text-green-400 mt-2' : 'text-red-400 mt-2'}>{sendStatus}</div>}
            <div className="mt-2 text-yellow-300 text-xs">Reminder: Please attach your resume before sending!</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardEmailOutreach; 