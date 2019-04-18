import { IChildRootProperty } from "babylonjs-gltf2interface";
import diff from 'changeset';
import clone from './clone';
import findMatchingNode from './find-matching-node';

const {apply: applyDiffs} = diff;

export enum ChangeType {
  /**
   * Was a unique INode in left array but not in right
   */
  IN_LEFT = 'IN_LEFT',
  /**
   * Was a unique INode in right array but not in left
   */
  IN_RIGHT = 'IN_RIGHT',
  /**
   * INode existed in both but with changes
   */
  DIFF = 'DIFF',
  /**
   * Matching in both
   */
  EQUAL = 'EQUAL',
};

interface IChangeData {
  name: string,
};

export type Change = {
  type: ChangeType,
  node: IChildRootProperty,
};

function removeExtension(node: IChildRootProperty): IChildRootProperty {
  return {
    ...node,
    extensions: undefined,
  };
}

export function getNodeChanges(left: IChildRootProperty[], right: IChildRootProperty[]): Change[] {
  const changes: Change[] = [];

  left = clone(left).map(removeExtension);
  right = clone(right).map(removeExtension);

  left.forEach((leftNode) => {
    const result = findMatchingNode(leftNode, right);

    // doesn't exist in right
    if (result === null) {
      changes.push({
        type: ChangeType.IN_LEFT,
        node: leftNode,
      });

      return;
    }
    
    // remove from right since it was found
    right.splice(result.index, 1);

    const diffs = diff(leftNode, result.match);

    if (diffs.length === 0) {
      changes.push({
        type: ChangeType.EQUAL,
        node: leftNode,
      });

      return;
    }

    changes.push({
      type: ChangeType.DIFF,
      node: applyDiffs(diffs, {}) as IChildRootProperty,
    });
  });

  // now add in uniques in right
  right.forEach((rightNode) => {
    changes.push({
      type: ChangeType.IN_RIGHT,
      node: rightNode,
    });
  });

  return changes;
}
