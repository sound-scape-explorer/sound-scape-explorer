const i = new Float64Array([
  // Bottom face (z=z0)
  0, 0,
  // Top face (z=z1)
  4, 4,
  // Front face (y=y0)
  0, 0,
  // Back face (y=y1)
  3, 3,
  // Left face (x=x0)
  0, 0,
  // Right face (x=x1)
  1, 1,
]);

const j = new Float64Array([
  // Bottom face: 0-1-2, 0-2-3
  1, 2,
  // Top face: 4-6-5, 4-7-6
  6, 7,
  // Front face: 0-4-5, 0-5-1
  4, 5,
  // Back face: 3-6-7, 3-2-6
  6, 2,
  // Left face: 0-7-4, 0-3-7
  7, 3,
  // Right face: 1-5-6, 1-6-2
  5, 6,
]);

const k = new Float64Array([
  // Bottom face
  2, 3,
  // Top face
  5, 6,
  // Front face
  5, 1,
  // Back face
  7, 6,
  // Left face
  4, 7,
  // Right face
  6, 2,
]);

export function useSelectionVertices() {
  return {
    i,
    j,
    k,
  };
}
