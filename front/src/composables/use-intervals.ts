import {type ExtractorDto, type FileDto} from '@shared/dtos';
import {useAggregated} from 'src/composables/use-aggregated';
import {useAutoclustered} from 'src/composables/use-autoclustered';
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

export type AggregatedWindow = Omit<Window, 'extractor'>;

interface Interval {
  index: number;
  start: number;
  end: number;
  sites: string[];
  files: FileDto[];
  windows: AggregatedWindow[]; // aggregated by files useful for reading the audio portion of the file
  tags: {
    // file site + autoclustering labels + file tags
    [tagName: string]: string[];
  };
}

const intervals = ref<Interval[]>([]);

export function useIntervals() {
  const {config} = useConfig();
  const {aggregated} = useAggregated();
  const {extraction, integration} = useViewSelectionNew();
  const {autoclustered} = useAutoclustered();

  const findExtractor = (extractorIndex: number): ExtractorDto => {
    if (config.value === null || extraction.value === null) {
      throw new Error('config or extraction not available');
    }

    const extractor = extraction.value.extractors.find(
      (e) => e.index === extractorIndex,
    );

    if (!extractor) {
      throw new Error('extractor not found');
    }

    return extractor;
  };

  const findFile = (fileIndex: number): FileDto => {
    if (config.value === null) {
      throw new Error('config not available');
    }

    const file = config.value.files.find((f) => f.Index === String(fileIndex));

    if (!file) {
      throw new Error('file not found');
    }

    return file;
  };

  const generate = () => {
    if (aggregated.value === null || integration.value === null) {
      return;
    }

    for (let i = 0; i < aggregated.value.timestamps.length; i += 1) {
      const start = aggregated.value.timestamps[i];
      const end = start + integration.value.duration;

      // read windows
      const windows: Window[] = [];
      for (let j = 0; j < aggregated.value.fileIndices[i].length; j += 1) {
        const extractorIndex = aggregated.value.extractorIndices[i][j];
        const fileIndex = aggregated.value.fileIndices[i][j];
        const fileRelativeStart = aggregated.value.fileRelativeStarts[i][j];

        const extractor = findExtractor(extractorIndex);
        const file = findFile(fileIndex);

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

        const fileWindow: AggregatedWindow = {
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
      for (const ac of autoclustered.value) {
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

      intervals.value.push(interval);
    }
  };

  return {
    generate,
    intervals,
  };
}
