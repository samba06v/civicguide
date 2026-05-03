import { useState } from 'react';
import { buildPollingMapLink, buildVoterInfoUrl, normalizeVoterInfo } from '../utils/civicApi';

export default function VoterInfoLookup({ apiKey }) {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!apiKey || !address.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const endpoint = buildVoterInfoUrl(address, apiKey);
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Google Civic API request failed (${response.status})`);
      }
      const data = await response.json();
      setResult(normalizeVoterInfo(data));
    } catch (err) {
      setError(err.message || 'Unable to fetch voter info.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="glass-panel" style={{ marginTop: '1.5rem' }}>
      <h2 style={{ marginBottom: '0.5rem' }}>Google Civic + Google Maps Voter Tools</h2>
      <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>
        Fetch official election details from Google Civic Information API and open polling addresses in Google Maps.
      </p>

      <form onSubmit={handleLookup} className="config-form">
        <input
          type="text"
          className="input-field"
          placeholder="Enter full address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={!apiKey || loading}
          aria-label="Address for voter information lookup"
        />
        <button type="submit" className="btn" disabled={!apiKey || !address.trim() || loading}>
          {loading ? 'Checking...' : 'Lookup'}
        </button>
      </form>

      {!apiKey && <p style={{ marginTop: '0.75rem', color: '#fbbf24' }}>Add API key above to use Google Civic services.</p>}
      {error && <p style={{ marginTop: '0.75rem', color: '#fda4af' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: '1rem' }}>
          <p><strong>Election:</strong> {result.electionName}</p>
          <p><strong>Election Day:</strong> {result.electionDay}</p>

          <h3 style={{ marginTop: '0.75rem', marginBottom: '0.4rem', fontSize: '1rem' }}>Polling Locations</h3>
          {result.pollingLocations.length === 0 ? (
            <p>No polling locations returned for this address.</p>
          ) : (
            <ul style={{ paddingLeft: '1rem' }}>
              {result.pollingLocations.map((location, index) => {
                const line = location?.address?.line1 || 'Address unavailable';
                return (
                  <li key={`${location?.address?.locationName || 'loc'}-${index}`}>
                    {location?.address?.locationName || 'Polling station'} - {line} {' '}
                    <a href={buildPollingMapLink(line)} target="_blank" rel="noreferrer">Open in Google Maps</a>
                  </li>
                );
              })}
            </ul>
          )}

          <h3 style={{ marginTop: '0.75rem', marginBottom: '0.4rem', fontSize: '1rem' }}>Election Officials</h3>
          {result.electionOfficials.length === 0 ? (
            <p>No election officials returned in this result.</p>
          ) : (
            <ul style={{ paddingLeft: '1rem' }}>
              {result.electionOfficials.map((official, index) => (
                <li key={`${official?.name || 'official'}-${index}`}>
                  {official?.name || 'Official'}{official?.title ? ` (${official.title})` : ''}
                  {official?.officePhoneNumber ? ` - ${official.officePhoneNumber}` : ''}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
