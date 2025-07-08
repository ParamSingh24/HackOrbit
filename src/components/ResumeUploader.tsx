import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, FileText, FileX, CheckSquare } from 'lucide-react';
import { toast } from 'sonner';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

type ResumeUploaderProps = {
  onAnalyze: (file: File) => void;
  onAnalyzeText?: (text: string) => void;
  analyzeUrl?: string;
  setAnalyzeUrl?: (url: string) => void;
  onAnalyzeUrl?: () => void;
  isUploading?: boolean;
};

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ onAnalyze, onAnalyzeText, analyzeUrl, setAnalyzeUrl, onAnalyzeUrl, isUploading }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      await validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = async (selectedFile: File) => {
    // Allow only PDF, DOCX, DOC, RTF, TXT files
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'application/rtf', 'text/plain'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Please upload a valid resume file (PDF, DOCX, DOC, RTF, or TXT)");
      return;
    }

    if (selectedFile.size > maxSize) {
      toast.error("File size exceeds 5MB. Please upload a smaller file.");
      return;
    }

    setFile(selectedFile);
    toast.success("Resume file selected successfully!");

    // If PDF, extract text
    if (selectedFile.type === 'application/pdf' && onAnalyzeText) {
      const text = await extractTextFromPDF(selectedFile);
      onAnalyzeText(text);
    }
  };

  async function extractTextFromPDF(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item: any) => item.str).join(' ') + '\n';
    }
    return text;
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section id="upload" ref={sectionRef} className="py-16 bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
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

        /* Glass Bubble Styles (for inner elements like AI messages) */
        .glass-bubble {
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            transition: background 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
            box-shadow: 0 2px 8px rgba(0, 251, 255, 0.1);
        }
        .glass-bubble:hover {
            background: rgba(0, 0, 0, 0.5);
            box-shadow: 0 4px 12px rgba(0, 251, 255, 0.2);
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
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className={`text-4xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            Analyze Your Resume
          </h2>
          <p className={`text-lg text-white text-center mb-12 max-w-3xl mx-auto ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            Upload your resume to get AI-powered insights about your skills,
            identify gaps, and receive personalized learning recommendations.
          </p>
        </div>

        <div className={`glass-box p-8 shadow-md border border-gray-800 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
          <div className="flex flex-col md:flex-row gap-6 items-stretch justify-center">
            {/* Upload PDF Section */}
            <div className="flex-1 min-w-[220px]">
              <div
                className={`border-2 border-dashed rounded-lg mb-4 transition-colors p-8 text-center
                  ${isDragging ? 'border-[#00FFFF] bg-gray-800 bg-opacity-40' : 'border-gray-700'}
                  ${file ? 'bg-gray-800 bg-opacity-30' : 'bg-transparent'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.rtf,.txt"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
                <div className="flex flex-col items-center justify-center h-full">
                  <Upload className="h-10 w-10 text-[#00FFFF] mb-2" />
                  <p className="mb-2 text-gray-200">Drag & drop or <span className="text-[#00FFFF] underline cursor-pointer" onClick={() => fileInputRef.current?.click()}>browse</span> to upload PDF/DOCX/DOC/RTF/TXT</p>
                  {file && (
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <FileText className="h-5 w-5 text-[#00FFFF]" />
                      <span className="text-sm text-white">{file.name}</span>
                      <button onClick={handleRemoveFile} className="ml-2 text-red-400 hover:text-red-600"><FileX className="h-4 w-4" /></button>
                    </div>
                  )}
                </div>
              </div>
              <Button
                className="w-full glassy-button mt-2"
                onClick={() => file && onAnalyze(file)}
                disabled={!file || isUploading}
              >
                Analyze PDF
              </Button>
            </div>
            {/* Analyze URL Section */}
            <div className="flex-1 min-w-[220px] flex flex-col justify-between">
              <div className="mb-4">
                <label htmlFor="resume-url" className="block mb-2 font-medium text-white">Analyze from URL</label>
                <div className="flex gap-2">
                  <input
                    id="resume-url"
                    type="url"
                    value={analyzeUrl || ''}
                    onChange={e => setAnalyzeUrl && setAnalyzeUrl(e.target.value)}
                    placeholder="Paste resume file URL (PDF, DOCX, etc.)"
                    className="flex-1 border border-gray-700 rounded px-3 py-2 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFFF] focus:shadow-[0_0_0_3px_rgba(0,255,255,0.5)] transition-all duration-200"
                    disabled={isUploading}
                  />
                  <Button
                    onClick={onAnalyzeUrl}
                    disabled={!analyzeUrl || isUploading}
                    className="glassy-button text-white px-4 py-2 rounded hover:text-white"
                  >
                    Analyze URL
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeUploader;
