import {configStore} from '../store/config.store';
import {UMAPStore} from '../store/UMAP.store';
import {
  convertColumnsToColorTypes,
} from '../utils/convert-columns-to-color-types';
import {useColors} from './useColors';
import {useUMAPDataset} from './useUMAPDataset';

export function useUMAPMeta() {
  const {colors} = useColors();
  const {getMetaContent} = useUMAPDataset();

  function getMetaPropertiesAsColorTypes() {
    return convertColumnsToColorTypes(configStore.metaProperties);
  }

  function createLimitedColorScale(length: number): [number, number, number][] {
    return colors.value.colors(length, 'rgb');
  }

  function getMetaColor(
    colorType: string,
    index: number,
    metaPropertiesAsColorTypes: string[],
    metaSets: string[][],
  ) {
    const metaPropertyIndex = metaPropertiesAsColorTypes.indexOf(colorType);
    const metaValues = getMetaContent(index);
    const metaValue = metaValues[metaPropertyIndex];
    const metaPossibleValues = metaSets[metaPropertyIndex];

    const colors = createLimitedColorScale(metaPossibleValues.length);
    const metaIndex = metaPossibleValues.indexOf(metaValue);

    const [r, g, b] = colors[metaIndex];

    return `rgba(${r},${g},${b},${UMAPStore.alpha.high})`;
  }

  function getMetaColorFromMetaIndex(index: number, length: number): string {
    const colors = createLimitedColorScale(length);
    const [r, g, b] = colors[index];
    const a = 0.8;

    return `rgba(${r},${g},${b},${a})`;
  }

  return {
    getMetaPropertiesAsColorTypes,
    getMetaColor,
    getMetaColorFromMetaIndex,
  };
}
