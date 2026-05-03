import { useState } from 'react';
import Timeline from './components/Timeline';
import AssistantChat from './components/AssistantChat';
import ApiConfig from './components/ApiConfig';

function App() {
  const [apiKey, setApiKey] = useState(() => window.localStorage.getItem('civicguide_gemini_api_key') || '');

  const handleApiKeyChange = (newKey) => {
    setApiKey(newKey);
    if (newKey) {
      window.localStorage.setItem('civicguide_gemini_api_key', newKey);
      return;
    }
    window.localStorage.removeItem('civicguide_gemini_api_key');
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>CivicGuide: Election Process Education</h1>
        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          Interactive Timeline & Smart Assistant
        </div>
      </header>

      <ApiConfig apiKey={apiKey} setApiKey={handleApiKeyChange} />

      <main className="main-content">
        <section className="timeline-section" style={{ height: '600px' }}>
          <Timeline />
        </section>

        <section className="assistant-section" style={{ height: '600px' }}>
          <AssistantChat apiKey={apiKey} />
        </section>
      </main>

      <section className="glass-panel" style={{ marginTop: '1.5rem' }}>
        <h2 style={{ marginBottom: '0.75rem' }}>Official Election Resources</h2>
        <ul style={{ paddingLeft: '1rem', lineHeight: '1.8' }}>
          <li><a href="https://www.usa.gov/voting-and-elections" target="_blank" rel="noreferrer">USA.gov Voting and Elections Guide</a></li>
          <li><a href="https://www.eac.gov/voters" target="_blank" rel="noreferrer">U.S. Election Assistance Commission (EAC)</a></li>
          <li><a href="https://www.usa.gov/state-election-office" target="_blank" rel="noreferrer">Find your State Election Office</a></li>
        </ul>
      </section>

      <footer style={{ marginTop: '3rem', textAlign: 'center', color: '#64748b', fontSize: '0.875rem' }}>
        <p>Built for the PromptWars Challenge: Election Process Education</p>
      </footer>
    </div>
  );
}

export default App;
