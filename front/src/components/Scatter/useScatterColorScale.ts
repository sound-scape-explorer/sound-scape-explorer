import chroma, {type Color, type Scale} from 'chroma-js';
import {computed, reactive, watchEffect} from 'vue';
import {colorsStore} from '../Colors/colorsStore';
import {datasetRef} from './useScatterDataset';
import {metaPropertiesAsColorTypesRef} from 'src/hooks/useStorageMetaProperties';
import {filenamesRef} from 'src/hooks/useStorageFilenames';
import {groupedTimestampsRef} from 'src/hooks/useStorageGroupedTimestamps';
import {useColorByPointIndex} from '../Colors/useColorByPointIndex';
import {useColorByFileIndex} from '../Colors/useColorByFileIndex';
import {useColorByGroupIndex} from '../Colors/useColorByGroupIndex';
import {useColorByOneHour} from '../Colors/useColorByOneHour';
import {useColorByTenMinutes} from '../Colors/useColorByTenMinutes';
import {useColorByDay} from '../Colors/useColorByDay';
import {useColorByCyclingDay} from '../Colors/useColorByCyclingDay';
import {useColorByMeta} from '../Colors/useColorByMeta';
import {groupedMetasRef} from 'src/hooks/useStorageGroupedMetas';
import {metaSetsRef} from 'src/hooks/useStorageMetaSets';
import {groupCountsByPointIndexesRef} from 'src/hooks/useStorageGroupCountsByPointIndexes';

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
      datasetRef.value === null ||
      metaPropertiesAsColorTypesRef.value === null ||
      filenamesRef.value === null ||
      groupedTimestampsRef.value === null ||
      groupedMetasRef.value === null ||
      metaSetsRef.value === null ||
      groupCountsByPointIndexesRef.value === null
    ) {
      return;
    }

    const pointsCount = datasetRef.value.points.length;
    const filesCount = filenamesRef.value.length;

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
