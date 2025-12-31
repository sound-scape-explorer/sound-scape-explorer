<script lang="ts" setup="">
import {NSelect} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppIcon from 'src/app/app-icon.vue';
import {useSelectionBoxes} from 'src/draggables/selection/use-selection-boxes';

const {currentId, boxes, addBox, removeBox} = useSelectionBoxes();
</script>

<template>
  <h2>Boxes</h2>

  <div :class="$style.row">
    <NSelect
      v-model:value="currentId"
      :disabled="boxes.length === 0"
      :options="
        boxes.map((b) => ({
          label: b.id.toString(),
          value: b.id,
        }))
      "
      placeholder="Select box"
      size="tiny"
    />

    <AppButton
      :handle-click="addBox"
      tooltip="Add box"
      tooltipPlacement="top"
    >
      <AppIcon
        icon="plus"
        size="small"
      />
    </AppButton>

    <AppButton
      :disabled="currentId === null"
      :handle-click="removeBox"
      tooltip="Remove box"
      tooltipPlacement="top"
    >
      <AppIcon
        icon="minus"
        size="small"
      />
    </AppButton>
  </div>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.row {
  align-items: center;
  display: flex;
  gap: sizes.$g0;

  & > :first-child {
    width: 100%;
  }

  & > :nth-last-child(-n + 2) {
    transform: translate3d(0, 1px, 0);
  }
}
</style>
