import {
  convertColumnsToColorTypes,
} from '../utils/convert-columns-to-color-types';
import {configStore} from '../store/config.store';
import {mapRange} from '../utils/map-range';
import {useColors} from './useColors';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';

export function useUMAPMeta() {
  const {colors} = useColors();

  function getMetaPropertiesAsColorTypes() {
    return convertColumnsToColorTypes(configStore.metaProperties);
  }

  function getMetaColor(colorType: string, index: number, length = UMAPDatasetStore.dataset?.metadata.length || 0) {
    const metaPropertiesAsColorTypes = getMetaPropertiesAsColorTypes();
    const metaPropertyIndex = metaPropertiesAsColorTypes.indexOf(colorType);
    const metaValues = configStore.metaContents[metaPropertyIndex];
    const metaValuesLength = metaValues.length;

    if (metaValuesLength > 0) {
      const limitedColorScale = colors.value.colors(metaValuesLength);
      const newIndex = mapRange(index, 0, length, 1, metaValuesLength) - 1;
      const roundedNewIndex = Math.round(newIndex);

      return limitedColorScale[roundedNewIndex];
    }

    return 'red';
  }

  return {
    getMetaPropertiesAsColorTypes,
    getMetaColor,
  };
}
