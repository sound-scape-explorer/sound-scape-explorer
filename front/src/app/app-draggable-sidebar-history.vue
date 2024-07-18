<script lang="ts" setup="">
import {ArrowRedoOutline, ArrowUndoOutline} from '@vicons/ionicons5';
import AppButton from 'src/app/app-button.vue';

interface Props {
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <AppButton
    :disabled="!props.canUndo"
    :handle-click="props.undo"
    icon
  >
    <ArrowUndoOutline />
  </AppButton>

  <AppButton
    :disabled="!props.canRedo"
    :handle-click="props.redo"
    icon
  >
    <ArrowRedoOutline />
  </AppButton>
</template>
