import {UMAPDatasetStore} from '../store/UMAP-dataset.store';

export function useUMAPDataset() {
  function getMetaContent(index: number): string[] {
    return UMAPDatasetStore?.dataset?.metadata[index].metaValues as unknown as string[];
  }

  return {
    getMetaContent,
  };
}
