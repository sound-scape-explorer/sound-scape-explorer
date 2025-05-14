<script lang="ts" setup>
import AppCheckbox from 'src/app/app-checkbox.vue';
import AppTitle from 'src/app/app-title.vue';
import {useClientSettings} from 'src/composables/use-client-settings';
import DraggableSettingsItem from 'src/draggables/settings/draggable-settings-item.vue';

const {isDevEnabled, devAutoLoadView} = useClientSettings();
</script>

<template>
  <div v-if="isDevEnabled">
    <AppTitle :class="$style.title">Development settings</AppTitle>

    <DraggableSettingsItem title="Auto load view">
      <AppCheckbox v-model="devAutoLoadView" />
    </DraggableSettingsItem>
  </div>
</template>

<style lang="scss" module>
.title {
  margin-bottom: 7px;
}
</style>
