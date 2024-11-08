<script lang="ts" setup>
import {NTag} from 'naive-ui';
import AppTooltip from 'src/app/app-tooltip.vue';
import {useDate} from 'src/composables/use-date';
import {useStorageAggregatedIntervalDetails} from 'src/composables/use-storage-aggregated-interval-details';
import {useIntervalSelector} from 'src/draggables/audio/use-interval-selector';
import {
  pageSizeRef,
  pageVisibleBlocksRef,
  pageVisibleIntervalsRef,
  useTimelinePagination,
  type VisibleBlock,
} from 'src/draggables/timeline/use-timeline-pagination';
import {useTimelineSizes} from 'src/draggables/timeline/use-timeline-sizes';
import {computed, onMounted, ref, watchEffect} from 'vue';

const containerRef = ref<HTMLDivElement | null>(null);
const {convertTimestampToIsoDate} = useDate();
const {aggregatedIntervalDetails} = useStorageAggregatedIntervalDetails();
const {size} = useTimelineSizes();

useTimelinePagination();

const columnsRef = ref<HTMLDivElement | null>(null);
const draggableRef = ref<HTMLDivElement | null>(null);
const shiftRef = ref<number>(0);
const dragStartPositionRef = ref<number>(0);
const isDraggingRef = ref<boolean>(false);

const shiftAsPixels = computed(() => `${shiftRef.value}px`);
const iterations = computed(() => pageSizeRef.value);

onMounted(() => {
  if (columnsRef.value === null || draggableRef.value === null) {
    return;
  }

  columnsRef.value.onscroll = (e: Event) => {
    e.preventDefault();
    const element = e.target as HTMLDivElement;
    shiftRef.value = element.scrollLeft;
  };

  draggableRef.value.onmousedown = (e: MouseEvent) => {
    e.preventDefault();
    dragStartPositionRef.value = shiftRef.value + e.clientX;
    isDraggingRef.value = true;
  };
  draggableRef.value.onmouseup = () => (isDraggingRef.value = false);
  draggableRef.value.onmouseleave = () => (isDraggingRef.value = false);

  draggableRef.value.onmousemove = (e: MouseEvent) => {
    e.preventDefault();

    if (!isDraggingRef.value || columnsRef.value === null) {
      return;
    }

    const newLeft = dragStartPositionRef.value - e.clientX;

    if (newLeft < 0) {
      shiftRef.value = 0;
      return;
    }

    const maxLeft = columnsRef.value.scrollWidth - columnsRef.value.clientWidth;

    if (newLeft >= maxLeft) {
      shiftRef.value = maxLeft;
      return;
    }

    shiftRef.value = newLeft;
  };
});

watchEffect(() => {
  if (columnsRef.value === null) {
    return;
  }

  columnsRef.value.scrollLeft = shiftRef.value;
});

const colWidthRef = computed(() => {
  if (size.value === 'small') {
    return '30px';
  } else if (size.value === 'medium') {
    return '50px';
  } else if (size.value === 'large') {
    return '80px';
  }
});

const {selectInterval} = useIntervalSelector();

const handleBlockClick = (block: VisibleBlock) => {
  if (aggregatedIntervalDetails.value === null) {
    return;
  }

  // TODO: CAN YOU BE MORE UGLY PLEASE?
  aggregatedIntervalDetails.value.map((intervals, index) => {
    intervals.map((interval) => {
      if (interval.start === block.start) {
        selectInterval(index);
      }
    });
  });
};
</script>

<template>
  <div
    ref="containerRef"
    :class="$style.container"
  >
    <div
      ref="columnsRef"
      :class="$style.columns"
    >
      <div
        ref="draggableRef"
        :class="$style.draggable"
      />

      <div :class="[$style.header, $style.grid]">
        <span v-for="vI in pageVisibleIntervalsRef.value">
          {{ convertTimestampToIsoDate(vI.timestamp) }}
        </span>
      </div>

      <div :class="$style.background" />

      <div :class="$style.blocks">
        <div
          v-for="vB in pageVisibleBlocksRef.value"
          :class="$style.block"
          :style="`--left: ${vB.position}`"
          @click="() => handleBlockClick(vB)"
        >
          <AppTooltip placement="top">
            <template #body>{{ vB.file }}</template>

            <template #tooltip>
              <div>
                <NTag
                  :bordered="false"
                  size="small"
                >
                  File
                </NTag>
                {{ vB.file }}
              </div>
              <div>
                <NTag
                  :bordered="false"
                  size="small"
                >
                  File start
                </NTag>
                {{ vB.fileStart }}
              </div>
              <div>
                <NTag
                  :bordered="false"
                  size="small"
                >
                  File timestamp
                </NTag>
                {{ convertTimestampToIsoDate(vB.start) }}
              </div>
            </template>
          </AppTooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
$col-width: v-bind(colWidthRef);
$header-height: 40px;
$grid-color: 120;
$shift: v-bind(shiftAsPixels);
$iterations: v-bind(iterations);
$span: 1;
$left: calc(var(--left) - 1);

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, $col-width);
}

.container {
  position: relative;
  display: flex;
  overflow: hidden;
}

.draggable {
  position: absolute;
  z-index: 100;
  width: 100%;
  height: $header-height;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
}

.background {
  position: absolute;
  z-index: -10;
  top: 0;
  left: $shift;
  width: calc($iterations * $col-width);
  height: 100%;
  background: repeating-linear-gradient(
    90deg,
    rgba($grid-color, $grid-color, $grid-color, 10%) 0 $col-width,
    rgba($grid-color, $grid-color, $grid-color, 20%) $col-width
      calc($col-width * 2)
  );
}

.header {
  width: calc($iterations * $col-width);
  height: $header-height;

  > span {
    font-size: 70%;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc($col-width * 0.5);
    margin: 1px;
    transform: translate3d(calc($col-width * 0.25), 10px, 0) rotate(-0deg);
  }
}

.columns {
  overflow-x: scroll;
}

.blocks {
  background: red;
}

.block {
  position: absolute;
  left: calc($left * $col-width + $shift);
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  width: calc($col-width * $span - 1px);
  height: $header-height * 2;
  margin-top: $header-height * 0.5;
  border: 1px dashed black;
  border-radius: 5px;
  background-color: lightgreen;

  @include transition-background;

  &:hover {
    z-index: 100;
    cursor: pointer;
    border: 1px solid black;
    background-color: limegreen;
  }
}
</style>
