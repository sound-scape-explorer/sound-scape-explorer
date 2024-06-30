<script lang="ts" setup>
import {useIntervalFilterWatcher} from 'src/composables/use-interval-filter-watcher';
import {useStorageAutoclusters} from 'src/composables/use-storage-autoclusters';
import {useStorageDigesters} from 'src/composables/use-storage-digesters';
import {useStorageFiles} from 'src/composables/use-storage-files';
import {useStorageRanges} from 'src/composables/use-storage-ranges';
import {useStorageSettings} from 'src/composables/use-storage-settings';
import {useStorageSites} from 'src/composables/use-storage-sites';
import {useStorageVersion} from 'src/composables/use-storage-version';
import {useTrajectoriesStorage} from 'src/composables/use-trajectories-storage';
import {useViewWatcher} from 'src/composables/view-watcher';

useStorageVersion();
useStorageSettings();
useStorageFiles();
useStorageSites();
useStorageRanges();
useStorageDigesters();
useStorageAutoclusters();

useTrajectoriesStorage();

useViewWatcher();
useIntervalFilterWatcher();
</script>

<template></template>
