import { IChildRootProperty } from "babylonjs-gltf2interface";
import { ITaggedChildRootProperty } from './i-child-root-property-variant-extension';

export default function getVariantExtension(item: IChildRootProperty, variants: ITaggedChildRootProperty[]): ITaggedChildRootProperty[] {
  if (!item.extensions) {
    item.extensions = {};
  }

  item.extensions.SHOPIFY_variant = variants;

  return item.extensions.SHOPIFY_variant;
}
