<script lang="ts" setup>
import {ArrowUndoOutline, RepeatOutline} from '@vicons/ionicons5';
import {NButton, NIcon, NInput, NSelect, NTabPane, NTabs} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {useScreen} from 'src/components/screen/use-screen';
import {useKeyboard} from 'src/composables/use-keyboard';
import {useStorageLabels} from 'src/composables/use-storage-labels';
import {
  convertToNaiveSelectOptions,
  type NaiveSelectOption,
} from 'src/utils/convert-to-naive-select-options';
import {ref, watch} from 'vue';

const {selected} = useScreen();
const {lock, unlock} = useKeyboard();
const customProperty = ref<string>('');
const existingProperty = ref<string>('');
const custom = ref<string>('');
const {labelProperties} = useStorageLabels();
const options = ref<NaiveSelectOption[]>([]);

type Mode = 'existing' | 'custom';

const mode = ref<Mode>('existing');

const undo = () => {
  console.log('undo');
};

const toggle = () => {
  if (mode.value === 'existing') {
    mode.value = 'custom';
    return;
  }

  mode.value = 'existing';
};

watch(labelProperties, () => {
  options.value = convertToNaiveSelectOptions(labelProperties.value ?? []);
});

// TODO: build editable copy of labels
</script>

<template>
  <AppDraggable
    class="draggable-selection"
    draggable-key="selection"
  >
    <div class="draggable-selection--buttons">
      <AppButton
        :handle-click="() => console.log('undo')"
        tooltip="undo"
      >
        <ArrowUndoOutline />
      </AppButton>

      <AppButton
        :handle-click="() => console.log('repeat')"
        tooltip="repeat"
      >
        <RepeatOutline />
      </AppButton>
    </div>

    <span class="draggable-selection--tooltip">
      Current number of points selected: {{ selected.length }}
    </span>

    <NTabs
      animated
      class="draggable-selection--tabs"
      type="line"
    >
      <NTabPane
        name="Add"
        tab="Add"
      >
        Add
      </NTabPane>
      <NTabPane
        name="History"
        tab="History"
      >
      </NTabPane>
    </NTabs>

    <NButton
      ref="button"
      size="small"
      @click="undo"
    >
      <NIcon>
        <ArrowUndoOutline />
      </NIcon>
    </NButton>

    <div class="draggable-selection--container">
      <NButton
        ref="button"
        size="small"
        @click="toggle"
      >
        <NIcon>
          <RepeatOutline />
        </NIcon>
      </NButton>

      <NSelect
        v-if="mode === 'existing'"
        v-model:value="existingProperty"
        :options="options"
        size="small"
      />

      <NInput
        v-if="mode === 'custom'"
        v-model:value="customProperty"
        placeholder="custom property"
        size="small"
        @inputBlur="() => unlock()"
        @inputFocus="() => lock()"
      />

      <NInput
        v-model:value="custom"
        placeholder="value"
        size="small"
        @inputBlur="() => unlock()"
        @inputFocus="() => lock()"
      />
    </div>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.draggable-selection {
  width: 40em;
}

.draggable-selection--container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
}

.draggable-selection--buttons {
  position: fixed;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  gap: 2px;
  height: 0;
  margin-left: -2rem;
}

.draggable-selection--tabs {
  margin-top: -1em;
  padding-top: 0.5em;
}

.draggable-selection--tooltip {
  position: fixed;
  margin-top: 1em;
  margin-right: 1em;
  right: 0;
}
</style>
