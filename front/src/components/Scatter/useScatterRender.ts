import {ref} from 'vue';
import {ScatterGL, Dataset} from 'src/lib/scatter-gl-0.0.13';
import {useScatterColor} from './useScatterColor';

export function useScatterRender() {
  const isFirstRenderRef = ref<boolean>(true);
  const {getColor} = useScatterColor();

  const render = (scatter: ScatterGL, dataset: Dataset) => {
    scatter.updateDataset(dataset);
    scatter.resize();

    if (isFirstRenderRef.value === false) {
      return;
    }

    scatter.setPointColorer(getColor);
    scatter.render(dataset);

    isFirstRenderRef.value = false;
  };

  return {
    render: render,
  };
}