<script lang="ts" setup>
import {NPagination, NSelect, NTag, NTooltip} from 'naive-ui';
import {
  pageCountRef,
  pageIndexRef,
  pageSizeRef,
  pageSizes,
  pageVisibleBlocksRef,
} from 'src/draggables/timeline/timeline-pagination';
import {useTimelineSizes} from 'src/draggables/timeline/timeline-sizes';

const {size, options} = useTimelineSizes();
</script>

<template>
  <div class="timeline-menu__container">
    <div class="timeline-menu__block-count">
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

    <div class="timeline-menu__gap-size">
      <NTooltip
        placement="top"
        trigger="hover"
      >
        <template #trigger>
          <NSelect
            v-model:value="size"
            :default-value="size"
            :options="options"
            size="tiny"
          />
        </template>
        <span>Gap size</span>
      </NTooltip>
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
