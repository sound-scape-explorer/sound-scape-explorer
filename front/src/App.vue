<script lang="ts" setup>
import {NLayout, NNotificationProvider, NSpace} from 'naive-ui';
import 'sass-reset';
import Content from './components/Content.vue';
import Menu from './components/Menu.vue';
import ModalLoading from './components/ModalLoading.vue';
import Notification from './components/Notification.vue';
//
</script>

<template>
  <n-space size="large" vertical>
    <n-layout class="container" has-sider sider-placement="left">
      <Suspense>
        <Menu />
      </Suspense>
      <ModalLoading />

      <n-layout>
        <n-notification-provider>
          <Notification />
          <Content />
        </n-notification-provider>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
}
</style>
