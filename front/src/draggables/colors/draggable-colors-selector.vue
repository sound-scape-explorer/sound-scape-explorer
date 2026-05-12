<script lang="ts" setup="">
import AppSelect from 'src/app/select/app-select.vue';
import {useScatterState} from 'src/components/scatter/use-scatter-state';
import {ColorCategory} from 'src/constants';
import {useColoringState} from 'src/draggables/colors/use-coloring-state';

const {option, options, category} = useColoringState();
const {isLoading} = useScatterState();
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
