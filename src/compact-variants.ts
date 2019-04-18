import {ITaggedChildRootProperty} from './i-child-root-property-variant-extension';
import {IChildRootProperty} from 'babylonjs-gltf2interface';
import diff from 'changeset';
import clone from './clone';
import compactTags from './compact-tags';

export default function compactVariants(variants: ITaggedChildRootProperty[]): ITaggedChildRootProperty[] {
  variants = clone(variants);

  const variantsNoTags: IChildRootProperty[] = variants.map((item) => {
    const returnValue = clone(item);
    delete returnValue.tags;
    return returnValue;
  });

  for (let i = 0; i < variants.length; i++) {
    const currentVariant: ITaggedChildRootProperty = variants[i];
    const currentVariantNoTag: IChildRootProperty = variantsNoTags[i];

    for (let j = 0; j < variantsNoTags.length; j++) {
      if (i === j) {
        continue;
      }

      const changes = diff(currentVariantNoTag, variantsNoTags[j]);

      if (changes.length > 0) {
        continue;
      }

      currentVariant.tags = compactTags(currentVariant.tags.concat(variants[j].tags));
      variants.splice(j, 1);
      variantsNoTags.splice(j, 1);
    }
  }

  return variants;
}
