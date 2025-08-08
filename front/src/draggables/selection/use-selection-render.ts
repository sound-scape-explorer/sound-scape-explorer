import {type Data} from 'plotly.js-dist-min';
import {useDraggableSelection} from 'src/draggables/selection/use-draggable-selection';
import {useSelectionProps} from 'src/draggables/selection/use-selection-props';
import {useSelectionRotation} from 'src/draggables/selection/use-selection-rotation';
import {useSelectionVertices} from 'src/draggables/selection/use-selection-vertices';
import {computed} from 'vue';

export function useSelectionRender() {
  const {isWireframe} = useDraggableSelection();
  const {xRange, yRange, zRange, tiltAngleX, tiltAngleY, tiltAngleZ} =
    useSelectionProps();
  const {i, j, k} = useSelectionVertices();
  const {rotatePoint} = useSelectionRotation();

  const xBox = computed(() => {
    const x0 = xRange.value[0];
    const x1 = xRange.value[1];
    return [x0, x1, x1, x0, x0, x1, x1, x0];
  });

  const yBox = computed(() => {
    const y0 = yRange.value[0];
    const y1 = yRange.value[1];
    return [y0, y0, y1, y1, y0, y0, y1, y1];
  });

  const zBox = computed(() => {
    const z0 = zRange.value[0];
    const z1 = zRange.value[1];
    return [z0, z0, z0, z0, z1, z1, z1, z1];
  });

  const render = () => {
    const x0 = xRange.value[0];
    const x1 = xRange.value[1];
    const y0 = yRange.value[0];
    const y1 = yRange.value[1];
    const z0 = zRange.value[0];
    const z1 = zRange.value[1];

    // Calculate box center
    const centerX = (x0 + x1) / 2;
    const centerY = (y0 + y1) / 2;
    const centerZ = (z0 + z1) / 2;

    // Apply rotation to all vertices (centered rotation)
    const rotatedVertices = [];
    for (let i = 0; i < xBox.value.length; i++) {
      // Translate to origin (center the box)
      const translatedX = xBox.value[i] - centerX;
      const translatedY = yBox.value[i] - centerY;
      const translatedZ = zBox.value[i] - centerZ;

      // Rotate around origin
      const rotated = rotatePoint(
        translatedX,
        translatedY,
        translatedZ,
        tiltAngleX.value,
        tiltAngleY.value,
        tiltAngleZ.value,
      );

      // Translate back to original position
      rotatedVertices.push({
        x: rotated.x + centerX,
        y: rotated.y + centerY,
        z: rotated.z + centerZ,
      });
    }

    const rotatedX = rotatedVertices.map((v) => v.x);
    const rotatedY = rotatedVertices.map((v) => v.y);
    const rotatedZ = rotatedVertices.map((v) => v.z);

    if (!isWireframe.value) {
      const boxTrace: Data = {
        type: 'mesh3d',
        name: '',
        x: rotatedX,
        y: rotatedY,
        z: rotatedZ,
        i,
        j,
        k,
        opacity: 0.3,
        // @ts-expect-error: shitty plotly.js definitions
        color: 'blue',
        flatshading: true,
        showscale: false,
        hoverinfo: 'none',
      };

      return [boxTrace];
    }

    const edges = [
      // Bottom face edges
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      // Top face edges
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4],
      // Vertical edges
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
    ];

    const wireframeTraces: Data[] = edges.map(([start, end]) => ({
      type: 'scatter3d',
      mode: 'lines',
      x: [rotatedX[start], rotatedX[end]],
      y: [rotatedY[start], rotatedY[end]],
      z: [rotatedZ[start], rotatedZ[end]],
      line: {color: 'blue', width: 2},
      hoverinfo: 'skip',
      showlegend: false,
    }));

    return wireframeTraces;
  };

  return {
    render,
  };
}
