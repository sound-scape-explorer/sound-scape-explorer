<script lang="ts" setup>
import 'sass-reset';
import {NLayout, NSpace} from 'naive-ui';
import Content from './components/Content.vue';
import Menu from './components/Menu.vue';
//
</script>

<template>
  <n-space size="large" vertical>
    <n-layout class="container" has-sider sider-placement="left">
      <Menu />

      <n-layout>
        <Content />
      </n-layout>
    </n-layout>
  </n-space>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
}
</style>
