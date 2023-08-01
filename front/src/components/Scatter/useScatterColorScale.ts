import chroma, {type Color, type Scale} from 'chroma-js';
import {configFilesRef} from 'src/hooks/useConfigFiles';
import {groupCountsByPointIndexesRef} from 'src/hooks/useStorageGroupCountsByPointIndexes';
import {groupedMetasRef} from 'src/hooks/useStorageGroupedMetas';
import {groupedTimestampsRef} from 'src/hooks/useStorageGroupedTimestamps';
import {metaPropertiesAsColorTypesRef} from 'src/hooks/useStorageMetaProperties';
import {metaSetsRef} from 'src/hooks/useStorageMetaSets';
import {computed, reactive, watchEffect} from 'vue';
import {colorsStore} from '../Colors/colorsStore';
import {useColorByCyclingDay} from '../Colors/useColorByCyclingDay';
import {useColorByDay} from '../Colors/useColorByDay';
import {useColorByFileIndex} from '../Colors/useColorByFileIndex';
import {useColorByGroupIndex} from '../Colors/useColorByGroupIndex';
import {useColorByMeta} from '../Colors/useColorByMeta';
import {useColorByOneHour} from '../Colors/useColorByOneHour';
import {useColorByPointIndex} from '../Colors/useColorByPointIndex';
import {useColorByTenMinutes} from '../Colors/useColorByTenMinutes';
import {pointIndexesRef} from './usePointIndexes';

interface AlphaLowRef {
  value: number;
}

export const alphaLowRef = reactive<AlphaLowRef>({
  value: 0.005,
});

interface AlphaHighRef {
  value: number;
}

export const alphaHighRef = reactive<AlphaHighRef>({
  value: 0.3,
});

interface ColorScaleRef {
  value: string[] | null;
}

export const colorScaleRef = reactive<ColorScaleRef>({
  value: null,
});

export const chromaScaleRef = computed<Scale<Color>>(() => {
  return chroma.scale(colorsStore.colorScale).domain([0, 1]).mode('hsl');
});

export const cyclingScaleRef = computed<Scale<Color>>(() => {
  return chroma
    .scale(['blue', 'green', 'yellow', 'orange', 'yellow', 'red', 'blue'])
    .domain([0, 1])
    .mode('hsl');
});

export const dayColor = chroma('orange');
export const nightColor = chroma('blue');

export function useScatterColorScale() {
  const {getColorByPointIndex} = useColorByPointIndex();
  const {getColorByFileIndex} = useColorByFileIndex();
  const {getColorByGroupIndex} = useColorByGroupIndex();
  const {getColorByOneHour} = useColorByOneHour();
  const {getColorByTenMinutes} = useColorByTenMinutes();
  const {getColorByDay} = useColorByDay();
  const {getColorByCyclingDay} = useColorByCyclingDay();
  const {getColorByMeta} = useColorByMeta();

  const readColorScale = () => {
    if (
      pointIndexesRef.value === null ||
      metaPropertiesAsColorTypesRef.value === null ||
      configFilesRef.value === null ||
      groupedTimestampsRef.value === null ||
      groupedMetasRef.value === null ||
      metaSetsRef.value === null ||
      groupCountsByPointIndexesRef.value === null
    ) {
      return;
    }

    const pointsCount = pointIndexesRef.value.length;
    const filesCount = configFilesRef.value.length;

    const colorScale = [];
    const colorType = colorsStore.colorType;

    for (let pointIndex = 0; pointIndex < pointsCount; ++pointIndex) {
      let color = '';
      const groupCount = groupCountsByPointIndexesRef.value[pointIndex];

      if (colorType === 'pointIndex') {
        color = getColorByPointIndex(pointIndex, pointsCount);
      } else if (colorType === 'fileIndex') {
        color = getColorByFileIndex(pointIndex, filesCount);
      } else if (colorType === 'groupIndex') {
        color = getColorByGroupIndex(pointIndex, groupCount);
      } else if (colorType === 'by1h') {
        const timestamp = groupedTimestampsRef.value[pointIndex];
        color = getColorByOneHour(timestamp);
      } else if (colorType === 'by10min') {
        const timestamp = groupedTimestampsRef.value[pointIndex];
        color = getColorByTenMinutes(timestamp);
      } else if (colorType === 'isDay') {
        const timestamp = groupedTimestampsRef.value[pointIndex];
        color = getColorByDay(timestamp);
      } else if (colorType === 'cycleDay') {
        const timestamp = groupedTimestampsRef.value[pointIndex];
        color = getColorByCyclingDay(timestamp);
      } else if (metaPropertiesAsColorTypesRef.value.includes(colorType)) {
        color = getColorByMeta(
          pointIndex,
          colorType,
          metaPropertiesAsColorTypesRef.value,
          groupedMetasRef.value,
          metaSetsRef.value,
        );
      }

      colorScale.push(color);
    }

    colorScaleRef.value = colorScale;
    console.log('generate color scale');
  };

  watchEffect(readColorScale);
}
