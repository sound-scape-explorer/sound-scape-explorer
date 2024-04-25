<script lang="ts" setup>
import {useStorageDigesters} from 'src/composables/storage-digesters';
import {useStorageFiles} from 'src/composables/storage-files';
import {useStorageSettings} from 'src/composables/storage-settings';
import {useStorageSites} from 'src/composables/storage-sites';
import {useStorageVersion} from 'src/composables/storage-version';
import {useRanges} from 'src/hooks/useRanges';
import {useSelection} from 'src/hooks/useSelection';

useSelection();
useStorageVersion();
useStorageSettings();
useStorageFiles();
useStorageSites();
useRanges();
useStorageDigesters();
</script>

<template></template>
