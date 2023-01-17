<script lang="ts" setup="">
import {defineProps} from 'vue';
import SelectionDropdown from './SelectionDropdown.vue';

interface Props {
  bands: string[];
  intervals: string[];
  // eslint-disable-next-line no-unused-vars
  callback: (band: string, interval: string) => void;
}

const {bands, intervals, callback} = defineProps<Props>();
</script>

<template>
  <SelectionDropdown :bands="bands" :handle-update="callback" :intervals="intervals" />
</template>
