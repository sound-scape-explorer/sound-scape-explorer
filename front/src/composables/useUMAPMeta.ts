import {
  convertColumnsToColorTypes,
} from '../utils/convert-columns-to-color-types';
import {configStore} from '../store/config.store';
import {useColors} from './useColors';
import {useUMAPDataset} from './useUMAPDataset';
import {UMAPStore} from '../store/UMAP.store';

export function useUMAPMeta() {
  const {colors} = useColors();
  const {getMetaContent} = useUMAPDataset();

  function getMetaPropertiesAsColorTypes() {
    return convertColumnsToColorTypes(configStore.metaProperties);
  }

  function getMetaPropertyIndexFromColorType(colorType: string): number {
    const metaPropertiesAsColorTypes = getMetaPropertiesAsColorTypes();
    return metaPropertiesAsColorTypes.indexOf(colorType);
  }

  function createLimitedColorScale(length: number): [number, number, number][] {
    return colors.value.colors(length, 'rgb');
  }

  function getMetaColor(
    colorType: string,
    index: number,
  ) {
    const metaPropertyIndex = getMetaPropertyIndexFromColorType(colorType);
    const metaContent = getMetaContent(index);
    const metaValue = metaContent[metaPropertyIndex][0];
    const metaPossibleValues = configStore.metaContents[metaPropertyIndex];

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
