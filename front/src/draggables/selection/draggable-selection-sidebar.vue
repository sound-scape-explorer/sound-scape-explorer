<script lang="ts" setup="">
import {downloadJson} from '@shared/browser';
import {getStorageFilename, readFileAsText} from '@shared/files';
import AppButton from 'src/app/app-button.vue';
import AppIcon from 'src/app/app-icon.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import FilteringInfo from 'src/components/filtering-info/filtering-info.vue';
import {useConfig} from 'src/composables/use-config';
import {useViewKey} from 'src/composables/use-view-key';
import {
  SelectionBoxes,
  useSelectionBoxes,
} from 'src/draggables/selection/use-selection-boxes';
import {ref} from 'vue';

const {config} = useConfig();
const {key} = useViewKey();
const {boxes, resetBoxes} = useSelectionBoxes();

const inputRef = ref<HTMLInputElement | null>(null);

const handleInputClick = () => {
  if (!inputRef.value) {
    return;
  }

  inputRef.value.click();
};

const handleInputChange = async () => {
  if (!inputRef.value) {
    return;
  }

  const file = inputRef.value.files?.[0];

  if (!file) {
    return;
  }

  const text = await readFileAsText(file);
  const json = JSON.parse(text);
  const dto = SelectionBoxes.parse(json);
  boxes.value = dto;
  inputRef.value.value = '';
};

const download = () => {
  if (!config.value) {
    return;
  }

  const filename = getStorageFilename(config.value);
  const name = `${filename}-selection-boxes-${key.value}`;
  downloadJson(boxes.value, name);
};
</script>

<template>
  <AppDraggableSidebar>
    <AppButton
      :disabled="boxes.length === 0"
      :handle-click="resetBoxes"
      tooltip="Remove all boxes"
    >
      <AppIcon
        icon="clean"
        size="small"
      />
    </AppButton>

    <input
      ref="inputRef"
      :class="$style.hidden"
      accept=".json"
      type="file"
      @change="handleInputChange"
    />

    <AppButton
      :disabled="boxes.length === 0"
      :handle-click="download"
      tooltip="Export to local .json"
    >
      <AppIcon
        icon="download"
        size="small"
      />
    </AppButton>

    <AppButton
      :handle-click="handleInputClick"
      tooltip="Load local .json"
    >
      <AppIcon
        icon="import"
        size="small"
      />
    </AppButton>

    <FilteringInfo />
  </AppDraggableSidebar>
</template>

<style lang="scss" module>
.hidden {
  display: none;
}
</style>
