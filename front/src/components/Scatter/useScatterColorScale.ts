import chroma from 'chroma-js';
import {reactive, watch} from 'vue';
import {colorsStore} from '../Colors/colorsStore';
import {datasetRef} from './useScatterDataset';
import {scatterAlphasStore} from './scatterStore';
import {mapRange} from 'src/utils/map-range';
import {useIndexes} from 'src/hooks/useIndexes';
import {metaPropertiesAsColorTypesRef} from 'src/hooks/useStorageMetaProperties';
import {useScatterMeta} from './useScatterMeta';

interface ColorScaleRef {
  value: string[] | null;
}

export const colorScaleRef = reactive<ColorScaleRef>({
  value: null,
});

export function useScatterColorScale() {
  const {convertPointIndex} = useIndexes();
  const {getMetaColor} = useScatterMeta();

  watch([datasetRef, colorsStore], () => {
    if (
      datasetRef.value === null ||
      metaPropertiesAsColorTypesRef.value === null
    ) {
      return;
    }

    const pointsCount = datasetRef.value.points.length;

    const chromaScale = chroma
      .scale(colorsStore.colorScale)
      .domain([0, 1.001]) // TODO: tricky, make domain adapt to span of values
      .mode('hsl');

    const colorScale = [];
    const colorType = colorsStore.colorType;

    for (let pointIndex = 0; pointIndex < pointsCount; ++pointIndex) {
      let color = '' as string;

      if (colorType === 'pointIndex') {
        const rangedPointIndex = mapRange(pointIndex, 0, pointsCount, 0, 1);
        color = chromaScale(rangedPointIndex)
          .alpha(scatterAlphasStore.high)
          .css();
      } else if (colorType === 'fileIndex') {
        const [fileIndex] = convertPointIndex(pointIndex);
        const rangedFileIndex = mapRange(fileIndex, 0, pointsCount, 0, 1);
        color = chromaScale(rangedFileIndex)
          .alpha(scatterAlphasStore.high)
          .css();
      } else if (metaPropertiesAsColorTypesRef.value.includes(colorType)) {
        color = getMetaColor(colorType, pointIndex);
      }

      colorScale.push(color);
    }

    colorScaleRef.value = colorScale;
    console.log('generate color scale');
  });
}
