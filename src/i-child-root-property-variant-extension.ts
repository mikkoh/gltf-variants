import {IChildRootProperty} from 'babylonjs-gltf2interface';

export interface ITaggedChildRootProperty extends IChildRootProperty {
  tags: string[],
}

export interface INodeExtension {
  SHOPIFY_variant: ITaggedChildRootProperty[]
}

export default interface IChildRootPropertyWithVariantExtension extends IChildRootProperty {
  extensions: INodeExtension;
}
