import type {ScatterGLParams} from 'src/lib/scatter-gl-0.0.13';
import {ScatterGL} from 'src/lib/scatter-gl-0.0.13';
import {onMounted, reactive, ref, watch} from 'vue';
import {useScatterClick} from './useScatterClick';
import {useScatterHover} from './useScatterHover';
import {useScatterRender} from './useScatterRender';
import {datasetRef} from './useScatterDataset';
import {useEventListener} from '@vueuse/core';
import {metaSelectionStore} from '../Meta/metaSelectionStore';
import {colorsStore} from '../Colors/colorsStore';
import {timeStore} from '../Time/timeStore';
import {queryStore} from '../Queries/queryStore';
import {queriesComplexStore} from '../Queries/queryComplexStore';
import {needsRefreshRef} from './useScatterFiltersNew';
import {alphaLowRef, colorScaleRef} from './useScatterColorScale';

interface ScatterRef {
  value: HTMLDivElement | null;
}

export const scatterRef = reactive<ScatterRef>({
  value: null,
});

export function useScatterContainer() {
  const {handleClick} = useScatterClick();
  const {handleHover} = useScatterHover();
  const containerRef = ref<HTMLDivElement | null>(null);

  const {render} = useScatterRender();
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
      // storage,
      timeStore,
      colorsStore,
      queryStore,
      metaSelectionStore,
      queriesComplexStore,
      needsRefreshRef,
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
