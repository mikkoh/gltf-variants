import setVariantExtension from './set-variant-extension';
import { INode } from 'babylonjs-gltf2interface';
import INodeWithVariantExtension, {ITaggedNode} from './inode-with-variant-extension';

describe('setVariantExtension', () => {
  let node1: INode = {};
  let node2: INodeWithVariantExtension = {
    extensions: {
      SHOPIFY_variant: [],
    },
  };
  let newVariants: ITaggedNode[];

  beforeEach(() => {
    node1 = {};
    node2 = {
      extensions: {
        SHOPIFY_variant: [],
      },
    };
    newVariants = [
      {
        tags: ['tag1'],
      }
    ];
  });

  test('does set on node that does not have extension', () => {
    expect(setVariantExtension(node1, newVariants)).toBe(newVariants);
    expect((node1 as INodeWithVariantExtension).extensions.SHOPIFY_variant).toBe(newVariants);
  });

  test('does set on node that does have extension', () => {
    expect(setVariantExtension(node2, newVariants)).toBe(newVariants);
    expect((node2 as INodeWithVariantExtension).extensions.SHOPIFY_variant).toBe(newVariants);
  });
});
