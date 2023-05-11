import {metaPropertiesAsColorTypesRef} from 'src/hooks/useStorageMetaProperties';
import {useColors} from '../Colors/useColors';
import {scatterAlphasStore} from './scatterStore';
import {metaSetsRef} from 'src/hooks/useStorageMetaSets';
import {groupedMetasRef} from 'src/hooks/useStorageGroupedMetas';

export function useScatterMeta() {
  const {colors} = useColors();

  function createLimitedColorScale(length: number): [number, number, number][] {
    return colors.value.colors(length, 'rgb');
  }

  function getMetaColor(colorType: string, index: number) {
    if (
      metaPropertiesAsColorTypesRef.value === null ||
      metaSetsRef.value === null ||
      groupedMetasRef.value === null
    ) {
      throw new Error('getMetaColor: missing dependencies');
    }
    const metaPropertyIndex =
      metaPropertiesAsColorTypesRef.value.indexOf(colorType);
    const metaValues = groupedMetasRef.value[index];
    const metaValue = metaValues[metaPropertyIndex];
    const metaPossibleValues = metaSetsRef.value[metaPropertyIndex];

    const colors = createLimitedColorScale(metaPossibleValues.length);
    const metaIndex = metaPossibleValues.indexOf(metaValue);

    const [r, g, b] = colors[metaIndex];

    return `rgba(${r},${g},${b},${scatterAlphasStore.high})`;
  }

  function getMetaColorFromMetaIndex(index: number, length: number): string {
    const colors = createLimitedColorScale(length);
    const [r, g, b] = colors[index];
    const a = 0.8;

    return `rgba(${r},${g},${b},${a})`;
  }

  return {
    getMetaColor: getMetaColor,
    getMetaColorFromMetaIndex: getMetaColorFromMetaIndex,
  };
}
