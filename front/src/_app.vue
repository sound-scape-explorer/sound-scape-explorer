<script lang="ts" setup>
import 'sass-reset';

import {
  NLayout,
  NMessageProvider,
  NNotificationProvider,
  NSpace,
} from 'naive-ui';
import AppLoader from 'src/app/app-loader.vue';
import AppLoading from 'src/app/app-loading.vue';
import AppMenu from 'src/app/menu/app-menu.vue';
import AppNotification from 'src/app/notification/app-notification.vue';
import Scatter from 'src/components/scatter/scatter.vue';
import Screen from 'src/components/screen/screen.vue';
import {useAppShortcuts} from 'src/composables/use-app-shortcuts';
import {useDraggables} from 'src/composables/use-draggables';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {useWorker} from 'src/composables/use-worker';
import Draggables from 'src/draggables/draggables.vue';
import {onMounted} from 'vue';

// TODO: is the Suspense component actually needed?

useWorker();
useAppShortcuts();
const {isReady} = useStorageReady();
const {open} = useDraggables();

const showImport = () => {
  if (isReady.value) {
    return;
  }

  open('open');
};

onMounted(showImport);
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

      <NLayout>
        <NNotificationProvider>
          <NMessageProvider>
            <AppNotification />
          </NMessageProvider>
        </NNotificationProvider>

        <Suspense>
          <div>
            <AppMenu />
            <AppLoader />
            <Scatter v-if="isReady" />
            <Screen v-if="isReady" />
            <Draggables />
          </div>
        </Suspense>
      </NLayout>
    </NLayout>
  </NSpace>
</template>
