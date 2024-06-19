<script lang="ts" setup>
import {NTag, NTooltip} from 'naive-ui';
import {useDate} from 'src/composables/date';
import {useStorageAggregatedIntervalDetails} from 'src/composables/storage-aggregated-interval-details';
import {useAudioOpen} from 'src/draggables/audio/audio-open';
import {
  pageSizeRef,
  pageVisibleBlocksRef,
  pageVisibleIntervalsRef,
  useTimelinePagination,
  type VisibleBlock,
} from 'src/draggables/timeline/timeline-pagination';
import {useTimelineSizes} from 'src/draggables/timeline/timeline-sizes';
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
    return 30;
  } else if (size.value === 'medium') {
    return 50;
  } else if (size.value === 'large') {
    return 80;
  }
});

const {openAudio} = useAudioOpen();

const handleBlockClick = (block: VisibleBlock) => {
  if (aggregatedIntervalDetails.value === null) {
    return;
  }

  // TODO: CAN YOU BE MORE UGLY PLEASE?
  aggregatedIntervalDetails.value.map((intervals, index) => {
    intervals.map((interval) => {
      if (interval.start === block.start) {
        openAudio(index);
      }
    });
  });
};
</script>

<template>
  <div
    ref="containerRef"
    class="timeline-grid__container"
  >
    <div
      ref="columnsRef"
      :style="`--iterations: ${pageSizeRef.value}; --shift: -${shiftRef}px; --colWidth: ${colWidthRef}px`"
      class="timeline-grid__columns"
    >
      <div
        ref="draggableRef"
        class="timeline-grid__draggable"
      />

      <div class="timeline-grid__header timeline-grid__grid">
        <span v-for="vI in pageVisibleIntervalsRef.value">
          {{ convertTimestampToIsoDate(vI.timestamp) }}
        </span>
      </div>

      <div class="timeline-grid__background" />

      <div class="blocks">
        <div
          v-for="vB in pageVisibleBlocksRef.value"
          :style="`--left: ${vB.position}; --span: 1`"
          class="timeline-grid__block"
          @click="() => handleBlockClick(vB)"
        >
          <NTooltip
            placement="top"
            trigger="hover"
          >
            <!--suppress VueUnrecognizedSlot -->
            <template #trigger>{{ vB.file }}</template>
            <div>
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
            </div>
          </NTooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$colWidth: var(--colWidth);
$headerHeight: 40px;
$gridColor: 120;
$shift: var(--shift);
$iterations: var(--iterations);
$span: var(--span);
$left: calc(var(--left) - 1);

.timeline-grid__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, $colWidth);
}

.timeline-grid__container {
  display: flex;
  overflow: hidden;
  position: relative;
}

.timeline-grid__draggable {
  height: $headerHeight;
  width: 100%;

  position: absolute;

  z-index: 100;

  cursor: grab;

  &:active {
    cursor: grabbing;
  }
}

.timeline-grid__background {
  width: calc($iterations * $colWidth);
  height: 100%;
  z-index: -10;
  position: absolute;
  left: $shift;
  top: 0;
  background: repeating-linear-gradient(
    90deg,
    rgba($gridColor, $gridColor, $gridColor, 0.1) 0 $colWidth,
    rgba($gridColor, $gridColor, $gridColor, 0.2) $colWidth calc($colWidth * 2)
  );
}

.timeline-grid__header {
  height: $headerHeight;
  width: calc($iterations * $colWidth);

  > span {
    display: flex;
    justify-content: center;
    align-items: center;

    //border: 1px dashed black;
    //border-radius: 5px;
    width: calc($colWidth * 0.5);
    margin: 1px;

    z-index: 10;
    font-size: 70%;

    // rotate font
    transform: translate3d(calc($colWidth * 0.25), 10px, 0) rotate(-0deg);
  }
}

.timeline-grid__columns {
  overflow-x: scroll;
}

.timeline-grid__hide_scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.timeline-grid__hide_scrollbar::-webkit-scrollbar {
  display: none;
}

.blocks {
  background: red;
}

.timeline-grid__block {
  height: $headerHeight * 2;
  width: calc($colWidth * $span - 1px);
  margin-top: $headerHeight * 0.5;

  position: absolute;
  left: calc($left * $colWidth + $shift);

  border-radius: 5px;

  background-color: lightgreen;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  border: 1px dashed black;

  transition: background-color ease-in-out 100ms;

  &:hover {
    z-index: 100;
    cursor: pointer;
    border: 1px solid black;
    background-color: limegreen;
  }
}
</style>
