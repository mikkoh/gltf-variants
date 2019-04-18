import {IChildRootProperty} from 'babylonjs-gltf2interface';

export default function validateItem(item: IChildRootProperty): String | null {
  if (item.name) {
    return null;
  }

  return 'does not include name';
}
