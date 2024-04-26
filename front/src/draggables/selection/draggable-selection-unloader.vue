<script lang="ts" setup="">
import {ArrowUndoCircleOutline} from '@vicons/ionicons5';
import AppButton from 'src/app/app-button.vue';
import {useSelection} from 'src/composables/selection';

const {unloadSelection, hasSelection} = useSelection();
</script>

<template>
  <AppButton
    :disabled="!hasSelection"
    :handle-click="unloadSelection"
    class="button"
    text="Unload selection"
  >
    <ArrowUndoCircleOutline />
  </AppButton>
</template>

<style lang="scss" scoped>
.button {
  background: rgba(255, 0, 0, 0.2);
}
</style>
