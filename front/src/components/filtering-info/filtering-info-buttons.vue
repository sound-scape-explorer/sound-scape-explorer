<script lang="ts" setup>
import {IonIcon} from '@ionic/vue';
import {
  arrowBackOutline,
  arrowForwardOutline,
  arrowRedoOutline,
  arrowUndoOutline,
} from 'ionicons/icons';
import AppButton from 'src/app/app-button.vue';
import {useIntervalSelector} from 'src/composables/use-interval-selector';
import {useThemeColors} from 'src/composables/use-theme-colors';

const {back, forward, canUndo, canRedo, redo, undo, hasClicked} =
  useIntervalSelector();

const {colors} = useThemeColors();
</script>

<template>
  <div :class="$style.container">
    <AppButton
      :disabled="!hasClicked"
      :handle-click="back"
      tooltip="Back"
      tooltip-placement="top"
    >
      <IonIcon :icon="arrowBackOutline" />
    </AppButton>

    <AppButton
      :disabled="!hasClicked"
      :handle-click="forward"
      tooltip="Forward"
      tooltip-placement="top"
    >
      <IonIcon
        :class="$style.button"
        :icon="arrowForwardOutline"
      />
    </AppButton>

    <AppButton
      :disabled="!canUndo || !hasClicked"
      :handle-click="undo"
      tooltip="Undo"
      tooltip-placement="top"
    >
      <IonIcon :icon="arrowUndoOutline" />
    </AppButton>

    <AppButton
      :disabled="!canRedo || !hasClicked"
      :handle-click="redo"
      tooltip="Redo"
      tooltip-placement="top"
    >
      <IonIcon :icon="arrowRedoOutline" />
    </AppButton>
  </div>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.container {
  display: flex;
  justify-content: flex-start;
  margin-top: sizes.$g0;
  gap: sizes.$p0;

  * {
    color: v-bind('colors.primaryColor');
  }
}
</style>
