import {INode} from 'babylonjs-gltf2interface';

export default function areSameNode(nodeA: INode, nodeB: INode): boolean {
  return nodeA.name === nodeB.name;
}
