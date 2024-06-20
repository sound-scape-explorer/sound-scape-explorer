<script lang="ts" setup>
import {useIntervalFilterWatcher} from 'src/composables/interval-filter-watcher';
import {useStorageDigesters} from 'src/composables/storage-digesters';
import {useStorageFiles} from 'src/composables/storage-files';
import {useStorageRanges} from 'src/composables/storage-ranges';
import {useStorageSettings} from 'src/composables/storage-settings';
import {useStorageSites} from 'src/composables/storage-sites';
import {useStorageVersion} from 'src/composables/storage-version';
import {useTrajectoriesStorage} from 'src/composables/trajectories-storage';
import {useViewWatcher} from 'src/composables/view-watcher';

useStorageVersion();
useStorageSettings();
useStorageFiles();
useStorageSites();
useStorageRanges();
useStorageDigesters();

useTrajectoriesStorage();

useViewWatcher();
useIntervalFilterWatcher();
</script>

<template></template>
