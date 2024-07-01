<script lang="ts" setup="">
import {NSelect} from 'naive-ui';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import {useBandOptions} from 'src/composables/use-band-options';
import {useBandSelection} from 'src/composables/use-band-selection';
import {useExtractorOptions} from 'src/composables/use-extractor-options';
import {useSelectExtractor} from 'src/composables/use-extractor-selection';
import {useIntegrationOptions} from 'src/composables/use-integration-options';
import {useIntegrationSelection} from 'src/composables/use-integration-selection';
import {useReducerOptions} from 'src/composables/use-reducer-options';
import {useReducerSelection} from 'src/composables/use-reducer-selection';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {useViewState} from 'src/composables/use-view-state';
import ViewMenuUnload from 'src/draggables/view/draggable-view-menu-unload.vue';

const {hasView} = useViewState();

const {options: reducerOptions} = useReducerOptions();
const {options: bandOptions} = useBandOptions();
const {options: integrationOptions} = useIntegrationOptions();
const {options: extractorOptions} = useExtractorOptions();

const {selected: reducerSelected, reducer} = useReducerSelection();
const {selected: bandSelected} = useBandSelection();
const {selected: integrationSelected} = useIntegrationSelection();
const {selected: extractorSelected} = useSelectExtractor();

useRefProvide('view/reducer', reducerSelected);
</script>

<template>
  <AppDraggableMenu
    class="menu"
    size="medium"
  >
    <span>Reducer</span>
    <NSelect
      v-model:value="reducerSelected"
      :disabled="hasView"
      :options="reducerOptions"
      placeholder="Reducer..."
      size="tiny"
    />

    <span>Band</span>
    <NSelect
      v-model:value="bandSelected"
      :disabled="reducer === null || hasView"
      :options="bandOptions"
      placeholder="Band..."
      size="tiny"
    />

    <span>Integration</span>
    <NSelect
      v-model:value="integrationSelected"
      :disabled="reducer === null || hasView"
      :options="integrationOptions"
      placeholder="Integration..."
      size="tiny"
    />

    <span>Extractor</span>
    <NSelect
      v-model:value="extractorSelected"
      :disabled="reducer === null || hasView"
      :options="extractorOptions"
      placeholder="Extractor..."
      size="tiny"
    />

    <span />
    <div class="last-line">
      <ViewMenuUnload />
    </div>
  </AppDraggableMenu>
</template>

<style lang="scss" scoped>
.menu {
  & span {
    font-size: 0.9em;
  }
}

.last-line {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
