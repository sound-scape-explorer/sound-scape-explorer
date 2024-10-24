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
  grow?: boolean;
}

const props = withDefaults(defineProps<AppGridProps>(), {
  grow: true,
});
</script>

<template>
  <NGrid
    :cols="props.columns"
    x-gap="12"
    y-gap="4"
  >
    <NGi
      v-for="item in props.items"
      :class="[$style.gi, {[$style['no-grow']]: !props.grow}]"
    >
      <NTag
        :bordered="false"
        :style="{backgroundColor: item.color ?? ''}"
        size="small"
      >
        {{ item.tag }}
      </NTag>
      <span :class="$style.value">
        {{ item.value }}
      </span>
    </NGi>
  </NGrid>
</template>

<style lang="scss" module>
.gi {
  display: flex;
  justify-content: space-between;
  gap: $p0;
}

.value {
  user-select: text;
}

.no-grow {
  width: fit-content;
}
</style>
