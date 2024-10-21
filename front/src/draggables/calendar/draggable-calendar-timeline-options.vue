<script lang="ts" setup="">
import {ref} from 'vue';

const start = ref<HTMLInputElement>();
const end = ref<HTMLInputElement>();
</script>

<template>
  <div class="draggableCalendarTimelineOptionsContainer">
    <input
      ref="start"
      placeholder="start"
    />
    <input
      ref="end"
      placeholder="end"
    />
  </div>
</template>

<style lang="scss" scoped>
.draggableCalendarTimelineOptionsContainer {
  margin-top: $p0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: $g0;

  & > input {
    text-align: center;
    width: $p0 * 14;
    background: $whiteOpaque;
    border: 1px solid $olive;
  }
}
</style>
