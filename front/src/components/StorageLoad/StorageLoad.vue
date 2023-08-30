<script setup lang="ts">
import {useDigesters} from 'src/hooks/useDigesters';
import {useFiles} from 'src/hooks/useFiles';
import {useRanges} from 'src/hooks/useRanges';
import {isSelectedRef, useSelection} from 'src/hooks/useSelection';
import {useSites} from 'src/hooks/useSites';

import {useStorageSettings} from '../../hooks/useStorageSettings';
import StorageLoadSelection from './StorageLoadSelection.vue';

useSelection();
useStorageSettings();
useFiles();
useSites();
useRanges();
useDigesters();
</script>

<template>
  <StorageLoadSelection v-if="isSelectedRef.value" />
</template>
