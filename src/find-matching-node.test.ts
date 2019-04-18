import { IChildRootProperty } from 'babylonjs-gltf2interface';

import findMatchingNode from './find-matching-node';

describe('findMatchingNode', () => {
  const node1: IChildRootProperty = {
    name: 'node1',
  };
  const node2: IChildRootProperty = {
    name: 'node2',
  };
  const node3: IChildRootProperty = {
    name: 'node3',
  };
  const allNodes = [
    node1,
    node2,
    node3,
  ];
  const nodes1and3 = [
    node1,
    node3,
  ];

  test('finds node', () => {
    expect(findMatchingNode(node2, allNodes)).toEqual({
      index: 1,
      match: node2,
    });
  });

  test('returnes null when not found', () => {
    expect(findMatchingNode(node2, nodes1and3)).toEqual(null);
  });
});