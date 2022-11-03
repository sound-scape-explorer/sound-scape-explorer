<script lang="ts" setup>
import 'sass-reset';
import {NLayout, NNotificationProvider, NSpace} from 'naive-ui';
import Content from './components/Content.vue';
import Menu from './components/Menu.vue';
import Notification from './components/Notification.vue';
import Loader from './components/ConfigurationErrorModal.vue';
//
</script>

<template>
  <n-space size="large" vertical>
    <n-layout class="container" has-sider sider-placement="left">
      <Menu />
      <Loader />

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
