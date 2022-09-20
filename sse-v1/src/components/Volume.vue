<template>
  <div>
    <input
        ref="focus"
        class="focus"
        @keydown.left="select(undefined, -1)"
        @keydown.right="select(undefined, +1)"
        @keydown.up="select(-1, undefined)"
        @keydown.down="select(1, undefined)"
    />
    <n-form inline>
      <n-select v-model:value="currentRangeName" :options="rangeOptions" />
      <n-select v-model:value="currentSite" :options="siteOptions" />
      <n-select v-model:value="what" :options="whatOptions" />
      <n-select v-model:value="aggregate" :options="aggregateOptions" />
      <input v-model.number="aggregate" />
    </n-form>
    <BoxPlotChart
        :chartData="boxPlotData"
        :options="{
        responsive: true,
        scales: {
          x: {
            // Specific to Bar Controller, not taken into account?
            categoryPercentage: 0.9,
            barPercentage: 0.8,
          },
          y: {
            suggestedMin: 0,
            suggestedMax: 1.0,
          },
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Volume Box Plot',
          },
        },
      }"
    ></BoxPlotChart>
    <n-table size="small">
      <tr>
        <th></th>
        <th v-for="k in bands" :key="k" @click="select(undefined, k)">
          {{ k }}
        </th>
      </tr>
      <tr v-for="ki in integrations" :key="ki">
        <th
            :title="'Duration to estimate the variance: ' + ki + ' sec'"
            @click="select(ki, undefined)"
        >
          {{ ki }}
        </th>
        <td
            v-for="k in bands"
            :key="k"
            :class="{ current: currentBand === k && currentIntegration === ki }"
            @click="select(ki, k)"
        >
          o
        </td>
      </tr>
    </n-table>
    <img :src="currentGraphURL" alt="" class="volume-graph" />
  </div>
</template>

<script>
import {NForm, NSelect, NTable} from 'naive-ui';
import {defineChartComponent} from 'vue-chart-3';
import {FILE_SITE} from '@/mappings.js';
import {useTask} from 'vue-concurrency';
import {computed, inject, ref, unref} from 'vue';

const NComponents = {NTable, NForm, NSelect};

const BoxPlotChart = defineChartComponent('BoxPlotChart', 'boxplot');

export default {
  inject: ['root'],
  components: {...NComponents, BoxPlotChart},
  mounted() {
    this.currentBand = this.bands[parseInt(this.bands.length / 2)];
    this.currentIntegration =
        this.integrations[parseInt(this.integrations.length / 2)];
    this.currentRangeName = this.ranges[0];
    this.currentSite = this.sites[0];
    this.$refs.focus.focus();
    this.select();
  },
  setup() {
    const root = inject('root');
    // data-like
    const o = {
      currentIntegration: ref(''),
      currentBand: ref(''),
      currentRangeName: ref(''),
      currentSite: ref(''),
      what: ref('sumvar'),
      aggregate: ref(3600),
      focus: ref(null),
    };
    const toOptions = (r) =>
      computed(() => unref(r).map((s) => ({label: s, value: s})));
    o.toOptions = toOptions;
    o.ranges = computed(() => Object.keys(root.cfg.ranges));
    o.rangeOptions = toOptions(o.ranges);
    o.sites = computed(() => [
      ...new Set(Object.values(root.cfg.files).map((f) => f[FILE_SITE])),
    ]);
    o.siteOptions = toOptions(o.sites);
    o.whatOptions = toOptions('sumvar sumstd logprodspan'.split(' '));
    o.aggregateOptions = '1h:3600 30min:1800 15min:900 2h:7200'
      .split(' ')
      .map((kv) => kv.split(':'))
      .map(([k, v]) => ({
        label: k,
        value: parseInt(v),
      }));
    o.bands = computed(() => Object.keys(root.cfg.bands));
    o.integrations = computed(() =>
      root.cfg.variables.integration_seconds.split('-'),
    );

    const fetcherCache = {};
    o._fetcher = useTask(function* (signal, inte, band) {
      const k = inte + '/' + band;
      if (k in fetcherCache) {
        return fetcherCache[k];
      }
      const req = yield fetch(
        `${root.BASE}generated/single/volume/${inte}/${band}.json`,
        {signal},
      );
      const json = yield req.json();
      fetcherCache[k] = json;
      return json;
    });

    o.select = function(ki, k) {
      console.log(ki, k, o.bands, o.currentBand);
      if (k !== undefined) {
        if (typeof k === 'number') {
          const ik = Math.min(
            Math.max(0, o.bands.value.indexOf(o.currentBand.value) + k),
            o.bands.value.length - 1,
          );
          o.currentBand.value = o.bands.value[ik];
        } else {
          o.currentBand.value = k;
        }
      }
      if (ki !== undefined) {
        if (typeof ki === 'number') {
          const iki = Math.min(
            Math.max(
              0,
              o.integrations.value.indexOf(o.currentIntegration.value) + ki,
            ),
            o.integrations.value.length - 1,
          );
          o.currentIntegration.value = o.integrations.value[iki];
        } else {
          o.currentIntegration.value = ki;
        }
      }
      o._fetcher.perform(o.currentIntegration.value, o.currentBand.value);
      o.focus.value.focus();
    };

    o.boxPlotData = computed(() => {
      if (o._fetcher.lastSuccessful === undefined) {
        return {datasets: []};
      }
      const v = o._fetcher.lastSuccessful.value;
      // const sites = [
      // ...new Set(Object.values(root.cfg.files).map((f) => f[FILE_SITE])),
      // ];
      const site = o.currentSite.value;
      const res = {
        labels: [],
        datasets: [
          {
            label: site,
            // backgroundColor: `hsla(${(0 * 360) / 1},50%,50%,0.5)`,
            backgroundColor: 'hsla(0, 50%, 50%, 0.5)',
            borderColor: 'black',
            borderWidth: 1,
            outlierBackgroundColor: 'red',
            data: [],
          },
        ],
      };
      const k = o.currentRangeName.value + ' ' + site;
      console.log(k);
      const times = v.data[k].t;
      const series = v.data[k][o.what.value];
      let currentTime = -Infinity;
      let currentData = [];
      const commit = (nextT) => {
        if (currentData.length > 0) {
          res.labels.push(
            new Date(currentTime * 1000).toISOString().replace('.000Z', ''),
          );
          res.datasets[0].data.push(currentData);
        }
        currentTime = nextT;
        currentData = [];
      };
      for (const i in times) {
        const t = times[i];
        if (t >= currentTime + o.aggregate.value) {
          commit(t);
        }
        currentData.push(series[i]);
      }
      commit(+Infinity);
      return res;
    });

    return o;
  },
  computed: {
    currentGraphURL() {
      if (this.currentBand === '') {
        return '';
      }
      const B = this.root.BASE + this.root.cfg.variables.generated_base;
      const inte = parseInt(this.currentIntegration);
      return `${B}single/volume/${inte}/${this.currentBand}.${this.what}.png`;
    },
    boxPlotDataTest() {
      const res = {
        labels:
            '1 2 3 4 5 6 very-long-stuff-of-the-dead-too-long-for-sure'.split(
              ' ',
            ),
        datasets: [],
      };
      const datasets = 'ds1 ds2 ds3 ds4'.split(' ');
      for (const li in datasets) {
        res.datasets.push({
          label: datasets[li],
          backgroundColor: `hsla(${(li * 360) / datasets.length},50%,50%,0.5)`,
          borderColor: 'black',
          borderWidth: 1,
          outlierBackgroundColor: 'red',
          data: [
            Array.from(Array(1000), Math.random),
            Array.from(Array(100), Math.random),
            Array.from(Array(10), Math.random),
            Array.from(Array(50), Math.random),
            Array.from(Array(10), Math.random),
            Array.from(Array(100), Math.random),
            Array.from(Array(1000), Math.random),
          ],
        });
      }
      // TODO: consider generating index in addition d_times
      return res;
    },
  },
  methods: {},
};
</script>

<style>
.current {
  filter: invert(100%);
}

.volume-graph {
  width: 100%;
  pointer-events: none;
}

.focus {
  width: 0;
  height: 0;
  opacity: 0;
}
</style>
