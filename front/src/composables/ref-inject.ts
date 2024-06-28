import {type InjectionKey} from 'src/common/injection-key';
import {inject, type Ref} from 'vue';

export function useRefInject(key: InjectionKey) {
  return inject(key) as Ref;
}
