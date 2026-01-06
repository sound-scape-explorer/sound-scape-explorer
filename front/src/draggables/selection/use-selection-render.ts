import {type Data} from 'plotly.js-dist-min';
import {useScatterDimensions} from 'src/components/scatter/use-scatter-dimensions';
import {
  type SelectionBox,
  SelectionBoxRenderMode,
  useSelectionBoxes,
} from 'src/draggables/selection/use-selection-boxes';
import {useSelectionGeometry} from 'src/draggables/selection/use-selection-geometry';
import {useSelectionVertices} from 'src/draggables/selection/use-selection-vertices';

type Vertex = {x: number; y: number; z: number};

export function useSelectionRender() {
  const {boxes} = useSelectionBoxes();
  const {i, j, k} = useSelectionVertices();
  const {rotateVertices} = useSelectionGeometry();
  const {is3d} = useScatterDimensions();

  const renderBox3d = (
    box: SelectionBox,
    rotatedVertices: Vertex[],
  ): Data[] => {
    if (box.renderMode === SelectionBoxRenderMode.enum.Solid) {
      const meshTraces = renderBox3dSolid(box, rotatedVertices);
      const edgeTraces = box.isFiltering
        ? renderBox3dWireframe(box, rotatedVertices)
        : [];

      return [...meshTraces, ...edgeTraces];
    }

    const traces = renderBox3dWireframe(box, rotatedVertices);
    return traces;
  };

  const renderBox2d = (box: SelectionBox, vertices: Vertex[]) => {
    const x = [...vertices.map((v) => v.x), vertices[0].x];
    const y = [...vertices.map((v) => v.y), vertices[0].y];

    const trace: Data = {
      type: 'scatter',
      mode: 'lines',
      x,
      y,
      fill:
        box.renderMode === SelectionBoxRenderMode.enum.Wireframe
          ? 'none'
          : 'toself',
      fillcolor: `${box.color}33`,
      line: {
        color: box.color,
        width: 2,
        dash: box.isFiltering ? 'solid' : 'dash',
      },
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

  const renderBox3dSolid = (box: SelectionBox, vertices: Vertex[]) => {
    const series = serializeVertices(vertices);

    const trace: Data = {
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
      color: box.color,
      flatshading: true,
      showscale: false,
      hoverinfo: 'none',
    };

    return [trace];
  };

  const renderBox3dWireframe = (box: SelectionBox, vertices: Vertex[]) => {
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

    const traces: Data[] = edges.map(([start, end]) => ({
      type: 'scatter3d',
      mode: 'lines',
      x: [series.x[start], series.x[end]],
      y: [series.y[start], series.y[end]],
      z: [series.z[start], series.z[end]],
      line: {
        color: box.color,
        width: 2,
        dash: box.isFiltering ? 'solid' : 'dash',
      },
      hoverinfo: 'skip',
      showlegend: false,
    }));

    return traces;
  };

  const render = () => {
    const boxesToRender = boxes.value.filter((box) => box.isRendering);
    const allTraces: Data[] = [];

    for (const box of boxesToRender) {
      const rotatedVertices = rotateVertices(
        box.ranges,
        box.angles,
        is3d.value,
      );

      if (is3d.value) {
        const traces = renderBox3d(box, rotatedVertices);
        allTraces.push(...traces);
        continue;
      }

      const traces = renderBox2d(box, rotatedVertices);
      allTraces.push(...traces);
    }

    return allTraces;
  };

  return {
    render,
  };
}
