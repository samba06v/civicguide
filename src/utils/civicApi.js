export function buildVoterInfoUrl(address, apiKey) {
  return `https://www.googleapis.com/civicinfo/v2/voterinfo?address=${encodeURIComponent(address.trim())}&key=${encodeURIComponent(apiKey)}`;
}

export function buildPollingMapLink(address) {
  const encodedAddress = encodeURIComponent(address || '');
  return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
}

export function normalizeVoterInfo(data) {
  return {
    electionName: data?.election?.name || 'Election details unavailable',
    electionDay: data?.election?.electionDay || 'Unknown date',
    pollingLocations: data?.pollingLocations?.slice(0, 3) || [],
    electionOfficials: data?.state?.flatMap((item) => item?.electionAdministrationBody?.electionOfficials || []).slice(0, 5) || [],
  };
}
