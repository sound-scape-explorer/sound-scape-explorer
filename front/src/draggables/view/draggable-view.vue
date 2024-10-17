<script lang="ts" setup="">
import {ArrowUndoCircleOutline} from '@vicons/ionicons5';
import {NIcon} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {InjectionKey} from 'src/common/injection-key';
import {useBandLifecycles} from 'src/composables/use-band-lifecycles';
import {useBandOptions} from 'src/composables/use-band-options';
import {useBandSelection} from 'src/composables/use-band-selection';
import {useExtractorLifecycles} from 'src/composables/use-extractor-lifecycles';
import {useExtractorOptions} from 'src/composables/use-extractor-options';
import {useExtractorSelection} from 'src/composables/use-extractor-selection';
import {useIntegrationLifecycles} from 'src/composables/use-integration-lifecycles';
import {useIntegrationOptions} from 'src/composables/use-integration-options';
import {useIntegrationSelection} from 'src/composables/use-integration-selection';
import {useReducerLifecycles} from 'src/composables/use-reducer-lifecycles';
import {useReducerOptions} from 'src/composables/use-reducer-options';
import {useReducerSelection} from 'src/composables/use-reducer-selection';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {useViewState} from 'src/composables/use-view-state';
import {useViewUnloader} from 'src/composables/use-view-unloader';
import {useDraggableView} from 'src/draggables/view/use-draggable-view';
import {onMounted} from 'vue';

const {hasView} = useViewState();
const {unload} = useViewUnloader();
const {autoselectDev} = useDraggableView();

const {options: reducerOptions} = useReducerOptions();
const {options: bandOptions} = useBandOptions();
const {options: integrationOptions} = useIntegrationOptions();
const {options: extractorOptions} = useExtractorOptions();

const {selected: reducerSelected, reducer} = useReducerSelection();
const {selected: bandSelected} = useBandSelection();
const {selected: integrationSelected} = useIntegrationSelection();
const {selected: extractorSelected} = useExtractorSelection();

useReducerLifecycles();
useBandLifecycles();
useIntegrationLifecycles();
useExtractorLifecycles();

useRefProvide(InjectionKey.viewReducer, reducerSelected);
useRefProvide(InjectionKey.viewBand, bandSelected);
useRefProvide(InjectionKey.viewIntegration, integrationSelected);
useRefProvide(InjectionKey.viewExtractor, extractorSelected);

onMounted(autoselectDev);
</script>

<template>
  <AppDraggable draggable-key="view">
    <AppDraggableMenu
      class="draggableViewContainer"
      size="medium"
    >
      <h2>Reducer</h2>

      <AppSelect
        :disabled="hasView"
        :injection-key="InjectionKey.viewReducer"
        :options="reducerOptions"
        placeholder="Reducer..."
        size="small"
      />

      <h2>Band</h2>

      <AppSelect
        :disabled="reducer === null || hasView"
        :injection-key="InjectionKey.viewBand"
        :options="bandOptions"
        placeholder="Band..."
        size="small"
      />

      <h2>Integration</h2>

      <AppSelect
        :disabled="reducer === null || hasView"
        :injection-key="InjectionKey.viewIntegration"
        :options="integrationOptions"
        placeholder="Integration..."
        size="small"
      />

      <h2>Extractor</h2>

      <AppSelect
        :disabled="reducer === null || hasView"
        :injection-key="InjectionKey.viewExtractor"
        :options="extractorOptions"
        placeholder="Extractor..."
        size="small"
      />

      <span />

      <div class="last-line">
        <AppButton
          :disabled="!hasView"
          :error="hasView"
          :handle-click="unload"
          grow
          size="medium"
        >
          <div class="button">
            <NIcon size="18">
              <ArrowUndoCircleOutline />
            </NIcon>
            Unload view
          </div>
        </AppButton>
      </div>
    </AppDraggableMenu>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.draggableViewContainer {
  width: $s0;
}

.last-line {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $g0;

  svg {
    transform: translate3d(0, 1px, 0);
  }
}
</style>
