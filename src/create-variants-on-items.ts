import {IChildRootProperty} from 'babylonjs-gltf2interface';
import clone from './clone';
import IChildRootPropertyWithVariantExtension, {ITaggedChildRootProperty} from './i-child-root-property-variant-extension';
import {getItemChanges, ChangeType, Change} from './get-item-changes';
import getVariantExtension from './get-variant-extension';
import setVariantExtension from './set-variant-extension';
import compactVariants from './compact-variants';
import validateItem from './validate-item';

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

function validateItems(side: string, items: IChildRootProperty[]) {
  const invalidWithMessage = items
    .map((item) => {
      const error = validateItem(item);

      if (error) {
        return {
          item,
          error,
        };
      }

      return null;
    })
    .filter(Boolean);

  if (invalidWithMessage.length > 0) {
    throw new Error(`the following ${side} side items were invalid: ${JSON.stringify(invalidWithMessage, null, '  ')}`);
  }
}

export default function createVariantsOnItems(tags: string[], leftItems: IChildRootProperty[], rightItems: IChildRootProperty[]): IChildRootPropertyWithVariantExtension[] {
  validateItems('left', leftItems);
  validateItems('right', rightItems);

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
