<script lang="ts" setup="">
import {IonIcon} from '@ionic/vue';
import {expand, eyeOffOutline, eyeOutline} from 'ionicons/icons';
import AppButton from 'src/app/app-button.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';

const {isDisplay, toggleDisplay, toggleExpanded} = useDraggableTemporal();
</script>

<template>
  <AppDraggableSidebar>
    <AppButton
      :handle-click="toggleDisplay"
      :tooltip="isDisplay ? 'Chart on' : 'Chart off'"
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
      :handle-click="toggleExpanded"
      size="tiny"
      tooltip="Expand"
      tooltip-placement="left"
    >
      <IonIcon :icon="expand" />
    </AppButton>
  </AppDraggableSidebar>
</template>
