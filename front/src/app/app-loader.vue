<script lang="ts" setup>
import {useIntervalFilterWatcher} from 'src/composables/use-interval-filter-watcher';
import {useStorageAutoclusters} from 'src/composables/use-storage-autoclusters';
import {useStorageDigesters} from 'src/composables/use-storage-digesters';
import {useStorageFiles} from 'src/composables/use-storage-files';
import {useStorageRanges} from 'src/composables/use-storage-ranges';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {useStorageSettings} from 'src/composables/use-storage-settings';
import {useStorageSites} from 'src/composables/use-storage-sites';
import {useStorageVersion} from 'src/composables/use-storage-version';
import {useTrajectoriesStorage} from 'src/composables/use-trajectories-storage';
import {useViewWatcher} from 'src/composables/use-view-watcher';
import {watch} from 'vue';

const {isReady, notify} = useStorageReady();
const {read: readVersion} = useStorageVersion();
const {read: readSettings} = useStorageSettings();
const {read: readFiles} = useStorageFiles();
const {read: readSites} = useStorageSites();
const {read: readRanges} = useStorageRanges();
const {read: readDigesters} = useStorageDigesters();
const {read: readAutoclusters} = useStorageAutoclusters();
const {read: readTrajectories} = useTrajectoriesStorage();

useViewWatcher();
useIntervalFilterWatcher();

watch(isReady, notify);
watch(isReady, readVersion);
watch(isReady, readSettings);
watch(isReady, readFiles);
watch(isReady, readSites);
watch(isReady, readRanges);
watch(isReady, readDigesters);
watch(isReady, readAutoclusters);
watch(isReady, readTrajectories);
</script>

<template></template>
