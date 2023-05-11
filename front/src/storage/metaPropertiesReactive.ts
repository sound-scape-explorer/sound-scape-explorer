import {reactive} from 'vue';

export interface MetaPropertiesReactive {
  data: null | string[];
}

export const metaPropertiesReactive = reactive<MetaPropertiesReactive>({
  data: null,
});
