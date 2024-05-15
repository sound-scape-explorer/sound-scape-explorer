<script lang="ts" setup>
import {useStorageDigesters} from 'src/composables/storage-digesters';
import {useStorageFiles} from 'src/composables/storage-files';
import {useStorageRanges} from 'src/composables/storage-ranges';
import {useStorageSettings} from 'src/composables/storage-settings';
import {useStorageSites} from 'src/composables/storage-sites';
import {useStorageVersion} from 'src/composables/storage-version';
import {useViewWatcher} from 'src/composables/view-watcher';

useViewWatcher();
useStorageVersion();
useStorageSettings();
useStorageFiles();
useStorageSites();
useStorageRanges();
useStorageDigesters();
</script>

<template></template>
