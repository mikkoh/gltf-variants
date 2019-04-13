import {INode} from 'babylonjs-gltf2interface';
import clone from './clone';
import INodeWithVariantExtension, {ITaggedNode} from './inode-with-variant-extension';
import {getNodeChanges, ChangeType, Change} from './get-node-changes';
import getVariantExtension from './get-variant-extension';
import setVariantExtension from './set-variant-extension';
import compactVariants from './compact-variants';

function createLeftNode(tags: string[], node: INode, change: Change): INodeWithVariantExtension {
  let variant: ITaggedNode = {
    tags,
  };

  if (change.type === ChangeType.DIFF) {
    variant = {
      tags,
      ...change.node,
    };
  }

  const newNode = clone(node);
  const variants = getVariantExtension(newNode);

  variants.push(variant);

  return newNode;
}

function createRightNode(tags: string[], rightNode: INode): INodeWithVariantExtension {
  const variant: ITaggedNode = {
    tags,
    ...rightNode,
  };

  return {
    extensions: {
      SHOPIFY_variant: [
        variant,
      ],
    },
  };
}

export default function createNodesWithVariants(tags: string[], leftNodes: INode[], rightNodes: INode[]): INodeWithVariantExtension[] {
  const nodes: INodeWithVariantExtension[] = [];
  const changes = getNodeChanges(leftNodes, rightNodes);

  for (let i = 0; i < changes.length; i++) {
    const change = changes[i];

    if (i < leftNodes.length) {
      const leftNode = leftNodes[i];

      nodes.push(
        createLeftNode(tags, leftNode, change),
      );

      continue;
    }

    nodes.push(
      createRightNode(tags, change.node),
    );
  }

  for (let i = 0; i < leftNodes.length; i++) {
    const variants = getVariantExtension(nodes[i]);
    
    setVariantExtension(nodes[i], compactVariants(variants));
  }

  return nodes;
}
