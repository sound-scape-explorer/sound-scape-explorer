import {type ReducerDtoWithObjects} from 'src/dtos';
import {ref} from 'vue';

const options = ref<string[]>([]);

export function useReducerOptions() {
  const create = (reducers: ReducerDtoWithObjects[]) => {
    options.value = reducers.map(
      (r) => `${r.index} - ${r.impl} (${r.dimensions}d)`,
    );
  };

  return {
    options: options,
    create: create,
  };
}
