<script lang="ts" setup="">
import {watch} from 'vue';
import {useAppHistogram} from './useAppHistogram';

interface HistogramProps {
  labels: string[];
  values: number[];
  title: string;
}

const props = defineProps<HistogramProps>();

const {
  divRef,
  refresh,
} = useAppHistogram(props);

watch(props, refresh);
</script>

<template>
  <span ref="divRef" class="histogram" />
</template>

<style lang="scss" scoped>
.histogram {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
