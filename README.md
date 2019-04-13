# GLTF Variant Generator

A module which can be used to create GLTF Models with variants.

## What is a variant?

Let's look at a real world example. We have three variants of a t-shirt:

1. A small red t-shirt
2. A medium red t-shirt
3. A large blue t-shirt

In this case the options for a t-shirt are:

1. Red or Blue
2. Small, Medium, or Large

## How are variants implemented in GLTF models?

There are two places where variants are defined:

1. `Primitives`
2. `Nodes`

If we take the t-shirt example from abouve `Nodes` will handle sizing of the t-shirt and `Primitives` will handle the material of the t-shirt through material changes.

## Node Examples

The following is a series of examples where variants are defined through tags.

### Example: a shoe in two sizes

The following represents a `node` which is a shoe in two sizes.

```json
{
  "name": "shoe",
  "mesh": 0,
  "extensions": {
    "SHOPIFY_variant": [
      {
        "tags": [
          "size8"
        ]
      },
      {
        "tags": [
          "size9"
        ],
        "mesh": 1
      }
    ]
  }
}
```

There are two meshes one that is a Size 8 shoe and a Size 9 shoe.

By default this node represents the size 8 shoe. `mesh: 0` is the mesh representing size 8. `mesh: 1` represents size 9.

### Example: a t-shirt in 3 sizes

The following represents a `node` which is a t-shirt in three sizes.

```json
{
  "name": "t-shirt",
  "mesh": 0,
  "extensions": {
    "SHOPIFY_variant": [
      {
        "tags": [
          "small"
        ]
      },
      {
        "tags": [
          "medium"
        ],
        "scale": [1.1, 1.1, 1.1]
      },
      {
        "tags": [
          "large"
        ],
        "scale": [1.2, 1.2, 1.2]
      }
    ]
  }
}
```

In this example there is only one mesh but the mesh is scaled for each size.

By default this node represents the small shirt. The medium t-shirt is 10% bigger than the small shirt. Finally the large shirt is 20% bigger than the small shirt.
