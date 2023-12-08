<script lang="ts" setup>
import Audio from 'src/components/Audio/Audio.vue';
import Colors from 'src/components/Colors/Colors.vue';
import Details from 'src/components/Details/Details.vue';
import Digested from 'src/components/Digested/Digested.vue';
import Help from 'src/components/Help/Help.vue';
import Import from 'src/components/Import/Import.vue';
import Indicators from 'src/components/Indicators/Indicators.vue';
import Label from 'src/components/Label/Label.vue';
import Menu from 'src/components/Menu/Menu.vue';
import RelativeTrajectories from 'src/components/RelativeTrajectories/RelativeTrajectories.vue';
import Scatter from 'src/components/Scatter/Scatter.vue';
import Selection from 'src/components/Selection/Selection.vue';
import Settings from 'src/components/Settings/Settings.vue';
import StorageLoad from 'src/components/StorageLoad/StorageLoad.vue';
import Time from 'src/components/Time/Time.vue';
import Trajectories from 'src/components/Trajectories/Trajectories.vue';
import {useStorageFile} from 'src/hooks/useStorageFile';
import {useWorker} from 'src/hooks/useWorker';
import {onMounted} from 'vue';

import {appDraggablesStore} from '../components/AppDraggable/appDraggablesStore';

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
    <RelativeTrajectories />

    <Colors />
    <Time />
    <Audio />
    <Details />

    <Indicators />
    <Digested />

    <Label />

    <Scatter />
  </div>
</template>
