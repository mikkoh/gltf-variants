import { IChildRootProperty } from "babylonjs-gltf2interface";
import areSameNode from './are-same-node';

type NodeMatch = {
  index: number,
  match: IChildRootProperty,
};

export default function findNode(node: IChildRootProperty, list: IChildRootProperty[]): NodeMatch | null {
  const index = list.findIndex((value) => {
    return areSameNode(node, value);
  });
  
  if (index === -1) {
    return null;
  }

  const match = list[index];

  return {match, index};
}
