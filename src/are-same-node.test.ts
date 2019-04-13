import {INode} from 'babylonjs-gltf2interface';

import areSameNode from './are-same-node';

describe('areSameNode', () => {
  const node1: INode = {
    name: 'node1',
  };

  const node2: INode = {
    name: 'node2',
  };

  test('can check that nodes are the same', () => {
    expect(areSameNode(node1, node2)).toBe(false);
    expect(areSameNode(node1, node1)).toBe(true);
  });
});
