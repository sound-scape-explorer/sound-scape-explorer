<script lang="ts" setup>
import {IonIcon} from '@ionic/vue';
import {arrowUndoOutline, repeatOutline} from 'ionicons/icons';
import {NButton, NInput, NSelect, NTabPane, NTabs} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {useScreen} from 'src/components/screen/use-screen';
import {useGlobalKeyboard} from 'src/composables/use-global-keyboard';
import {useStorageLabels} from 'src/composables/use-storage-labels';
import {
  convertToNaiveSelectOptions,
  type NaiveSelectOption,
} from 'src/utils/naive';
import {ref, watch} from 'vue';

const {selected} = useScreen();
const {lock, unlock} = useGlobalKeyboard();
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

// TODO: fix me
watch(labelProperties, () => {
  options.value = convertToNaiveSelectOptions(labelProperties.value ?? []);
});

// TODO: build editable copy of labels
</script>

<template>
  <AppDraggable
    :class="$style['draggable-selection']"
    draggable-key="_alphaSelection3d"
  >
    <div :class="$style.buttons">
      <AppButton
        :handle-click="() => console.log('undo')"
        tooltip="undo"
      >
        <IonIcon :icon="arrowUndoOutline" />
      </AppButton>

      <AppButton
        :handle-click="() => console.log('repeat')"
        tooltip="repeat"
      >
        <IonIcon :icon="repeatOutline" />
      </AppButton>
    </div>

    <span :class="$style.tooltip">
      Current number of points selected: {{ selected.length }}
    </span>

    <NTabs
      :class="$style.tabs"
      animated
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
      <IonIcon :icon="arrowUndoOutline" />
    </NButton>

    <div :class="$style.container">
      <NButton
        ref="button"
        size="small"
        @click="toggle"
      >
        <IonIcon :icon="repeatOutline" />
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

<style lang="scss" module>
.draggable-selection {
  width: 40em;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
}

.buttons {
  position: fixed;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  height: 0;
  margin-left: -2rem;
  gap: 2px;
}

.tabs {
  margin-top: -1em;
  padding-top: 0.5em;
}

.tooltip {
  position: fixed;
  right: 0;
  margin-top: 1em;
  margin-right: 1em;
}
</style>
