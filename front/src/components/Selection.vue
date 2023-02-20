<script lang="ts" setup="">
import {defineProps} from 'vue';
import SelectionDropdown from './SelectionDropdown.vue';

interface Props {
  bands: string[];
  integrations: string[];
  // eslint-disable-next-line no-unused-vars
  callback: (band: string, integration: string) => void;
}

const {bands, integrations, callback} = defineProps<Props>();
</script>

<template>
  <SelectionDropdown
      :bands="bands"
      :handle-update="callback"
      :integrations="integrations"
  />
</template>
