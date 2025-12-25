import { analyzeArray } from '../../src/functions/analyzeArray.js';

describe('array analyzer', () => {
  it('returns an object with analysis', () => {
    const input = [1, 8, 3, 4, 2, 6];
    const output = {
      average: 4,
      min: 1,
      max: 8,
      length: 6
    };

    expect(analyzeArray(input)).toStrictEqual(output);
  });
});
