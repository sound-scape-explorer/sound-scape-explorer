<script lang="ts" setup="">
import {EyeOffOutline, EyeOutline} from '@vicons/ionicons5';
import AppButtonNew from 'src/app/app-button-new.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';

const {isDisplay, toggleDisplay} = useDraggableTemporal();
</script>

<template>
  <AppDraggableSidebar shift>
    <AppButtonNew
      :handle-click="toggleDisplay"
      :tooltip="isDisplay ? 'Chart on' : 'Chart off'"
      icon
      tooltip-placement="left"
    >
      <EyeOffOutline v-if="!isDisplay" />
      <EyeOutline v-if="isDisplay" />
    </AppButtonNew>
  </AppDraggableSidebar>
</template>
