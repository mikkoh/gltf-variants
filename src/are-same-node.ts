import {IChildRootProperty} from 'babylonjs-gltf2interface';

export default function areSameItem(itemA: IChildRootProperty, itemB: IChildRootProperty): boolean {
  return itemA.name === itemB.name;
}
