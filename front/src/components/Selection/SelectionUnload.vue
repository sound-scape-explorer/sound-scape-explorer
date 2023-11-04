<script lang="ts" setup="">
import {ArrowUndoCircleOutline} from '@vicons/ionicons5';
import {isSelectedRef, useSelection} from 'src/hooks/useSelection';

import AppButton from '../AppButton/AppButton.vue';

const {unloadSelection} = useSelection();
</script>

<template>
  <AppButton
    :handle-click="unloadSelection"
    text="Unload selection"
    class="button"
    :disabled="!isSelectedRef.value"
  >
    <arrow-undo-circle-outline />
  </AppButton>
</template>

<style lang="scss" scoped>
.button {
  background: rgba(255, 0, 0, 0.2);
}
</style>
