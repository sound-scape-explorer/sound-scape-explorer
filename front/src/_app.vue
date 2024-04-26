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
import {useDraggables} from 'src/composables/draggables';
import {useStorageReady} from 'src/composables/storage-ready';
import {useWorker} from 'src/composables/worker';
import Draggables from 'src/draggables/draggables.vue';
import Scatter from 'src/scatter/scatter.vue';
import {onMounted} from 'vue';

// TODO: is the Suspense component actually needed?

useWorker();
const {isReady} = useStorageReady();
const {store} = useDraggables();

const showImport = () => {
  if (isReady.value) {
    return;
  }

  store.import = true;
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
            <AppLoader v-if="isReady" />
            <Scatter v-if="isReady" />
            <Draggables />
          </div>
        </Suspense>
      </NLayout>
    </NLayout>
  </NSpace>
</template>
