<script lang="ts" setup>
import {IonIcon} from '@ionic/vue';
import {arrowUndoCircleOutline} from 'ionicons/icons';
import AppButton from 'src/app/app-button.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {InjectionKey} from 'src/common/injection-key';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {useSelectionLifecycles} from 'src/composables/use-selection-lifecycles';
import {useViewSelectionNew} from 'src/composables/use-view-selection-new';
import {useViewState} from 'src/composables/use-view-state';
import {useViewUnloader} from 'src/composables/use-view-unloader';
import {useDraggableView} from 'src/draggables/view/use-draggable-view';
import {computed, onMounted} from 'vue';

const {hasView} = useViewState();
const {unload} = useViewUnloader();
const {autoselectDev} = useDraggableView();

const {
  extraction,
  extractions,
  extractionSlug,
  extractionToSlug,
  bandSlug,
  bandToSlug,
  integrationSlug,
  integrationToSlug,
  reducerSlug,
  reducerToSlug,
} = useViewSelectionNew();

const extractionNames = computed(() => extractions.map(extractionToSlug));
const bandNames = computed(() => extraction.value?.bands.map(bandToSlug) ?? []);
const integrationNames = computed(
  () => extraction.value?.integrations.map(integrationToSlug) ?? [],
);
const reducerNames = computed(
  () => extraction.value?.reducers.map(reducerToSlug) ?? [],
);

useSelectionLifecycles();

useRefProvide(InjectionKey.enum.VIEW_EXTRACTION, extractionSlug);
useRefProvide(InjectionKey.enum.VIEW_BAND, bandSlug);
useRefProvide(InjectionKey.enum.VIEW_INTEGRATION, integrationSlug);
useRefProvide(InjectionKey.enum.VIEW_REDUCER, reducerSlug);

onMounted(autoselectDev);
</script>

<template>
  <AppDraggable draggable-key="view">
    <AppDraggableMenu
      :class="$style.menu"
      size="medium"
    >
      <h2>Extraction</h2>

      <AppSelect
        :disabled="hasView"
        :injection-key="InjectionKey.enum.VIEW_EXTRACTION"
        :options="extractionNames"
        placeholder="Extraction..."
        size="small"
      />

      <h2>Band</h2>

      <AppSelect
        :disabled="hasView || extraction === null"
        :injection-key="InjectionKey.enum.VIEW_BAND"
        :options="bandNames"
        placeholder="Band..."
        size="small"
      />

      <h2>Integration</h2>

      <AppSelect
        :disabled="hasView || extraction === null"
        :injection-key="InjectionKey.enum.VIEW_INTEGRATION"
        :options="integrationNames"
        placeholder="Integration..."
        size="small"
      />

      <h2>Reducer</h2>

      <AppSelect
        :disabled="hasView || extraction === null"
        :injection-key="InjectionKey.enum.VIEW_REDUCER"
        :options="reducerNames"
        placeholder="Reducer..."
        size="small"
      />

      <span />

      <div :class="$style['last-line']">
        <AppButton
          :disabled="!hasView"
          :error="hasView"
          :handle-click="unload"
          grow
          size="medium"
        >
          <div :class="$style.button">
            <IonIcon :icon="arrowUndoCircleOutline" />
            Unload view
          </div>
        </AppButton>
      </div>
    </AppDraggableMenu>
  </AppDraggable>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.menu {
  width: sizes.$s0;
}

.last-line {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: sizes.$g0;

  svg {
    transform: translate3d(0, 1px, 0);
  }
}
</style>
