import {
  convertColumnsToColorTypes,
} from '../utils/convert-columns-to-color-types';
import {configStore} from '../store/config.store';
import {mapRange} from '../utils/map-range';
import {useColors} from './useColors';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';

export function useUMAPColumns() {
  const {colors} = useColors();

  function getColumnsNamesAsColorTypes() {
    if (!configStore.columnsNames) {
      return [];
    }

    return convertColumnsToColorTypes(configStore.columnsNames);
  }

  function getColumnColor(colorType: string, index: number, length = UMAPDatasetStore.dataset?.metadata.length || 0) {
    const columnsNamesAsColorTypes = getColumnsNamesAsColorTypes();
    const columnNameIndex = columnsNamesAsColorTypes.indexOf(colorType);
    const columnEntries = configStore?.columns?.[columnNameIndex];
    const columnLength = columnEntries?.length || -1;

    if (columnLength > 0) {
      const limitedColorScale = colors.value.colors(columnLength);
      const newIndex = mapRange(index, 0, length, 1, columnLength) - 1;
      const roundedNewIndex = Math.round(newIndex);

      return limitedColorScale[roundedNewIndex];
    }

    return 'red';
  }

  return {
    getColumnsNamesAsColorTypes,
    getColumnColor,
  };
}
