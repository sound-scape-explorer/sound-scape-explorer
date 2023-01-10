<script lang="ts" setup>
import {useMenuComponent} from '../composables/useMenuComponent';
import {NLayoutSider, NMenu} from 'naive-ui';
import MenuVersion from './MenuVersion.vue';

const {
  close,
  isCollapsed,
  currentRoute,
  open,
  options,
} = useMenuComponent();
</script>

<template>
  <n-layout-sider
      :collapsed="isCollapsed"
      :collapsed-width="64"
      :native-scrollbar="false"
      :width="240"
      bordered
      collapse-mode="width"
      show-trigger
      @collapse="close"
      @expand="open"
  >
    <n-menu
        :collapsed-icon-size="22"
        :collapsed-width="64"
        :options="options"
        :value="currentRoute"
    />
    <MenuVersion />
  </n-layout-sider>
</template>
