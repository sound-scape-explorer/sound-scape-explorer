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
import AppNotification from 'src/app/app-notification/app-notification.vue';
</script>

<template>
  <n-space
    size="large"
    vertical
  >
    <n-layout
      has-sider
      sider-placement="left"
    >
      <AppLoading />

      <n-layout>
        <n-notification-provider>
          <n-message-provider>
            <AppNotification />

            <Suspense>
              <Explore />
            </Suspense>
          </n-message-provider>
        </n-notification-provider>
      </n-layout>
    </n-layout>
  </n-space>
</template>
