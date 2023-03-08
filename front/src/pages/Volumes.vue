<script lang="ts" setup>
import {onUnmounted} from 'vue';
import Title from '../components/Title.vue';
import VolumesBoxPlot from '../components/VolumesBoxPlot.vue';
import VolumesOptions from '../components/VolumesOptions.vue';
import {useSelection} from '../composables/useSelection';

const {clearSelection} = useSelection();
onUnmounted(clearSelection);

</script>

<template>
  <Title text="Volumes" />
  <VolumesOptions />
  <VolumesBoxPlot />
</template>
