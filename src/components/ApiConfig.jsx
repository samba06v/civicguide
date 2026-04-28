import { useState } from 'react';
import { FaKey, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

export default function ApiConfig({ apiKey, setApiKey }) {
  const [inputKey, setInputKey] = useState(apiKey);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setApiKey(inputKey);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="api-config glass-panel">
      <div className="config-header">
        <div className="config-title">
          <FaKey color="var(--accent-color)" />
          <h3>AI Configuration</h3>
        </div>
        <p className="config-desc">
          Enter your Google Gemini API key to enable the smart assistant. Your key is only stored locally in your browser session.
        </p>
      </div>

      <form onSubmit={handleSave} className="config-form">
        <div className="input-wrapper">
          <input
            type="password"
            className="input-field api-input"
            placeholder="AIzaSy..."
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
          />
        </div>
        <button type="submit" className="btn config-btn">
          {isSaved ? <FaCheck /> : 'Save Key'}
        </button>
      </form>

      {!apiKey && (
        <div className="api-warning">
          <FaExclamationTriangle color="#fbbf24" />
          <span>Assistant is running in offline template mode.</span>
        </div>
      )}

      <style>{`
        .api-config {
          margin-bottom: 2rem;
          padding: 1.5rem 2rem;
        }

        .config-header {
          margin-bottom: 1rem;
        }

        .config-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .config-title h3 {
          margin: 0;
          font-size: 1.1rem;
        }

        .config-desc {
          color: #94a3b8;
          font-size: 0.85rem;
          margin: 0;
        }

        .config-form {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .input-wrapper {
          flex-grow: 1;
          max-width: 400px;
        }

        .api-input {
          width: 100%;
          font-family: monospace;
          letter-spacing: 0.1em;
        }

        .config-btn {
          white-space: nowrap;
          min-width: 120px;
        }

        .api-warning {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
          font-size: 0.85rem;
          color: #fbbf24;
          background: rgba(251, 191, 36, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          display: inline-flex;
        }
        
        @media (max-width: 640px) {
          .config-form {
            flex-direction: column;
            align-items: stretch;
          }
          .input-wrapper {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
