import {INode} from 'babylonjs-gltf2interface';
import INodeWithVariantExtension from './inode-with-variant-extension';
import createNodesWithVariants from './create-nodes-with-variants';

describe('createNodesWithVariants', () => {
  const nameSmall = 'smallNode';
  const tagSmall = 'smallTag';
  const nameLarge = 'largeNode';

  let smallNode: INode;
  let smallNodeDiff: INode;
  let largeNode: INode;
  let smallNodeWithVariants: INodeWithVariantExtension;

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
    const newNodes = createNodesWithVariants(tags, [smallNode], []);

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
    const newNodes = createNodesWithVariants(tags, [], [smallNode]);

    expect(newNodes).toEqual([
      {
        name: smallNode.name,
        extensions: {
          SHOPIFY_variant: [
            {
              tags,
              ...smallNode,
            }
          ],
        }
      },
    ]);
  });

  test('handles node addition when another node exists', () => {
    const tags = [tagSmall];
    const newNodes = createNodesWithVariants(tags, [smallNode], [largeNode]);

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
              ...largeNode,
            }
          ],
        }
      },
    ]);
  });

  test('handles variant diff when same node with changes', () => {
    const tags = [tagSmall];
    const newNodes = createNodesWithVariants(tags, [smallNode], [smallNodeDiff]);

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
    const newNodes = createNodesWithVariants(tags, [smallNodeWithVariants], [smallNode]);

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
    const newNodes = createNodesWithVariants(tags, [smallNodeWithVariants], [smallNodeDiff]);

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
    const newNodes = createNodesWithVariants(tags, [smallNode], [largeNode, smallNodeDiff]);

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
              ...largeNode,
            }
          ]
        },
      }
    ]);
  });

  test('can add a right side variant and add onto it', () => {
    const firstTags = [tagSmall];
    const firstNodes = createNodesWithVariants(firstTags, [], [smallNode]);

    expect(firstNodes).toEqual([
      {
        name: smallNode.name,
        extensions: {
          SHOPIFY_variant: [
            {
              tags: firstTags,
              ...smallNode,
            }
          ],
        }
      },
    ]);

    const secondTags = ['fancy'];
    const secondNodes = createNodesWithVariants(secondTags, firstNodes, [smallNodeDiff]);

    expect(secondNodes).toHaveLength(1);
    expect(secondNodes).toEqual([
      {
        name: smallNode.name,
        extensions: {
          SHOPIFY_variant: [
            {
              tags: firstTags,
              ...smallNode,
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
