import {useDraggableHistograms} from 'src/draggables/histograms/use-draggable-histograms';
import {watch} from 'vue';

// TODO: to remove
export function useDraggableHistogramsLifecycles() {
  const {name, over, fn} = useDraggableHistograms();

  watch([name, over, fn], () => {
    // TODO: reconnect me
    console.log('auto render');
    // render();
  });
}
