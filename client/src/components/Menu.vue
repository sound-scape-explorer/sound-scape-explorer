<script lang="ts" setup>
import {MenuOption, NLayoutSider, NMenu} from 'naive-ui';
import {h, onMounted, ref} from 'vue';
import {renderIcon} from '../utils/render-icon';
import {
  AlbumsOutline,
  CogOutline,
  ConstructOutline,
  DocumentTextOutline,
  EarthOutline,
  EyeOutline,
  HomeOutline,
  PlayOutline,
  StatsChartOutline,
} from '@vicons/ionicons5';
import {RouterLink, useRouter} from 'vue-router';

const collapsed = ref(true);

onMounted(async () => {
  const router = useRouter();
  await router.isReady();

  const activeAnchorClasses = 'router-link-active router-link-exact-active';
  const menu = document.querySelector('.menu') as HTMLDivElement;

  Array.from(menu.children).forEach((child) => {
    const anchor = child.querySelector('a') as HTMLAnchorElement;

    if (anchor.className !== activeAnchorClasses) {
      return;
    }

    const button = child.children[0] as HTMLDivElement;
    button.click();
  });
});

/**
 * @see https://ionic.io/ionicons
 */
const menuOptions: MenuOption[] = [
  {
    label: () => h(RouterLink, {to: {name: 'home'}}, {default: () => 'Sound Scape Explorer'}),
    key: 'home',
    icon: renderIcon(HomeOutline),
    default: true,
  },
  {
    label: () => h(RouterLink, {to: {name: 'preview'}}, {default: () => 'Preview'}),
    key: 'preview',
    icon: renderIcon(EyeOutline),
  },
  {
    label: () => h(RouterLink, {to: {name: 'player'}}, {default: () => 'Player'}),
    key: 'player',
    icon: renderIcon(PlayOutline),
  },
  {
    label: () => h(RouterLink, {to: {name: 'umap'}}, {default: () => 'UMAP'}),
    key: 'umap',
    icon: renderIcon(StatsChartOutline),
  },
  {
    label: () => h(RouterLink, {to: {name: 'volumes'}}, {default: () => 'Volumes'}),
    key: 'volumes',
    icon: renderIcon(EarthOutline),
  },
  {
    label: () => h(RouterLink, {to: {name: 'covering'}}, {default: () => 'Covering'}),
    key: 'covering',
    icon: renderIcon(AlbumsOutline),
  },
  {
    label: () => h(RouterLink, {to: {name: 'minitools'}}, {default: () => 'MiniTools'}),
    key: 'minitools',
    icon: renderIcon(ConstructOutline),
  },
  {
    label: () => h(RouterLink, {to: {name: 'config'}}, {default: () => 'Config'}),
    key: 'config',
    icon: renderIcon(CogOutline),
  },
  {
    label: () => h(RouterLink, {to: {name: 'docs'}}, {default: () => 'Docs'}),
    key: 'docs',
    icon: renderIcon(DocumentTextOutline),
  },
];
</script>

<template>
  <n-layout-sider
      :collapsed="collapsed"
      :collapsed-width="64"
      :native-scrollbar="false"
      :width="240"
      bordered
      collapse-mode="width"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
  >
    <n-menu
        :collapsed-icon-size="22"
        :collapsed-width="64"
        :options="menuOptions"
        class="menu"
    />
  </n-layout-sider>
</template>
