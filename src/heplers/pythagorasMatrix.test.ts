import { sum, countBy } from './pythagorasMatrix';

describe('lodash substitute', () => {
  test('[sum] function', () => {
    const result: number = sum([2, 4, 15]);
    expect(result).toBe(21);
  });

  test('[countBy] function', () => {
    const result: Record<string, number> = countBy([2, 2, 1, 7, 3, 1, 1, 1, 7]);
    expect(result).toEqual({
      '1': 4,
      '2': 2,
      '3': 1,
      '7': 2,
    });
  });
});

export {};
