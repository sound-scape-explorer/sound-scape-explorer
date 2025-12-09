<script lang="ts" setup="">
import AppSelect from 'src/app/select/app-select.vue';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {ColorCategory} from 'src/constants';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';

const {isLoading} = useScatterLoading();
const {option, options, category} = useColorSelection();
</script>

<template>
  <h2>With</h2>

  <div :class="$style.flex">
    <AppSelect
      v-model="category"
      :disabled="isLoading"
      :options="ColorCategory.options"
      placeholder="Category..."
      size="small"
    />

    <AppSelect
      v-model="option"
      :disabled="isLoading"
      :options="options"
      placeholder="Option..."
      size="small"
    />
  </div>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.flex {
  align-items: center;
  display: flex;
  gap: sizes.$g0;
  justify-content: center;

  & > div {
    width: 100%;
  }
}
</style>
