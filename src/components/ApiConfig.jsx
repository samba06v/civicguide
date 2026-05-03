import { useState } from 'react';
import { FaKey, FaCheck, FaExclamationTriangle, FaTrash } from 'react-icons/fa';

export default function ApiConfig({ apiKey, setApiKey }) {
  const [inputKey, setInputKey] = useState(apiKey);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setApiKey(inputKey.trim());
    setIsSaved(true);
    window.setTimeout(() => setIsSaved(false), 3000);
  };

  const handleClear = () => {
    setInputKey('');
    setApiKey('');
  };

  return (
    <div className="api-config glass-panel">
      <div className="config-header">
        <div className="config-title">
          <FaKey color="var(--accent-color)" />
          <h3>AI Configuration</h3>
        </div>
        <p className="config-desc">Enter your Google Gemini API key. It is stored only in your browser localStorage.</p>
      </div>

      <form onSubmit={handleSave} className="config-form">
        <div className="input-wrapper">
          <label htmlFor="gemini-key" className="sr-only">Gemini API key</label>
          <input id="gemini-key" type="password" className="input-field api-input" placeholder="AIzaSy..." value={inputKey} onChange={(e) => setInputKey(e.target.value)} autoComplete="off" />
        </div>
        <button type="submit" className="btn config-btn">{isSaved ? <FaCheck /> : 'Save Key'}</button>
        <button type="button" className="btn btn-secondary config-btn" onClick={handleClear} aria-label="Clear saved key"><FaTrash /> Clear</button>
      </form>

      {!apiKey && (
        <div className="api-warning">
          <FaExclamationTriangle color="#fbbf24" />
          <span>Assistant is running in offline educational mode.</span>
        </div>
      )}
    </div>
  );
}
