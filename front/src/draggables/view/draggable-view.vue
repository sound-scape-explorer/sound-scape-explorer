<script lang="ts" setup>
import {IonIcon} from '@ionic/vue';
import {arrowUndoCircleOutline} from 'ionicons/icons';
import AppButton from 'src/app/app-button.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {DraggableKey} from 'src/composables/use-draggables';
import {useSelectionLifecycles} from 'src/composables/use-selection-lifecycles';
import {useViewSelection} from 'src/composables/use-view-selection';
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
} = useViewSelection();

const extractionNames = computed(() => extractions.map(extractionToSlug));
const bandNames = computed(() => extraction.value?.bands.map(bandToSlug) ?? []);
const integrationNames = computed(
  () => extraction.value?.integrations.map(integrationToSlug) ?? [],
);
const reducerNames = computed(
  () => extraction.value?.reducers.map(reducerToSlug) ?? [],
);

useSelectionLifecycles();
onMounted(autoselectDev);
</script>

<template>
  <AppDraggable :draggable-key="DraggableKey.enum.view">
    <AppDraggableMenu
      :class="$style.menu"
      size="medium"
    >
      <h2>Extraction</h2>

      <AppSelect
        v-model="extractionSlug"
        :disabled="hasView"
        :options="extractionNames"
        placeholder="Extraction..."
        size="small"
      />

      <h2>Band</h2>

      <AppSelect
        v-model="bandSlug"
        :disabled="hasView || extraction === null"
        :options="bandNames"
        placeholder="Band..."
        size="small"
      />

      <h2>Integration</h2>

      <AppSelect
        v-model="integrationSlug"
        :disabled="hasView || extraction === null"
        :options="integrationNames"
        placeholder="Integration..."
        size="small"
      />

      <h2>Reducer</h2>

      <AppSelect
        v-model="reducerSlug"
        :disabled="hasView || extraction === null"
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
