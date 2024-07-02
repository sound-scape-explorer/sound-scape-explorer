import type {InjectionKey} from 'src/common/injection-key';
import {provide, type Ref} from 'vue';

export function useRefProvide<T>(key: InjectionKey, ref: Ref<T>) {
  provide(key, ref);
}
