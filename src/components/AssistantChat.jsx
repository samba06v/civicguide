import { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaRobot, FaUser, FaSpinner } from 'react-icons/fa';
import { GoogleGenAI } from '@google/genai';

export default function AssistantChat({ apiKey }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Hello! I am your Election Process Assistant. I can help answer questions about voter registration, important dates, or how the electoral system works. What would you like to know?',
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    const newUserMsg = { id: Date.now(), role: 'user', content: userMessage };
    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    if (!apiKey) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          role: 'assistant',
          content: "I'm currently running in offline mode because no Gemini API key was provided. I can't generate dynamic answers right now. Please enter your API key in the configuration panel above to unlock my full capabilities!"
        }]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: apiKey });
      
      const promptContext = `You are a helpful, neutral, and educational assistant designed to explain the election process, timelines, and democratic systems. Answer the following question clearly and concisely. If the question is not related to elections or civics, politely redirect the conversation. User question: ${userMessage}`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: promptContext,
      });

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.text
      }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error.message || 'Could not connect to AI service'}.`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <FaRobot size={24} color="var(--primary-color)" />
        <div>
          <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Smart Election Assistant</h2>
          <span style={{ fontSize: '0.75rem', color: apiKey ? 'var(--success-color)' : '#fbbf24' }}>
            {apiKey ? '🟢 Online (Gemini AI Active)' : '🟡 Offline (API Key Required)'}
          </span>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-wrapper ${msg.role}`}>
            <div className={`message-bubble ${msg.role}`}>
              {msg.role === 'assistant' && (
                <div className="message-icon assistant">
                  <FaRobot size={12} />
                </div>
              )}
              {msg.role === 'user' && (
                <div className="message-icon user">
                  <FaUser size={12} />
                </div>
              )}
              <div className="message-content">
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message-wrapper assistant">
            <div className="message-bubble assistant loading">
              <FaSpinner className="spinner" /> Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-area" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="chat-input"
          placeholder="Ask a question about the election process..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button type="submit" className="chat-send-btn" disabled={!input.trim() || isLoading}>
          <FaPaperPlane />
        </button>
      </form>

      <style>{`
        .chat-container {
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          height: 100%;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .chat-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(15, 23, 42, 0.5);
        }

        .chat-messages {
          flex-grow: 1;
          padding: 1.5rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .message-wrapper {
          display: flex;
          width: 100%;
        }

        .message-wrapper.user {
          justify-content: flex-end;
        }

        .message-bubble {
          max-width: 80%;
          padding: 1rem;
          border-radius: 16px;
          display: flex;
          gap: 0.75rem;
          font-size: 0.95rem;
          line-height: 1.5;
          position: relative;
        }

        .message-bubble.assistant {
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid var(--border-color);
          border-bottom-left-radius: 4px;
        }

        .message-bubble.user {
          background: var(--primary-color);
          color: white;
          border-bottom-right-radius: 4px;
          flex-direction: row-reverse;
        }

        .message-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .message-icon.assistant {
          background: rgba(59, 130, 246, 0.2);
          color: #60a5fa;
        }

        .message-icon.user {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .message-content {
          white-space: pre-wrap;
          word-break: break-word;
        }

        .chat-input-area {
          padding: 1rem;
          border-top: 1px solid var(--border-color);
          display: flex;
          gap: 0.5rem;
          background: rgba(15, 23, 42, 0.3);
        }

        .chat-input {
          flex-grow: 1;
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid var(--border-color);
          color: var(--text-color);
          padding: 0.75rem 1rem;
          border-radius: 24px;
          font-size: 0.95rem;
          font-family: inherit;
        }

        .chat-input:focus {
          outline: none;
          border-color: var(--primary-color);
        }

        .chat-send-btn {
          background: var(--primary-color);
          color: white;
          border: none;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .chat-send-btn:hover:not(:disabled) {
          background: var(--primary-hover);
        }

        .chat-send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        .message-bubble.loading {
          align-items: center;
          font-style: italic;
          color: #94a3b8;
        }

        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
