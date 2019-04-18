import setVariantExtension from './set-variant-extension';
import { INode } from 'babylonjs-gltf2interface';
import IChildRootPropertyWithVariantExtension, {ITaggedChildRootProperty} from './inode-with-variant-extension';

describe('setVariantExtension', () => {
  let node1: INode = {};
  let node2: IChildRootPropertyWithVariantExtension = {
    extensions: {
      SHOPIFY_variant: [],
    },
  };
  let newVariants: ITaggedChildRootProperty[];

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
    expect((node1 as IChildRootPropertyWithVariantExtension).extensions.SHOPIFY_variant).toBe(newVariants);
  });

  test('does set on node that does have extension', () => {
    expect(setVariantExtension(node2, newVariants)).toBe(newVariants);
    expect((node2 as IChildRootPropertyWithVariantExtension).extensions.SHOPIFY_variant).toBe(newVariants);
  });
});
