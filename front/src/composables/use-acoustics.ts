import {type ExtractorDto} from '@shared/dtos';
import {type Site, useSites} from 'src/composables/use-sites';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {useViewSelection} from 'src/composables/use-view-selection';
import {ref} from 'vue';

export interface Acoustics {
  site: Site;
  data: {
    scalars: number[];
    relative: {
      starts: number[];
      ends: number[];
    };
    absolute: {
      starts: number[];
      ends: number[];
    };
  };
}

const acoustics = ref<Acoustics[]>([]);

export function useAcoustics() {
  const {read: r} = useStorageReader();
  const {extraction, band, integration} = useViewSelection();
  const {sites} = useSites();

  const filter = (
    acoustics: Acoustics,
    startTime: number,
    endTime: number,
  ): Acoustics['data'] => {
    const {scalars, relative, absolute} = acoustics.data;

    const filteredScalars: number[] = [];
    const filteredRelativeStarts: number[] = [];
    const filteredRelativeEnds: number[] = [];
    const filteredAbsoluteStarts: number[] = [];
    const filteredAbsoluteEnds: number[] = [];

    // Iterate through all entries and collect those within the time range
    for (let i = 0; i < scalars.length; i += 1) {
      const absStart = absolute.starts[i];
      const absEnd = absolute.ends[i];

      // Check if the time range overlaps with the filter boundaries
      if (absStart >= startTime && absEnd <= endTime) {
        filteredScalars.push(scalars[i]);
        filteredRelativeStarts.push(relative.starts[i]);
        filteredRelativeEnds.push(relative.ends[i]);
        filteredAbsoluteStarts.push(absStart);
        filteredAbsoluteEnds.push(absEnd);
      }
    }

    return {
      scalars: filteredScalars,
      relative: {
        starts: filteredRelativeStarts,
        ends: filteredRelativeEnds,
      },
      absolute: {
        starts: filteredAbsoluteStarts,
        ends: filteredAbsoluteEnds,
      },
    };
  };

  const read = (extractor: ExtractorDto) => {
    return r(async (worker, file) => {
      if (
        extraction.value === null ||
        band.value === null ||
        integration.value === null ||
        sites.value === null
      ) {
        return;
      }

      const newAcoustics: Acoustics[] = [];

      for (const site of sites.value) {
        const data = await worker.readAcoustics(
          file,
          extraction.value.index,
          extractor.index,
          band.value.index,
          site.name,
          site.files.map((f) => f.Index),
          site.files.map((f) => new Date(f.Date).getTime()),
        );

        newAcoustics.push({
          site,
          data,
        });
      }

      acoustics.value = newAcoustics;
    });
  };

  return {
    acoustics,
    read,
    filter,
  };
}
