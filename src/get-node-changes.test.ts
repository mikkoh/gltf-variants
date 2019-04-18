import {INode} from "babylonjs-gltf2interface";
import {getItemChanges, ChangeType} from './get-node-changes';

describe('getNodesChanges', () => {
  const node1: INode = {
    name: 'node1',
    mesh: 0,
  };
  const node2: INode = {
    name: 'node2',
    mesh: 1,
  };
  const node3: INode = {
    name: 'node3',
    mesh: 2,
  };
  const node4: INode = {
    name: 'node4',
    mesh: 3,
  };
  const node1Diff: INode = {
    name: 'node1',
    mesh: 1,
  };

  test('returns equal changes', () => {
    const changes = getItemChanges([node1, node2], [node1, node2]);

    expect(changes).toEqual([
      {
        type: ChangeType.EQUAL,
        item: node1,
      },
      {
        type: ChangeType.EQUAL,
        item: node2,
      },
    ]);
  });

  test('returns equal changes even if unordered', () => {
    const changes = getItemChanges([node1, node2], [node2, node1]);

    expect(changes).toEqual([
      {
        type: ChangeType.EQUAL,
        item: node1,
      },
      {
        type: ChangeType.EQUAL,
        item: node2,
      },
    ]);
  });

  test('returns in left', () => {
    const changes = getItemChanges([node1], []);

    expect(changes).toEqual([
      {
        type: ChangeType.IN_LEFT,
        item: node1,
      }
    ]);
  });

  test('returns in right', () => {
    const changes = getItemChanges([], [node1]);

    expect(changes).toEqual([
      {
        type: ChangeType.IN_RIGHT,
        item: node1,
      }
    ]);
  });

  test('adds in right to end', () => {
    const changes = getItemChanges([node1, node4], [node2, node3, node1]);

    expect(changes).toEqual([
      {
        type: ChangeType.EQUAL,
        item: node1,
      },
      {
        type: ChangeType.IN_LEFT,
        item: node4,
      },
      {
        type: ChangeType.IN_RIGHT,
        item: node2,
      },
      {
        type: ChangeType.IN_RIGHT,
        item: node3,
      }
    ]);
  });

  test('returns diff', () => {
    const changes = getItemChanges([node1], [node1Diff]);

    expect(changes).toEqual([
      {
        type: ChangeType.DIFF,
        item: {
          mesh: 1,
        }
      }
    ]);
  });

  test('does not compare extensions', () => {
    const nodeWithExtension1: INode = {
      ...node1,
      extensions: {
        fancy_thing: 1,
      },
    };
    const nodeWithExtension2: INode = {
      ...node1,
      extensions: {
        not_fancy_thing: 1,
      },
    };

    const changes = getItemChanges([nodeWithExtension1], [nodeWithExtension2]);

    expect(changes).toEqual([
      {
        type: ChangeType.EQUAL,
        item: node1,
      }
    ]);
  });
});
