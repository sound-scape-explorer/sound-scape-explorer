<script lang="ts" setup="">
import {ArrowUndoCircleOutline} from '@vicons/ionicons5';
import AppButton from 'src/app/app-button.vue';
import {useViewState} from 'src/composables/view-state';
import {useViewUnloader} from 'src/composables/view-unloader';

const {unload} = useViewUnloader();
const {hasView} = useViewState();
</script>

<template>
  <AppButton
    :disabled="!hasView"
    :handle-click="unload"
    :style="hasView ? 'background-color: rgba(255, 0, 0, 0.2)' : undefined"
    text="Unload selection"
  >
    <ArrowUndoCircleOutline />
  </AppButton>
</template>
