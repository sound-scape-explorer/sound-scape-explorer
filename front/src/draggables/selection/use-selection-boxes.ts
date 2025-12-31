import {useSelectionBoundaries} from 'src/draggables/selection/use-selection-boundaries';
import {getRandomColor} from 'src/utils/colors';
import {ref} from 'vue';
import {z} from 'zod';

export const SelectionBoxRenderMode = z.enum(['Solid', 'Wireframe']);
// eslint-disable-next-line no-redeclare
export type SelectionBoxRenderMode = z.infer<typeof SelectionBoxRenderMode>;

export const SelectionBox = z.object({
  id: z.int(),
  color: z.string(),
  renderMode: SelectionBoxRenderMode,
  isRendering: z.boolean(),
  isFiltering: z.boolean(),
  ranges: z.object({
    x: z.tuple([z.number(), z.number()]),
    y: z.tuple([z.number(), z.number()]),
    z: z.tuple([z.number().nullable(), z.number().nullable()]),
  }),
  angles: z.object({
    x: z.number(),
    y: z.number(),
    z: z.number(),
  }),
});

// eslint-disable-next-line no-redeclare
export type SelectionBox = z.infer<typeof SelectionBox>;

export const SelectionBoxes = z.array(SelectionBox);
// eslint-disable-next-line no-redeclare
export type SelectionBoxes = z.infer<typeof SelectionBoxes>;

const boxes = ref<SelectionBoxes>([]);
const currentId = ref<number | null>(null);

export function useSelectionBoxes() {
  const {boundaries, offset} = useSelectionBoundaries();

  const resetCurrentId = () => {
    currentId.value = null;
  };

  const getCenters = (): {
    x: [number, number];
    y: [number, number];
    z: [number, number];
  } => {
    const xCenter = (boundaries.value.x[1] + boundaries.value.x[0]) / 2;
    const yCenter = (boundaries.value.y[1] + boundaries.value.y[0]) / 2;
    const zCenter = (boundaries.value.z[1] + boundaries.value.z[0]) / 2;

    const x: [number, number] = [xCenter - offset, xCenter + offset];
    const y: [number, number] = [yCenter - offset, yCenter + offset];
    const z: [number, number] = [zCenter - offset, zCenter + offset];

    return {
      x,
      y,
      z,
    };
  };

  const addBox = () => {
    const id = boxes.value.length;
    const centers = getCenters();

    const newBox: SelectionBox = {
      id,
      color: getRandomColor(),
      renderMode: SelectionBoxRenderMode.enum.Wireframe,
      isRendering: true,
      isFiltering: false,
      ranges: {
        x: centers.x,
        y: centers.y,
        z: centers.z,
      },
      angles: {
        x: 0,
        y: 0,
        z: 0,
      },
    };

    boxes.value = [...boxes.value, newBox];
  };

  const reorderBoxes = () => {
    let i = -1;

    boxes.value = boxes.value.map((box) => {
      i += 1;

      return {
        ...box,
        id: i,
      };
    });
  };

  const removeBox = () => {
    const currentBox = getCurrentBox();

    if (!currentBox) {
      return;
    }

    boxes.value = boxes.value.filter((box) => box.id !== currentBox.id);
    resetCurrentId();
    reorderBoxes();
  };

  const getCurrentBox = (): SelectionBox | null => {
    const box = boxes.value.find((box) => box.id === currentId.value);
    return box ?? null;
  };

  const randomizeBoxColor = () => {
    const box = getCurrentBox();
    if (box) {
      box.color = getRandomColor();
    }
  };

  const showBox = () => {
    const box = getCurrentBox();
    if (box) {
      box.isRendering = true;
    }
  };

  const hideBox = () => {
    const box = getCurrentBox();
    if (box) {
      box.isRendering = false;
    }
  };

  const enableBox = () => {
    const box = getCurrentBox();
    if (box) {
      box.isFiltering = true;
    }
  };

  const disableBox = () => {
    const box = getCurrentBox();
    if (box) {
      box.isFiltering = false;
    }
  };

  const expandBox = () => {
    const box = getCurrentBox();
    if (box) {
      box.ranges.x = boundaries.value.x;
      box.ranges.y = boundaries.value.y;
      box.ranges.z = boundaries.value.z;
    }
  };

  const shrinkBox = () => {
    const box = getCurrentBox();
    if (box) {
      const centers = getCenters();

      box.ranges.x = centers.x;
      box.ranges.y = centers.y;
      box.ranges.z = centers.z;
    }
  };

  const resetBoxAngles = () => {
    const box = getCurrentBox();
    if (box) {
      box.angles.x = 0;
      box.angles.y = 0;
      box.angles.z = 0;
    }
  };

  const resetBoxes = () => {
    boxes.value = [];
    currentId.value = null;
  };

  return {
    boxes,
    currentId,
    addBox,
    removeBox,
    getCurrentBox,
    randomizeBoxColor,
    showBox,
    hideBox,
    enableBox,
    disableBox,
    expandBox,
    shrinkBox,
    resetBoxAngles,
    resetBoxes,
  };
}
