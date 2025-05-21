import {type ExtractorDto, type FileDto} from '@shared/dtos';
import {useAggregations} from 'src/composables/use-aggregations';
import {useAutoclusters} from 'src/composables/use-autoclusters';
import {useConfig} from 'src/composables/use-config';
import {useViewSelectionNew} from 'src/composables/use-view-selection-new';
import {AUTOCLUSTER_AS_TAG_NAME, SITE_AS_TAG_NAME} from 'src/constants';
import {ref} from 'vue';

interface Window {
  extractor: ExtractorDto;
  file: FileDto;
  relative: {
    start: number;
    end: number;
  };
  absolute: {
    start: number;
    end: number;
  };
}

export type AggregationWindow = Omit<Window, 'extractor'>;

interface Interval {
  index: number;
  start: number;
  end: number;
  sites: string[];
  files: FileDto[];
  windows: AggregationWindow[]; // aggregated by files useful for reading the audio portion of the file
  tags: {
    // file site + autoclustering labels + file tags
    [tagName: string]: string[];
  };
}

const intervals = ref<Interval[]>([]);

export function useIntervals() {
  const {config} = useConfig();
  const {aggregations} = useAggregations();
  const {extraction, integration} = useViewSelectionNew();
  const {autoclusters} = useAutoclusters();

  // performance note: critical lookup operations have been optimized.
  // if further performance is needed, consider these:
  // - Replace [...new Set()] with direct Sets to reduce temporary arrays
  // - Optimize Math.min/max(...array) spreads with manual min/max tracking
  const generate = () => {
    if (
      aggregations.value === null ||
      integration.value === null ||
      config.value === null ||
      extraction.value === null
    ) {
      return;
    }

    // create lookup maps for faster access
    const extractorMap = new Map<number, ExtractorDto>(); // by extractor index
    const fileMap = new Map<number, FileDto>(); // by file index as number

    // populate extractor map
    for (const extractor of extraction.value.extractors) {
      extractorMap.set(extractor.index, extractor);
    }

    // populate file map
    for (const file of config.value.files) {
      fileMap.set(Number(file.Index), file);
    }

    // create new intervals fixed array
    const intervalLength = aggregations.value.timestamps.length;
    const newIntervals = new Array<Interval>(intervalLength);

    for (let i = 0; i < intervalLength; i += 1) {
      const start = aggregations.value.timestamps[i];
      const end = start + integration.value.duration;

      // read windows
      const windows: Window[] = [];
      for (let j = 0; j < aggregations.value.fileIndices[i].length; j += 1) {
        const extractorIndex = aggregations.value.extractorIndices[i][j];
        const fileIndex = aggregations.value.fileIndices[i][j];
        const fileRelativeStart = aggregations.value.fileRelativeStarts[i][j];

        const extractor = extractorMap.get(extractorIndex)!;
        const file = fileMap.get(fileIndex)!;

        const window: Window = {
          extractor,
          file,
          relative: {
            start: fileRelativeStart,
            end: fileRelativeStart + extractor.window,
          },
          absolute: {
            start: start + fileRelativeStart,
            end: start + fileRelativeStart + extractor.window,
          },
        };

        windows.push(window);
      }

      // create the interval for these windows
      const interval: Interval = {
        index: i,
        start,
        end,
        files: [...new Set(windows.map((w) => w.file))],
        sites: [...new Set(windows.map((w) => w.file.Site))],
        windows: [], // will populate after
        tags: {}, // will populate after
      };

      // add windows while fusing by file to have the exact audio portion for each
      for (const file of interval.files) {
        const fileWindows = windows.filter((w) => w.file.Index === file.Index);

        const fileWindow: AggregationWindow = {
          file,
          absolute: {
            start: Math.min(...fileWindows.map((w) => w.absolute.start)),
            end: Math.max(...fileWindows.map((w) => w.absolute.end)),
          },
          relative: {
            start: Math.min(...fileWindows.map((w) => w.relative.start)),
            end: Math.max(...fileWindows.map((w) => w.relative.end)),
          },
        };

        interval.windows.push(fileWindow);
      }

      // add file sites as interval tags
      for (const file of interval.files) {
        if (interval.tags[SITE_AS_TAG_NAME] === undefined) {
          interval.tags[SITE_AS_TAG_NAME] = [];
        }

        if (interval.tags[SITE_AS_TAG_NAME].includes(file.Site)) {
          continue;
        }

        interval.tags[SITE_AS_TAG_NAME].push(file.Site);
      }

      // add autoclustering labels as interval tags
      for (const ac of autoclusters.value) {
        const name = `${AUTOCLUSTER_AS_TAG_NAME}_${ac.autocluster.index}`;
        const value = ac.data[i].toString();

        if (interval.tags[name] === undefined) {
          interval.tags[name] = [];
        }

        if (interval.tags[name].includes(value)) {
          continue;
        }

        interval.tags[name].push(value);
      }

      // add file tags to interval tags
      for (const file of interval.files) {
        for (const [tagName, tagValue] of Object.entries(file.tags)) {
          if (interval.tags[tagName] === undefined) {
            interval.tags[tagName] = [];
          }

          if (interval.tags[tagName].includes(tagValue)) {
            continue;
          }

          interval.tags[tagName].push(tagValue);
        }
      }

      newIntervals[i] = interval;
    }

    intervals.value = newIntervals;
  };

  return {
    generate,
    intervals,
  };
}
