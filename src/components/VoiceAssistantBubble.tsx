import React, { useState, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Power, MoreHorizontal } from 'lucide-react';

const VoiceAssistantBubble: React.FC = () => {
  const [open, setOpen] = useState(false); // collapsed by default
  const [expanded, setExpanded] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef(window.speechSynthesis);
  const [lastCommand, setLastCommand] = useState('');

  // Voice input: Speech-to-text for navigation
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setLastCommand(transcript);
      // Example: simple navigation commands
      if (/home/i.test(transcript)) window.scrollTo({ top: 0, behavior: 'smooth' });
      if (/features/i.test(transcript)) document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
      if (/pricing/i.test(transcript)) document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
      if (/contact|footer/i.test(transcript)) document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  };
  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  // Voice output: Text-to-speech for selected text or provided string
  const speak = (text?: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }
    stopSpeaking();
    let toRead = text;
    if (!toRead) {
      // Try to read selected text
      toRead = window.getSelection()?.toString() || '';
      if (!toRead) {
        alert('Select some text on the page to read aloud, or provide text.');
        return;
      }
    }
    const utter = new window.SpeechSynthesisUtterance(toRead);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    setSpeaking(true);
    synthRef.current.speak(utter);
  };
  const stopSpeaking = () => {
    synthRef.current.cancel();
    setSpeaking(false);
  };

  // Handle click outside to collapse
  React.useEffect(() => {
    if (!expanded) return;
    const handleClick = (e: MouseEvent) => {
      const bubble = document.getElementById('voice-assistant-bubble');
      if (bubble && !bubble.contains(e.target as Node)) {
        setExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [expanded]);

  if (!open) {
    return (
      <div className="fixed bottom-6 left-6 z-[1000]">
        <button
          id="voice-assistant-bubble"
          className="glass-box rounded-full w-14 h-14 flex items-center justify-center shadow-lg border border-cyan-400 bg-black bg-opacity-60 hover:scale-110 transition-all"
          onClick={() => setOpen(true)}
          title="Open Voice Assistant"
        >
          <MoreHorizontal size={28} className="text-cyan-400" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-[1000] flex flex-col items-center">
      <div id="voice-assistant-bubble" className="relative">
        <button
          className="glass-box rounded-full w-14 h-14 flex items-center justify-center shadow-lg border border-cyan-400 bg-black bg-opacity-60 hover:scale-110 transition-all"
          onClick={() => setExpanded(e => !e)}
          title="Voice Assistant Options"
        >
          <MoreHorizontal size={28} className="text-cyan-400" />
        </button>
        {expanded && (
          <div className="absolute left-20 bottom-0 flex flex-col gap-3 p-4 glass-box rounded-xl border border-cyan-400 bg-black bg-opacity-80 shadow-2xl min-w-[180px]">
            {/* Disabled state overlay */}
            {disabled && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-xl z-10">
                <Power className="text-gray-400" size={32} />
              </div>
            )}
            {/* Mic for navigation */}
            {!listening ? (
              <button
                className="text-cyan-400 hover:text-cyan-200 bg-transparent border-none outline-none flex items-center gap-2"
                title="Start voice navigation"
                onClick={startListening}
                disabled={disabled}
              >
                <Mic size={22} /> <span className="text-sm">Voice Nav</span>
              </button>
            ) : (
              <button
                className="text-red-400 hover:text-red-200 bg-transparent border-none outline-none flex items-center gap-2"
                title="Stop voice navigation"
                onClick={stopListening}
              >
                <MicOff size={22} /> <span className="text-sm">Stop Nav</span>
              </button>
            )}
            {/* Speaker for read aloud */}
            {!speaking ? (
              <button
                className="text-cyan-400 hover:text-cyan-200 bg-transparent border-none outline-none flex items-center gap-2"
                title="Read selected text aloud"
                onClick={() => speak()}
                disabled={disabled}
              >
                <Volume2 size={22} /> <span className="text-sm">Read Aloud</span>
              </button>
            ) : (
              <button
                className="text-red-400 hover:text-red-200 bg-transparent border-none outline-none flex items-center gap-2"
                title="Stop reading"
                onClick={stopSpeaking}
              >
                <VolumeX size={22} /> <span className="text-sm">Stop Read</span>
              </button>
            )}
            {/* Last command display */}
            <div className="mt-2 text-xs text-cyan-200 max-w-[140px] text-center truncate" title={lastCommand}>{lastCommand && !disabled ? `"${lastCommand}"` : ''}</div>
            {/* Close/disable button */}
            <button
              className="mt-2 text-gray-400 hover:text-red-400 bg-transparent border-none outline-none flex items-center gap-2"
              title="Disable voice assistant"
              onClick={() => setOpen(false)}
            >
              <Power size={18} /> <span className="text-xs">Close</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceAssistantBubble; 