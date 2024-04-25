import {reactive} from 'vue';

export interface AppNotification {
  title: string;
  description: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export interface AppNotificationStore {
  list: AppNotification[];
}

export const appNotificationStore = reactive<AppNotificationStore>({
  list: [],
});
