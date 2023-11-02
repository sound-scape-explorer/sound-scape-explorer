<script lang="ts" setup>
import type {NotificationType} from 'naive-ui';
import {useNotification} from 'naive-ui';
import {watch} from 'vue';

import {ALERT_TIMER} from '../../constants';
import {appNotificationsStore} from './appNotificationsStore';

const notification = useNotification();

function render(
  type: NotificationType,
  title: string,
  description: string,
): void {
  notification[type]({
    content: title,
    meta: description,
    duration: ALERT_TIMER,
    keepAliveOnHover: true,
  });
}

watch(appNotificationsStore, () => {
  appNotificationsStore.list.forEach((n, i) => {
    render(n.type, n.title, n.description);
    appNotificationsStore.list.splice(i, 1);
  });
});
</script>

<template></template>
