import {ref} from 'vue';
import {ScatterGL, Dataset} from 'src/lib/scatter-gl-0.0.13';
import {useScatterColor} from './useScatterColor';
import {useScatterFilterMeta} from './useScatterFilterMeta';
import {useScatterFilterTime} from './useScatterFilterTime';

export function useScatterRender() {
  const isFirstRenderRef = ref<boolean>(true);
  const {getColor} = useScatterColor();
  const {filterByMeta} = useScatterFilterMeta();
  const {filterByTime} = useScatterFilterTime();

  const render = (scatter: ScatterGL, dataset: Dataset) => {
    console.log('render');

    scatter.updateDataset(dataset);
    scatter.resize();

    if (isFirstRenderRef.value === false) {
      return;
    }

    filterByMeta();
    filterByTime();

    scatter.setPointColorer(getColor);
    scatter.render(dataset);

    isFirstRenderRef.value = false;
  };

  return {
    render: render,
  };
}
