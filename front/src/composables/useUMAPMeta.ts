import {
  convertColumnsToColorTypes,
} from '../utils/convert-columns-to-color-types';
import {configStore} from '../store/config.store';
import {useColors} from './useColors';
import {useUMAPDataset} from './useUMAPDataset';
import {convertHexToRgba} from '../utils/convert-hex-to-rgba';

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

  function createLimitedColorScale(length: number): string[] {
    return colors.value.colors(length);
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

    return colors[metaIndex];
  }

  function getMetaColorFromMetaIndex(index: number, length: number): string {
    const colors = createLimitedColorScale(length);
    const hex = colors[index];

    const {r, g, b} = convertHexToRgba(hex.substring(1));
    const a = 0.8;

    return `rgba(${r},${g},${b},${a})`;
  }

  return {
    getMetaPropertiesAsColorTypes,
    getMetaColor,
    getMetaColorFromMetaIndex,
  };
}
