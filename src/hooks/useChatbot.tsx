import { useState, useRef, useEffect } from 'react';

const API_KEY = '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';
const API_URL = 'https://api.perplexity.ai/chat/completions';
const MODEL = 'sonar';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function useChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

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

  return {
    messages,
    input,
    setInput,
    loading,
    error,
    sendMessage,
    messagesEndRef,
  };
} 