<script lang="ts" setup>
import {watch} from 'vue';
import type {NotificationType} from 'naive-ui';
import {useNotification} from 'naive-ui';
import {ALERT_TIMER} from '../constants';
import {notificationStore} from '../store/notification.store';

const notification = useNotification();

function render(type: NotificationType, title: string, description: string): void {
  notification[type]({
    content: title,
    meta: description,
    duration: ALERT_TIMER,
    keepAliveOnHover: true,
  });
}

watch(notificationStore, () => {
  notificationStore.notifications.forEach((n, i) => {
    render(n.type, n.title, n.description);
    notificationStore.notifications.splice(i, 1);
  });
});
</script>

<template>
</template>
