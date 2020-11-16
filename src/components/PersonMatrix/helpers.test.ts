import { fill } from './helpers';

it('fills specified quantity of symbols', () => {
  expect(fill(1, 3)).toBe('111');
});
