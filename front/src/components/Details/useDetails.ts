import type {Dayjs} from 'dayjs';
import {configFilesRef} from 'src/hooks/useConfigFiles';
import {useDate} from 'src/hooks/useDate';
import {useIndexes} from 'src/hooks/useIndexes';
import {groupedFilenamesRef} from 'src/hooks/useStorageGroupedFilenames';
import {groupedMetasRef} from 'src/hooks/useStorageGroupedMetas';
import {groupedTimestampsRef} from 'src/hooks/useStorageGroupedTimestamps';
import {settingsRef} from 'src/hooks/useStorageSettings';
import {ref, watch} from 'vue';
import {clickedRef} from '.././Scatter/useScatterClick';

export function useDetails() {
  const {convertTimestampToDate} = useDate();
  const {convertPointIndex} = useIndexes();

  const fileIndexRef = ref<number | null>(null);
  const filenameRef = ref<string | null>(null);
  const groupIndexRef = ref<number | null>(null);
  const dateRef = ref<Dayjs | null>(null);
  const metasRef = ref<string[] | null>(null);

  watch(clickedRef, async () => {
    if (
      clickedRef.value === null ||
      configFilesRef.value === null ||
      settingsRef.value === null ||
      groupedFilenamesRef.value === null ||
      groupedTimestampsRef.value === null ||
      groupedMetasRef.value === null
    ) {
      return;
    }

    const pointIndex = clickedRef.value;
    const [fileIndex, groupIndex] = convertPointIndex(pointIndex);
    fileIndexRef.value = fileIndex;
    groupIndexRef.value = groupIndex;

    filenameRef.value = configFilesRef.value[fileIndex].name;

    const timestamp = groupedTimestampsRef.value[pointIndex];

    dateRef.value = convertTimestampToDate(
      timestamp,
      settingsRef.value.timezone,
    );

    metasRef.value = groupedMetasRef.value[pointIndex];
  });

  return {
    fileIndexRef: fileIndexRef,
    groupIndexRef: groupIndexRef,
    filenameRef: filenameRef,
    dateRef: dateRef,
    metasRef: metasRef,
  };
}
