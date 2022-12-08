<script lang="ts" setup>
import {ref} from 'vue';
import {useConfig} from '../composables/useConfig';
import SelectionTable2d from '../components/SelectionTable.vue';
import SelectionImage from '../components/SelectionImage.vue';
import {API_ROUTES} from '../constants';
import Title from '../components/Title.vue';
import CoveringExport from '../components/CoveringExport.vue';

const {bands, intervals} = await useConfig();

const image = ref<string | null>();

function setImage(x: string, y: string) {
  if (!x || !y) {
    image.value = null;
    return;
  }

  image.value = API_ROUTES.covering({
    interval: y,
    band: x,
  });
}
</script>

<template>
  <Title text="Covering" />
  <CoveringExport />
  <SelectionTable2d :callback="setImage" :xs="bands" :ys="intervals.map(i => i.toString())" />
  <SelectionImage v-if="image" :source="image" />
</template>
