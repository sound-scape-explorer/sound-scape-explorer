import {
  convertColumnsToColorTypes,
} from '../utils/convert-columns-to-color-types';
import {configStore} from '../store/config.store';
import {useColors} from './useColors';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';

export function useUMAPMeta() {
  const {colors} = useColors();

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

  function getMetaContentFromIndex(index: number): string[][] {
    return UMAPDatasetStore?.dataset?.metadata[index].metaContent as unknown as string[][];
  }

  function getMetaColor(
    colorType: string,
    index: number,
  ) {
    const metaPropertyIndex = getMetaPropertyIndexFromColorType(colorType);
    const metaContent = getMetaContentFromIndex(index);
    const metaValue = metaContent[metaPropertyIndex][0];
    const metaPossibleValues = configStore.metaContents[metaPropertyIndex];

    const colors = createLimitedColorScale(metaPossibleValues.length);
    const metaIndex = metaPossibleValues.indexOf(metaValue);

    return colors[metaIndex];
  }

  function getMetaColorFromMetaIndex(index: number, length: number): string {
    const colors = createLimitedColorScale(length);
    return colors[index];
  }

  return {
    getMetaPropertiesAsColorTypes,
    getMetaColor,
    getMetaColorFromMetaIndex,
  };
}
