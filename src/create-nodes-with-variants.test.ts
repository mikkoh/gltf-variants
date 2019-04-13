import {INode} from 'babylonjs-gltf2interface';
import createNodesWithVariants from './create-nodes-with-variants';

describe('createNodesWithVariants', () => {
  const nameSmall = 'smallNode';
  const tagSmall = 'smallTag';
  const nameLarge = 'largeNode';

  const smallNode: INode = {
    name: nameSmall,
    mesh: 0,
  };
  const smallNodeDiff: INode = {
    name: nameSmall,
    mesh: 1,
  };
  const largeNode: INode = {
    name: nameLarge,
    mesh: 2,
  };

  test('handles tagging existing node', () => {
    const tags = [tagSmall];
    const newNodes = createNodesWithVariants(tags, [smallNode], []);

    expect(newNodes).toEqual([
      {
        name: nameSmall,
        mesh: smallNode.mesh,
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
        name: nameSmall,
        mesh: smallNode.mesh,
        extensions: {
          SHOPIFY_variant: [
            {
              tags,
            }
          ],
        }
      },
      {
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

  test('handles variant diff', () => {
    const tags = [tagSmall];
    const newNodes = createNodesWithVariants(tags, [smallNode], [smallNodeDiff]);

    expect(newNodes).toEqual([
      {
        name: nameSmall,
        mesh: smallNode.mesh,
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
});
