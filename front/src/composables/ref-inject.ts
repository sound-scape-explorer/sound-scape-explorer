import {inject, type Ref} from 'vue';

export type InjectionKey =
  | 'indicators/list'
  | 'indicators/selection'
  | 'indicators/display';

export function useRefInject(key: InjectionKey) {
  return inject(key) as Ref;
}
