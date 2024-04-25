<script lang="ts" setup>
import 'sass-reset';

import {
  NLayout,
  NMessageProvider,
  NNotificationProvider,
  NSpace,
} from 'naive-ui';

import AppNotification from './components/app/AppNotification/AppNotification.vue';
import Loading from './components/Loading/Loading.vue';
import Explore from './pages/Explore.vue';
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
      <Loading />

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
