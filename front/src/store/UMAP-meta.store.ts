import {reactive} from 'vue';

export interface UMAPMetaStoreInterface {
  metaSelection: {
    [metaProperty: string]: (string | number)[];
  };
}

export const UMAPMetaStore = reactive<UMAPMetaStoreInterface>({
  metaSelection: {},
});
