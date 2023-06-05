import type {ScatterGLParams} from 'src/lib/scatter-gl-0.0.13';
import {ScatterGL} from 'src/lib/scatter-gl-0.0.13';
import {onMounted, reactive, ref, watch} from 'vue';
import {useScatterClick} from './useScatterClick';
import {useScatterHover} from './useScatterHover';
import {useScatterRender} from './useScatterRender';
import {datasetRef} from './useScatterDataset';
import {useEventListener} from '@vueuse/core';
import {alphaLowRef, colorScaleRef} from './useScatterColorScale';
import {pointsFilteredByTimeRef} from './useScatterFilterTime';
import {pointsFilteredByMetaRef} from './useScatterFilterMeta';
import {scatterResetRef} from './useScatterReset';

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
      pointsFilteredByMetaRef,
      pointsFilteredByTimeRef,
      colorScaleRef,
      alphaLowRef,
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
