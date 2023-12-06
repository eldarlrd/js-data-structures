import { capitalize } from '../../src/functions/capitalize.js';

describe('capitalize', () => {
  it('returns the text with a capitalized first letter', () => {
    const input = 'hello world!';
    const output = 'Hello world!';
    expect(capitalize(input)).toBe(output);
  });
});
