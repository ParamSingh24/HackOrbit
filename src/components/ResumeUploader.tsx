import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, FileText, FileX, CheckSquare } from 'lucide-react';
import { toast } from 'sonner';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

type ResumeUploaderProps = {
  onAnalyze: (file: File) => void;
  onAnalyzeText?: (text: string) => void;
};

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ onAnalyze, onAnalyzeText }) => {
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
          <div
            className={`border-2 border-dashed rounded-lg mb-6 transition-colors p-8 text-center
              ${isDragging ? 'border-[#00FFFF] bg-gray-800 bg-opacity-40' : 'border-gray-700'}
              ${file ? 'bg-gray-800 bg-opacity-30' : 'bg-transparent'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {!file ? (
              <div className="py-4">
                <div className="mx-auto w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4 shadow-inner">
                  <Upload size={28} className="text-[#00FFFF]" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-white">Drop your resume here</h3>
                <p className="text-gray-400 text-sm mb-4">or click to browse from your computer</p>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="glassy-button mx-auto text-white hover:text-white"
                >
                  <FileText className="mr-2 h-4 w-4 text-[#00FFFF]" />
                  Browse Files
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.docx,.doc,.rtf,.txt"
                />
                <p className="text-xs text-gray-500 mt-4">
                  Supported formats: PDF, DOCX, DOC, RTF, TXT (Max 5MB)
                </p>
              </div>
            ) : (
              <div className="py-2">
                <div className="flex items-center justify-between glass-bubble p-4 rounded-lg border border-gray-700">
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-700 text-[#00FFFF] rounded-lg mr-4 shadow-inner">
                      <FileText size={24} />
                    </div>
                    <div>
                      <p className="font-medium text-white">{file.name}</p>
                      <p className="text-xs text-gray-400">
                        {(file.size / 1024).toFixed(1)} KB • {file.type.split('/')[1].toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleRemoveFile}
                    className="text-gray-400 hover:text-red-500 hover:bg-transparent"
                  >
                    <FileX size={18} />
                  </Button>
                </div>
                <div className="flex justify-center mt-6">
                  <div className="p-3 bg-green-700 text-green-300 rounded-full shadow-lg">
                    <CheckSquare size={24} />
                  </div>
                </div>
                <p className="text-center text-sm text-green-400 font-medium mt-2">Ready for analysis</p>
              </div>
            )}
          </div>

          <div className="text-center">
            <Button
              onClick={() => file && onAnalyze(file)}
              disabled={!file}
              size="lg"
              className="glassy-button text-white rounded-md"
            >
              {file ? "Analyze Resume" : "Upload Resume to Analyze"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeUploader;
