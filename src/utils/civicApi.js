export function buildVoterInfoUrl(address, apiKey) {
  return `https://www.googleapis.com/civicinfo/v2/voterinfo?address=${encodeURIComponent(address.trim())}&key=${encodeURIComponent(apiKey)}`;
}

export function normalizeVoterInfo(data) {
  return {
    electionName: data?.election?.name || 'Election details unavailable',
    electionDay: data?.election?.electionDay || 'Unknown date',
    pollingLocations: data?.pollingLocations?.slice(0, 3) || [],
  };
}
