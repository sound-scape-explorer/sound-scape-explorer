<script lang="ts" setup="">
import AppCheckbox from 'src/app/app-checkbox.vue';
import AppTitle from 'src/app/app-title.vue';
import {InjectionKey} from 'src/common/injection-key';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useRefProvide} from 'src/composables/use-ref-provide';
import DraggableSettingsItem from 'src/draggables/settings/draggable-settings-item.vue';

const {isDevEnabled, devAutoLoadView} = useClientSettings();

useRefProvide(InjectionKey.settingsDevAutoLoadView, devAutoLoadView);
</script>

<template>
  <div v-if="isDevEnabled">
    <AppTitle class="title">Development settings</AppTitle>

    <DraggableSettingsItem title="Auto load view">
      <AppCheckbox
        :default="devAutoLoadView"
        :injection-key="InjectionKey.settingsDevAutoLoadView"
      />
    </DraggableSettingsItem>
  </div>
</template>

<style lang="scss" scoped>
.title {
  margin-bottom: 7px;
}
</style>
