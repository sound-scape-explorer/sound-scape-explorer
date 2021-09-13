<template>
  <div>
    <input
      class="focus"
      ref="focus"
      @keydown.left="
        currentBand = bands[Math.max(0, bands.indexOf(currentBand) - 1)]
      "
      @keydown.right="
        currentBand =
          bands[Math.min(bands.length - 1, bands.indexOf(currentBand) + 1)]
      "
      @keydown.up="
        currentUmap = umaps[Math.max(0, umaps.indexOf(currentUmap) - 1)]
      "
      @keydown.down="
        currentUmap =
          umaps[Math.min(umaps.length - 1, umaps.indexOf(currentUmap) + 1)]
      "
    />
    <n-table size="small">
      <tr>
        <th></th>
        <th v-for="k in bands" :key="k" @click="select(undefined, k)">
          {{ k }}
        </th>
      </tr>
      <tr v-for="ku in umaps" :key="ku">
        <th
          :title="'Duration to estimate the variance: ' + ku + ' sec'"
          @click="select(ku, undefined)"
        >
          {{ ku }}
        </th>
        <td
          v-for="k in bands"
          :key="k"
          @click="select(ku, k)"
          :class="{ current: currentBand === k && currentUmap === ku }"
        >
          o
        </td>
      </tr>
    </n-table>
    <img class="umap-graph" :src="currentGraphURL" />
  </div>
</template>

<script>
import { onMounted, inject, computed, ref } from 'vue'

import { NTable } from "naive-ui";
const NComponents = { NTable };

export default {
  components: { ...NComponents },
  setup() {
    const root = inject("root");
    const currentBand = ref("");
    const currentUmap = ref("");

    const bands = computed(() => Object.keys(root.cfg.bands));
    const umaps = computed(() => Object.keys(root.cfg.umaps));
    const currentGraphURL = computed(() => {
      if (currentBand.value === "") return "";
      const B = root.BASE + root.cfg.variables.generated_base;
      return B + `umap/${currentUmap.value}/${currentBand.value}.png`;
    });
    const focus = ref(null);
    onMounted(() => {
      currentBand.value = bands.value[parseInt(bands.value.length / 2)];
      currentUmap.value = umaps.value[parseInt(umaps.value.length / 2)];
      focus.value.focus();
    });

    return {
      currentBand,
      currentUmap,
      bands,
      umaps,
      focus,
      currentGraphURL,
      select(ku, k) {
        if (k !== undefined) {
          this.currentBand = k;
        }
        if (ku !== undefined) {
          this.currentUmap = ku;
        }
        focus.value.focus();
      },
    };
  },
};
</script>

<style>
.current {
  filter: invert(100%);
}
.volume-graph {
  width: 100%;
  pointer-events: none;
}
.focus {
  width: 0;
  height: 0;
  opacity: 0;
}
</style>
