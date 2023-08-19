<script lang="ts" setup>
import {useWorker} from 'src/hooks/useWorker';
import {onMounted} from 'vue';

import {appDraggablesStore} from '../components/AppDraggable/appDraggablesStore';
import Audio from '../components/Audio/Audio.vue';
import Colors from '../components/Colors/Colors.vue';
import Details from '../components/Details/Details.vue';
import Help from '../components/Help/Help.vue';
import Import from '../components/Import/Import.vue';
import Label from '../components/Label/Label.vue';
import Matrices from '../components/Matrices/Matrices.vue';
import Menu from '../components/Menu/Menu.vue';
import Pairings from '../components/Pairings/Pairings.vue';
import Scatter from '../components/Scatter/Scatter.vue';
import Selection from '../components/Selection/Selection.vue';
import Settings from '../components/Settings/Settings.vue';
import StorageLoad from '../components/StorageLoad/StorageLoad.vue';
import Time from '../components/Time/Time.vue';
import Trajectories from '../components/Trajectories/Trajectories.vue';
import Volumes from '../components/Volumes/Volumes.vue';
import {useStorageFile} from '../hooks/useStorageFile';

useWorker();

const {isStorageFileRef} = useStorageFile();

onMounted(() => {
  if (isStorageFileRef.value === false) {
    appDraggablesStore.import = true;
  }
});
</script>

<template>
  <Menu />
  <Import v-if="appDraggablesStore.import" />
  <Settings v-if="appDraggablesStore.settings" />
  <Help v-if="appDraggablesStore.help" />

  <div v-if="isStorageFileRef">
    <StorageLoad />

    <Selection />
    <Trajectories />

    <Colors />
    <Time />
    <Audio />
    <Details />
    <Volumes />
    <Matrices />
    <Pairings />

    <Label />

    <Scatter />
  </div>
</template>
