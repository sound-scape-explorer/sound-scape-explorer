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

const paddingBottomRef = computed(() => {
  if (!props.legendMin && !props.legendMed && !props.legendMax) {
    return '0';
  } else {
    return '15px';
  }
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
  <div class="gradient">
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
.gradient {
  position: relative;
  padding-bottom: v-bind(paddingBottomRef);
  transform: translateY(5px);

  width: 100%;
}

.step {
  display: inline-block;
  height: 20px;
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
}

.domain.min {
  position: absolute;
  left: 0;
  font-size: 11px;
  bottom: 3px;
}

.domain.med {
  position: absolute;
  right: 25%;
  left: 25%;
  text-align: center;
  font-size: 11px;
  bottom: 3px;
}

.domain.max {
  position: absolute;
  right: 0;
  font-size: 11px;
  bottom: 3px;
}

.tooltip {
  position: absolute;

  width: 3rem;
  height: 2rem;

  background-color: white;
  border: 1px solid black;

  top: calc(-2rem - 3px);

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: x-small;
}
</style>
