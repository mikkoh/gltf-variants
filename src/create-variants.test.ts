import {INode} from 'babylonjs-gltf2interface';
import IChildRootPropertyWithVariantExtension from './i-child-root-property-variant-extension';
import createItemWithVariants from './create-variants';

describe('createNodesWithVariants', () => {
  const nameSmall = 'smallNode';
  const tagSmall = 'smallTag';
  const nameLarge = 'largeNode';

  let smallNode: INode;
  let smallNodeDiff: INode;
  let largeNode: INode;
  let smallNodeWithVariants: IChildRootPropertyWithVariantExtension;

  beforeEach(() => {
    smallNode = {
      name: nameSmall,
      mesh: 0,
    };
    smallNodeDiff = {
      name: nameSmall,
      mesh: 1,
    };
    largeNode = {
      name: nameLarge,
      mesh: 2,
    };
    smallNodeWithVariants = {
      ...smallNode,
      extensions: {
        SHOPIFY_variant: [
          {
            tags: [tagSmall]
          }
        ]
      }
    };
  });

  test('handles tagging existing node', () => {
    const tags = [tagSmall];
    const newNodes = createItemWithVariants(tags, [smallNode], []);

    expect(newNodes).toEqual([
      {
        ...smallNode,
        extensions: {
          SHOPIFY_variant: [
            {
              tags,
            }
          ],
        }
      },
    ]);
  });

  test('handles node addition', () => {
    const tags = [tagSmall];
    const newNodes = createItemWithVariants(tags, [], [smallNode]);

    expect(newNodes).toEqual([
      {
        name: smallNode.name,
        extensions: {
          SHOPIFY_variant: [
            {
              tags,
              mesh: smallNode.mesh,
            }
          ],
        }
      },
    ]);
  });

  test('handles node addition when another node exists', () => {
    const tags = [tagSmall];
    const newNodes = createItemWithVariants(tags, [smallNode], [largeNode]);

    expect(newNodes).toHaveLength(2);
    expect(newNodes).toEqual([
      {
        ...smallNode,
        extensions: {
          SHOPIFY_variant: [
            {
              tags,
            }
          ],
        }
      },
      {
        name: largeNode.name,
        extensions: {
          SHOPIFY_variant: [
            {
              tags,
              mesh: largeNode.mesh,
            }
          ],
        }
      },
    ]);
  });

  test('handles variant diff when same node with changes', () => {
    const tags = [tagSmall];
    const newNodes = createItemWithVariants(tags, [smallNode], [smallNodeDiff]);

    expect(newNodes).toEqual([
      {
        ...smallNode,
        extensions: {
          SHOPIFY_variant: [
            {
              tags,
              mesh: smallNodeDiff.mesh,
            }
          ],
        }
      },
    ]);
  });

  test('handles appending tags when same and has variants already', () => {
    const newTagName = 'another-tag';
    const tags = [newTagName];
    const newNodes = createItemWithVariants(tags, [smallNodeWithVariants], [smallNode]);

    expect(newNodes).toEqual([
      {
        ...smallNode,
        extensions: {
          SHOPIFY_variant: [
            {
              tags: [tagSmall, newTagName],
            }
          ]
        }
      }
    ]);
  });

  test('handles appending variant', () => {
    const tags = ['small', 'sleeveless'];
    const newNodes = createItemWithVariants(tags, [smallNodeWithVariants], [smallNodeDiff]);

    expect(newNodes).toEqual([
      {
        ...smallNode,
        extensions: {
          SHOPIFY_variant: [
            {
              tags: [tagSmall],
            },
            {
              tags,
              mesh: smallNodeDiff.mesh,
            }
          ]
        }
      }
    ]);
  });

  test('handles nodes out of order', () => {
    const tags = [tagSmall];
    const newNodes = createItemWithVariants(tags, [smallNode], [largeNode, smallNodeDiff]);

    expect(newNodes).toEqual([
      {
        ...smallNode,
        extensions: {
          SHOPIFY_variant: [
            {
              tags,
              mesh: smallNodeDiff.mesh,
            }
          ],
        }
      },
      {
        name: largeNode.name,
        extensions: {
          SHOPIFY_variant: [
            {
              tags,
              mesh: largeNode.mesh,
            }
          ]
        },
      }
    ]);
  });

  test('can add a right side variant and add onto it', () => {
    const firstTags = [tagSmall];
    const firstNodes = createItemWithVariants(firstTags, [], [smallNode]);

    expect(firstNodes).toEqual([
      {
        name: smallNode.name,
        extensions: {
          SHOPIFY_variant: [
            {
              tags: firstTags,
              mesh: smallNode.mesh,
            }
          ],
        }
      },
    ]);

    const secondTags = ['fancy'];
    const secondNodes = createItemWithVariants(secondTags, firstNodes, [smallNodeDiff]);

    expect(secondNodes).toHaveLength(1);
    expect(secondNodes).toEqual([
      {
        name: smallNode.name,
        extensions: {
          SHOPIFY_variant: [
            {
              tags: firstTags,
              mesh: smallNode.mesh,
            },
            {
              tags: ['fancy'],
              mesh: smallNodeDiff.mesh,
            }
          ],
        }
      },
    ]);
  });
});
