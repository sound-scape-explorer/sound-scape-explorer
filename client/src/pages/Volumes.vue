<script lang="ts" setup>
import {ref} from 'vue';
import {NButton, NCheckbox, NDropdown, NP, NSelect} from 'naive-ui';
import TableBandByInterval from '../components/TableBandByInterval.vue';
import {fetchConfig} from '../utils/fetch-config';
import {parseBands} from '../utils/parse-bands';
import {parseIntervals} from '../utils/parse-intervals';

/**
 * Props
 */

const config = await fetchConfig();
const bands = parseBands(config);
const intervals = parseIntervals(config);
const ranges = Object.keys(config.ranges);
const sites = new Set(Object.values(config.files).map((file) => file[0]));
const timeAggregates: {[label: string]: number;} = {
  '1 h': 3600,
  '30 min': 1800,
  '15 min': 900,
  '5 min': 300,
  'as points': 1,
  '2 h': 7200,
};

/**
 * State
 */

const activeRange = ref<string>(ranges[0]);
const activeSites = ref<string[]>([[...sites][0]]);
const activeTimeAggregate = ref<string>(Object.keys(timeAggregates)[0]);
const activeTimeAggregateInSeconds = ref<number>(timeAggregates['1 h']);
const aggregationEnabled = ref<boolean>(false);

const rangesOptions = ranges.map((element) => {
  return {label: element, key: element};
});

const sitesOptions = [...sites].map((element) => {
  return {label: element, value: element};
});

const timeAggregatesOptions = Object.keys(timeAggregates).map((element: string) => {
  return {label: element, key: element};
});

/**
 * Handlers
 */

function selectRange(range: string) {
  activeRange.value = range;
}

function handleSiteUpdate(activeSites: string) {
  console.log(activeSites);
}

function selectTimeAggregate(timeAggregateKey: string) {
  activeTimeAggregate.value = timeAggregateKey;
  activeTimeAggregateInSeconds.value = timeAggregates[timeAggregateKey];
}

function handleAggregationUpdate(isEnabled: boolean) {
  aggregationEnabled.value = isEnabled;
}
</script>

<template>
  <n-p>
    Volumes
  </n-p>

  <n-p class="first-row">
    <n-dropdown
        :options="rangesOptions"
        placement="bottom-start"
        trigger="hover"
        @select="selectRange"
    >
      <n-button>{{ activeRange }}</n-button>
    </n-dropdown>

    <n-select
        v-model:value="activeSites"
        :options="sitesOptions"
        filterable
        multiple
        @update:value="handleSiteUpdate"
    />
  </n-p>

  <n-p class="second-row">
    <n-checkbox
        v-model:checked="aggregationEnabled"
        label="Aggregate"
        @update:checked="handleAggregationUpdate"
    />

    <n-dropdown
        v-if="aggregationEnabled"
        :options="timeAggregatesOptions"
        placement="bottom-start"
        trigger="hover"
        @select="selectTimeAggregate"
    >
      <n-button>{{ activeTimeAggregate }}</n-button>
    </n-dropdown>

    <n-p
        v-if="aggregationEnabled"
        class="tooltip"
    >
      {{ activeTimeAggregateInSeconds }} s
    </n-p>
  </n-p>

  <TableBandByInterval :bands="bands" :intervals="intervals" image-type="volume" />
</template>

<style lang="scss" scoped>
.first-row {
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 0.5rem;
}

.second-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 0.5rem;
  height: 2rem;
}

.tooltip {
  font-style: italic;
  font-size: 0.8rem;
}
</style>
