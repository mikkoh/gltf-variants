import { IChildRootProperty } from "babylonjs-gltf2interface";
import { ITaggedChildRootProperty } from './inode-with-variant-extension';

export default function getVariantExtension(node: IChildRootProperty): ITaggedChildRootProperty[] {
  if (!node.extensions) {
    node.extensions = {};
  }

  if (!node.extensions.SHOPIFY_variant) {
    node.extensions.SHOPIFY_variant = [];
  }

  return node.extensions.SHOPIFY_variant;
}
