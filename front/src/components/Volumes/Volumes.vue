<script lang="ts" setup="">
import {NSelect} from 'naive-ui';
import {computed, ref, watch} from 'vue';
import {convertToNaiveSelectOptions} from '../../utils/convert-to-naive-select-options';
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import AppHistogram from '../AppHistogram/AppHistogram.vue';
import {volumesRef} from 'src/hooks/useStorageVolumes';
import {useStorageVolume} from 'src/hooks/useStorageVolume';
import {metaPropertiesRef} from 'src/hooks/useStorageMetaProperties';
import {metaSetsRef} from 'src/hooks/useStorageMetaSets';

const {readVolume} = useStorageVolume();

/**
 * State
 */

const titleRef = ref<string>('');
const labelsRef = ref<string[]>([]);
const valuesRef = ref<number[]>([]);
const volumeNameSelectedRef = ref<string | null>(null);
const metaSelectedRef = ref<string | null>(null);

const volumesNaiveRef = computed(() => {
  if (volumesRef.value === null) {
    return [];
  }

  return convertToNaiveSelectOptions(
    volumesRef.value.map((volumes) => volumes.name),
  );
});

const metaPropertiesNaiveRef = computed(() => {
  if (metaPropertiesRef.value === null) {
    return [];
  }

  return convertToNaiveSelectOptions(metaPropertiesRef.value);
});

/**
 * Handlers
 */

async function handleUpdate() {
  if (
    metaSelectedRef.value === null ||
    metaPropertiesRef.value === null ||
    metaSetsRef.value === null ||
    volumesRef.value === null ||
    volumeNameSelectedRef.value === null ||
    metaSelectedRef.value === null
  ) {
    return;
  }

  const volumeNames = volumesRef.value.map((volume) => volume.name);
  const volumeIndex = volumeNames.indexOf(volumeNameSelectedRef.value);
  const metaIndex = metaPropertiesRef.value.indexOf(metaSelectedRef.value);

  if (metaIndex === -1 || volumeIndex === -1) {
    return;
  }

  console.log(metaIndex, volumeIndex);

  const data = await readVolume(volumeIndex, metaIndex);

  if (data === null) {
    return;
  }

  titleRef.value = `${volumeNameSelectedRef.value} - ${metaSelectedRef.value}`;
  labelsRef.value = metaSetsRef.value[metaIndex];
  valuesRef.value = data;
}

watch([volumeNameSelectedRef, metaSelectedRef], handleUpdate);

const isVisibleRef = computed<boolean>(() => {
  if (volumeNameSelectedRef.value === null || metaSelectedRef.value === null) {
    return false;
  }

  return true;
});
</script>

<template>
  <AppDraggable draggable-key="volumes">
    <div class="container">
      <div class="form">
        <span>Select</span>

        <n-select
          v-if="volumesNaiveRef"
          v-model:value="volumeNameSelectedRef"
          :options="volumesNaiveRef"
          placeholder="Volume..."
          size="tiny"
        />

        <span v-if="!volumesNaiveRef" />

        <span>Over</span>

        <div class="form-second-line">
          <n-select
            v-model:value="metaSelectedRef"
            :options="metaPropertiesNaiveRef"
            placeholder="Meta..."
            size="tiny"
          />
        </div>
      </div>

      <AppHistogram
        v-if="isVisibleRef"
        :labels="labelsRef"
        :title="titleRef"
        :values="valuesRef"
      />
    </div>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 0.5rem;

  min-width: 20rem;
}

.form {
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: 0.5rem;
  width: 100%;
}

.form-second-line {
  display: flex;
  justify-content: center;
  align-items: center;
}

.submit {
  width: 100%;
}

.button {
  transform: translateY(1px);
}

.title {
  font-weight: bold;
}
</style>
