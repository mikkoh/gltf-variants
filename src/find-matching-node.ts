import { IChildRootProperty } from "babylonjs-gltf2interface";
import areSameNode from './are-same-node';

type ItemMatch = {
  index: number,
  match: IChildRootProperty,
};

export default function findMatchingItem(item: IChildRootProperty, itemList: IChildRootProperty[]): ItemMatch | null {
  const index = itemList.findIndex((value) => {
    return areSameNode(item, value);
  });
  
  if (index === -1) {
    return null;
  }

  const match = itemList[index];

  return {match, index};
}
