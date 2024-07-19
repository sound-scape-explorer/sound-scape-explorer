<script lang="ts" setup="">
import {ArrowRedoOutline, ArrowUndoOutline} from '@vicons/ionicons5';
import AppButton from 'src/app/app-button.vue';

interface Props {
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  undoTooltip?: string;
  redoTooltip?: string;
}

const props = defineProps<Props>();
const hasUndoTooltip = typeof props?.undoTooltip === 'string';
const hasRedoTooltip = typeof props?.redoTooltip === 'string';
</script>

<template>
  <AppButton
    :disabled="!props.canUndo"
    :handle-click="props.undo"
    :tooltip="hasUndoTooltip && props.canUndo ? props.undoTooltip : undefined"
    icon
    tooltip-placement="left"
  >
    <ArrowUndoOutline />
  </AppButton>

  <AppButton
    :disabled="!props.canRedo"
    :handle-click="props.redo"
    :tooltip="hasRedoTooltip && props.canRedo ? props.redoTooltip : undefined"
    icon
    tooltip-placement="left"
  >
    <ArrowRedoOutline />
  </AppButton>
</template>
