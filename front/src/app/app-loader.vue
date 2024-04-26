<script lang="ts" setup>
import {useSelection} from 'src/composables/selection';
import {useStorageDigesters} from 'src/composables/storage-digesters';
import {useStorageFiles} from 'src/composables/storage-files';
import {useStorageRanges} from 'src/composables/storage-ranges';
import {useStorageSettings} from 'src/composables/storage-settings';
import {useStorageSites} from 'src/composables/storage-sites';
import {useStorageVersion} from 'src/composables/storage-version';

useSelection();
useStorageVersion();
useStorageSettings();
useStorageFiles();
useStorageSites();
useStorageRanges();
useStorageDigesters();
</script>

<template></template>
