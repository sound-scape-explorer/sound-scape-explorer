<script lang="ts" setup>
import type {NotificationType} from 'naive-ui';
import {NButton, useMessage, useNotification} from 'naive-ui';
import {h, watch} from 'vue';

import {ALERT_TIMER} from '../../constants';
import {combineStringsWithBreaks} from '../../utils/combine-strings-with-breaks';
import {copyToClipboard} from '../../utils/copy-to-clipboard';
import {VERSION} from '../../version';
import {appNotificationsStore} from './appNotificationsStore';

const message = useMessage();
const notification = useNotification();

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
        if (!isCopied) {
          message.warning('Copy error first');
          return false;
        }
      },
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
