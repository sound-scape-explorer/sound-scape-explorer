import {useEventListener} from '@vueuse/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import html2canvas from 'html2canvas';
import {ref, watch} from 'vue';
import {EXPORT_FILENAME} from '../../constants';
import {ScatterGL} from '../../lib/scatter-gl-0.0.13';
import {storage} from '../../storage/storage';
import {useStorage} from '../../storage/useStorage';
import {convertSlugsToColorTypes} from '../../utils/convert-slugs-to-color-types';
import type {
  GenerateScatterDatasetProps,
  ScatterMetadata,
} from '../../utils/generate-scatter-dataset';
import {generateScatterDataset} from '../../utils/generate-scatter-dataset';
import {isHourDuringDay} from '../../utils/is-hour-during-day';
import {mapRange} from '../../utils/map-range';
import {colorsStore} from '../Colors/colorsStore';
import {useColors} from '../Colors/useColors';
import {loadingStore} from '../Loading/loadingStore';
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

export async function useScatter() {
  const {colors, nightColor, dayColor, cyclingColors} = useColors();
  const {shouldBeFiltered} = useScatterFilters();
  const {getMetaColor} = useScatterMeta();
  const {
    autoclusterRef,
    reducedFeaturesRef,
    groupedTimestampsRef,
    lengthPerGroupRef,
    metaPropertiesRef,
    metaSetsRef,
    readReducedFeatures,
  } = await useStorage();

  let isFirstRender = true;
  let scatterGL: ScatterGL | null = null;

  const isReadyRef = ref<boolean>(false);
  watch([autoclusterRef, reducedFeaturesRef, groupedTimestampsRef], () => {
    if (
      autoclusterRef.value === null ||
      reducedFeaturesRef.value === null ||
      groupedTimestampsRef.value === null
    ) {
      isReadyRef.value = false;
      return;
    }

    isReadyRef.value = true;
  });

  watch(isReadyRef, fetch);

  function load(target: HTMLDivElement) {
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

  async function fetch() {
    const reducedFeatures = await readReducedFeatures();

    if (
      storage.files === null ||
      storage.filesMetas === null ||
      autoclusterRef.value === null ||
      reducedFeatures === null ||
      groupedTimestampsRef.value === null ||
      lengthPerGroupRef.value === null
    ) {
      return;
    }

    try {
      const props: GenerateScatterDatasetProps = {
        features: reducedFeatures,
        files: storage.files,
        timestamps: groupedTimestampsRef.value.flat(),
        metas: storage.filesMetas,
        autocluster: autoclusterRef.value.flat(),
        lengthPerGroup: lengthPerGroupRef.value,
      };

      scatterDatasetStore.dataset = generateScatterDataset(props);
      console.log(scatterDatasetStore.dataset);
      loadingStore.isLoading = false;
    } catch {
      scatterDatasetStore.dataset = null;
    }
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
      scatterGL === null ||
      scatterDatasetStore.dataset === null ||
      selectionStore.band === null ||
      selectionStore.integration === null
    ) {
      return;
    }

    scatterGL.updateDataset(scatterDatasetStore.dataset);
    scatterGL.resize();

    if (!isFirstRender) {
      return;
    }

    const lengthPerGroup = lengthPerGroupRef.value;
    const metaProperties = metaPropertiesRef.value;
    const metaSets = metaSetsRef.value;

    if (
      storage.settings === null ||
      metaProperties === null ||
      metaSets === null ||
      lengthPerGroup === null
    ) {
      return;
    }

    const timezone = storage.settings.timezone;

    scatterGL.render(scatterDatasetStore.dataset);
    scatterGL.startOrbitAnimation();
    scatterGL.setPointColorer((i, s, h) =>
      getColor(i, s, h, metaProperties, metaSets, lengthPerGroup, timezone),
    );

    isFirstRender = false;
  }

  watch(
    [
      storage,
      timeStore,
      colorsStore,
      queryStore,
      metaSelectionStore,
      queriesComplexStore,
      scatterAlphasStore,
      scatterDatasetStore,
    ],
    async () => {
      await render();
    },
  );

  function handleResize() {
    if (scatterGL === null) {
      return;
    }

    scatterGL.resize();
  }

  async function screenshot() {
    if (scatterStore.container === null) {
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
    const date = dayjs(timestamp * 1000).tz(timezone);
    const range = {
      min: dayjs(timeStore.min * 1000).tz(timezone),
      max: dayjs(timeStore.max * 1000).tz(timezone),
    };

    const hoverColor = 'red';

    const rangedPointIndex = mapRange(index, 0, metadata.length, 0, 1);
    const indexColor = colors
      .value(rangedPointIndex)
      .alpha(scatterAlphasStore.high)
      .css();
    let color = indexColor;

    if (colorType === 'fileIndex') {
      const rangedFileIndex = mapRange(
        metadata[index].fileIndex,
        0,
        metadata.length,
        0,
        1,
      );
      color = colors
        .value(rangedFileIndex)
        .alpha(scatterAlphasStore.high)
        .css();
    } else if (colorType === 'groupIndex') {
      const rangedGroupIndex = mapRange(
        metadata[index].groupIndex,
        0,
        lengthPerGroup,
        0,
        1,
      );
      color = colors
        .value(rangedGroupIndex)
        .alpha(scatterAlphasStore.high)
        .css();
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
      const rangedIndex = mapRange(
        currentMinuteFromStart,
        0,
        rangeInMinutes,
        0,
        1,
      );

      color = colors.value(rangedIndex).alpha(scatterAlphasStore.high).css();
    } else if (colorType === 'isDay') {
      const hour = date.get('hours');
      const isDay = isHourDuringDay(hour);

      color = isDay
        ? dayColor.alpha(scatterAlphasStore.high).css()
        : nightColor.alpha(scatterAlphasStore.high).css();
    } else if (colorType === 'cycleDay') {
      const hour = date.get('hours');
      const rangedIndex = mapRange(hour, 0, 24, 0, 1);

      color = cyclingColors
        .value(rangedIndex)
        .alpha(scatterAlphasStore.high)
        .css();
    } else if (metaPropertiesAsColorTypes.includes(colorType)) {
      color = getMetaColor(
        colorType,
        index,
        metaPropertiesAsColorTypes,
        metaSets,
      );
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

  // onUnmounted(() => {
  //   destroy();
  // });

  return {
    screenshot: screenshot,
    load: load,
  };
}
