<script lang="ts" setup="">
import AppGrid from 'src/app/app-grid.vue';
import {useBandStorage} from 'src/composables/use-band-storage';
import {useDate} from 'src/composables/use-date';
import {useExtractorStorage} from 'src/composables/use-extractor-storage';
import {useIntegrationStorage} from 'src/composables/use-integration-storage';
import {useStorageAutoclusters} from 'src/composables/use-storage-autoclusters';
import {useStorageDigesters} from 'src/composables/use-storage-digesters';
import {useStorageFiles} from 'src/composables/use-storage-files';
import {useStorageRanges} from 'src/composables/use-storage-ranges';
import {useStorageReducers} from 'src/composables/use-storage-reducers';
import {useStorageSettings} from 'src/composables/use-storage-settings';
import {useStorageTrajectories} from 'src/composables/use-storage-trajectories';
import {useStorageVersion} from 'src/composables/use-storage-version';
import {computed} from 'vue';

const {settings} = useStorageSettings();
const {version} = useStorageVersion();
const {files} = useStorageFiles();
const {digesters} = useStorageDigesters();

const {bands} = useBandStorage();
const {integrations} = useIntegrationStorage();
const {extractors} = useExtractorStorage();
const {reducers} = useStorageReducers();
const {ranges} = useStorageRanges();
const {autoclusters} = useStorageAutoclusters();
const {trajectories} = useStorageTrajectories();

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
  <h2 class="yellow">Settings</h2>

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
        value: settings?.computation_umap_dimensions.toString() ?? '',
      },
      {
        tag: 'computation_umap_iterations',
        value: settings?.computation_umap_iterations.toString() ?? '',
      },
      {
        tag: 'display_umap_seed',
        value: settings?.display_umap_seed.toString() ?? '',
      },
    ]"
  />

  <h2 class="yellow">Specifications</h2>

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

  <h2 class="blue">Configurations</h2>

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

<style lang="scss" scoped>
h2 {
  margin: 0.5em 0;
  width: fit-content;
  padding: 0.1em 0.4em;
  border-radius: 3px;
  font-weight: bold;
}

.yellow {
  background: #ffffa6;
}

.blue {
  background: #b4c7dc;
}
</style>
