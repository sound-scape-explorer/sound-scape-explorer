<script lang="ts" setup>
import {ref} from 'vue';
import {useConfig} from '../composables/useConfig';
import SelectionTable2d from '../components/SelectionTable.vue';
import SelectionImage from '../components/SelectionImage.vue';
import {SERVER_HOSTNAME} from '../constants';
import Title from '../components/Title.vue';

const {bands, intervals} = await useConfig();

const image = ref<string | null>();

function setImage(x: string, y: string) {
  if (!x || !y) {
    image.value = null;
    return;
  }

  image.value = `${SERVER_HOSTNAME}/generated/pairwise/covering/${y}/${x}.meandist.png`;
}
</script>

<template>
  <Title text="Covering" />
  <SelectionTable2d :callback="setImage" :xs="bands" :ys="intervals.map(i => i.toString())" />
  <SelectionImage v-if="image" :source="image" />
</template>
