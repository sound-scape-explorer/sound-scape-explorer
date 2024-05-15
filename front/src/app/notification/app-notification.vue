<script lang="ts" setup>
import type {NotificationType} from 'naive-ui';
import {NButton, useMessage, useNotification} from 'naive-ui';
import {useAppNotification} from 'src/app/notification/app-notification';
import {ALERT_TIMER} from 'src/constants';
import {combineStringsWithBreaks} from 'src/utils/combine-strings-with-breaks';
import {copyToClipboard} from 'src/utils/copy-to-clipboard';
import {VERSION} from 'src/version';
import {h, watch} from 'vue';

const message = useMessage();
const notification = useNotification();
const {notifications} = useAppNotification();

function render(
  type: NotificationType,
  title: string,
  description: string,
): void {
  const isError = type === 'error';
  let isCopied = false;

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
              isCopied = true;
              const message = combineStringsWithBreaks([
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
}

watch(notifications, () => {
  notifications.value.forEach((n, i) => {
    render(n.type, n.title, n.description);
    notifications.value.splice(i, 1);
  });
});
</script>

<template></template>
