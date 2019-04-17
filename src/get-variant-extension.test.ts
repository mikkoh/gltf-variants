import INodeWithVariantExtension, {INodeExtension} from './inode-with-variant-extension';
import getExtensions from './get-variant-extension';
import {INode} from 'babylonjs-gltf2interface';

describe('getExtensions', () => {
  let nodeWithExtensions: INodeWithVariantExtension;
  let nodeWithOutExtensions: INode;

  beforeEach(() => {
    nodeWithExtensions = {
      name: 'aNode',
      extensions: {
        SHOPIFY_variant: []
      }
    };

    nodeWithOutExtensions = {
      name: 'bNode',
    };
  });

  test('can get existing', () => {
    expect(getExtensions(nodeWithExtensions)).toBe(nodeWithExtensions.extensions.SHOPIFY_variant);
  });

  test('can add new', () => {
    getExtensions(nodeWithOutExtensions);

    expect(nodeWithOutExtensions.extensions).toBeInstanceOf(Object);
    expect(nodeWithOutExtensions.extensions!.SHOPIFY_variant).toEqual([]);
  });
});