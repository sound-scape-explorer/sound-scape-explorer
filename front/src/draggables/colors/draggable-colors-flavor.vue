<script lang="ts" setup="">
import AppSelect from 'src/app/select/app-select.vue';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {ColorFlavor} from 'src/constants';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';

const {isLoading} = useScatterLoading();
const {flavor} = useColorSelection();
</script>

<template>
  <h2>Flavor</h2>

  <AppSelect
    v-model="flavor"
    :disabled="isLoading"
    :options="ColorFlavor.options"
    size="small"
  />
</template>
