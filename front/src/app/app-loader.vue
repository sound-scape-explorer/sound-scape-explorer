<script lang="ts" setup>
import {useBandStorage} from 'src/composables/use-band-storage';
import {useExtractorStorage} from 'src/composables/use-extractor-storage';
import {useIntegrationStorage} from 'src/composables/use-integration-storage';
import {useIntervalFilterWatcher} from 'src/composables/use-interval-filter-watcher';
import {useStorageAudioHost} from 'src/composables/use-storage-audio-host';
import {useStorageAutoclusters} from 'src/composables/use-storage-autoclusters';
import {useStorageDigesters} from 'src/composables/use-storage-digesters';
import {useStorageFiles} from 'src/composables/use-storage-files';
import {useStorageRanges} from 'src/composables/use-storage-ranges';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {useStorageReducers} from 'src/composables/use-storage-reducers';
import {useStorageReducersReady} from 'src/composables/use-storage-reducers-ready';
import {useStorageSettings} from 'src/composables/use-storage-settings';
import {useStorageSites} from 'src/composables/use-storage-sites';
import {useStorageTrajectories} from 'src/composables/use-storage-trajectories';
import {useStorageVersion} from 'src/composables/use-storage-version';
import {useViewWatcher} from 'src/composables/use-view-watcher';
import {watch} from 'vue';

const {isReady, notify} = useStorageReady();
const {settings} = useStorageSettings();
const {read: readAudioHost} = useStorageAudioHost();

const {read: readVersion} = useStorageVersion();
const {read: readSettings} = useStorageSettings();
const {read: readFiles} = useStorageFiles();
const {read: readSites} = useStorageSites();
const {read: readRanges} = useStorageRanges();
const {read: readDigesters} = useStorageDigesters();
const {read: readAutoclusters} = useStorageAutoclusters();
const {read: readTrajectories} = useStorageTrajectories();
const {read: readReducers} = useStorageReducers();
const {read: readBands} = useBandStorage();
const {read: readIntegrations} = useIntegrationStorage();
const {read: readExtractors} = useExtractorStorage();
const {isReady: isReadyForReducers} = useStorageReducersReady();

useViewWatcher();
useIntervalFilterWatcher();

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
</script>

<template></template>
