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

const widthAsPercentage = computed(() => `${props.width}%`);

const tooltipTextDefaultValue = '';
const tooltipText = ref<string>(tooltipTextDefaultValue);

const tooltipPositionDefaultValue = -1;
const tooltipPosition = ref(tooltipPositionDefaultValue);
const tooltipPositionString = computed<string>(
  () => `${tooltipPosition.value}%`,
);

const updateTooltipText = (text: string) => {
  if (text === tooltipText.value) {
    return;
  }

  tooltipText.value = text;
};

const updateTooltipPosition = (position: number) => {
  if (position === tooltipPosition.value) {
    return;
  }

  tooltipPosition.value = position;
};

const enterStep = (index: number) => {
  const text = props.labels?.[index] ?? '';
  updateTooltipText(text);
  updateTooltipPosition(index);
};

const leaveStep = () => {
  tooltipPosition.value = tooltipPositionDefaultValue;
  tooltipText.value = tooltipTextDefaultValue;
};
</script>

<template>
  <div :class="$style['gradient-shift']">
    <span
      v-for="(element, index) in props.colors"
      :class="$style.step"
      :style="{backgroundColor: element}"
      @mouseleave="leaveStep"
      @mouseover="() => enterStep(index)"
    />
    <span :class="[$style.domain, $style.min]">{{ props.legendMin }}</span>
    <span :class="[$style.domain, $style.med]">{{ props.legendMed }}</span>
    <span :class="[$style.domain, $style.max]">{{ props.legendMax }}</span>
    <span
      v-if="tooltipText !== ''"
      :class="$style.tooltip"
      :style="{left: tooltipPositionString}"
      >{{ tooltipText }}</span
    >
  </div>
</template>

<style lang="scss" module>
.gradient-shift {
  position: relative;
  margin-top: $p0;
}

.step {
  display: inline-block;
  width: v-bind(widthAsPercentage);
  height: $p0 * 3;
  cursor: crosshair;

  &:hover {
    background-color: white !important;
  }
}

.domain {
  font-size: $p0 + 1px;
  bottom: -$p0 - 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
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
  font-size: x-small;
  position: absolute;
  top: -$p0 * 3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: $p0 * 6;
  height: $p0 * 3;
  border: 1px solid black;
  background-color: white;
}
</style>
