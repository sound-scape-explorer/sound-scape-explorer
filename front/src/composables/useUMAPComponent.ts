import {ScatterGL} from '../lib/scatter-gl-0.0.13';
import {onMounted, onUnmounted, watch} from 'vue';
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
import {UMAPMetaStore} from '../store/UMAP-meta.store';
import {UMAPQueryComplexStore} from '../store/UMAP-query-complex.store';
import {useUMAPMeta} from './useUMAPMeta';
import {
  getRangeAndSiteFromDatasetLabel,
} from '../utils/get-range-and-site-from-dataset-label';
import {useConfig} from './useConfig';
import {copyToClipboard} from '../utils/copy-to-clipboard';
import {useNotification} from './useNotification';
import html2canvas from 'html2canvas';
import {UMAPScatterStore} from '../store/UMAP-scatter.store';

export function useUMAPComponent() {
  const {colors, nightColor, dayColor} = useColors();
  const {shouldBeFiltered} = useUMAPFilters();
  const {timestampsInDay, updateTimestampsInDay} = useUMAPTimestampsInDay();
  const {getMetaPropertiesAsColorTypes, getMetaColor} = useUMAPMeta();
  const {notify} = useNotification();

  let isFirstRender = true;
  let scatterGL: ScatterGL | null = null;

  function initializeScatterGL() {
    if (UMAPScatterStore.ref === null) {
      return;
    }

    scatterGL = new ScatterGL(UMAPScatterStore.ref, {
      orbitControls: {
        zoomSpeed: 1.33,
      },
      selectEnabled: false,
      onClick: handleClick,
    });
  }

  function destroy() {
    scatterGL = null;
    UMAPScatterStore.ref = null;
    UMAPDatasetStore.dataset = null;
  }

  function handleClick(index: number | null): void {
    if (!index) {
      return;
    }

    const point = UMAPDatasetStore?.dataset?.metadata[index];
    const label = point?.label;

    if (!label) {
      return;
    }

    useConfig().then(async ({config}) => {
      const {site} = getRangeAndSiteFromDatasetLabel(label);
      const audioBase = config?.variables.audio_base;
      const path = `${audioBase}${site}`;
      await copyToClipboard(path);
      notify('success', 'Audio file path copied to clipboard', path);
    });
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
      scatterGL.setPointColorer(getColor);
      isFirstRender = false;
    }
  }

  function handleResize() {
    if (scatterGL === null) {
      return;
    }

    scatterGL.resize();
  }

  async function screenshot() {
    const canvas = await html2canvas(document.body);

    canvas.style.display = 'none';
    document.body.appendChild(canvas);

    const image = canvas.toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');

    const anchor = document.createElement('a');
    anchor.download = 'SSE_UMAP.png';
    anchor.href = image;

    anchor.click();
    canvas.remove();
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
  function getColor(
    index: number,
    selectedIndices: Set<number>,
    hoverIndex: number | null,
  ): string {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const dataset = UMAPDatasetStore.dataset!;
    const {colorType} = UMAPFiltersStore;
    const metaPropertiesAsColorTypes = getMetaPropertiesAsColorTypes();

    const rangedPointIndex = mapRange(index, 0, dataset.metadata.length, 0, 1);

    const labelIndex = dataset.metadata[index]['labelIndex'] as number;
    const rangedLabelIndex = mapRange(labelIndex, 0, dataset.metadata.length, 0, 1);

    const timeIndex = timestampsInDay.value[index];
    const rangedBy1hIndex = mapRange(timeIndex, 0, 24, 0, 1);
    const rangedBy10minIndex = mapRange(timeIndex, 0, 24 * 60 * 10, 0, 1);

    const hoverColor = 'red';
    const filteredColor = `hsla(0, 0%, 0%, ${UMAPStore.alpha.low})`;

    const shouldBeFilteredOut = shouldBeFiltered(index);

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
    } else if (metaPropertiesAsColorTypes.includes(colorType)) {
      color = getMetaColor(colorType, index);
    }

    if (hoverIndex === index) {
      return hoverColor;
    }

    if (selectedIndices.size === 0) {
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
  });

  onUnmounted(() => {
    removeListeners();
    destroy();
  });

  watch([
    UMAPTimeRangeStore,
    UMAPFiltersStore,
    UMAPQueryStore,
    UMAPMetaStore,
    UMAPQueryComplexStore,
    UMAPStore,
  ], async () => {
    await render();
  });

  watch(UMAPScatterStore, () => {
    initializeScatterGL();
  });

  return {
    screenshot,
  };
}
