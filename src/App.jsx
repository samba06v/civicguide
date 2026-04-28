import { useState } from 'react';
import Timeline from './components/Timeline';
import AssistantChat from './components/AssistantChat';
import ApiConfig from './components/ApiConfig';

function App() {
  const [apiKey, setApiKey] = useState('');

  return (
    <div className="app-container">
      <header className="header">
        <h1>CivicGuide: Election Process Education</h1>
        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          Interactive Timeline & Smart Assistant
        </div>
      </header>

      <ApiConfig apiKey={apiKey} setApiKey={setApiKey} />

      <main className="main-content">
        <section className="timeline-section" style={{ height: '600px' }}>
          <Timeline />
        </section>
        
        <section className="assistant-section" style={{ height: '600px' }}>
          <AssistantChat apiKey={apiKey} />
        </section>
      </main>
      
      <footer style={{ marginTop: '3rem', textAlign: 'center', color: '#64748b', fontSize: '0.875rem' }}>
        <p>Built for the PromptWars Challenge: Election Process Education</p>
      </footer>
    </div>
  );
}

export default App;
