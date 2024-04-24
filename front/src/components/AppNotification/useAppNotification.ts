import type {NotificationType} from 'naive-ui';

import {appNotificationsStore} from './appNotificationsStore';

export function useAppNotification() {
  function notify(
    type: NotificationType,
    title: string,
    description: string,
  ): void {
    appNotificationsStore.list.push({
      type: type,
      title: title,
      description: description,
    });
  }

  return {
    notify: notify,
  };
}