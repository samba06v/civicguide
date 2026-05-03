import test from 'node:test';
import assert from 'node:assert/strict';
import { getOfflineAnswer, isElectionQuestion, offlineAnswers } from '../src/utils/electionAssistant.js';

test('returns registration guidance when question is about registering', () => {
  const result = getOfflineAnswer('How do I register to vote?');
  assert.equal(result, offlineAnswers.registration);
});

test('returns electoral college answer for electoral question', () => {
  const result = getOfflineAnswer('Explain electoral votes');
  assert.equal(result, offlineAnswers.electoral);
});

test('returns timeline response for step-based question', () => {
  const result = getOfflineAnswer('What are the election steps?');
  assert.equal(result, offlineAnswers.timeline);
});

test('returns default response for unrelated questions', () => {
  const result = getOfflineAnswer('How do I bake a cake?');
  assert.equal(result, offlineAnswers.default);
});

test('detects election-related question', () => {
  assert.equal(isElectionQuestion('Where is my polling place?'), true);
  assert.equal(isElectionQuestion('Write me a cake recipe'), false);
});
