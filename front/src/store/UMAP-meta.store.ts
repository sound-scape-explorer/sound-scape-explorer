import {reactive} from 'vue';

export interface UMAPMetaStoreInterface {
  metaSelection: {
    [metaProperty: string]: string;
  };
}

export const UMAPMetaStore = reactive<UMAPMetaStoreInterface>({
  metaSelection: {},
});
