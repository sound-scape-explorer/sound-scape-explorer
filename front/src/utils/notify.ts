import type {NotificationType} from 'naive-ui';
import {notificationStore} from '../store/notification.store';

export function notify(type: NotificationType, title: string, description: string): void {
  notificationStore.notifications.push({
    type,
    title,
    description,
  });
}
