import React, { useState } from 'react';

const API_KEY = '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';
const API_URL = 'https://api.perplexity.ai/chat/completions';
const MODEL = 'sonar';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      const assistantMessage = data.choices?.[0]?.message?.content || 'No response';
      setMessages([...newMessages, { role: 'assistant', content: assistantMessage }]);
    } catch (err: any) {
      setError('Failed to get response.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  // Close chat when clicking outside the chat window
  React.useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      const chat = document.getElementById('chatbot-modal');
      if (chat && !chat.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <>
      {/* Floating Chatbot Icon Button */}
      <button
        aria-label="Open chatbot"
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          background: '#007bff',
          border: 'none',
          borderRadius: '50%',
          width: 56,
          height: 56,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          display: open ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        {/* Simple chat bubble SVG */}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </button>

      {/* Chatbot Modal/Popover */}
      {open && (
        <div
          id="chatbot-modal"
          style={{
            position: 'fixed',
            bottom: 90,
            right: 24,
            zIndex: 1001,
            width: 360,
            maxWidth: '90vw',
            background: '#fff',
            border: '1px solid #ddd',
            borderRadius: 12,
            boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #eee', background: '#f7f7f7', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
            <span style={{ fontWeight: 600 }}>Chatbot</span>
            <button onClick={() => setOpen(false)} aria-label="Close chatbot" style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#888' }}>&times;</button>
          </div>
          <div style={{ minHeight: 200, maxHeight: 300, overflowY: 'auto', marginBottom: 0, background: '#f9f9f9', padding: 12, borderRadius: 0, flex: 1 }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ textAlign: msg.role === 'user' ? 'right' : 'left', margin: '6px 0' }}>
                <span style={{ fontWeight: msg.role === 'user' ? 600 : 400 }}>
                  {msg.role === 'user' ? 'You' : 'Bot'}:
                </span> {msg.content}
              </div>
            ))}
            {loading && <div>Bot is typing...</div>}
          </div>
          <div style={{ display: 'flex', gap: 8, padding: 12, borderTop: '1px solid #eee', background: '#fafbfc', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Type your message..."
              style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              disabled={loading}
              autoFocus
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()} style={{ padding: '8px 16px', borderRadius: 4, background: '#007bff', color: '#fff', border: 'none' }}>
              Send
            </button>
          </div>
          {error && <div style={{ color: 'red', margin: '8px 16px' }}>{error}</div>}
        </div>
      )}
    </>
  );
};

export default Chatbot; 