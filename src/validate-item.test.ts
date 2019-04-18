import validateItem from './validate-item';

describe('validateItem', () => {
  test('does not throw an error when valid', () => {
    const item = {
      name: 'i-have-a-name',
    };

    expect(validateItem(item)).toBe(null);
  });

  test('does throw an error when not valid', () => {
    const item = {};

    expect(validateItem(item)).toBe('does not include name');
  });
});
