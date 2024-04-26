<script lang="ts" setup>
import 'sass-reset';

import {
  NLayout,
  NMessageProvider,
  NNotificationProvider,
  NSpace,
} from 'naive-ui';
import Explore from 'src/_explore.vue';
import AppLoading from 'src/app/app-loading.vue';
import AppNotification from 'src/app/notification/app-notification.vue';
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
          <Explore />
        </Suspense>
      </NLayout>
    </NLayout>
  </NSpace>
</template>
