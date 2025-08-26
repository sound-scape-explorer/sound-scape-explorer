<script lang="ts" setup>
import AppTooltip from 'src/app/app-tooltip.vue';
import FilteringInfoButtons from 'src/components/filtering-info/filtering-info-buttons.vue';
import {useFilteringInfoData} from 'src/components/filtering-info/use-filtering-info-data';
import {useFilteringInfoMode} from 'src/components/filtering-info/use-filtering-info-mode';
import {useInterval} from 'src/composables/use-interval';
import {useThemeColors} from 'src/composables/use-theme-colors';

const {currentIndex, hasInterval} = useInterval();
const {cycleMode, isIntervalMode, isCollectMode, isFilterMode} =
  useFilteringInfoMode();
const {colors} = useThemeColors();

const {
  totalOut,
  totalIn,
  population,
  isTimeActive,
  timeIn,
  timeOut,
  isLabelsActive,
  labelsIn,
  labelsOut,
  isTemporalActive,
  temporalIn,
  temporalOut,
  isSpatialActive,
  spatialOut,
  spatialIn,
} = useFilteringInfoData();
</script>

<template>
  <AppTooltip
    native
    placement="left"
  >
    <template #body>
      <div
        :class="$style.body"
        @click="cycleMode"
      >
        <span
          v-if="isFilterMode"
          :class="$style.bold"
        >
          {{ totalOut }}
        </span>

        <span
          v-if="isCollectMode"
          :class="$style.bold"
          :style="`color: ${colors.pressedColor};`"
        >
          {{ totalIn }}
        </span>

        <span
          v-if="isIntervalMode"
          :class="$style.bold"
        >
          {{ currentIndex }}
        </span>
      </div>
    </template>

    <template #tooltip>
      <div :class="$style.tooltip">
        <div :class="$style.list">
          <FilteringInfoButtons />
        </div>

        <p />

        <div :class="$style.list">
          <div :class="$style.row">
            <div>Interval population</div>
            <span>{{ population }}</span>
          </div>
          <div
            v-if="hasInterval"
            :class="$style.row"
          >
            <div :class="{[$style.bold]: isIntervalMode}">
              Current interval index
            </div>
            <span :class="{[$style.bold]: isIntervalMode}">{{
              currentIndex
            }}</span>
          </div>
          <div :class="$style.row">
            <span
              :class="{[$style.bold]: isCollectMode}"
              :style="`color: ${colors.pressedColor};`"
            >
              Total collected
            </span>
            <span
              :class="{[$style.bold]: isCollectMode}"
              :style="`color: ${colors.pressedColor};`"
            >
              {{ totalIn }}
            </span>
          </div>
          <div :class="$style.row">
            <div :class="{[$style.bold]: isFilterMode}">Total filtered</div>
            <span :class="{[$style.bold]: isFilterMode}">{{ totalOut }}</span>
          </div>
        </div>

        <p />

        <h4>Active filters</h4>

        <div :class="$style.list">
          <div :class="$style.row">
            <span>Calendar</span>
            <span
              v-if="isTimeActive && isCollectMode"
              :style="`color: ${colors.pressedColor};`"
            >
              {{ timeIn }} collected
            </span>

            <span v-if="isTimeActive && (isFilterMode || isIntervalMode)">
              {{ timeOut }} filtered
            </span>

            <span
              v-if="!isTimeActive"
              :class="$style.inactive"
            >
              inactive
            </span>
          </div>
          <div :class="$style.row">
            <span>Labels</span>
            <span
              v-if="isLabelsActive && isCollectMode"
              :style="`color: ${colors.pressedColor};`"
            >
              {{ labelsIn }} collected
            </span>

            <span v-if="isLabelsActive && (isFilterMode || isIntervalMode)">
              {{ labelsOut }} filtered
            </span>

            <span
              v-if="!isLabelsActive"
              :class="$style.inactive"
            >
              inactive
            </span>
          </div>
          <div :class="$style.row">
            <span>Temporal</span>
            <span
              v-if="isTemporalActive && isCollectMode"
              :style="`color: ${colors.pressedColor};`"
            >
              {{ temporalIn }} collected
            </span>

            <span v-if="isTemporalActive && (isFilterMode || isIntervalMode)">
              {{ temporalOut }} filtered
            </span>

            <span
              v-if="!isTemporalActive"
              :class="$style.inactive"
            >
              inactive
            </span>
          </div>
          <div :class="$style.row">
            <span>Spatial</span>
            <span
              v-if="isSpatialActive && isCollectMode"
              :style="`color: ${colors.pressedColor};`"
            >
              {{ spatialIn }} collected
            </span>

            <span v-if="isSpatialActive && (isFilterMode || isIntervalMode)">
              {{ spatialOut }} filtered
            </span>

            <span
              v-if="!isSpatialActive"
              :class="$style.inactive"
            >
              inactive
            </span>
          </div>
        </div>
      </div>
    </template>
  </AppTooltip>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.tooltip {
  font-size: 0.8em;
  width: sizes.$p0 * 24;

  h4 {
    font-weight: bold;
  }
}

.list {
  display: flex;
  flex-direction: column;
}

.row {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.bold {
  font-weight: bold;
}

.body {
  align-items: center;
  display: flex;
  font-size: 0.9em;
  justify-content: center;
  width: sizes.$p0 * 3;

  &:hover {
    cursor: pointer;
  }
}

.inactive {
  font-style: italic;
}
</style>
