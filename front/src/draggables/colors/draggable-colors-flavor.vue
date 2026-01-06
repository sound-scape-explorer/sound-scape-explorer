<script lang="ts" setup="">
import AppSelect from 'src/app/select/app-select.vue';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useClientSettings} from 'src/composables/use-client-settings';
import {ColorFlavor} from 'src/constants';

const {isLoading} = useScatterLoading();
const {colorsFlavor} = useClientSettings();
</script>

<template>
  <h2>Flavor</h2>

  <AppSelect
    v-model="colorsFlavor"
    :disabled="isLoading"
    :options="ColorFlavor.options"
    size="small"
  />
</template>
