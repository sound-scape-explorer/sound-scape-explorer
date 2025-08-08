import {useReductions} from 'src/composables/use-reductions';
import {useDraggableSelection} from 'src/draggables/selection/use-draggable-selection';
import {useSelectionProps} from 'src/draggables/selection/use-selection-props';
import {useSelectionRotation} from 'src/draggables/selection/use-selection-rotation';
import {ref} from 'vue';

const filtered = ref<boolean[]>([]);

export function useScatterFilterSpatial() {
  const {reductions} = useReductions();
  const {isFiltering} = useDraggableSelection();
  const {xRange, yRange, zRange, tiltAngleX, tiltAngleY, tiltAngleZ} =
    useSelectionProps();
  const {rotatePoint} = useSelectionRotation();

  const isFiltered = (index: number): boolean => {
    if (isFiltering.value === false) {
      return false;
    }

    if (reductions.value === null) {
      return false;
    }

    const coordinates = reductions.value[index];

    const x = coordinates[0];
    const y = coordinates[1];
    const z = coordinates[2];

    const xMin = xRange.value[0];
    const xMax = xRange.value[1];
    const yMin = yRange.value[0];
    const yMax = yRange.value[1];
    const zMin = zRange.value[0];
    const zMax = zRange.value[1];

    // Calculate box center
    const centerX = (xMin + xMax) / 2;
    const centerY = (yMin + yMax) / 2;
    const centerZ = (zMin + zMax) / 2;

    // Transform the data point to the rotated box's coordinate system
    // First translate the point relative to the box center
    const translatedX = x - centerX;
    const translatedY = y - centerY;
    const translatedZ = z - centerZ;

    // Apply inverse rotation (reverse order of original rotations with negated angles)
    const inverseRotated = applyInverseRotation(
      translatedX,
      translatedY,
      translatedZ,
      tiltAngleX.value,
      tiltAngleY.value,
      tiltAngleZ.value,
    );

    // Check if the transformed point is within the axis-aligned box bounds
    const halfWidth = (xMax - xMin) / 2;
    const halfHeight = (yMax - yMin) / 2;
    const halfDepth = (zMax - zMin) / 2;

    const xIn = inverseRotated.x >= -halfWidth && inverseRotated.x <= halfWidth;
    const yIn =
      inverseRotated.y >= -halfHeight && inverseRotated.y <= halfHeight;
    const zIn = inverseRotated.z >= -halfDepth && inverseRotated.z <= halfDepth;

    const isIn = xIn && yIn && zIn;
    return !isIn;
  };

  // Helper function for inverse rotation (reverse order of xyz rotations)
  const applyInverseRotation = (
    x: number,
    y: number,
    z: number,
    angleX: number,
    angleY: number,
    angleZ: number,
  ) => {
    // Convert angles to radians (negated for inverse)
    const radX = (-angleX * Math.PI) / 180;
    const radY = (-angleY * Math.PI) / 180;
    const radZ = (-angleZ * Math.PI) / 180;

    // Apply rotations in reverse order: Z, Y, X (inverse of X, Y, Z)
    const cosX = Math.cos(radX),
      sinX = Math.sin(radX);
    const cosY = Math.cos(radY),
      sinY = Math.sin(radY);
    const cosZ = Math.cos(radZ),
      sinZ = Math.sin(radZ);

    // First rotate around Z (inverse)
    let x1 = x * cosZ - y * sinZ;
    let y1 = x * sinZ + y * cosZ;
    let z1 = z;

    // Then rotate around Y (inverse)
    let x2 = x1 * cosY + z1 * sinY;
    let y2 = y1;
    let z2 = -x1 * sinY + z1 * cosY;

    // Finally rotate around X (inverse)
    let x3 = x2;
    let y3 = y2 * cosX - z2 * sinX;
    let z3 = y2 * sinX + z2 * cosX;

    return {
      x: x3,
      y: y3,
      z: z3,
    };
  };

  const filter = (): void => {
    if (reductions.value === null) {
      return;
    }

    const length = reductions.value.length;
    const newFiltered = new Array<boolean>(length);

    for (let i = 0; i < length; i += 1) {
      newFiltered[i] = isFiltered(i);
    }

    filtered.value = newFiltered;
  };

  const reset = () => {
    filtered.value = [];
  };

  return {
    filtered,
    filter,
    reset,
  };
}
