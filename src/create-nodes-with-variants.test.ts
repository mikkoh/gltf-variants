import {INode} from 'babylonjs-gltf2interface';
import createNodesWithVariants from './create-nodes-with-variants';

describe('createNodesWithVariants', () => {
  const nameRed = 'redNode';
  const tagRed = 'redTag';
  const nameBlue = 'blueNode';

  const redNode: INode = {
    name: nameRed,
    mesh: 0,
  };
  const redNodeDiff: INode = {
    name: nameRed,
    mesh: 1,
  };
  const blueNode: INode = {
    name: nameBlue,
    mesh: 2,
  };

  test('handles tagging existing node', () => {
    const tags = [tagRed];
    const newNodes = createNodesWithVariants(tags, [redNode], []);

    expect(newNodes).toEqual([
      {
        name: nameRed,
        mesh: redNode.mesh,
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
    const tags = [tagRed];
    const newNodes = createNodesWithVariants(tags, [], [redNode]);

    expect(newNodes).toEqual([
      {
        extensions: {
          SHOPIFY_variant: [
            {
              tags,
              ...redNode,
            }
          ],
        }
      },
    ]);
  });

  test('handles node addition when another node exists', () => {
    const tags = [tagRed];
    const newNodes = createNodesWithVariants(tags, [redNode], [blueNode]);

    expect(newNodes).toHaveLength(2);
    expect(newNodes).toEqual([
      {
        name: nameRed,
        mesh: redNode.mesh,
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
              ...blueNode,
            }
          ],
        }
      },
    ]);
  });

  test('handles variant diff', () => {
    const tags = [tagRed];
    const newNodes = createNodesWithVariants(tags, [redNode], [redNodeDiff]);

    expect(newNodes).toEqual([
      {
        name: nameRed,
        mesh: redNode.mesh,
        extensions: {
          SHOPIFY_variant: [
            {
              tags,
              mesh: redNodeDiff.mesh,
            }
          ],
        }
      },
    ]);
  });
});
