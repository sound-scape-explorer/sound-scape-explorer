import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import html2canvas from 'html2canvas';
import {onUnmounted, watch} from 'vue';
import {EXPORT_FILENAME} from '../../constants';
import {useEventListener} from '../../hooks/useEventListener';
import {useStorage} from '../../hooks/useStorage';
import {ScatterGL} from '../../lib/scatter-gl-0.0.13';
import {
  convertSlugsToColorTypes,
} from '../../utils/convert-slugs-to-color-types';
import type {ScatterMetadata} from '../../utils/generate-scatter-dataset';
import {isHourDuringDay} from '../../utils/is-hour-during-day';
import {mapRange} from '../../utils/map-range';
import {colorsStore} from '../Colors/colorsStore';
import {useColors} from '../Colors/useColors';
import {metaSelectionStore} from '../Meta/metaSelectionStore';
import {queriesComplexStore} from '../Queries/queryComplexStore';
import {queryStore} from '../Queries/queryStore';
import {selectionStore} from '../Selection/selectionStore';
import {settingsStore} from '../Settings/settingsStore';
import {timeStore} from '../Time/timeStore';
import {scatterDatasetStore} from './scatterDatasetStore';
import {
  scatterAlphasStore,
  scatterHoverStore,
  scatterSelectedStore,
  scatterStore,
} from './scatterStore';
import {useScatterFilters} from './useScatterFilters';
import {useScatterMeta} from './useScatterMeta';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export function useScatter() {
  const {colors, nightColor, dayColor, cyclingColors} = useColors();
  const {shouldBeFiltered} = useScatterFilters();
  const {getMetaColor} = useScatterMeta();

  let isFirstRender = true;
  let scatterGL: ScatterGL | null = null;

  function initializeScatterGL(target: HTMLDivElement) {
    scatterGL = new ScatterGL(target, {
      orbitControls: {
        zoomSpeed: 1.33,
      },
      selectEnabled: false,
      onClick: handleClick,
      onHover: handleHover,
    });
  }

  function destroy() {
    scatterGL = null;
    scatterStore.container = null;
    scatterDatasetStore.dataset = null;
  }

  function handleClick(index: number | null) {
    if (index === null) {
      return;
    }

    scatterSelectedStore.index = index;
  }

  function handleHover(point: number | null) {
    scatterHoverStore.index = point;
  }

  async function render() {
    if (
      scatterGL === null
      || scatterDatasetStore.dataset === null
      || !selectionStore.band
      || !selectionStore.integration
    ) {
      return;
    }

    scatterGL.updateDataset(scatterDatasetStore.dataset);
    scatterGL.resize();

    if (isFirstRender) {
      const {
        getStorageMetas,
        getAsyncLengthPerGroup,
        timezoneRef,
      } = await useStorage();

      const metas = await getStorageMetas(selectionStore.band, selectionStore.integration);
      const metaProperties = Object.keys(metas);
      const metaSets = Object.values(metas);
      const lengthPerGroup = await getAsyncLengthPerGroup(selectionStore.band, selectionStore.integration);
      const timezone = timezoneRef.value;

      scatterGL.render(scatterDatasetStore.dataset);
      scatterGL.startOrbitAnimation();
      scatterGL.setPointColorer(
        (i, s, h) => getColor(
          i,
          s,
          h,
          metaProperties,
          metaSets,
          lengthPerGroup,
          timezone,
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
    if (!scatterStore.container) {
      return;
    }

    let targetElement: HTMLElement = scatterStore.container;

    if (settingsStore.umap.screenshot.isFull) {
      targetElement = document.body;
    }

    const canvas = await html2canvas(targetElement);

    canvas.style.display = 'none';
    document.body.appendChild(canvas);

    setTimeout(() => {
      const image = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');

      const anchor = document.createElement('a');
      anchor.download = `${EXPORT_FILENAME}.png`;
      anchor.href = image;

      anchor.click();
      canvas.remove();
    }, 2000);
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
    lengthPerGroup: number,
    timezone: string,
  ): string {
    const filteredColor = `hsla(0, 0%, 0%, ${scatterAlphasStore.low})`;
    const shouldBeFilteredOut = shouldBeFiltered(index, metaProperties);

    if (shouldBeFilteredOut) {
      return filteredColor;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const dataset = scatterDatasetStore.dataset!;
    const metadata = dataset.metadata as unknown as ScatterMetadata[];
    const {colorType} = colorsStore;
    const metaPropertiesAsColorTypes = convertSlugsToColorTypes(metaProperties);

    const timestamp = metadata[index].timestamp;
    const isTimezone = timezone !== '';

    const date = isTimezone
      ? dayjs(timestamp * 1000).tz(timezone)
      : dayjs(timestamp * 1000);

    const min = isTimezone
      ? dayjs((timeStore.min) * 1000).tz(timezone)
      : dayjs((timeStore.min) * 1000);

    const max = isTimezone
      ? dayjs((timeStore.max) * 1000).tz(timezone)
      : dayjs((timeStore.max) * 1000);

    const range = {
      min: min,
      max: max,
    };

    const hoverColor = 'red';

    const rangedPointIndex = mapRange(index, 0, metadata.length, 0, 1);
    const indexColor = colors.value(rangedPointIndex).alpha(scatterAlphasStore.high).css();
    let color = indexColor;

    if (colorType === 'fileIndex') {
      const rangedFileIndex = mapRange(metadata[index].fileIndex, 0, metadata.length, 0, 1);
      color = colors.value(rangedFileIndex).alpha(scatterAlphasStore.high).css();
    } else if (colorType === 'groupIndex') {
      const rangedGroupIndex = mapRange(metadata[index].groupIndex, 0, lengthPerGroup, 0, 1);
      color = colors.value(rangedGroupIndex).alpha(scatterAlphasStore.high).css();
    } else if (colorType === 'pointIndex') {
      color = indexColor;
    } else if (colorType === 'by1h') {
      const rangeInHours = range.max.diff(range.min, 'hours');
      const currentHourFromStart = date.diff(range.min, 'hours');
      const rangedIndex = mapRange(currentHourFromStart, 0, rangeInHours, 0, 1);

      color = colors.value(rangedIndex).alpha(scatterAlphasStore.high).css();
    } else if (colorType === 'by10min') {
      const rangeInMinutes = range.max.diff(range.min, 'minutes');
      const currentMinuteFromStart = date.diff(range.min, 'minutes');
      const rangedIndex = mapRange(currentMinuteFromStart, 0, rangeInMinutes, 0, 1);

      color = colors.value(rangedIndex).alpha(scatterAlphasStore.high).css();
    } else if (colorType === 'isDay') {
      const hour = date.get('hours');
      console.log(index, hour);
      const isDay = isHourDuringDay(hour);

      color = isDay
        ? dayColor.alpha(scatterAlphasStore.high).css()
        : nightColor.alpha(scatterAlphasStore.high).css();
    } else if (colorType === 'cycleDay') {
      const hour = date.get('hours');
      const rangedIndex = mapRange(hour, 0, 24, 0, 1);

      color = cyclingColors.value(rangedIndex).alpha(scatterAlphasStore.high).css();
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
    timeStore,
    colorsStore,
    queryStore,
    metaSelectionStore,
    queriesComplexStore,
    scatterAlphasStore,
    scatterDatasetStore,
  ], async () => {
    await render();
  });

  return {
    screenshot: screenshot,
    load: initializeScatterGL,
  };
}
