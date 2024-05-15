import {useViewLoader} from 'src/composables/view-loader';
import {useViewState} from 'src/composables/view-state';
import {useViewUnloader} from 'src/composables/view-unloader';
import {watch} from 'vue';

export function useViewWatcher() {
  const {hasView} = useViewState();
  const {load} = useViewLoader();
  const {unload} = useViewUnloader();

  console.log('watcher');

  watch(hasView, async () => {
    if (hasView) {
      await load();
      return;
    }

    unload();
  });
}
