import { sum, countBy, getCells } from './pythagorasMatrix';

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

describe('pythagorasMatrix', () => {
  test('getCells', () => {
    const result = getCells('10.09.1985');
    expect(result).toEqual({
      calculatedNumbers: [3, 3, 0, 6, 3, 1, 0, 4],
      cells: [4, 3, 0, 3, 1, 1, 1, 0, 1, 2],
      dateNumbers: [1, 0, 0, 9, 1, 9, 8, 5],
      psyNumber: 3,
      squareNumbers: {
        '0': 4,
        '1': 3,
        '3': 3,
        '4': 1,
        '5': 1,
        '6': 1,
        '8': 1,
        '9': 2,
      },
    });
  });

  // invalid date format
});
