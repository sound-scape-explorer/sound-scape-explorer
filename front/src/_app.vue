<script lang="ts" setup>
import 'sass-reset/src/reset.scss';

import {NLayout, NSpace} from 'naive-ui';
import AppConsole from 'src/app/app-console.vue';
import AppLoader from 'src/app/app-loader.vue';
import AppLoading from 'src/app/app-loading.vue';
import AppMenu from 'src/app/menu/app-menu.vue';
import AppNotification from 'src/app/notification/app-notification.vue';
import Scatter from 'src/components/scatter/scatter.vue';
import Screen from 'src/components/screen/screen.vue';
import {useApp} from 'src/composables/use-app';
import {useAppShortcuts} from 'src/composables/use-app-shortcuts';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useClientSettingsChecker} from 'src/composables/use-client-settings-checker';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {useStorageWatcher} from 'src/composables/use-storage-watcher';
import {useWorker} from 'src/composables/use-worker';
import Draggables from 'src/draggables/draggables.vue';
import {onMounted} from 'vue';

const {isReady} = useStorageReady();
const {isAlphaPreview, isBetaPreview} = useClientSettings();
const {checkVersions} = useClientSettingsChecker();
const {create: createWorker} = useWorker();
const {showImport} = useApp();

useAppShortcuts();
useStorageWatcher();

onMounted(createWorker);
onMounted(showImport);
onMounted(checkVersions);
</script>

<template>
  <NSpace
    size="large"
    vertical
  >
    <NLayout
      has-sider
      sider-placement="left"
    >
      <AppLoading />
      <AppConsole />

      <NLayout>
        <AppNotification />
        <AppMenu />
        <AppLoader />
        <Scatter v-if="isReady" />
        <Screen v-if="isReady && isAlphaPreview" />
        <Draggables />
      </NLayout>
    </NLayout>
  </NSpace>
</template>
