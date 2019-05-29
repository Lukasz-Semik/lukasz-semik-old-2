import { prepareLetters } from './startCounterHelpers';

describe('prepareLetter()', () => {
  it('should return empty array for wrong arguments', () => {
    expect(prepareLetters()).toEqual([]);
    expect(prepareLetters('')).toEqual([]);
    expect(prepareLetters(1)).toEqual([]);
  });

  it('should return proper array of objects', () => {
    const result = prepareLetters('a');

    expect(result).toHaveLength(1);
    expect(result[0].content).toBe('a');
    expect(result[0].delay).toEqual(expect.any(String));
    expect(result[0].isLast).toBe(true);
  });
});
