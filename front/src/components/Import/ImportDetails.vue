<script lang="ts" setup="">
import AppGrid from 'src/components/AppGrid/AppGrid.vue';
import {useDate} from 'src/composables/date';
import {autoclustersRef, useAutoclusters} from 'src/hooks/useAutoclusters';
import {bandsRef} from 'src/hooks/useBands';
import {digestersRef} from 'src/hooks/useDigesters';
import {extractorsRef} from 'src/hooks/useExtractors';
import {integrationsRef} from 'src/hooks/useIntegrations';
import {rangesRef} from 'src/hooks/useRanges';
import {reducersRef} from 'src/hooks/useReducers';
import {trajectoriesRef} from 'src/hooks/useTrajectories';
import {computed} from 'vue';

import {useStorageFiles} from '../../composables/storage-files';
import {useStorageSettings} from '../../composables/storage-settings';
import {useVersion} from '../../composables/version';

const {settings} = useStorageSettings();
const {version} = useVersion();
const {files} = useStorageFiles();

// invoking this here because no other place uses it
useAutoclusters();

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
        value: bandsRef.value?.map((b) => b.name).join(separator) ?? '',
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
        value: extractorsRef.value?.map((ex) => ex.name).join(separator) ?? '',
      },
      {
        tag: 'digesters',
        value: digestersRef.value?.map((d) => d.name).join(separator) ?? '',
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
        value:
          autoclustersRef.value?.map((ac) => ac.name).join(separator) ?? '',
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
