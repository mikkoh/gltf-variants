import {IChildRootProperty} from 'babylonjs-gltf2interface';
import clone from './clone';
import IChildRootPropertyWithVariantExtension, {ITaggedChildRootProperty} from './inode-with-variant-extension';
import {getItemChanges, ChangeType, Change} from './get-node-changes';
import getVariantExtension from './get-variant-extension';
import setVariantExtension from './set-variant-extension';
import compactVariants from './compact-variants';

function createLeftNode(tags: string[], node: IChildRootProperty, change: Change): IChildRootPropertyWithVariantExtension {
  let variant: ITaggedChildRootProperty = {
    tags,
  };

  if (change.type === ChangeType.DIFF) {
    variant = {
      tags,
      ...change.item,
    };
  }

  const newNode = clone(node);
  const variants = getVariantExtension(newNode);

  variants.push(variant);

  return newNode;
}

function createRightNode(tags: string[], rightNode: IChildRootProperty): IChildRootPropertyWithVariantExtension {
  const {name} = rightNode;
  const variant: ITaggedChildRootProperty = {
    tags,
    ...rightNode,
  };

  // delete it here because it's added to the newly created node
  delete variant.name;

  return {
    name,
    extensions: {
      SHOPIFY_variant: [
        variant,
      ],
    },
  };
}

export default function createNodesWithVariants(tags: string[], leftNodes: IChildRootProperty[], rightNodes: IChildRootProperty[]): IChildRootPropertyWithVariantExtension[] {
  const nodes: IChildRootPropertyWithVariantExtension[] = [];
  const changes = getItemChanges(leftNodes, rightNodes);

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
      createRightNode(tags, change.item),
    );
  }

  for (let i = 0; i < leftNodes.length; i++) {
    const variants = getVariantExtension(nodes[i]);
    
    setVariantExtension(nodes[i], compactVariants(variants));
  }

  return nodes;
}
