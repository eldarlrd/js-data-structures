import { reverseString } from '../../src/functions/reverseString.js';

describe('reverse text', () => {
  it('returns the text in a reversed form', () => {
    const input = 'hello world!';
    const output = '!dlrow olleh';
    expect(reverseString(input)).toBe(output);
  });
});
