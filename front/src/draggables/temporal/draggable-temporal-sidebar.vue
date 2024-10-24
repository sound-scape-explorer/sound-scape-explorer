<script lang="ts" setup="">
import {IonIcon} from '@ionic/vue';
import {chevronExpand, eyeOffOutline, eyeOutline} from 'ionicons/icons';
import AppButton from 'src/app/app-button.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';

const {hasIndicator, isDisplay, toggleDisplay, toggleExpanded} =
  useDraggableTemporal();
</script>

<template>
  <AppDraggableSidebar>
    <AppButton
      :disabled="!hasIndicator"
      :handle-click="toggleDisplay"
      :tooltip="isDisplay ? 'Chart on' : 'Chart off'"
      small-tooltip
      tooltip-placement="left"
    >
      <IonIcon
        v-if="!isDisplay"
        :icon="eyeOffOutline"
      />
      <IonIcon
        v-if="isDisplay"
        :icon="eyeOutline"
      />
    </AppButton>

    <AppButton
      :disabled="!hasIndicator"
      :handle-click="toggleExpanded"
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
  </AppDraggableSidebar>
</template>

<style lang="scss" module>
.rotate {
  @include rotate-90;
}
</style>
