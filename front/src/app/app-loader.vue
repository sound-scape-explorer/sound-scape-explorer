<script lang="ts" setup>
import {useAutoclusters} from 'src/composables/use-autoclusters';
import {useBands} from 'src/composables/use-bands';
import {useColorLifecycles} from 'src/composables/use-color-lifecycles';
import {useColorUser} from 'src/composables/use-color-user';
import {useDigesters} from 'src/composables/use-digesters';
import {useExtractors} from 'src/composables/use-extractors';
import {useFiles} from 'src/composables/use-files';
import {useIntegrations} from 'src/composables/use-integrations';
import {useIntervalFilterWatcher} from 'src/composables/use-interval-filter-watcher';
import {useRanges} from 'src/composables/use-ranges';
import {useReducers} from 'src/composables/use-reducers';
import {useReducersReady} from 'src/composables/use-reducers-ready';
import {useRelativeTrajectories} from 'src/composables/use-relative-trajectories';
import {useSettings} from 'src/composables/use-settings';
import {useSites} from 'src/composables/use-sites';
import {useStorageAudioHost} from 'src/composables/use-storage-audio-host';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {useTrajectories} from 'src/composables/use-trajectories';
import {useVersion} from 'src/composables/use-version';
import {useViewState} from 'src/composables/use-view-state';
import {useViewWatcher} from 'src/composables/use-view-watcher';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {onMounted, watch} from 'vue';

const {isReady, notify} = useStorageReady();
const {hasView} = useViewState();
const {settings} = useSettings();
const {read: readAudioHost} = useStorageAudioHost();

const {read: readVersion} = useVersion();
const {read: readSettings} = useSettings();
const {read: readFiles} = useFiles();
const {read: readSites} = useSites();
const {read: readRanges} = useRanges();
const {read: readDigesters} = useDigesters();
const {read: readAutoclusters} = useAutoclusters();
const {read: readTrajectories} = useTrajectories();
const {read: readReducers} = useReducers();
const {read: readBands} = useBands();
const {read: readIntegrations} = useIntegrations();
const {read: readExtractors} = useExtractors();
const {isReady: isReadyForReducers} = useReducersReady();
const {read: readRelativeTrajectories} = useRelativeTrajectories();

useViewWatcher();
useIntervalFilterWatcher();
useColorLifecycles();

watch(isReady, notify);
watch(settings, readAudioHost);

watch(isReady, readVersion);
watch(isReady, readSettings);
watch(isReady, readFiles);
watch(isReady, readSites);
watch(isReady, readRanges);
watch(isReady, readDigesters);
watch(isReady, readAutoclusters);
watch(isReady, readTrajectories);
watch(isReady, readBands);
watch(isReady, readIntegrations);
watch(isReady, readExtractors);
watch(isReadyForReducers, readReducers);
watch(hasView, readRelativeTrajectories);
</script>

<template></template>
