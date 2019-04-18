import {IChildRootProperty} from 'babylonjs-gltf2interface';
import clone from './clone';
import IChildRootPropertyWithVariantExtension, {ITaggedChildRootProperty} from './inode-with-variant-extension';
import {getItemChanges, ChangeType, Change} from './get-node-changes';
import getVariantExtension from './get-variant-extension';
import setVariantExtension from './set-variant-extension';
import compactVariants from './compact-variants';

function createLeftItem(tags: string[], item: IChildRootProperty, change: Change): IChildRootPropertyWithVariantExtension {
  let variant: ITaggedChildRootProperty = {
    tags,
  };

  if (change.type === ChangeType.DIFF) {
    variant = {
      tags,
      ...change.item,
    };
  }

  const newItem = clone(item);
  const variants = getVariantExtension(newItem);

  variants.push(variant);

  return newItem;
}

function createRightItem(tags: string[], rightItem: IChildRootProperty): IChildRootPropertyWithVariantExtension {
  const {name} = rightItem;
  const variant: ITaggedChildRootProperty = {
    tags,
    ...rightItem,
  };

  // delete it here because it's added to the newly created item
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

export default function createItemWithVariants(tags: string[], leftItems: IChildRootProperty[], rightItems: IChildRootProperty[]): IChildRootPropertyWithVariantExtension[] {
  const items: IChildRootPropertyWithVariantExtension[] = [];
  const changes = getItemChanges(leftItems, rightItems);

  for (let i = 0; i < changes.length; i++) {
    const change = changes[i];

    if (i < leftItems.length) {
      const leftItem = leftItems[i];

      items.push(
        createLeftItem(tags, leftItem, change),
      );

      continue;
    }

    items.push(
      createRightItem(tags, change.item),
    );
  }

  for (let i = 0; i < leftItems.length; i++) {
    const variants = getVariantExtension(items[i]);
    
    setVariantExtension(items[i], compactVariants(variants));
  }

  return items;
}
