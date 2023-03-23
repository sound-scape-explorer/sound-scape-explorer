<script lang="ts" setup="">
import {NTable} from 'naive-ui';
import {computed, ref, watch} from 'vue';
import {useStorage} from '../composables/useStorage';
import {playerStore} from '../store/player.store';
import {selectionStore} from '../store/selection.store';

const {
  getVolumes,
  getVolumesValues,
  getGroupIndexAndSeconds,
} = await useStorage();

const volumes = await getVolumes();
const volumesValues = computed(async () => {
  if (!selectionStore.band || !selectionStore.integration || !playerStore.timestamp) {
    return;
  }

  const [groupIndex] = await getGroupIndexAndSeconds(
    selectionStore.band,
    selectionStore.integration,
    playerStore.timestamp,
  );

  return await getVolumesValues(selectionStore.band, selectionStore.integration, groupIndex);
});

const actualValues = ref<number[]>([]);

watch(volumesValues, async () => {
  const values = await volumesValues.value;

  if (!values) {
    return;
  }

  actualValues.value = values;
});
</script>

<template>
  <div v-if="actualValues" class="container">
    <n-table :bordered="true" size="small">
      <thead>
      <tr>
        <th v-for="volume in volumes" :id="volume">{{ volume }}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td v-for="value in actualValues">{{ value.toFixed(4) }}</td>
      </tr>
      </tbody>
    </n-table>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: fixed;
  top: 15rem;
  right: 1rem;

  z-index: 90;

  width: 20rem;
  max-height: 5rem;

  font-size: 0.8rem;

  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
