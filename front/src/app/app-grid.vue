<script lang="ts" setup>
import {NGi, NGrid, NTag} from 'naive-ui';
import {computed} from 'vue';

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

const classNames = computed<string>(() => {
  let string = 'gi';

  if (!props.grow) {
    string += ' no-grow';
  }

  return string;
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
      :class="classNames"
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

.no-grow {
  width: fit-content;
}
</style>
