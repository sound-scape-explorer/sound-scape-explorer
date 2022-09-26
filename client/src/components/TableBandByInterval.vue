<script lang="ts" setup>
import {defineProps, ref} from 'vue';
import {NImage, NP, NTable} from 'naive-ui';
import {SERVER_HOSTNAME} from '../constants';

/**
 * Props
 */

interface Props {
  imageType: 'covering' | 'volume';
  bands: string[];
  intervals: number[];
}

const props = defineProps<Props>();

/**
 * State
 */

interface ActiveCell {
  band: null | string;
  interval: null | number;
}

const activeCell = ref<ActiveCell>({
  band: null,
  interval: null,
});

const imageURL = ref<string | null>(null);

/**
 * Handlers
 */

const selectCell = (band: string, interval: number) => {
  if (!band || !interval) {
    return;
  }

  activeCell.value = {
    band,
    interval,
  };

  if (props.imageType === 'covering') {
    imageURL.value = `${SERVER_HOSTNAME}/generated/pairwise/covering/${interval}/${band}.meandist.png`;
  } else if (props.imageType === 'volume') {
    imageURL.value = `${SERVER_HOSTNAME}/generated/single/volume/${interval}/${band}.sumvar.png`;
  }
};
</script>

<template>
  <n-table :single-line="false" class="table" size="small">
    <thead>
    <tr>
      <th />
      <th v-for="band in props.bands">{{ band }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="interval in props.intervals">
      <th>{{ interval }}</th>
      <td
          v-for="band in props.bands"
          :class="{active: activeCell.band === band && activeCell.interval === interval}"
          class="cell"
          @click="selectCell(band, interval)"
      >
        x
      </td>
    </tr>
    </tbody>
  </n-table>

  <n-p v-if="imageURL" class="image-container">
    <n-image :src="imageURL" />
  </n-p>
</template>

<style lang="scss" scoped>
.table {
  text-align: center;
}

.cell {
  cursor: pointer;
}

.active {
  background: black !important;
  color: white !important;
}

.image-container {
  display: flex;
  justify-content: center;
}
</style>
