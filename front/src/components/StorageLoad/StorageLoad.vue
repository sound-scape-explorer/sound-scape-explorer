<script lang="ts" setup>
import {useVersion} from 'src/composables/version';
import {useDigesters} from 'src/hooks/useDigesters';
import {useFiles} from 'src/hooks/useFiles';
import {useRanges} from 'src/hooks/useRanges';
import {useSelection} from 'src/hooks/useSelection';
import {useSites} from 'src/hooks/useSites';
import {useStorageSettings} from 'src/hooks/useStorageSettings';

useSelection();
useVersion();
useStorageSettings();
useFiles();
useSites();
useRanges();
useDigesters();
</script>

<template></template>
