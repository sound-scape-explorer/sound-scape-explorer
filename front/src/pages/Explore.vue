<script lang="ts" setup>
import {onMounted} from 'vue';
import {appDraggablesStore} from '../components/AppDraggable/appDraggablesStore';
import Audio from '../components/Audio/Audio.vue';
import Colors from '../components/Colors/Colors.vue';
import Details from '../components/Details/Details.vue';
import Help from '../components/Help/Help.vue';
import Import from '../components/Import/Import.vue';
import Matrices from '../components/Matrices/Matrices.vue';
import Menu from '../components/Menu/Menu.vue';
import Meta from '../components/Meta/Meta.vue';
import Pairings from '../components/Pairings/Pairings.vue';
import Query from '../components/Queries/Query.vue';
import Scatter from '../components/Scatter/Scatter.vue';
import Selection from '../components/Selection/Selection.vue';
import Settings from '../components/Settings/Settings.vue';
import Time from '../components/Time/Time.vue';
import Volumes from '../components/Volumes/Volumes.vue';
import {useStorage} from '../storage/useStorage';

const handleReadiness = () => {
  const isReady = isReadyRef.value;

  if (!isReady) {
    appDraggablesStore.import = true;
  }
};
onMounted(handleReadiness);
const {isReadyRef} = await useStorage();
</script>

<template>
  <Menu />
  <Import v-if="appDraggablesStore.import" />
  <Settings v-if="appDraggablesStore.settings" />
  <Help v-if="appDraggablesStore.help" />

  <div v-if="isReadyRef">
    <Selection />
    <Colors />
    <Query />
    <Time />
    <Audio />
    <Details />
    <Volumes />
    <Matrices />
    <Pairings />

    <Meta />

    <Scatter />
  </div>
</template>
