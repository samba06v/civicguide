export const offlineAnswers = {
  registration: 'Voter registration requirements differ by state, but generally you must meet age, citizenship, and residency requirements, then register before your state deadline.',
  electoral: 'In the Electoral College system, voters choose electors. Most states award electors winner-take-all. A candidate needs 270 electoral votes to win.',
  timeline: 'A typical U.S. presidential cycle includes registration, primaries/caucuses, conventions, general campaign, Election Day, Electoral College vote, and inauguration.',
  default: 'I can help with election timelines, registration steps, voting methods, and civic process basics. Add an API key for deeper AI explanations.'
};

export function getOfflineAnswer(question) {
  const q = question.toLowerCase();
  if (q.includes('register')) return offlineAnswers.registration;
  if (q.includes('electoral')) return offlineAnswers.electoral;
  if (q.includes('timeline') || q.includes('steps')) return offlineAnswers.timeline;
  return offlineAnswers.default;
}

export function isElectionQuestion(question) {
  const keywords = ['vote', 'voter', 'election', 'register', 'ballot', 'electoral', 'polling', 'caucus', 'primary'];
  const q = question.toLowerCase();
  return keywords.some((word) => q.includes(word));
}
