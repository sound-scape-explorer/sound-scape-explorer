import {reactive} from 'vue';

export interface NotificationInterface {
  title: string;
  description: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export interface NotificationStoreInterface {
  notifications: NotificationInterface[];
}

export const notificationStore = reactive<NotificationStoreInterface>({
  notifications: [],
});
