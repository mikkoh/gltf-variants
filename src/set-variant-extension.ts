import { IChildRootProperty } from "babylonjs-gltf2interface";
import { ITaggedChildRootProperty } from './inode-with-variant-extension';

export default function getVariantExtension(node: IChildRootProperty, variants: ITaggedChildRootProperty[]): ITaggedChildRootProperty[] {
  if (!node.extensions) {
    node.extensions = {};
  }

  node.extensions.SHOPIFY_variant = variants;

  return node.extensions.SHOPIFY_variant;
}
