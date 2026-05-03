import test from 'node:test';
import assert from 'node:assert/strict';
import { buildVoterInfoUrl, normalizeVoterInfo } from '../src/utils/civicApi.js';

test('buildVoterInfoUrl encodes address and key', () => {
  const url = buildVoterInfoUrl('1600 Pennsylvania Ave NW, Washington, DC', 'abc123');
  assert.match(url, /googleapis\.com\/civicinfo\/v2\/voterinfo/);
  assert.match(url, /address=1600%20Pennsylvania%20Ave%20NW%2C%20Washington%2C%20DC/);
  assert.match(url, /key=abc123/);
});

test('normalizeVoterInfo returns stable defaults', () => {
  const result = normalizeVoterInfo({});
  assert.equal(result.electionName, 'Election details unavailable');
  assert.equal(result.electionDay, 'Unknown date');
  assert.deepEqual(result.pollingLocations, []);
});
