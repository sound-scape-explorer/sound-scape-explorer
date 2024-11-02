<script lang="ts" setup>
import AppTooltip from 'src/app/app-tooltip.vue';
import FilteringInfoButtons from 'src/components/filtering-info/filtering-info-buttons.vue';
import {useScatterFilterLabels} from 'src/components/scatter/use-scatter-filter-labels';
import {useScatterFilterTemporal} from 'src/components/scatter/use-scatter-filter-temporal';
import {useScatterFilterTime} from 'src/components/scatter/use-scatter-filter-time';
import {useScatterGlobalFilter} from 'src/composables/use-scatter-global-filter';
import {useIntervalSelector} from 'src/draggables/audio/use-interval-selector';
import {computed, ref} from 'vue';

const {currentIntervalIndex, hasClicked} = useIntervalSelector();

type Mode = 'collected' | 'filtered' | 'interval';

const modes: Mode[] = ['collected', 'filtered', 'interval'];
const mode = ref<Mode>('collected');

const cycleMode = () => {
  let m = modes.indexOf(mode.value);
  m += 1;

  if (m >= modes.length || m <= 0) {
    m = 0;
  }

  let newMode = modes[m];
  if (newMode === 'interval' && !hasClicked.value) {
    newMode = 'collected';
  }

  mode.value = newMode;
};

const isIntervalMode = computed(() => mode.value === 'interval');
const isCollectMode = computed(() => mode.value === 'collected');
const isFilterMode = computed(() => mode.value === 'filtered');

const {filtered: global} = useScatterGlobalFilter();
const {filtered: time} = useScatterFilterTime();
const {filtered: labels} = useScatterFilterLabels();
const {filtered: temporal} = useScatterFilterTemporal();

const totalOut = computed(() => global.value.filter((f) => f).length);
const totalIn = computed(() => global.value.length - totalOut.value);

const timeOut = computed(() => time.value.filter((f) => f).length);
const timeIn = computed(() => time.value.length - timeOut.value);

const labelsOut = computed(() => labels.value.filter((f) => f).length);
const labelsIn = computed(() => labels.value.length - labelsOut.value);

const temporalIn = computed(() => temporal.value.length - temporalOut.value);
const temporalOut = computed(() => temporal.value.filter((f) => f).length);

const isTimeActive = computed<boolean>(() => timeOut.value > 0);
const isLabelsActive = computed<boolean>(() => labelsOut.value > 0);
const isTemporalActive = computed<boolean>(() => temporalOut.value > 0);
const population = computed(() => time.value.length);
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
          <div :class="$style.row">
            <div>Interval population</div>
            <span>{{ population }}</span>
          </div>
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
