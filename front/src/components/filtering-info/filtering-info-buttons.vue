<script lang="ts" setup>
import AppButton from 'src/app/app-button.vue';
import AppIcon from 'src/app/app-icon.vue';
import {useInterval} from 'src/composables/use-interval';
import {useThemeColors} from 'src/composables/use-theme-colors';

const {back, forward, canUndo, canRedo, redo, undo, hasInterval} =
  useInterval();

const {colors} = useThemeColors();
</script>

<template>
  <div :class="$style.container">
    <AppButton
      :disabled="!hasInterval"
      :handle-click="back"
      tooltip="Back"
      tooltip-placement="top"
    >
      <AppIcon
        icon="back"
        size="small"
      />
    </AppButton>

    <AppButton
      :disabled="!hasInterval"
      :handle-click="forward"
      tooltip="Forward"
      tooltip-placement="top"
    >
      <AppIcon
        icon="forward"
        size="small"
      />
    </AppButton>

    <AppButton
      :disabled="!canUndo || !hasInterval"
      :handle-click="undo"
      tooltip="Undo"
      tooltip-placement="top"
    >
      <AppIcon
        icon="undo"
        size="small"
      />
    </AppButton>

    <AppButton
      :disabled="!canRedo || !hasInterval"
      :handle-click="redo"
      tooltip="Redo"
      tooltip-placement="top"
    >
      <AppIcon
        icon="redo"
        size="small"
      />
    </AppButton>
  </div>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.container {
  display: flex;
  gap: sizes.$p0;
  justify-content: flex-start;
  margin-top: sizes.$g0;

  * {
    color: v-bind('colors.primaryColor');
  }
}
</style>
