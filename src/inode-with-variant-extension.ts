import {INode} from 'babylonjs-gltf2interface';

export interface ITaggedNode extends INode {
  tags: string[]
}

export interface INodeExtension {
  SHOPIFY_variant: ITaggedNode[]
}

export default interface INodeWithVariantExtension extends INode {
  extensions: INodeExtension;
}
