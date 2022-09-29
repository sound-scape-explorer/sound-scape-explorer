<script lang="ts" setup>
import {ref} from 'vue';
import {useConfig} from '../composables/useConfig';
import Title from '../components/Title.vue';
import SelectionTable2d from '../components/SelectionTable.vue';
import {SERVER_HOSTNAME} from '../constants';
import SelectionImage from '../components/SelectionImage.vue';

const {bands, intervalLabels} = await useConfig();

const image = ref<string | null>();

function setImage(x: string, y: string) {
  if (!x || !y) {
    image.value = null;
    return;
  }

  image.value = `${SERVER_HOSTNAME}/generated/umap/${y}/${x}.png`;
}
</script>

<template>
  <Title text="UMAP" />
  <SelectionTable2d :callback="setImage" :xs="bands" :ys="intervalLabels" />
  <SelectionImage v-if="image" :source="image" />
</template>
