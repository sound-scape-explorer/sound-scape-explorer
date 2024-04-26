import type {NotificationType} from 'naive-ui';
import {appNotificationStore} from 'src/app/notification/app-notification-store';

export function useAppNotification() {
  function notify(
    type: NotificationType,
    title: string,
    description: string,
  ): void {
    appNotificationStore.list.push({
      type: type,
      title: title,
      description: description,
    });
  }

  return {
    notify: notify,
  };
}
