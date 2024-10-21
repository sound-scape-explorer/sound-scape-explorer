<script lang="ts" setup="">
import {computed, ref} from 'vue';

interface Props {
  colors: string[];
  labels?: string[];
  legendMin?: string;
  legendMed?: string;
  legendMax?: string;
  width?: number;
}

const props = withDefaults(defineProps<Props>(), {
  legendMin: '',
  legendMed: '',
  legendMax: '',
  width: 1,
});

const tooltipTextDefaultValue = '';
const tooltipText = ref<string>(tooltipTextDefaultValue);

const tooltipPositionDefaultValue = -1;
const tooltipPosition = ref(tooltipPositionDefaultValue);
const tooltipPositionString = computed<string>(
  () => `${tooltipPosition.value}%`,
);

function updateTooltipText(text: string) {
  if (text === tooltipText.value) {
    return;
  }

  tooltipText.value = text;
}

function updateTooltipPosition(position: number) {
  if (position === tooltipPosition.value) {
    return;
  }

  tooltipPosition.value = position;
}

function enterStep(index: number) {
  const text = props.labels?.[index] ?? '';
  updateTooltipText(text);
  updateTooltipPosition(index);
}

function leaveStep() {
  tooltipPosition.value = tooltipPositionDefaultValue;
  tooltipText.value = tooltipTextDefaultValue;
}
</script>

<template>
  <div class="gradientShift">
    <span
      v-for="(element, index) in props.colors"
      :style="{'backgroundColor': element, '--width': `${width}%`}"
      class="step"
      @mouseleave="leaveStep"
      @mouseover="() => enterStep(index)"
    />
    <span class="domain min">{{ props.legendMin }}</span>
    <span class="domain med">{{ props.legendMed }}</span>
    <span class="domain max">{{ props.legendMax }}</span>
    <span
      v-if="tooltipText !== ''"
      :style="{left: tooltipPositionString}"
      class="tooltip"
      >{{ tooltipText }}</span
    >
  </div>
</template>

<style lang="scss" scoped>
.gradientShift {
  position: relative;
  margin-top: $p0;
}

.step {
  display: inline-block;
  height: $p0 * 3;
  width: var(--width);

  cursor: crosshair;

  &:hover {
    background-color: white !important;
  }
}

.domain {
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  font-size: $p0 + 1px;
  bottom: -$p0 - 1px;
}

.domain.min {
  position: absolute;
  left: 0;
}

.domain.med {
  position: absolute;
  right: 25%;
  left: 25%;
  text-align: center;
}

.domain.max {
  position: absolute;
  right: 0;
}

.tooltip {
  position: absolute;

  width: $p0 * 6;
  height: $p0 * 3;

  background-color: white;
  border: 1px solid black;

  top: -$p0 * 3;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: x-small;
}
</style>
