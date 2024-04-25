import {reactive} from 'vue';

export interface AppNotification {
  title: string;
  description: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export interface AppNotificationsStore {
  list: AppNotification[];
}

export const appNotificationsStore = reactive<AppNotificationsStore>({
  list: [],
});
