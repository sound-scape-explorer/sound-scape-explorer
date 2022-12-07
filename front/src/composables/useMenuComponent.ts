import type {Ref} from 'vue';
import {computed, h, ref} from 'vue';
import type {MenuOption} from 'naive-ui';
import {renderNaiveIcon} from '../utils/render-naive-icon';
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

export function useMenuComponent() {
  const router = useRouter();
  const currentRoute = computed(() => {
    return router.currentRoute.value.name;
  });

  const isCollapsed = ref(true);

  const options: Ref<MenuOption[]> = ref([
    {
      label: () => h(RouterLink, {to: {name: 'home'}}, {default: () => 'Sound Scape Explorer'}),
      key: 'home',
      icon: renderNaiveIcon(HomeOutline),
      default: true,
    },
    {
      label: () => h(RouterLink, {to: {name: 'preview'}}, {default: () => 'Preview'}),
      key: 'preview',
      icon: renderNaiveIcon(EyeOutline),
    },
    {
      label: () => h(RouterLink, {to: {name: 'player'}}, {default: () => 'Player'}),
      key: 'player',
      icon: renderNaiveIcon(PlayOutline),
    },
    {
      label: () => h(RouterLink, {to: {name: 'umap'}}, {default: () => 'UMAP'}),
      key: 'umap',
      icon: renderNaiveIcon(StatsChartOutline),
    },
    {
      label: () => h(RouterLink, {to: {name: 'volumes'}}, {default: () => 'Volumes'}),
      key: 'volumes',
      icon: renderNaiveIcon(EarthOutline),
    },
    {
      label: () => h(RouterLink, {to: {name: 'covering'}}, {default: () => 'Covering'}),
      key: 'covering',
      icon: renderNaiveIcon(AlbumsOutline),
    },
    {
      label: () => h(RouterLink, {to: {name: 'minitools'}}, {default: () => 'MiniTools'}),
      key: 'minitools',
      icon: renderNaiveIcon(ConstructOutline),
    },
    {
      label: () => h(RouterLink, {to: {name: 'config'}}, {default: () => 'Config'}),
      key: 'config',
      icon: renderNaiveIcon(CogOutline),
    },
    {
      label: () => h(RouterLink, {to: {name: 'docs'}}, {default: () => 'Docs'}),
      key: 'docs',
      icon: renderNaiveIcon(DocumentTextOutline),
    },
  ]);

  function open() {
    isCollapsed.value = false;
  }

  function close() {
    isCollapsed.value = true;
  }

  return {
    isCollapsed,
    close,
    open,
    options,
    currentRoute,
  };
}
