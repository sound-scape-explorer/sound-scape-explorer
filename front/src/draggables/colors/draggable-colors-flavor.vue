<script lang="ts" setup="">
import AppSelect from 'src/app/select/app-select.vue';
import {useScatterState} from 'src/components/scatter/use-scatter-state';
import {useClientSettings} from 'src/composables/use-client-settings';
import {ColorFlavor} from 'src/constants';

const {colorsFlavor} = useClientSettings();
const {isLoading} = useScatterState();
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
