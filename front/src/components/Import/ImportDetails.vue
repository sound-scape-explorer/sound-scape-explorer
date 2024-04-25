<script lang="ts" setup="">
import AppGrid from 'src/components/AppGrid/AppGrid.vue';
import {useDate} from 'src/composables/date';
import {useStorageAutoclusters} from 'src/composables/storage-autoclusters';
import {integrationsRef} from 'src/hooks/useIntegrations';
import {rangesRef} from 'src/hooks/useRanges';
import {reducersRef} from 'src/hooks/useReducers';
import {trajectoriesRef} from 'src/hooks/useTrajectories';
import {computed} from 'vue';

import {useStorageBands} from '../../composables/storage-bands';
import {useStorageDigesters} from '../../composables/storage-digesters';
import {useStorageExtractors} from '../../composables/storage-extractors';
import {useStorageFiles} from '../../composables/storage-files';
import {useStorageSettings} from '../../composables/storage-settings';
import {useStorageVersion} from '../../composables/storage-version';

const {settings} = useStorageSettings();
const {version} = useStorageVersion();
const {files} = useStorageFiles();
const {digesters} = useStorageDigesters();

const {bands} = useStorageBands();
const {extractors} = useStorageExtractors();
const {autoclusters} = useStorageAutoclusters();

const separator = ', ';

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
    :columns="1"
    :items="[
      {
        tag: 'Files',
        value: files?.length.toString() ?? '',
      },
      {
        tag: 'Bands',
        value: bands?.map((b) => b.name).join(separator) ?? '',
      },
      {
        tag: 'Integrations',
        value: integrationsRef.value?.map((i) => i.name).join(separator) ?? '',
      },
      {
        tag: 'Ranges',
        value: rangesRef.value?.map((r) => r.name).join(separator) ?? '',
      },
      {
        tag: 'Trajectories',
        value: trajectoriesRef.value?.map((t) => t.name).join(separator) ?? '',
      },
    ]"
  />

  <h2 class="blue">Configurations</h2>

  <AppGrid
    :columns="1"
    :items="[
      {
        tag: 'extractors',
        value: extractors?.map((ex) => ex.name).join(separator) ?? '',
      },
      {
        tag: 'digesters',
        value: digesters?.map((d) => d.name).join(separator) ?? '',
      },
      {
        tag: 'reducers',
        value:
          reducersRef.value
            ?.map((r) => `${r.name}${r.dimensions}`)
            .join(separator) ?? '',
      },
      {
        tag: 'autoclusters',
        value: autoclusters?.map((ac) => ac.name).join(separator) ?? '',
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
