import {provide, type Ref} from 'vue';

import type {InjectionKey} from './ref-inject';

export function useRefProvide<T>(key: InjectionKey, ref: Ref<T>) {
  provide(key, ref);
}
