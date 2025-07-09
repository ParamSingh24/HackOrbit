import React, { useState } from 'react';

interface OptimizationHistoryItem {
  id: number;
  fileName: string;
  date: string;
  analysis: string;
  changes: string[];
  downloadUrl: string;
}

const mockBackendOptimize = async (file: File): Promise<{ analysis: string; changes: string[]; optimizedFile: Blob }> => {
  // Simulate backend processing delay
  await new Promise(res => setTimeout(res, 2000));
  // Simulate analysis and changes
  const analysis = 'Detailed AI Feedback:\n- Your resume is strong in technical skills but could use more leadership examples.\n- Consider adding more quantifiable achievements.\n- Formatting is clean and ATS-friendly.';
  const changes = [
    'Added quantifiable metrics to achievements',
    'Inserted industry keywords for ATS',
    'Improved section headings',
    'Corrected minor grammar issues',
    'Enhanced leadership experience section',
  ];
  // Simulate optimized file (just return the original for now)
  const optimizedFile = new Blob(["Optimized: ", await file.text()], { type: file.type });
  return { analysis, changes, optimizedFile };
};

const DashboardResumeOptimization = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [changes, setChanges] = useState<string[] | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<OptimizationHistoryItem[]>(() => {
    const saved = localStorage.getItem('resumeOptHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setResult(null);
    setChanges(null);
    setAnalysis(null);
    setDownloadUrl(null);
    setError(null);
    setLoading(true);
    try {
      // Backend integration (mocked)
      const { analysis, changes, optimizedFile } = await mockBackendOptimize(selectedFile);
      setResult('Your resume has been optimized!');
      setChanges(changes);
      setAnalysis(analysis);
      const url = URL.createObjectURL(optimizedFile);
      setDownloadUrl(url);
      // Save to history
      const newItem: OptimizationHistoryItem = {
        id: Date.now(),
        fileName: selectedFile.name,
        date: new Date().toLocaleString(),
        analysis,
        changes,
        downloadUrl: url,
      };
      const newHistory = [newItem, ...history].slice(0, 10); // Keep last 10
      setHistory(newHistory);
      localStorage.setItem('resumeOptHistory', JSON.stringify(newHistory));
    } catch (err) {
      setError('Failed to optimize resume.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-xl glass-box rounded-lg shadow-lg p-8 border border-cyan-400">
        <h1 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00CCCC]">Resume Optimization Dashboard</h1>
        <p className="mb-6 text-gray-300">Upload your resume PDF below. Our AI will automatically optimize your resume and show you the results instantly.</p>
        <input
          type="file"
          accept=".pdf"
          className="mb-4 block w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-cyan-900 file:text-cyan-200 hover:file:bg-cyan-700"
          onChange={handleFileChange}
          disabled={loading}
        />
        {loading && <div className="text-cyan-400 mb-4">Optimizing your resume...</div>}
        {error && <div className="text-red-400 mb-4">{error}</div>}
        {result && (
          <div className="mt-6 p-4 bg-gray-800 bg-opacity-60 rounded-lg border border-cyan-700 text-cyan-100">
            <strong>Optimization Results:</strong>
            <div className="mt-2">{result}</div>
            {analysis && (
              <div className="mt-4">
                <strong>Detailed Analysis:</strong>
                <div className="mt-2 whitespace-pre-line text-cyan-200">{analysis}</div>
              </div>
            )}
            {changes && (
              <div className="mt-4">
                <strong>Changes Made:</strong>
                <ul className="list-disc list-inside mt-2 text-cyan-200">
                  {changes.map((change, idx) => (
                    <li key={idx}>{change}</li>
                  ))}
                </ul>
              </div>
            )}
            {downloadUrl && (
              <div className="mt-4">
                <a href={downloadUrl} download={file?.name?.replace(/(\.[^.]+)?$/, '_optimized.pdf')} className="glassy-button px-4 py-2 rounded text-white font-semibold">Download Optimized Resume</a>
              </div>
            )}
          </div>
        )}
        {history.length > 0 && (
          <div className="mt-10">
            <strong className="text-cyan-300">Optimization History</strong>
            <ul className="mt-2 space-y-2">
              {history.map(item => (
                <li key={item.id} className="p-3 bg-gray-900 bg-opacity-40 rounded border border-cyan-800">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <span className="font-semibold text-cyan-200">{item.fileName}</span> <span className="text-xs text-gray-400">({item.date})</span>
                      <div className="text-xs text-cyan-400 mt-1">{item.analysis.split('\n')[0]}</div>
                    </div>
                    <a href={item.downloadUrl} download={item.fileName.replace(/(\.[^.]+)?$/, '_optimized.pdf')} className="glassy-button px-2 py-1 rounded text-xs mt-2 md:mt-0">Download</a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardResumeOptimization; 