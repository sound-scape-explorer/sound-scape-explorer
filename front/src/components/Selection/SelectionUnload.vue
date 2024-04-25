<script lang="ts" setup="">
import {ArrowUndoCircleOutline} from '@vicons/ionicons5';
import {isSelectedRef, useSelect} from 'src/composables/select';

import AppButton from '../AppButton/AppButton.vue';

const {unloadSelection} = useSelect();
</script>

<template>
  <AppButton
    :disabled="!isSelectedRef.value"
    :handle-click="unloadSelection"
    class="button"
    text="Unload selection"
  >
    <arrow-undo-circle-outline />
  </AppButton>
</template>

<style lang="scss" scoped>
.button {
  background: rgba(255, 0, 0, 0.2);
}
</style>
