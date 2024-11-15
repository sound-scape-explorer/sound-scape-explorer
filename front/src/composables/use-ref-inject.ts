import {InjectionKey} from 'src/common/injection-key';
import {inject, type Ref} from 'vue';

export function useRefInject<T>(key: InjectionKey) {
  return inject(key) as Ref<T>;
}
