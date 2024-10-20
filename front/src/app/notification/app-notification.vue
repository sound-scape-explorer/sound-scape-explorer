<script lang="ts" setup>
import {NMessageProvider, NNotificationProvider} from 'naive-ui';
import AppNotificationRenderer from 'src/app/notification/app-notification-renderer.vue';
</script>

<template>
  <NNotificationProvider>
    <NMessageProvider>
      <AppNotificationRenderer />
    </NMessageProvider>
  </NNotificationProvider>
</template>
