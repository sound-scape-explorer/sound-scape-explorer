<script lang="ts" setup>
import {NButton, type NotificationType, useNotification} from 'naive-ui';
import {useAppNotification} from 'src/app/notification/use-app-notification';
import {ALERT_TIMER} from 'src/constants';
import {copyToClipboard} from 'src/utils/browser';
import {joinStringsWithBreaks} from 'src/utils/strings';
import {VERSION} from 'src/version';
import {h, watch} from 'vue';

const notification = useNotification();
const {notifications} = useAppNotification();

const render = (type: NotificationType, title: string, description: string) => {
  const isError = type === 'error';
  const n = notification[type]({
    content: description,
    meta: title,
    duration: !isError ? ALERT_TIMER : undefined,
    keepAliveOnHover: true,
    action: !isError
      ? undefined
      : () => {
        return h(
          NButton,
          {
            text: true,
            type: 'primary',
            onClick: () => {
              const message = joinStringsWithBreaks([
                `version=${VERSION}`,
                `type=${type}`,
                '---',
                title,
                description,
              ]);
              copyToClipboard(message);
              n.destroy();
            },
          },
          {
            default: () => 'Copy',
          },
        );
      },
    onClose: !isError
      ? undefined
      : () => {
        return true;
      },
  });
};

watch(notifications, () => {
  notifications.value.forEach((n, i) => {
    render(n.type, n.title, n.description);
    notifications.value.splice(i, 1);
  });
});
</script>

<template></template>
