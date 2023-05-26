import {computed} from 'vue';
import {pointsFilteredByMetaRef} from './useScatterFilterMeta';
import {alphaLowRef, colorScaleRef} from './useScatterColorScale';
import {clickedRef} from './useScatterClick';

const specialAlpha = '0.8';

export function useScatterColor() {
  console.log('useScatterColor');

  const hoveredColorRef = computed<string>(() => {
    return `rgba(255, 0, 0, ${specialAlpha})`;
  });

  const selectedColorRef = computed<string>(() => {
    return `rgba(0, 0, 255, ${specialAlpha})`;
  });

  const filteredColorRef = computed<string>(() => {
    return `hsla(0, 0%, 0%, ${alphaLowRef.value})`;
  });

  /**
   * TODO: Port legacy code from v8
   * @see https://github.com/sound-scape-explorer/sound-scape-explorer/blob/main/front/src/components/Scatter/useScatter.ts#L162
   */
  const getColor = (
    index: number,
    _selectedIndices: Set<number>,
    hoverIndex: number | null,
  ): string => {
    if (index === hoverIndex) {
      return hoveredColorRef.value;
    }

    if (index === clickedRef.value) {
      return selectedColorRef.value;
    }

    if (
      pointsFilteredByMetaRef.value === null ||
      colorScaleRef.value === null
    ) {
      return 'black';
    }

    const isFiltered = pointsFilteredByMetaRef.value[index];

    if (isFiltered) {
      return filteredColorRef.value;
    }

    return colorScaleRef.value[index];
  };

  return {
    getColor: getColor,
  };
}
