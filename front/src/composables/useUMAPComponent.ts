import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import html2canvas from 'html2canvas';
import {onUnmounted, watch} from 'vue';
import {ScatterGL} from '../lib/scatter-gl-0.0.13';
import {playerStore} from '../store/player.store';
import {settingsStore} from '../store/settings.store';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import {UMAPFiltersStore} from '../store/UMAP-filters.store';
import {UMAPMetaStore} from '../store/UMAP-meta.store';
import {UMAPQueryComplexStore} from '../store/UMAP-query-complex.store';
import {UMAPQueryStore} from '../store/UMAP-query.store';
import {UMAPScatterStore} from '../store/UMAP-scatter.store';
import {UMAPTimeRangeStore} from '../store/UMAP-time-range.store';
import {UMAPStore} from '../store/UMAP.store';
import {
  convertColumnsToColorTypes,
} from '../utils/convert-columns-to-color-types';
import {copyToClipboard} from '../utils/copy-to-clipboard';
import {isHourDuringDay} from '../utils/is-hour-during-day';
import {mapRange} from '../utils/map-range';
import {useColors} from './useColors';
import {useEventListener} from './useEventListener';
import {useNotification} from './useNotification';
import {useStorage} from './useStorage';
import {useUMAPFilters} from './useUMAPFilters';
import {useUMAPMeta} from './useUMAPMeta';

dayjs.extend(relativeTime);

export function useUMAPComponent() {
  const {colors, nightColor, dayColor, cyclingColors} = useColors();
  const {shouldBeFiltered} = useUMAPFilters();
  const {getMetaColor} = useUMAPMeta();
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

  async function handleClick(index: number | null): Promise<void> {
    if (!index) {
      return;
    }

    const point = UMAPDatasetStore?.dataset?.metadata[index];
    const label = point?.label;

    if (!label) {
      return;
    }

    const {getSettings} = await useStorage();
    const settings = await getSettings();

    const path = `${settings.base_path}/${settings.audio_folder}${label}`;
    playerStore.src = path;
    await copyToClipboard(path);
    notify('success', 'Audio file path copied to clipboard', path);
  }

  async function render() {
    if (scatterGL === null || UMAPDatasetStore.dataset === null) {
      return;
    }

    scatterGL.updateDataset(UMAPDatasetStore.dataset);
    scatterGL.resize();
    scatterGL.startOrbitAnimation();

    if (isFirstRender) {
      const {getStorageMetas} = await useStorage();
      const metas = await getStorageMetas();
      const metaProperties = Object.keys(metas);
      const metaSets = Object.values(metas);

      scatterGL.render(UMAPDatasetStore.dataset);
      scatterGL.setPointColorer(
        (i, s, h) => getColor(
          i,
          s,
          h,
          metaProperties,
          metaSets,
        ),
      );
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
    if (!UMAPScatterStore.ref) {
      return;
    }

    let targetElement: HTMLElement = UMAPScatterStore.ref;

    if (settingsStore.umap.screenshot.isFull) {
      targetElement = document.body;
    }

    const canvas = await html2canvas(targetElement);

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

  useEventListener(window, 'resize', handleResize);

  /**
   * @see https://github.com/PAIR-code/scatter-gl/issues/99
   */
  function getColor(
    index: number,
    selectedIndices: Set<number>,
    hoverIndex: number | null,
    metaProperties: string[],
    metaSets: string[][],
  ): string {
    const filteredColor = `hsla(0, 0%, 0%, ${UMAPStore.alpha.low})`;
    const shouldBeFilteredOut = shouldBeFiltered(index, metaProperties);

    if (shouldBeFilteredOut) {
      return filteredColor;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const dataset = UMAPDatasetStore.dataset!;
    const {colorType} = UMAPFiltersStore;
    const metaPropertiesAsColorTypes = convertColumnsToColorTypes(metaProperties);

    const timestamp = dataset.metadata[index]['timestamp'] as number;
    const date = dayjs(timestamp * 1000);
    const range = {
      min: dayjs((UMAPTimeRangeStore?.min ?? 0) * 1000),
      max: dayjs((UMAPTimeRangeStore?.max ?? 0) * 1000),
    };

    const hoverColor = 'red';

    const labelIndex = dataset.metadata[index]['labelIndex'] as number;
    const rangedLabelIndex = mapRange(labelIndex, 0, dataset.metadata.length, 0, 1);

    const rangedPointIndex = mapRange(index, 0, dataset.metadata.length, 0, 1);
    const indexColor = colors.value(rangedPointIndex).alpha(UMAPStore.alpha.high).css();
    let color = indexColor;

    if (colorType === 'labelIndex') {
      color = colors.value(rangedLabelIndex).alpha(UMAPStore.alpha.high).css();
    } else if (colorType === 'pointIndex') {
      color = indexColor;
    } else if (colorType === 'by1h') {
      const rangeInHours = range.max.diff(range.min, 'hours');
      const currentHourFromStart = date.diff(range.min, 'hours');
      const rangedIndex = mapRange(currentHourFromStart, 0, rangeInHours, 0, 1);

      color = colors.value(rangedIndex).alpha(UMAPStore.alpha.high).css();
    } else if (colorType === 'by10min') {
      const rangeInMinutes = range.max.diff(range.min, 'minutes');
      const currentMinuteFromStart = date.diff(range.min, 'minutes');
      const rangedIndex = mapRange(currentMinuteFromStart, 0, rangeInMinutes, 0, 1);

      color = colors.value(rangedIndex).alpha(UMAPStore.alpha.high).css();
    } else if (colorType === 'isDay') {
      const hour = date.get('hours');
      const isDay = isHourDuringDay(hour);

      color = isDay
        ? dayColor.alpha(UMAPStore.alpha.high).css()
        : nightColor.alpha(UMAPStore.alpha.high).css();
    } else if (colorType === 'cycleDay') {
      const hour = date.get('hours');
      const rangedIndex = mapRange(hour, 0, 24, 0, 1);

      color = cyclingColors.value(rangedIndex).alpha(UMAPStore.alpha.high).css();
    } else if (metaPropertiesAsColorTypes.includes(colorType)) {
      color = getMetaColor(colorType, index, metaPropertiesAsColorTypes, metaSets);
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

  onUnmounted(() => {
    destroy();
  });

  watch([
    UMAPTimeRangeStore,
    UMAPFiltersStore,
    UMAPQueryStore,
    UMAPMetaStore,
    UMAPQueryComplexStore,
    UMAPStore,
    UMAPDatasetStore,
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
