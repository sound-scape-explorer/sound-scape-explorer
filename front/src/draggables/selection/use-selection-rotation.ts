export function useSelectionRotation() {
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

  return {
    rotatePoint,
  };
}
