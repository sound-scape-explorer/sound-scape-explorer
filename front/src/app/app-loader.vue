<script lang="ts" setup>
import {useColorLifecycles} from 'src/composables/use-color-lifecycles';
import {useConfig} from 'src/composables/use-config';
import {useIntervalFilterWatcher} from 'src/composables/use-interval-filter-watcher';
import {useRelativeTrajectories} from 'src/composables/use-relative-trajectories';
import {useSitesNew} from 'src/composables/use-sites-new';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {useViewState} from 'src/composables/use-view-state';
import {useViewWatcher} from 'src/composables/use-view-watcher';
import {watch} from 'vue';

const {isReady, notify} = useStorageReady();
const {hasView} = useViewState();

const {read: readConfig, isLoaded} = useConfig();
const {read: readRelativeTrajectories} = useRelativeTrajectories();
const {generate: generateSites} = useSitesNew();

useViewWatcher();
useIntervalFilterWatcher();
useColorLifecycles();

watch(isReady, notify);
watch(isReady, readConfig);
watch(isLoaded, generateSites);
watch(hasView, readRelativeTrajectories);
</script>

<template></template>
