import {useBodyConfig} from 'src/components/timeline/body/use-body-config';
import {type Ref, ref} from 'vue';

export interface OverviewSize {
  width: Ref<number>;
  height: Ref<number>;
}

export type BodySize = Omit<OverviewSize, 'height'>; // dynamic height

const overviewContainer = ref<HTMLDivElement | null>(null);
const overviewCanvas = ref<HTMLCanvasElement | null>(null);
const overviewWidth = ref<number>(0);
const overviewHeight = ref<number>(0);

const bodyContainer = ref<HTMLDivElement | null>(null);
const bodyCanvas = ref<HTMLCanvasElement | null>(null);
const bodyWidth = ref<number>(0);
const bodyHeight = ref<number>(0);

export function useTimelineDom() {
  const {rows, rowHeight} = useBodyConfig();

  const updateOverviewSize = ({width, height}: OverviewSize) => {
    overviewWidth.value = width.value;
    overviewHeight.value = height.value;
  };

  const updateBodySize = ({width}: BodySize) => {
    bodyWidth.value = width.value;
    bodyHeight.value = rows.value * rowHeight;
  };

  return {
    overview: {
      container: overviewContainer,
      canvas: overviewCanvas,
      width: overviewWidth,
      height: overviewHeight,
      updateSize: updateOverviewSize,
    },
    body: {
      container: bodyContainer,
      canvas: bodyCanvas,
      width: bodyWidth,
      height: bodyHeight,
      updateSize: updateBodySize,
    },
  };
}
