import {type NotificationType} from 'naive-ui';
import {ref} from 'vue';

interface Notification {
  title: string;
  description: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

const notifications = ref<Notification[]>([]);

export function useAppNotification() {
  const notify = (
    type: NotificationType,
    title: string,
    description: string,
  ): void => {
    const notification: Notification = {
      type: type,
      title: title,
      description: description,
    };

    notifications.value = [...notifications.value, notification];
  };

  return {
    notifications: notifications,
    notify: notify,
  };
}
