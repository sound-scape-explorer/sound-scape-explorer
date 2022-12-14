<script lang="ts" setup="">
import {defineProps} from 'vue';

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
</script>

<template>
  <div class="gradient">
    <span
        v-for="element in array"
        :style="{backgroundColor: element}"
        class="step"
    />
    <span class="domain-min">{{ min }}</span>
    <span class="domain-med">{{ med }}</span>
    <span class="domain-max">{{ max }}</span>
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
</style>
