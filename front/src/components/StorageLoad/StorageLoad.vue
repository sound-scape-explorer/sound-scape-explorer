<script lang="ts" setup>
import {useStorageFiles} from 'src/composables/storage-files';
import {useStorageSites} from 'src/composables/storage-sites';
import {useVersion} from 'src/composables/version';
import {useDigesters} from 'src/hooks/useDigesters';
import {useRanges} from 'src/hooks/useRanges';
import {useSelection} from 'src/hooks/useSelection';
import {useStorageSettings} from 'src/hooks/useStorageSettings';

useSelection();
useVersion();
useStorageSettings();
useStorageFiles();
useStorageSites();
useRanges();
useDigesters();
</script>

<template></template>
