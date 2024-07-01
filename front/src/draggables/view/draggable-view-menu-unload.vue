<script lang="ts" setup="">
import {ArrowUndoCircleOutline} from '@vicons/ionicons5';
import AppButtonNew from 'src/app/app-button-new.vue';
import {useViewState} from 'src/composables/use-view-state';
import {useViewUnloader} from 'src/composables/use-view-unloader';

const {unload} = useViewUnloader();
const {hasView} = useViewState();
</script>

<template>
  <AppButtonNew
    :disabled="!hasView"
    :error="hasView"
    :handle-click="unload"
    icon
    size="small"
    tooltip="Unload selection"
    tooltip-placement="bottom"
  >
    <ArrowUndoCircleOutline />
  </AppButtonNew>
</template>
