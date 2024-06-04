export type Matrix4 = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

function xformMatrix(m: Matrix4, v: number[]) {
  const out = [0, 0, 0, 0];
  let i, j;

  for (i = 0; i < 4; ++i) {
    for (j = 0; j < 4; ++j) {
      out[j] += m[4 * i + j] * v[i];
    }
  }

  return out;
}

interface Camera {
  projection: Matrix4;
  view: Matrix4;
  model: Matrix4;
}

export function project(camera: Camera, v: [number, number, number]) {
  const p = xformMatrix(
    camera.projection,
    xformMatrix(camera.view, xformMatrix(camera.model, [v[0], v[1], v[2], 1])),
  );
  return p;
}
