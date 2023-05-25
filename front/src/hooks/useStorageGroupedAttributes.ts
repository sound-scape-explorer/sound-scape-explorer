import {onMounted, reactive} from 'vue';
import {workerRef} from './useWorker';
import {fileRef} from './useFile';
import {bandRef} from './useBand';
import {integrationRef} from './useIntegration';

interface GroupedAttributesRef {
  value: [number, number] | null;
}

export const groupedAttributesRef = reactive<GroupedAttributesRef>({
  value: null,
});

export function useStorageGroupedAttributes() {
  onMounted(async () => {
    if (
      workerRef.value === null ||
      fileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null
    ) {
      return;
    }

    groupedAttributesRef.value = await workerRef.value.readGroupedAttributes(
      fileRef.value,
      bandRef.value,
      integrationRef.value,
    );
  });
}
