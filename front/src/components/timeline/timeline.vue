<script lang="ts" setup="">
import TimelineBody from 'src/components/timeline/body/timeline-body.vue';
import TimelineOverview from 'src/components/timeline/overview/timeline-overview.vue';
import TimelineOptions from 'src/components/timeline/timeline-options.vue';
</script>

<template>
  <div :class="$style.container">
    <TimelineOptions />
    <TimelineOverview />
    <TimelineBody />
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  gap: $p0 * 1;
}
</style>
