import {ITaggedNode} from './inode-with-variant-extension';
import {INode} from 'babylonjs-gltf2interface';
import diff from 'changeset';
import clone from './clone';
import compactTags from './compact-tags';

export default function compactVariants(variants: ITaggedNode[]): ITaggedNode[] {
  variants = clone(variants);

  const variantsNoTags: INode[] = variants.map((node) => {
    const returnValue = clone(node);
    delete returnValue.tags;
    return returnValue;
  });

  for (let i = 0; i < variants.length; i++) {
    const currentVariant: ITaggedNode = variants[i];
    const currentVariantNoTag: INode = variantsNoTags[i];

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
