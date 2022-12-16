import {ScatterGL} from '../lib/scatter-gl-0.0.13';
import {onMounted, onUnmounted, ref, watch} from 'vue';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import {UMAPTimeRangeStore} from '../store/UMAP-time-range.store';
import {UMAPFiltersStore} from '../store/UMAP-filters.store';
import {UMAPQueryStore} from '../store/UMAP-query.store';
import {UMAPStore} from '../store/UMAP.store';
import {useUMAPTimestampsInDay} from './useUMAPTimestampsInDay';
import {mapRange} from '../utils/map-range';
import {isHourDuringDay} from '../utils/is-hour-during-day';
import {useColors} from './useColors';
import {useUMAPFilters} from './useUMAPFilters';
import {UMAPColumnsStore} from '../store/UMAP-columns.store';
import {UMAPQueryComplexStore} from '../store/UMAP-query-complex.store';
import {useConfig} from './useConfig';
import type {ConfigStoreInterface} from '../store/config.store';
import {useUMAPColumns} from './useUMAPColumns';
import {UMAPSelectionStore} from '../store/UMAP-selection.store';

export function useUMAPComponent() {
  const {colors, nightColor, dayColor} = useColors();
  const {shouldBeFiltered} = useUMAPFilters();
  const {timestampsInDay, updateTimestampsInDay} = useUMAPTimestampsInDay();
  const {getColumnsNamesAsColorTypes, getColumnColor} = useUMAPColumns();

  let isFirstRender = true;
  const containerRef = ref<HTMLDivElement | null>(null);
  let scatterGL: ScatterGL | null = null;

  function initializeScatterGL() {
    if (containerRef.value === null) {
      throw new Error('containerRef is null');
    }

    scatterGL = new ScatterGL(containerRef.value, {
      orbitControls: {
        zoomSpeed: 1.33,
      },
      onSelect: selectPoints,
    });
  }

  function selectPoints(indexes: number[]) {
    const payload = [];

    for (const index of indexes) {
      const metaElement = UMAPDatasetStore?.dataset?.metadata[index];
      payload.push(metaElement);
    }

    UMAPSelectionStore.selection = payload;
  }

  async function render() {
    if (scatterGL === null || UMAPDatasetStore.dataset === null) {
      return;
    }

    await updateTimestampsInDay();

    scatterGL.updateDataset(UMAPDatasetStore.dataset);
    scatterGL.resize();

    if (isFirstRender) {
      scatterGL.render(UMAPDatasetStore.dataset);
      const {columnsNames} = await useConfig();
      scatterGL.setPointColorer((i, s, h) => getColor(i, s, h, columnsNames));
      isFirstRender = false;
    }
  }

  function handleResize() {
    if (scatterGL === null) {
      return;
    }

    scatterGL.resize();
  }

  function addListeners() {
    window.addEventListener('resize', handleResize);
  }

  function removeListeners() {
    window.removeEventListener('resize', handleResize);
  }

  /**
   * @see https://github.com/PAIR-code/scatter-gl/issues/99
   */
  function getColor(index: number, selectedIndices: Set<number>, hoverIndex: number | null, columnsNames: ConfigStoreInterface['columnsNames']): string {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const dataset = UMAPDatasetStore.dataset!;
    const {colorType} = UMAPFiltersStore;
    const columnsNamesAsColorTypes = getColumnsNamesAsColorTypes();

    const rangedPointIndex = mapRange(index, 0, dataset.metadata.length, 0, 1);

    const labelIndex = dataset.metadata[index]['labelIndex'] as number;
    const rangedLabelIndex = mapRange(labelIndex, 0, dataset.metadata.length, 0, 1);

    const timeIndex = timestampsInDay.value[index];
    const rangedBy1hIndex = mapRange(timeIndex, 0, 24, 0, 1);
    const rangedBy10minIndex = mapRange(timeIndex, 0, 24 * 60 * 10, 0, 1); // TODO: fix

    const hoverColor = 'red';
    const filteredColor = `hsla(0, 0%, 0%, ${UMAPStore.alpha.low})`;

    const shouldBeFilteredOut = shouldBeFiltered(index, columnsNames);

    if (shouldBeFilteredOut) {
      return filteredColor;
    }

    const indexColor = colors.value(rangedPointIndex).alpha(UMAPStore.alpha.high).css();
    let color = indexColor;

    if (colorType === 'labelIndex') {
      color = colors.value(rangedLabelIndex).alpha(UMAPStore.alpha.high).css();
    } else if (colorType === 'pointIndex') {
      color = indexColor;
    } else if (colorType === 'by1h') {
      color = colors.value(rangedBy1hIndex).alpha(UMAPStore.alpha.high).css();
    } else if (colorType === 'by10min') {
      color = colors.value(rangedBy10minIndex).alpha(UMAPStore.alpha.high).css();
    } else if (colorType === 'isDay') {
      const isDay = isHourDuringDay(timeIndex);
      color = isDay
        ? dayColor.alpha(UMAPStore.alpha.high).css()
        : nightColor.alpha(UMAPStore.alpha.high).css();
    } else if (columnsNamesAsColorTypes.includes(colorType)) {
      color = getColumnColor(colorType, index);
    }

    if (hoverIndex === index) {
      return hoverColor;
    }

    if (selectedIndices.size === 0) {
      // return color.alpha(UMAPStore.alpha.high).css();
      return color;
    }

    const isSelected = selectedIndices.has(index);

    if (isSelected) {
      return color;
    }

    return filteredColor;
  }

  onMounted(() => {
    addListeners();
    initializeScatterGL();
  });

  onUnmounted(() => {
    removeListeners();
  });

  watch([
    UMAPTimeRangeStore,
    UMAPFiltersStore,
    UMAPQueryStore,
    UMAPColumnsStore,
    UMAPQueryComplexStore,
    UMAPStore,
  ], async () => {
    await render();
  });

  return {
    containerRef,
  };
}
