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
import Timeline from 'src/components/Timeline/Timeline.vue';
import Trajectories from 'src/components/Trajectories/Trajectories.vue';
import {useStorageFile} from 'src/composables/storage-file';
import {useWorker} from 'src/composables/worker';
import {onMounted} from 'vue';

import {appDraggablesStore} from '../components/AppDraggable/appDraggablesStore';

useWorker();

const {hasFile} = useStorageFile();

onMounted(() => {
  if (hasFile.value) {
    return;
  }

  appDraggablesStore.import = true;
});
</script>

<template>
  <Menu />
  <Import v-if="appDraggablesStore.import" />
  <Settings v-if="appDraggablesStore.settings" />
  <Help v-if="appDraggablesStore.help" />

  <StorageLoad v-if="hasFile" />
  <Selection v-if="hasFile" />
  <Trajectories v-if="hasFile" />
  <RelativeTrajectories v-if="hasFile" />
  <Colors v-if="hasFile && appDraggablesStore.colors" />
  <Timeline v-if="hasFile" />
  <Time v-if="hasFile" />
  <Details v-if="hasFile" />
  <Audio v-if="hasFile" />
  <Indicators v-if="hasFile" />
  <Digested v-if="hasFile" />
  <Label v-if="hasFile" />
  <Scatter v-if="hasFile" />
</template>
