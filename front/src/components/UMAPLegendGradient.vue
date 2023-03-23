<script lang="ts" setup="">
import {computed, ref} from 'vue';

interface Props {
  array: string[];
  min: string;
  med: string;
  max: string;
}

const {
  array,
  min,
  med,
  max,
} = defineProps<Props>();

const tooltipTextDefaultValue = '';
const tooltipText = ref<string>(tooltipTextDefaultValue);

const tooltipPositionDefaultValue = -1;
const tooltipPosition = ref<number>(tooltipPositionDefaultValue);
const tooltipPositionString = computed<string>(() => `${tooltipPosition.value}%`);

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

function enterStep(text: string, position: number) {
  updateTooltipText(text);
  updateTooltipPosition(position);
}

function leaveStep() {
  tooltipPosition.value = tooltipPositionDefaultValue;
  tooltipText.value = tooltipTextDefaultValue;
}
</script>

<template>
  <div class="gradient">
    <span
        v-for="(element, index) in array"
        :style="{backgroundColor: element}"
        class="step"
        @mouseleave="leaveStep"
        @mouseover="() => enterStep(element, index)"
    />
    <span class="domain-min">{{ min }}</span>
    <span class="domain-med">{{ med }}</span>
    <span class="domain-max">{{ max }}</span>
    <span v-if="tooltipText !== ''" :style="{left: tooltipPositionString}" class="tooltip">{{ tooltipText }}</span>
  </div>
</template>

<style lang="scss" scoped>
.gradient {
  white-space: nowrap;
  position: relative;
  display: inline-block;
  top: 4px;
  padding-bottom: 15px;
  width: 100%;
}

.step {
  display: inline-block;
  height: 20px;
  width: 1%;

  cursor: crosshair;

  &:hover {
    background-color: white !important;
  }
}

.domain-min {
  position: absolute;
  left: 0;
  font-size: 11px;
  bottom: 3px;
}

.domain-med {
  position: absolute;
  right: 25%;
  left: 25%;
  text-align: center;
  font-size: 11px;
  bottom: 3px;
}

.domain-max {
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
