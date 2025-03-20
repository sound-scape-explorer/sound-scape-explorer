<script lang="ts" setup="">
import AppGrid from 'src/app/app-grid.vue';
import {useAutoclusters} from 'src/composables/use-autoclusters';
import {useBands} from 'src/composables/use-bands';
import {useDate} from 'src/composables/use-date';
import {useDigesters} from 'src/composables/use-digesters';
import {useExtractors} from 'src/composables/use-extractors';
import {useFiles} from 'src/composables/use-files';
import {useIntegrations} from 'src/composables/use-integrations';
import {useReducers} from 'src/composables/use-reducers';
import {useSettings} from 'src/composables/use-settings';
import {useStorageRanges} from 'src/composables/use-storage-ranges';
import {useTrajectories} from 'src/composables/use-trajectories';
import {useVersion} from 'src/composables/use-version';
import {computed} from 'vue';

const {settings} = useSettings();
const {version} = useVersion();
const {files} = useFiles();
const {digesters} = useDigesters();

const {bands} = useBands();
const {integrations} = useIntegrations();
const {extractors} = useExtractors();
const {reducers} = useReducers();
const {ranges} = useStorageRanges();
const {autoclusters} = useAutoclusters();
const {trajectories} = useTrajectories();

const {convertTimestampToIsoDate} = useDate();

const timelineOrigin = computed<string>(() => {
  if (settings.value === null) {
    return '';
  }

  const origin = settings.value.timeline_origin;
  return convertTimestampToIsoDate(origin);
});
</script>

<template>
  <h2 :class="[$style.title, $style.yellow]">Settings</h2>

  <AppGrid
    :columns="1"
    :items="[
      {
        tag: 'version',
        value: version ?? '',
      },
      {
        tag: 'storage_path',
        value: settings?.storage_path ?? '',
      },
      {
        tag: 'audio_path',
        value: settings?.audio_path ?? '',
      },
      {
        tag: 'expected_sample_rate',
        value: settings?.expected_sample_rate.toString() ?? '',
      },
      {
        tag: 'timeline_origin',
        value: timelineOrigin,
      },
      {
        tag: 'audio_host',
        value: settings?.audio_host ?? '',
      },
      {
        tag: 'timezone',
        value: settings?.timezone ?? '',
      },
      {
        tag: 'computation_umap_dimensions',
        value: settings?.computation_dimensions.toString() ?? '',
      },
      {
        tag: 'computation_umap_iterations',
        value: settings?.computation_iterations.toString() ?? '',
      },
      {
        tag: 'display_umap_seed',
        value: settings?.display_seed.toString() ?? '',
      },
      {
        tag: 'memory_limit',
        value: settings?.memory_limit.toString() ?? '',
      },
    ]"
  />

  <h2 :class="[$style.title, $style.yellow]">Specifications</h2>

  <AppGrid
    :columns="3"
    :items="[
      {
        tag: 'Files',
        value: files?.length.toString() ?? '',
      },
      {
        tag: 'Bands',
        value: bands?.length.toString() ?? '',
      },
      {
        tag: 'Integrations',
        value: integrations?.length.toString() ?? '',
      },
      {
        tag: 'Ranges',
        value: ranges?.length.toString() ?? '',
      },
      {
        tag: 'Trajectories',
        value: trajectories?.length.toString() ?? '',
      },
    ]"
  />

  <h2 :class="[$style.title, $style.blue]">Configurations</h2>

  <AppGrid
    :columns="3"
    :items="[
      {
        tag: 'extractors',
        value: extractors?.length.toString() ?? '',
      },
      {
        tag: 'digesters',
        value: digesters?.length.toString() ?? '',
      },
      {
        tag: 'reducers',
        value: reducers?.length.toString() ?? '',
      },
      {
        tag: 'autoclusters',
        value: autoclusters?.length.toString() ?? '',
      },
    ]"
  />
</template>

<style lang="scss" module>
.title {
  font-weight: bold;
  margin: $p0 0;
  padding: $g0 $p0;
  border-radius: $g0;
}

.yellow {
  background: $olive;
}

.blue {
  background: $violet;
}
</style>
