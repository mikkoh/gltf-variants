import {IChildRootProperty} from 'babylonjs-gltf2interface';

export default function areSameNode(nodeA: IChildRootProperty, nodeB: IChildRootProperty): boolean {
  return nodeA.name === nodeB.name;
}
