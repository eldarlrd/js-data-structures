import { calculator } from '../../src/functions/calculator.js';

describe('calculator', () => {
  it('adds two numbers', () => {
    const inputA = 9;
    const inputB = 10;
    const output = 19;
    expect(calculator.add(inputA, inputB)).toBe(output);
  });

  it('subtracts two numbers', () => {
    const inputA = 21;
    const inputB = 10;
    const output = 11;
    expect(calculator.subtract(inputA, inputB)).toBe(output);
  });

  it('multiplies two numbers', () => {
    const inputA = 7;
    const inputB = 11;
    const output = 77;
    expect(calculator.multiply(inputA, inputB)).toBe(output);
  });

  it('divides two numbers', () => {
    const inputA = 12;
    const inputB = 4;
    const output = 3;
    expect(calculator.divide(inputA, inputB)).toBe(output);
  });
});
