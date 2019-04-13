import compactVariants from './compact-variants';
import {ITaggedNode} from './inode-with-variant-extension';

describe('compactVariants', () => {
  const tag1 = 'tag1';
  const tag2 = 'tag2';

  const variant1: ITaggedNode = {
    tags: [tag1],
  };
  const variant2: ITaggedNode = {
    tags: [tag2],
    mesh: 0,
  };
  const variant3: ITaggedNode = {
    tags: [tag2],
  };

  test('returns same if nothing to compact', () => {
    const variants = [variant1, variant2];

    expect(compactVariants(variants)).toEqual(variants);
  });

  test('compacts when same', () => {
    const variants1 = [variant1, variant1];
    const variants2 = [variant2, variant2];

    expect(compactVariants(variants1)).toEqual([variant1]);
    expect(compactVariants(variants2)).toEqual([variant2]);
  });

  test('adds tag when the same but different tags', () => {
    const variants = [variant1, variant3];

    expect(compactVariants(variants)).toEqual([{
      tags: [tag1, tag2],
    }]);
  });
});
