<script lang="ts" setup>
import Audio from 'src/components/Audio/Audio.vue';
import Colors from 'src/components/Colors/Colors.vue';
import Details from 'src/components/Details/Details.vue';
import Digested from 'src/components/Digested/Digested.vue';
import Help from 'src/components/Help/Help.vue';
import Import from 'src/components/Import/Import.vue';
import Indicators from 'src/components/Indicators/Indicators.vue';
import Label from 'src/components/Label/Label.vue';
import AppLoader from 'src/components/loader/app-loader.vue';
import Menu from 'src/components/Menu/Menu.vue';
import RelativeTrajectories from 'src/components/RelativeTrajectories/RelativeTrajectories.vue';
import Scatter from 'src/components/Scatter/Scatter.vue';
import Selection from 'src/components/Selection/Selection.vue';
import Settings from 'src/components/Settings/Settings.vue';
import Time from 'src/components/Time/Time.vue';
import Timeline from 'src/components/Timeline/Timeline.vue';
import Trajectories from 'src/components/Trajectories/Trajectories.vue';
import {useDraggables} from 'src/composables/draggables';
import {useStorageReady} from 'src/composables/storage-ready';
import {useWorker} from 'src/composables/worker';
import {onMounted} from 'vue';

useWorker();
const {isReady} = useStorageReady();
const {store} = useDraggables();

onMounted(() => {
  if (isReady.value) {
    return;
  }

  store.import = true;
});
</script>

<template>
  <Menu />
  <Import v-if="store.import" />
  <Settings v-if="store.settings" />
  <Help v-if="store.help" />

  <AppLoader v-if="isReady" />
  <Selection v-if="isReady" />
  <Trajectories v-if="isReady" />
  <RelativeTrajectories v-if="isReady" />
  <Colors v-if="isReady && store.colors" />
  <Timeline v-if="isReady" />
  <Time v-if="isReady" />
  <Details v-if="isReady" />
  <Audio v-if="isReady" />
  <Indicators v-if="isReady" />
  <Digested v-if="isReady" />
  <Label v-if="isReady" />
  <Scatter v-if="isReady" />
</template>
