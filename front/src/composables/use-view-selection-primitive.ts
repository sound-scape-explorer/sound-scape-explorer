import type {SelectMixedOption} from 'naive-ui/es/select/src/interface';
import {parseSelectionOption} from 'src/utils/parse-selection-option';
import type {Ref} from 'vue';

interface ViewItem {
  index: number;
}

type Model = Ref<ViewItem | null>;
type Selected = Ref<string | null>;
type Options = Ref<SelectMixedOption[]>;

export function useViewSelectionPrimitive() {
  let hasAutoSelected = false;

  const reset = (model: Model, selected: Selected) => {
    model.value = null;
    selected.value = null;
    hasAutoSelected = false;
  };

  const handleChange = (
    selected: string | null,
    // eslint-disable-next-line no-unused-vars
    callback: (index: number) => void,
  ) => {
    if (selected === null) {
      return;
    }

    const index = parseSelectionOption(selected);

    if (index === null) {
      return;
    }

    callback(index);
  };

  const autoselect = (selected: Selected, options: Options) => {
    if (hasAutoSelected || options.value.length !== 1) {
      return;
    }

    hasAutoSelected = true;
    selected.value = options.value[0].value as string;
  };

  return {
    reset: reset,
    handleChange: handleChange,
    autoselect: autoselect,
  };
}