import { INode } from "babylonjs-gltf2interface";
import { ITaggedNode } from './inode-with-variant-extension';

export default function getVariantExtension(node: INode, variants: ITaggedNode[]): ITaggedNode[] {
  if (!node.extensions) {
    node.extensions = {};
  }

  node.extensions.SHOPIFY_variant = variants;

  return node.extensions.SHOPIFY_variant;
}
