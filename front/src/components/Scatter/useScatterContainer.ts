import type {ScatterGLParams} from 'src/lib/scatter-gl-0.0.13';
import {ScatterGL} from 'src/lib/scatter-gl-0.0.13';
import {onMounted, reactive, ref, watch} from 'vue';
import {clickedRef, useScatterClick} from './useScatterClick';
import {useScatterHover} from './useScatterHover';
import {useScatterRender} from './useScatterRender';
import {datasetRef} from './useScatterDataset';
import {useEventListener} from '@vueuse/core';
import {alphaLowRef, colorScaleRef} from './useScatterColorScale';
import {pointsFilteredByTimeRef} from './useScatterFilterTime';
import {pointsFilteredByMetaRef} from './useScatterFilterMeta';
import {scatterResetRef} from './useScatterReset';
import {
  scatterSelectNextRef,
  scatterSelectPreviousRef,
} from './useScatterSelect';
import {pointsFilteredRef} from './useScatterFilter';

interface ScatterRef {
  value: HTMLDivElement | null;
}

export const scatterRef = reactive<ScatterRef>({
  value: null,
});

export function useScatterContainer() {
  const {handleClick} = useScatterClick();
  const {handleHover} = useScatterHover();
  const {render} = useScatterRender();

  const containerRef = ref<HTMLDivElement | null>(null);
  let scatter: ScatterGL | null = null;

  const load = (container: HTMLDivElement) => {
    const params: ScatterGLParams = {
      orbitControls: {
        zoomSpeed: 1.33,
      },
      selectEnabled: false,
      onClick: handleClick,
      onHover: handleHover,
    };

    scatter = new ScatterGL(container, params);
  };

  // render watch
  watch(
    [
      datasetRef,
      colorScaleRef,
      alphaLowRef,
      clickedRef,
      pointsFilteredByMetaRef,
      pointsFilteredByTimeRef,
    ],
    () => {
      if (scatter === null || datasetRef.value === null) {
        return;
      }

      render(scatter, datasetRef.value);
    },
  );

  watch(scatterResetRef, () => {
    if (scatter === null || scatterResetRef.value === false) {
      return;
    }

    scatter.resetZoom();
    scatterResetRef.value = false;
  });

  watch(scatterSelectPreviousRef, () => {
    if (
      scatter === null ||
      clickedRef.value === null ||
      pointsFilteredRef.value === null ||
      scatterSelectPreviousRef.value === false
    ) {
      return;
    }

    scatterSelectPreviousRef.value = false;

    const pointsPrevious = pointsFilteredRef.value.slice(0, clickedRef.value);
    const previousIndex = pointsPrevious.findLastIndex((p) => p === false);

    if (previousIndex === -1) {
      return;
    }

    handleClick(previousIndex);
  });

  watch(scatterSelectNextRef, () => {
    if (
      scatter === null ||
      clickedRef.value === null ||
      pointsFilteredRef.value === null ||
      scatterSelectNextRef.value === false
    ) {
      return;
    }

    scatterSelectNextRef.value = false;

    const pointsNext = pointsFilteredRef.value.slice(clickedRef.value);
    const nextIndex = pointsNext.findIndex((p) => p === false);

    if (nextIndex === -1) {
      return;
    }

    const actualNextIndex = clickedRef.value + nextIndex + 1;

    if (actualNextIndex >= pointsFilteredRef.value.length) {
      return;
    }

    handleClick(actualNextIndex);
  });

  onMounted(() => {
    if (containerRef.value === null) {
      return;
    }

    scatterRef.value = containerRef.value;
    load(scatterRef.value);
  });

  useEventListener('resize', () => {
    if (scatter === null) {
      return;
    }

    scatter.resize();
  });

  return {
    containerRef: containerRef,
  };
}
