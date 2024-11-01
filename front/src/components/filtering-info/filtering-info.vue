<script lang="ts" setup>
import AppTooltip from 'src/app/app-tooltip.vue';
import {useScatterFilterLabels} from 'src/components/scatter/use-scatter-filter-labels';
import {useScatterFilterTemporal} from 'src/components/scatter/use-scatter-filter-temporal';
import {useScatterFilterTime} from 'src/components/scatter/use-scatter-filter-time';
import {useScatterGlobalFilter} from 'src/composables/use-scatter-global-filter';
import {computed, ref} from 'vue';

type Mode = 'collected' | 'filtered';

const mode = ref<Mode>('collected');

const toggleMode = () => {
  if (mode.value === 'collected') {
    mode.value = 'filtered';
    return;
  }

  mode.value = 'collected';
};

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

const isTime = computed<boolean>(() => timeOut.value > 0);
const isLabels = computed<boolean>(() => labelsOut.value > 0);
const isTemporal = computed<boolean>(() => temporalOut.value > 0);
const population = computed(() => time.value.length);
</script>

<template>
  <AppTooltip placement="left">
    <template #body>
      <div
        :class="$style.body"
        @click="toggleMode"
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
      </div>
    </template>

    <template #tooltip>
      <div :class="$style.tooltip">
        <div :class="$style.list">
          <div :class="$style.row">
            <div>Interval population</div>
            <span>{{ population }}</span>
          </div>
          <div :class="$style.row">
            <div :class="{[$style.bold]: isCollectMode}">Total collected</div>
            <span :class="$style.active">{{ totalIn }}</span>
          </div>
          <div :class="$style.row">
            <div :class="{[$style.bold]: isFilterMode}">Total filtered</div>
            <span>{{ totalOut }}</span>
          </div>
        </div>

        <p />

        <h4>Active filters</h4>

        <div :class="$style.list">
          <div :class="$style.row">
            <span>Calendar</span>
            <span
              v-if="isCollectMode && isTime"
              :class="$style.active"
              >{{ timeIn }} collected</span
            >
            <span v-if="isFilterMode && isTime">{{ timeOut }} filtered</span>
            <span
              v-if="!isTime"
              :class="$style.inactive"
              >inactive</span
            >
          </div>
          <div :class="$style.row">
            <span>Labels</span>
            <span
              v-if="isCollectMode && isLabels"
              :class="$style.active"
              >{{ labelsIn }} collected</span
            >

            <span v-if="isFilterMode && isLabels"
              >{{ labelsOut }} filtered</span
            >

            <span
              v-if="!isLabels"
              :class="$style.inactive"
              >inactive</span
            >
          </div>
          <div :class="$style.row">
            <span>Temporal</span>
            <span
              v-if="isCollectMode && isTemporal"
              :class="$style.active"
              >{{ temporalIn }} collected</span
            >

            <span v-if="isFilterMode && isTemporal"
              >{{ temporalOut }} filtered</span
            >

            <span
              v-if="!isTemporal"
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
