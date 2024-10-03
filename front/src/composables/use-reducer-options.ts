import {type Reducer} from 'src/composables/use-reducers';
import {ref} from 'vue';

const options = ref<string[]>([]);

export function useReducerOptions() {
  const create = (reducers: Reducer[]) => {
    options.value = reducers.map(
      (r) => `${r.index} - ${r.name} (${r.dimensions}d)`,
    );
  };

  return {
    options: options,
    create: create,
  };
}
