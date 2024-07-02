import {useViewLoader} from 'src/composables/use-view-loader';
import {useViewState} from 'src/composables/use-view-state';
import {useViewUnloader} from 'src/composables/use-view-unloader';
import {watch} from 'vue';

export function useViewWatcher() {
  const {hasView} = useViewState();
  const {load} = useViewLoader();
  const {unload} = useViewUnloader();

  watch(hasView, async () => {
    if (hasView) {
      await load();
      return;
    }

    unload();
  });
}
