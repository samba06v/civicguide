import { useMemo, useRef, useState } from 'react';
import { FaPaperPlane, FaRobot, FaUser, FaSpinner } from 'react-icons/fa';
import { GoogleGenAI } from '@google/genai';
import { getOfflineAnswer, isElectionQuestion } from '../utils/electionAssistant';

const quickPrompts = [
  'What are the key steps in a U.S. presidential election?',
  'How does voter registration work?',
  'What is the Electoral College?',
  'Can you explain early voting and mail-in ballots?'
];


export default function AssistantChat({ apiKey }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Hello! I am your Election Process Assistant. Ask me about timelines, registration, voting methods, or election rules.',
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const promptContext = useMemo(() => `You are CivicGuide, a neutral civic-education assistant.
Rules:
- Focus only on election process education.
- Prefer step-by-step explanations.
- Mention that procedures vary by country/state when relevant.
- Never provide partisan persuasion.
- If asked for legal advice, suggest checking official election authority websites.
- Keep responses concise and beginner-friendly.`, []);

  const addAssistantMessage = (content) => {
    setMessages((prev) => [...prev, { id: Date.now() + Math.random(), role: 'assistant', content }]);
  };

  const handleQuickPrompt = (prompt) => {
    setInput(prompt);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', content: userMessage }]);
    setIsLoading(true);

    if (!apiKey) {
      setTimeout(() => {
        addAssistantMessage(isElectionQuestion(userMessage) ? getOfflineAnswer(userMessage) : 'I focus on election education. Please ask about voting, registration, ballots, timelines, or civic process.');
        setIsLoading(false);
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${promptContext}\n\nUser question: ${userMessage}`,
      });
      addAssistantMessage(response.text || 'I could not generate a response. Please try again.');
    } catch (error) {
      addAssistantMessage(`Sorry, I encountered an error: ${error.message || 'Could not connect to AI service'}.`);
    } finally {
      setIsLoading(false);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="chat-container" aria-live="polite">
      <div className="chat-header">
        <FaRobot size={24} color="var(--primary-color)" aria-hidden="true" />
        <div>
          <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Smart Election Assistant</h2>
          <span style={{ fontSize: '0.75rem', color: apiKey ? 'var(--success-color)' : '#fbbf24' }}>
            {apiKey ? '🟢 Online (Gemini AI Active)' : '🟡 Offline (Educational Mode)'}
          </span>
        </div>
      </div>

      <div className="quick-prompts" role="group" aria-label="Suggested questions">
        {quickPrompts.map((prompt) => (
          <button key={prompt} type="button" className="quick-btn" onClick={() => handleQuickPrompt(prompt)}>
            {prompt}
          </button>
        ))}
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-wrapper ${msg.role}`}>
            <div className={`message-bubble ${msg.role}`}>
              {msg.role === 'assistant' && <div className="message-icon assistant"><FaRobot size={12} /></div>}
              {msg.role === 'user' && <div className="message-icon user"><FaUser size={12} /></div>}
              <div className="message-content">{msg.content}</div>
            </div>
          </div>
        ))}
        {isLoading && <div className="message-wrapper assistant"><div className="message-bubble assistant loading"><FaSpinner className="spinner" /> Thinking...</div></div>}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-area" onSubmit={handleSendMessage}>
        <label htmlFor="chat-input" className="sr-only">Ask a question about elections</label>
        <input
          id="chat-input"
          type="text"
          className="chat-input"
          placeholder="Ask a question about the election process..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button type="submit" className="chat-send-btn" disabled={!input.trim() || isLoading} aria-label="Send message">
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
}
