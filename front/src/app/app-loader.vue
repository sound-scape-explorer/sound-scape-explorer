<script lang="ts" setup>
import {useSelection} from 'src/composables/selection';
import {useStorageDigesters} from 'src/composables/storage-digesters';
import {useStorageFiles} from 'src/composables/storage-files';
import {useStorageSettings} from 'src/composables/storage-settings';
import {useStorageSites} from 'src/composables/storage-sites';
import {useStorageVersion} from 'src/composables/storage-version';
import {useStorageRanges} from 'src/hooks/storage-ranges';

useSelection();
useStorageVersion();
useStorageSettings();
useStorageFiles();
useStorageSites();
useStorageRanges();
useStorageDigesters();
</script>

<template></template>
