import {useBodyConfig} from 'src/components/timeline/body/use-body-config';
import {type Ref, ref} from 'vue';

export interface OverviewSize {
  width: Ref<number>;
  height: Ref<number>;
}

export type BodySize = Omit<OverviewSize, 'height'>; // dynamic height

const overviewContainer = ref<Nullable<HTMLDivElement>>(null);
const overviewCanvas = ref<Nullable<HTMLCanvasElement>>(null);
const overviewWidth = ref<number>(0);
const overviewHeight = ref<number>(0);

const bodyContainer = ref<Nullable<HTMLDivElement>>(null);
const bodyCanvas = ref<Nullable<HTMLCanvasElement>>(null);
const bodyWidth = ref<number>(0);
const bodyHeight = ref<number>(0);

export function useTimelineDom() {
  const {rows, config} = useBodyConfig();

  const updateOverviewSize = ({width, height}: OverviewSize) => {
    overviewWidth.value = width.value;
    overviewHeight.value = height.value;
  };

  const updateBodySize = ({width}: BodySize) => {
    bodyWidth.value = width.value;
    bodyHeight.value = rows.value * config.value.rowHeight;
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
