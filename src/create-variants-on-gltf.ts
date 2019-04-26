import {IGLTF} from 'babylonjs-gltf2interface';
import createVariantsOnItems from './create-variants-on-items';
import clone from './clone';

export default function createVariantsOnGLTF(tags: string[], baseGltf: IGLTF, variantGltf: IGLTF): IGLTF {
  const baseCopy: IGLTF = clone(baseGltf);
  const variantCopy: IGLTF = clone(variantGltf);

  if (baseCopy.nodes && variantCopy.nodes) {
    baseCopy.nodes = createVariantsOnItems(tags, baseCopy.nodes!, variantCopy.nodes!);
  }

  if (baseCopy.materials && variantCopy.materials) {
    baseCopy.materials = createVariantsOnItems(tags, baseCopy.materials!, variantCopy.materials!);
  }
  
  return baseCopy;
}
