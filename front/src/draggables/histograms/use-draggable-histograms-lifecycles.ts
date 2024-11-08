import {useDraggableHistograms} from 'src/draggables/histograms/use-draggable-histograms';
import {useHistogramsRenderer} from 'src/draggables/histograms/use-histograms-renderer';
import {watch} from 'vue';

export function useDraggableHistogramsLifecycles() {
  const {name, over, histogramFunction} = useDraggableHistograms();
  const {render} = useHistogramsRenderer();

  watch([name, over, histogramFunction], render);
}
