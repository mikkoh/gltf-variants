import {INode} from 'babylonjs-gltf2interface';
import INodeWithVariantExtension, {ITaggedNode} from './inode-with-variant-extension';
import {getNodeChanges, ChangeType, Change} from './get-node-changes';

function createLeftNode(tags: string[], node: INode, change: Change): INodeWithVariantExtension {
  let variant: ITaggedNode = {
    tags,
  };

  if (change.type === ChangeType.DIFF) {
    variant = {
      ...variant,
      ...change.node,
    };
  }

  return {
    ...node,
    extensions: {
      SHOPIFY_variant: [
        variant,
      ],
    },
  };
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

  return nodes;
}
