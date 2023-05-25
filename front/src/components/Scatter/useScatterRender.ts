import {ref} from 'vue';
import {ScatterGL, Dataset} from 'src/lib/scatter-gl-0.0.13';
import {useScatterColor} from './useScatterColor';
import {useScatterFiltersNew} from './useScatterFiltersNew';

export function useScatterRender() {
  const isFirstRenderRef = ref<boolean>(true);
  const {getColor} = useScatterColor();
  const {askForRefresh} = useScatterFiltersNew();

  const render = (scatter: ScatterGL, dataset: Dataset) => {
    console.log('render');

    scatter.updateDataset(dataset);
    scatter.resize();

    if (isFirstRenderRef.value === false) {
      return;
    }

    askForRefresh();
    scatter.setPointColorer(getColor);
    scatter.render(dataset);

    isFirstRenderRef.value = false;
  };

  return {
    render: render,
  };
}
