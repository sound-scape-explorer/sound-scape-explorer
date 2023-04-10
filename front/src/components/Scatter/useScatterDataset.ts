import {scatterDatasetStore} from './scatterDatasetStore';

export function useScatterDataset() {
  function getMetaContent(index: number): string[] {
    return scatterDatasetStore?.dataset?.metadata[index].metaValues as unknown as string[];
  }

  return {
    getMetaContent: getMetaContent,
  };
}
