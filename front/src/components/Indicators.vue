<script lang="ts" setup="">
import {NTable} from 'naive-ui';
import {computed, ref, watch} from 'vue';
import {useStorage} from '../composables/useStorage';
import {playerStore} from '../store/player.store';
import {selectionStore} from '../store/selection.store';

const {
  getIndicators,
  getIndicatorsValues,
  getGroupIndexAndSeconds,
} = await useStorage();

const indicators = await getIndicators();

const indicatorsValues = computed(async () => {
  if (!selectionStore.band || !selectionStore.integration || !playerStore.timestamp) {
    return;
  }

  const [groupIndex] = await getGroupIndexAndSeconds(
    selectionStore.band,
    selectionStore.integration,
    playerStore.timestamp,
  );

  return await getIndicatorsValues(selectionStore.band, selectionStore.integration, groupIndex);
});

const actualValues = ref<number[]>([]);

watch(indicatorsValues, async () => {
  const values = await indicatorsValues.value;

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
        <th v-for="indicator in indicators" :id="indicator">{{ indicator }}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td v-for="value in actualValues">{{ value.toFixed(2) }}</td>
      </tr>
      </tbody>
    </n-table>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: fixed;
  top: 20rem;
  right: 1rem;

  z-index: 90;

  width: 20rem;
  max-height: 5rem;

  font-size: 0.8rem;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  pointer-events: none;
}
</style>
