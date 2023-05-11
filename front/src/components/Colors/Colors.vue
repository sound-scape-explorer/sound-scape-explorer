<script lang="ts" setup="">
import {computed} from 'vue';
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import AppGradient from '../AppGradient/AppGradient.vue';
import ColorsAlphas from './ColorsAlphas.vue';
import ColorsScale from './ColorsScale.vue';
import {colorsStore} from './colorsStore';
import ColorsType from './ColorsType.vue';
import {useColors} from './useColors';

const {colors, cyclingColors} = useColors();

const size = 100;

const scale = computed<string[]>(() => colors.value.colors(size));
const cyclingScale = computed<string[]>(() => cyclingColors.value.colors(size));
const isCycleDay = computed(() => colorsStore.colorType === 'cycleDay');
</script>

<template>
  <AppDraggable draggable-key="colors">
    <div class="container">
      <ColorsType />

      <AppGradient
        v-if="isCycleDay"
        :colors="cyclingScale"
        legend-max="00:00"
        legend-med="12:00"
        legend-min="00:00"
      />

      <ColorsScale />

      <AppGradient :colors="scale" />

      <ColorsAlphas />
    </div>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 24rem;
}
</style>
