import compactTags from './compact-tags';

describe('compactTags', () => {
  const tag1 = 'tag1';
  const tag2 = 'tag2';

  test('removes duplicates', () => {
    const tags = [tag1, tag2, tag1, tag2, tag1];

    expect(compactTags(tags)).toEqual([tag1, tag2]);
  });
});
