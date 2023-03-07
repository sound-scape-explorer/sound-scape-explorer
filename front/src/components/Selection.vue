<script lang="ts" setup="">
import {defineProps} from 'vue';
import type {Reducer} from '../composables/useStorage';
import SelectionDropdown from './SelectionDropdown.vue';

interface Props {
  reducers: Reducer[];
  // eslint-disable-next-line no-unused-vars
  callback: (reducer: number, band: string, integration: string) => void;
}

const {reducers, callback} = defineProps<Props>();
</script>

<template>
  <SelectionDropdown
      :handle-update="callback"
      :reducers="reducers"
  />
</template>
