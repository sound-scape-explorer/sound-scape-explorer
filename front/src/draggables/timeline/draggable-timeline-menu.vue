<script lang="ts" setup>
import {NPagination, NSelect, NTag} from 'naive-ui';
import AppTooltip from 'src/app/app-tooltip.vue';
import {
  pageCountRef,
  pageIndexRef,
  pageSizeRef,
  pageSizes,
  pageVisibleBlocksRef,
} from 'src/draggables/timeline/use-timeline-pagination';
import {useTimelineSizes} from 'src/draggables/timeline/use-timeline-sizes';

const {size, options} = useTimelineSizes();
</script>

<template>
  <div :class="$style.container">
    <div :class="$style['block-count']">
      <NTag
        :bordered="false"
        size="small"
        >Audio blocks count
      </NTag>
      {{ pageVisibleBlocksRef.value.length }}
    </div>

    <NPagination
      v-model:page="pageIndexRef.value"
      v-model:page-size="pageSizeRef.value"
      :page-count="pageCountRef.value"
      :page-sizes="pageSizes"
      show-quick-jumper
      show-size-picker
      size="small"
    />

    <div :class="$style['gap-size']">
      <AppTooltip placement="top">
        <template #body>
          <NSelect
            v-model:value="size"
            :default-value="size"
            :options="options"
            size="tiny"
          />
        </template>
        <template #tooltip>Gap size</template>
      </AppTooltip>
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
}

.block-count {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 10rem;
  gap: 10px;
}

.gap-size {
  width: 10em;
}
</style>
