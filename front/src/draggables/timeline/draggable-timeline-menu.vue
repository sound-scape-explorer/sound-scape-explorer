<script lang="ts" setup>
import {NPagination, NSelect, NTag, NTooltip} from 'naive-ui';
import {
  gapSizesRef,
  selectedGapSizeRef,
} from 'src/draggables/timeline/timeline-gap-size';
import {
  pageCountRef,
  pageIndexRef,
  pageSizeRef,
  pageSizes,
  pageVisibleBlocksRef,
} from 'src/draggables/timeline/timeline-pagination';
</script>

<template>
  <div class="timeline-menu__container">
    <div class="timeline-menu__block-count">
      <n-tag
        :bordered="false"
        size="small"
        >Audio blocks count
      </n-tag>
      {{ pageVisibleBlocksRef.value.length }}
    </div>

    <n-pagination
      v-model:page="pageIndexRef.value"
      v-model:page-size="pageSizeRef.value"
      :page-count="pageCountRef.value"
      :page-sizes="pageSizes"
      show-quick-jumper
      show-size-picker
      size="small"
    />

    <div class="timeline-menu__gap-size">
      <n-tooltip
        placement="top"
        trigger="hover"
      >
        <template #trigger>
          <n-select
            v-model:value="selectedGapSizeRef.value"
            :default-value="selectedGapSizeRef.value"
            :options="gapSizesRef.value"
            size="tiny"
          />
        </template>
        <span>Gap size</span>
      </n-tooltip>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.timeline-menu__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
}

.timeline-menu__block-count {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  width: 10rem;
}

.timeline-menu__gap-size {
  width: 10em;
}
</style>
