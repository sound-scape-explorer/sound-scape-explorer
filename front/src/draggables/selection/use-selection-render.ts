import {type Data} from 'plotly.js-dist-min';
import {useScatterDimensions} from 'src/components/scatter/use-scatter-dimensions';
import {useDraggableSelection} from 'src/draggables/selection/use-draggable-selection';
import {useSelectionRotation} from 'src/draggables/selection/use-selection-rotation';
import {useSelectionState} from 'src/draggables/selection/use-selection-state';
import {useSelectionVertices} from 'src/draggables/selection/use-selection-vertices';
import {computed} from 'vue';

type Vertex = {x: number; y: number; z: number};

export function useSelectionRender() {
  const {isWireframe} = useDraggableSelection();
  const {xRange, yRange, zRange, xAngle, yAngle, zAngle} = useSelectionState();
  const {i, j, k} = useSelectionVertices();
  const {rotatePoint} = useSelectionRotation();
  const {is3d} = useScatterDimensions();

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

    // 2d hack
    if (!is3d.value) {
      return [0, 0, 0, 0, 0, 0, 0, 0];
    }

    return [z0, z0, z0, z0, z1, z1, z1, z1];
  });

  const render = () => {
    const x0 = xRange.value[0];
    const x1 = xRange.value[1];
    const y0 = yRange.value[0];
    const y1 = yRange.value[1];
    const z0 = is3d.value ? zRange.value[0] : 0;
    const z1 = is3d.value ? zRange.value[1] : 0;

    // Calculate box center
    const centerX = (x0 + x1) / 2;
    const centerY = (y0 + y1) / 2;
    const centerZ = (z0 + z1) / 2;

    // Apply rotation to all vertices (centered rotation)
    const rotatedVertices = [];

    for (let i = 0; i < xBox.value.length; i += 1) {
      // Translate to origin (center the box)
      const translatedX = xBox.value[i] - centerX;
      const translatedY = yBox.value[i] - centerY;
      const translatedZ = zBox.value[i] - centerZ;

      // Rotate around origin
      const rotated = rotatePoint(
        translatedX,
        translatedY,
        translatedZ,
        xAngle.value,
        yAngle.value,
        zAngle.value,
      );

      // Translate back to original position
      rotatedVertices.push({
        x: rotated.x + centerX,
        y: rotated.y + centerY,
        z: rotated.z + centerZ,
      });
    }

    if (is3d.value && isWireframe.value) {
      return render3dWireframe(rotatedVertices);
    }

    if (is3d.value && !isWireframe.value) {
      return render3dPlain(rotatedVertices);
    }

    if (!is3d.value) {
      return render2d(rotatedVertices);
    }
  };

  const render2d = (vertices: Vertex[]) => {
    const x = [...vertices.map((v) => v.x), vertices[0].x];
    const y = [...vertices.map((v) => v.y), vertices[0].y];

    const trace: Data = {
      type: 'scatter',
      mode: 'lines',
      x,
      y,
      fill: isWireframe.value ? 'none' : 'toself',
      fillcolor: 'rgba(0, 0, 255, 0.3)',
      line: {color: 'blue', width: 2},
      hoverinfo: 'skip',
      showlegend: false,
    };

    return [trace];
  };

  const serializeVertices = (vertices: Vertex[]) => {
    return {
      x: vertices.map((v) => v.x),
      y: vertices.map((v) => v.y),
      z: vertices.map((v) => v.z),
    };
  };

  const render3dPlain = (vertices: Vertex[]) => {
    const series = serializeVertices(vertices);

    const boxTrace: Data = {
      type: 'mesh3d',
      name: '',
      x: series.x,
      y: series.y,
      z: series.z,
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
  };

  const render3dWireframe = (vertices: Vertex[]) => {
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

    const series = serializeVertices(vertices);

    const wireframeTraces: Data[] = edges.map(([start, end]) => ({
      type: 'scatter3d',
      mode: 'lines',
      x: [series.x[start], series.x[end]],
      y: [series.y[start], series.y[end]],
      z: [series.z[start], series.z[end]],
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
