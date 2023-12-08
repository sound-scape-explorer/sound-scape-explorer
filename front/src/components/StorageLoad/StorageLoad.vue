<script lang="ts" setup>
import {useDigesters} from 'src/hooks/useDigesters';
import {useFiles} from 'src/hooks/useFiles';
import {useRanges} from 'src/hooks/useRanges';
import {useSelection} from 'src/hooks/useSelection';
import {useSites} from 'src/hooks/useSites';
import {useStorageSettings} from 'src/hooks/useStorageSettings';
import {useVersion} from 'src/hooks/useVersion';

useSelection();
useVersion();
useStorageSettings();
useFiles();
useSites();
useRanges();
useDigesters();
</script>

<template></template>
