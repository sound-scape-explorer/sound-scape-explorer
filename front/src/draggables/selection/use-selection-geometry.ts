export function useSelectionGeometry() {
  // Function to rotate a point around origin using Euler angles
  const rotatePoint = (
    x: number,
    y: number,
    z: number,
    angleX: number,
    angleY: number,
    angleZ: number,
  ) => {
    // Convert angles to radians
    const radX = (angleX * Math.PI) / 180;
    const radY = (angleY * Math.PI) / 180;
    const radZ = (angleZ * Math.PI) / 180;

    // Rotation matrices
    const cosX = Math.cos(radX),
      sinX = Math.sin(radX);
    const cosY = Math.cos(radY),
      sinY = Math.sin(radY);
    const cosZ = Math.cos(radZ),
      sinZ = Math.sin(radZ);

    // rotate around x
    let y1 = y * cosX - z * sinX;
    let z1 = y * sinX + z * cosX;

    // rotate around y
    let x2 = x * cosY + z1 * sinY;
    let z2 = -x * sinY + z1 * cosY;

    // rotate around z
    let x3 = x2 * cosZ - y1 * sinZ;
    let y3 = x2 * sinZ + y1 * cosZ;

    return {
      x: x3,
      y: y3,
      z: z2,
    };
  };

  const rotateVertices = (
    ranges: {
      x: [number, number];
      y: [number, number];
      z: [number, number];
    },
    angles: {
      x: number;
      y: number;
      z: number;
    },
    is3d: boolean,
  ): Array<{x: number; y: number; z: number}> => {
    const x0 = ranges.x[0];
    const x1 = ranges.x[1];
    const y0 = ranges.y[0];
    const y1 = ranges.y[1];
    const z0 = is3d ? ranges.z[0] : 0;
    const z1 = is3d ? ranges.z[1] : 0;

    // Generate 8 vertices of the box
    const xBox = [x0, x1, x1, x0, x0, x1, x1, x0];
    const yBox = [y0, y0, y1, y1, y0, y0, y1, y1];
    const zBox = [z0, z0, z0, z0, z1, z1, z1, z1];

    // Calculate box center
    const centerX = (x0 + x1) / 2;
    const centerY = (y0 + y1) / 2;
    const centerZ = (z0 + z1) / 2;

    // Apply rotation to all vertices (centered rotation)
    const rotatedVertices = [];

    for (let i = 0; i < xBox.length; i += 1) {
      // Translate to origin (center the box)
      const translatedX = xBox[i] - centerX;
      const translatedY = yBox[i] - centerY;
      const translatedZ = zBox[i] - centerZ;

      // Rotate around origin
      const rotated = rotatePoint(
        translatedX,
        translatedY,
        translatedZ,
        angles.x,
        angles.y,
        angles.z,
      );

      // Translate back to original position
      rotatedVertices.push({
        x: rotated.x + centerX,
        y: rotated.y + centerY,
        z: rotated.z + centerZ,
      });
    }

    return rotatedVertices;
  };

  return {
    rotateVertices,
  };
}
