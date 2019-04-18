import { IChildRootProperty } from "babylonjs-gltf2interface";
import diff from 'changeset';
import clone from './clone';
import findMatchingNode from './find-matching-item';

const {apply: applyDiffs} = diff;

export enum ChangeType {
  /**
   * Was a unique item in left array but not in right
   */
  IN_LEFT = 'IN_LEFT',
  /**
   * Was a unique item in right array but not in left
   */
  IN_RIGHT = 'IN_RIGHT',
  /**
   * item existed in both but with changes
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
  item: IChildRootProperty,
};

function removeExtension(item: IChildRootProperty): IChildRootProperty {
  return {
    ...item,
    extensions: undefined,
  };
}

export function getItemChanges(left: IChildRootProperty[], right: IChildRootProperty[]): Change[] {
  const changes: Change[] = [];

  left = clone(left).map(removeExtension);
  right = clone(right).map(removeExtension);

  left.forEach((leftItem) => {
    const result = findMatchingNode(leftItem, right);

    // doesn't exist in right
    if (result === null) {
      changes.push({
        type: ChangeType.IN_LEFT,
        item: leftItem,
      });

      return;
    }
    
    // remove from right since it was found
    right.splice(result.index, 1);

    const diffs = diff(leftItem, result.match);

    if (diffs.length === 0) {
      changes.push({
        type: ChangeType.EQUAL,
        item: leftItem,
      });

      return;
    }

    changes.push({
      type: ChangeType.DIFF,
      item: applyDiffs(diffs, {}) as IChildRootProperty,
    });
  });

  // now add in uniques in right
  right.forEach((leftItem) => {
    changes.push({
      type: ChangeType.IN_RIGHT,
      item: leftItem,
    });
  });

  return changes;
}
