import { INode } from "babylonjs-gltf2interface";
import { ITaggedNode } from './inode-with-variant-extension';

export default function getVariantExtension(node: INode): ITaggedNode[] {
  if (!node.extensions) {
    node.extensions = {};
  }

  if (!node.extensions.SHOPIFY_variant) {
    node.extensions.SHOPIFY_variant = [];
  }

  return node.extensions.SHOPIFY_variant;
}
