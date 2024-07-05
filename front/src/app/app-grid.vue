<script lang="ts" setup>
import {NGi, NGrid, NTag} from 'naive-ui';

interface AppGridItem {
  tag: string;
  value: string;
  color?: string;
}

interface AppGridProps {
  columns: number;
  items: AppGridItem[];
}

const props = defineProps<AppGridProps>();
</script>

<template>
  <NGrid
    :cols="props.columns"
    x-gap="12"
    y-gap="4"
  >
    <NGi
      v-for="item in props.items"
      class="gi"
    >
      <NTag
        :bordered="false"
        :style="{backgroundColor: item.color ?? ''}"
        size="small"
      >
        {{ item.tag }}
      </NTag>
      <span class="value">
        {{ item.value }}
      </span>
    </NGi>
  </NGrid>
</template>

<style lang="scss" scoped>
.gi {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

.value {
  user-select: text;
}
</style>
