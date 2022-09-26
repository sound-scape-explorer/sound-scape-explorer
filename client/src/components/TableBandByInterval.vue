<script lang="ts" setup>
import {defineProps, ref} from 'vue';
import {NImage, NP, NTable} from 'naive-ui';
import {fetchConfig} from '../utils/fetch-config';
import {SERVER_HOSTNAME} from '../constants';

const config = await fetchConfig();
const bands = Object.keys(config.bands);
const intervals = Object.keys(config.umaps).map((umap) => {
  return config.umaps[umap][0];
});

interface ActiveCell {
  band: null | string;
  interval: null | number;
}

const activeCell = ref<ActiveCell>({
  band: null,
  interval: null,
});

const imageURL = ref<string | null>(null);

interface Props {
  imageType: 'covering' | 'volume';
}

const props = defineProps<Props>();

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
  <n-table :single-line="false" size="small">
    <thead>
    <tr>
      <th />
      <th v-for="band in bands">{{ band }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="interval in intervals">
      <th>{{ interval }}</th>
      <td
          v-for="band in bands"
          :class="{active: activeCell.band === band && activeCell.interval === interval}"
          class="cell"
          @click="selectCell(band, interval)"
      >
        <!--
        TODO: link to http://localhost:9876/generated/pairwise/covering/
        -->
        0
      </td>
    </tr>
    </tbody>
  </n-table>

  <n-p v-if="imageURL" class="image-container">
    <n-image :src="imageURL" />
  </n-p>
</template>

<style lang="scss" scoped>
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
