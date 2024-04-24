<script lang="ts" setup>
import {useStorageFiles} from 'src/composables/storage-files';
import {useVersion} from 'src/composables/version';
import {useDigesters} from 'src/hooks/useDigesters';
import {useRanges} from 'src/hooks/useRanges';
import {useSelection} from 'src/hooks/useSelection';
import {useSites} from 'src/hooks/useSites';
import {useStorageSettings} from 'src/hooks/useStorageSettings';

useSelection();
useVersion();
useStorageSettings();
useStorageFiles();
useSites();
useRanges();
useDigesters();
</script>

<template></template>
