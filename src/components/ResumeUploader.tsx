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
    <section id="upload" ref={sectionRef} className="py-16 bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden flex items-center justify-center">
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

        /* Input field focus glow */
        .input-glow:focus {
            outline: none;
            border-color: #00FBFF; /* Cyan border on focus */
            box-shadow: 0 0 0 3px rgba(0, 251, 255, 0.5); /* Cyan glow effect on focus */
        }

        /* Separator line style */
        .break {
          height: 2px; /* Thin line height */
          width: 80%; /* 80% of parent width */
          background: linear-gradient(to right, transparent, #00FFFF, transparent); /* Cyan gradient fading out */
          margin: 2rem auto; /* Center the line and add vertical spacing */
          border-radius: 9999px; /* Fully rounded caps for the line */
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.4); /* Subtle glow */
        }
      `}</style>
      <div className="max-w-3xl mx-auto px-4 flex flex-col items-center justify-center w-full">
        <div className="text-center mb-10">
          <h2 className={`text-4xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            Analyze Your Resume
          </h2>
          <p className={`text-lg text-white text-center mb-12 max-w-3xl mx-auto ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            Upload your resume to get AI-powered insights about your skills,
            identify gaps, and receive personalized learning recommendations.
          </p>
        </div>

        <div className={`glass-box p-8 shadow-md border border-gray-800 w-full flex flex-col items-center gap-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
          {/* Upload PDF Section */}
          <div className="flex-1 min-w-[220px] w-full">
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

          {/* Separator */}
          <div className="break"></div>

          {/* Analyze URL Section */}
          <div className="flex-1 min-w-[220px] flex flex-col justify-between w-full">
            <div className="mb-4">
              <label htmlFor="resume-url" className="block mb-2 font-medium text-white">Analyze from URL</label>
              <div className="flex flex-col gap-2">
                <input
                  id="resume-url"
                  type="url"
                  value={analyzeUrl || ''}
                  onChange={e => setAnalyzeUrl && setAnalyzeUrl(e.target.value)}
                  placeholder="Paste resume file URL (PDF, DOCX, etc.)"
                  className="flex-1 border border-gray-700 rounded px-3 py-2 bg-transparent text-white placeholder-gray-500 input-glow"
                  disabled={isUploading}
                />
                <Button
                  onClick={onAnalyzeUrl}
                  disabled={!analyzeUrl || isUploading}
                  className="glassy-button text-white px-4 py-2 rounded"
                >
                  Analyze URL
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeUploader;
