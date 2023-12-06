import { caesarCipher } from '../../src/functions/caesarCipher.js';

describe('caesar cipher', () => {
  it('shifts letters by 13', () => {
    const input = 'CARTHAGO DELENDA EST';
    const output = 'PNEGUNTB QRYRAQN RFG';
    expect(caesarCipher(input)).toBe(output);
  });
});
