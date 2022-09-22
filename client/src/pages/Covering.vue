<script lang="ts" setup>
import {ref} from 'vue';
import {NImage, NP, NTable} from 'naive-ui';
import {fetchConfig} from '../utils/fetch-config';

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

const selectCell = (band: string, interval: number) => {
  if (!band || !interval) {
    return;
  }

  activeCell.value = {
    band,
    interval,
  };

  imageURL.value = `http://localhost:9876/generated/pairwise/covering/${interval}/${band}.meandist.png`;
};

</script>

<template>
  <n-p>
    Covering
  </n-p>

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

<style lang="scss">
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
