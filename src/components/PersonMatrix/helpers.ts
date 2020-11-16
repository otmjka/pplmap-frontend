export const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

export const fill = (ch: number, times: number): string => {
  let str = '';
  for (let i = 0; i < times; i++) {
    str = `${str}${ch}`;
  }
  return str;
};
