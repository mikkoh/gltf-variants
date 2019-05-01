import {IGLTF} from 'babylonjs-gltf2interface';
import createVariantsOnGLTF from './create-variants-on-gltf';

describe('createVariantsOnGLTF', () => {
  const basic: IGLTF = {
    asset: {
      version: '2.0',
    },
    nodes: [
      {
        name: 'node1',
        mesh: 0,
      },
    ],
    materials: [
      {
        name: 'material1',
      }
    ]
  };

  test('will tag nodes and materials', () => {
    const tags = ['default'];
    const newGltf = createVariantsOnGLTF(tags, basic, basic);

    expect(newGltf.nodes![0].extensions).toBeTruthy();
    expect(newGltf.nodes![0].extensions!.SHOPIFY_variant).toBeTruthy();
    expect(newGltf.nodes![0].extensions!.SHOPIFY_variant[0].tags).toEqual(tags);

    expect(newGltf.materials![0].extensions).toBeTruthy();
    expect(newGltf.materials![0].extensions!.SHOPIFY_variant).toBeTruthy();
    expect(newGltf.materials![0].extensions!.SHOPIFY_variant[0].tags).toEqual(tags);
  });
});
