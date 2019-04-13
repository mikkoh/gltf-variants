import clone from './clone';

describe('clone', () => {
  test('did clone', () => {
    const toClone = {a: {b: 10, c: 'hello', d: [true, false, true]}};
    const cloned = clone(toClone);

    expect(cloned).toEqual(toClone);
    expect(cloned).not.toBe(toClone);
  });
});
