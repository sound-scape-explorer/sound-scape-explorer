<script lang="ts" setup>
import {IonIcon} from '@ionic/vue';
import {chevronExpand} from 'ionicons/icons';
import AppButton from 'src/app/app-button.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import FilteringInfo from 'src/components/filtering-info/filtering-info.vue';
import {useThemeColors} from 'src/composables/use-theme-colors';
import {useDraggableLabels} from 'src/draggables/labels/use-draggable-labels';

const {cycleHorizontal, cycleVertical} = useDraggableLabels();
const {colors} = useThemeColors();
</script>

<template>
  <AppDraggableSidebar>
    <AppButton
      :handle-click="cycleHorizontal"
      size="tiny"
      small-tooltip
      tooltip="Expand horizontally"
      tooltip-placement="left"
    >
      <IonIcon
        :class="$style.rotate"
        :icon="chevronExpand"
      />
    </AppButton>

    <AppButton
      :handle-click="cycleVertical"
      size="tiny"
      small-tooltip
      tooltip="Expand vertically"
      tooltip-placement="left"
    >
      <IonIcon :icon="chevronExpand" />
    </AppButton>

    <FilteringInfo />
  </AppDraggableSidebar>
</template>

<style lang="scss" module>
@use 'src/styles/fx';

.rotate {
  @include fx.rotate-90;
}
</style>
