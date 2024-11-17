<script lang="ts" setup>
import AppTooltip from 'src/app/app-tooltip.vue';
import FilteringInfoButtons from 'src/components/filtering-info/filtering-info-buttons.vue';
import {useFilteringInfoData} from 'src/components/filtering-info/use-filtering-info-data';
import {useFilteringInfoMode} from 'src/components/filtering-info/use-filtering-info-mode';
import {useIntervalSelector} from 'src/composables/use-interval-selector';

const {currentIntervalIndex, hasClicked} = useIntervalSelector();
const {cycleMode, isIntervalMode, isCollectMode, isFilterMode} =
  useFilteringInfoMode();

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
        <span v-if="isFilterMode">
          {{ totalOut }}
        </span>

        <span
          v-if="isCollectMode"
          :class="$style.active"
        >
          {{ totalIn }}
        </span>

        <span v-if="isIntervalMode">
          {{ currentIntervalIndex }}
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
          <div
            v-if="hasClicked"
            :class="$style.row"
          >
            <div :class="{[$style.bold]: isIntervalMode}">
              Current interval index
            </div>
            <span :class="{[$style.bold]: isIntervalMode}">{{
              currentIntervalIndex
            }}</span>
          </div>
          <div :class="$style.row">
            <div :class="{[$style.bold]: isCollectMode}">Total collected</div>
            <span :class="[$style.active, {[$style.bold]: isCollectMode}]">{{
              totalIn
            }}</span>
          </div>
          <div :class="$style.row">
            <div :class="{[$style.bold]: isFilterMode}">Total filtered</div>
            <span :class="{[$style.bold]: isFilterMode}">{{ totalOut }}</span>
          </div>
          <div :class="$style.row">
            <div>Interval population</div>
            <span>{{ population }}</span>
          </div>
        </div>

        <p />

        <h4>Active filters</h4>

        <div :class="$style.list">
          <div :class="$style.row">
            <span>Calendar</span>
            <span
              v-if="isTimeActive && isCollectMode"
              :class="$style.active"
              >{{ timeIn }} collected</span
            >

            <span v-if="isTimeActive && (isFilterMode || isIntervalMode)"
              >{{ timeOut }} filtered</span
            >

            <span
              v-if="!isTimeActive"
              :class="$style.inactive"
              >inactive</span
            >
          </div>
          <div :class="$style.row">
            <span>Labels</span>
            <span
              v-if="isLabelsActive && isCollectMode"
              :class="$style.active"
              >{{ labelsIn }} collected</span
            >

            <span v-if="isLabelsActive && (isFilterMode || isIntervalMode)"
              >{{ labelsOut }} filtered</span
            >

            <span
              v-if="!isLabelsActive"
              :class="$style.inactive"
              >inactive</span
            >
          </div>
          <div :class="$style.row">
            <span>Temporal</span>
            <span
              v-if="isTemporalActive && isCollectMode"
              :class="$style.active"
              >{{ temporalIn }} collected</span
            >

            <span v-if="isTemporalActive && (isFilterMode || isIntervalMode)"
              >{{ temporalOut }} filtered</span
            >

            <span
              v-if="!isTemporalActive"
              :class="$style.inactive"
              >inactive</span
            >
          </div>
        </div>
      </div>
    </template>
  </AppTooltip>
</template>

<style lang="scss" module>
.tooltip {
  font-size: 0.8em;
  width: $p0 * 24;

  h4 {
    font-weight: bold;
  }
}

.list {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.active {
  color: $emerald;
}

.bold {
  font-weight: bold;
}

.body {
  font-size: 0.9em;
  display: flex;
  align-items: center;
  justify-content: center;
  width: $p0 * 3;

  &:hover {
    cursor: pointer;
  }
}

.inactive {
  font-style: italic;
}
</style>
