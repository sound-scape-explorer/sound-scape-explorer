<script lang="ts" setup>
import {NGi, NGrid, NTag} from 'naive-ui';
import AppHeader from 'src/app/app-header.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {SuspenseCase} from 'src/app/draggable/use-app-draggable-suspense';
import {useDate} from 'src/composables/use-date';
import {DraggableKey} from 'src/composables/use-draggables';
import {useInterval} from 'src/composables/use-interval';
import {useThemeColors} from 'src/composables/use-theme-colors';
import {STRING_DELIMITER} from 'src/constants';
import DraggableDetailsAudioWindows from 'src/draggables/details/draggable-details-audio-windows.vue';

const {currentIndex, currentInterval} = useInterval();
const {convertTimestampToIsoDate} = useDate();
const {colors} = useThemeColors();
</script>

<template>
  <AppDraggable
    :draggable-key="DraggableKey.enum.details"
    :suspense="SuspenseCase.enum.SCATTER_CLICK"
  >
    <div
      v-if="currentInterval && currentIndex"
      :class="$style.container"
    >
      <AppHeader>Interval data</AppHeader>

      <div>
        <div>Index</div>
        <div>{{ currentIndex }}</div>
      </div>

      <div>
        <div>Site</div>
        <div>{{ currentInterval.sites.join(STRING_DELIMITER) }}</div>
      </div>

      <div>
        <div>Audio windows</div>
        <div>
          <DraggableDetailsAudioWindows :interval="currentInterval" />
        </div>
      </div>

      <AppHeader>Date & time</AppHeader>

      <div>
        <div>Start</div>
        <div>{{ convertTimestampToIsoDate(currentInterval.start) }}</div>
      </div>

      <div>
        <div>End</div>
        <div>{{ convertTimestampToIsoDate(currentInterval.end) }}</div>
      </div>

      <AppHeader>Tags</AppHeader>

      <NGrid
        cols="2"
        x-gap="4"
        y-gap="4"
      >
        <NGi
          v-for="[tagName, tagValues] in Object.entries(currentInterval.tags)"
          :class="$style.item"
        >
          <NTag
            :bordered="false"
            size="small"
          >
            {{ tagName }}
          </NTag>

          <span>
            {{ tagValues.join(STRING_DELIMITER) }}
          </span>
        </NGi>
      </NGrid>
    </div>
  </AppDraggable>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.container {
  display: flex;
  flex-direction: column;
  width: sizes.$w1;
  gap: sizes.$g0;

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: sizes.$p0;
  border-radius: sizes.$g0;

  &:hover {
    background: v-bind('colors.boxShadow1');
  }
}
</style>
