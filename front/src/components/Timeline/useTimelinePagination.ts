import {isSelectedRef} from 'src/composables/select';
import {
  type BlockDetails,
  useStorageAggregatedIntervalDetails,
} from 'src/composables/storage-aggregated-interval-details';
import {useStorageAggregatedTimestamps} from 'src/composables/storage-aggregated-timestamps';
import {reactive, watchEffect} from 'vue';

import {integrationRef} from '../../hooks/useIntegrations';
import {countIterations} from '../../utils/count-iterations';

export const pageSizes = [100, 250, 500, 750, 1000];

interface PageCountRef {
  value: number;
}

export const pageCountRef = reactive<PageCountRef>({
  value: 200,
});

interface PageIndexRef {
  value: number;
}

export const pageIndexRef = reactive<PageIndexRef>({
  value: 1,
});

interface PageSizeRef {
  value: number;
}

export const pageSizeRef = reactive<PageSizeRef>({
  value: pageSizes[0],
});

interface PageTimestampMinRef {
  value: number;
}

export const pageTimestampMinRef = reactive<PageTimestampMinRef>({
  value: 0,
});

interface PageTimestampMaxRef {
  value: number;
}

export const pageTimestampMaxRef = reactive<PageTimestampMaxRef>({
  value: 0,
});

interface PageTotalRef {
  value: number;
}

export const pageTotalRef = reactive<PageTotalRef>({
  value: 0,
});

interface PageCurrentBoundariesRef {
  value: {
    min: number;
    max: number;
  };
}

export const pageCurrentBoundariesRef = reactive<PageCurrentBoundariesRef>({
  value: {
    min: 0,
    max: 0,
  },
});

interface VisibleInterval {
  index: number;
  timestamp: number;
}

interface PageVisibleIntervalsRef {
  value: VisibleInterval[];
}

export const pageVisibleIntervalsRef = reactive<PageVisibleIntervalsRef>({
  value: [],
});

export interface VisibleBlock extends BlockDetails {
  position: number;
}

interface PageVisibleBlocksRef {
  value: VisibleBlock[];
}

export const pageVisibleBlocksRef = reactive<PageVisibleBlocksRef>({
  value: [],
});

export function useTimelinePagination() {
  const {aggregatedIntervalDetails} = useStorageAggregatedIntervalDetails();
  const {aggregatedTimestamps} = useStorageAggregatedTimestamps();

  const computePaginationTotal = () => {
    // total number of intervals in the timeline (between min and max timestamps)

    if (
      isSelectedRef.value === false ||
      integrationRef.value === null ||
      aggregatedTimestamps.value === null
    ) {
      return;
    }

    const milliseconds = integrationRef.value.seconds * 1000;
    pageTimestampMinRef.value = Math.min(...aggregatedTimestamps.value);
    pageTimestampMaxRef.value = Math.max(...aggregatedTimestamps.value);

    pageTotalRef.value = countIterations(
      pageTimestampMinRef.value,
      pageTimestampMaxRef.value,
      milliseconds,
    );
  };

  watchEffect(computePaginationTotal);

  const computePageCount = () => {
    pageCountRef.value = Math.ceil(pageTotalRef.value / pageSizeRef.value);
  };

  watchEffect(computePageCount);

  const computePageBoundaries = () => {
    const min = (pageIndexRef.value - 1) * pageSizeRef.value + 1;
    const max = min + pageSizeRef.value - 1;

    pageCurrentBoundariesRef.value = {
      min: min,
      max: max,
    };
  };

  watchEffect(computePageBoundaries);

  const getBlockPosition = (
    asked: number,
    min: number,
    integration: number,
  ): number => {
    return (asked - min) / integration;
  };

  const computeVisibleBlocks = () => {
    if (
      aggregatedIntervalDetails.value === null ||
      aggregatedTimestamps.value === null ||
      integrationRef.value === null
    ) {
      return;
    }

    const milliseconds = integrationRef.value.seconds * 1000;
    const min = pageCurrentBoundariesRef.value.min - 1;
    const timestampOrigin = pageTimestampMinRef.value;
    const timestampMin = timestampOrigin + min * milliseconds;
    const timestampMax = timestampMin + pageSizeRef.value * milliseconds;

    const filteredBlocks = aggregatedIntervalDetails.value.filter((blocks) => {
      let inBound = false;

      for (const block of blocks) {
        if (block.start >= timestampMin && block.start < timestampMax) {
          inBound = true;
        }
      }

      return inBound;
    });

    const visibleBlocks: VisibleBlock[] = [];

    filteredBlocks.map((blocks) => {
      blocks.map((block) => {
        const visibleBlock: VisibleBlock = {
          ...block,
          position: getBlockPosition(block.start, timestampMin, milliseconds),
        };

        visibleBlocks.push(visibleBlock);
      });
    });

    pageVisibleBlocksRef.value = visibleBlocks;

    const visibleIntervals: VisibleInterval[] = [];

    const intervalIndex = (pageIndexRef.value - 1) * pageSizeRef.value;

    for (let i = intervalIndex; i < intervalIndex + pageSizeRef.value; i += 1) {
      const timestamp = timestampMin + i * milliseconds;

      const visibleInterval: VisibleInterval = {
        index: i,
        timestamp: timestamp,
      };

      visibleIntervals.push(visibleInterval);
    }

    pageVisibleIntervalsRef.value = visibleIntervals;
  };

  watchEffect(computeVisibleBlocks);
}
