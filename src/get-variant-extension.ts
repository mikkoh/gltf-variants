import { IChildRootProperty } from "babylonjs-gltf2interface";
import { ITaggedChildRootProperty } from './inode-with-variant-extension';

export default function getVariantExtension(item: IChildRootProperty): ITaggedChildRootProperty[] {
  if (!item.extensions) {
    item.extensions = {};
  }

  if (!item.extensions.SHOPIFY_variant) {
    item.extensions.SHOPIFY_variant = [];
  }

  return item.extensions.SHOPIFY_variant;
}
