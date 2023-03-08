import {
  AlbumsOutline,
  CogOutline,
  ConstructOutline,
  DocumentTextOutline,
  EarthOutline,
  EyeOutline,
  HomeOutline,
  InformationOutline,
  PlayOutline,
  StatsChartOutline,
} from '@vicons/ionicons5';
import type {MenuOption} from 'naive-ui';
import {computed, ref} from 'vue';
import {useRouter} from 'vue-router';
import {settingsStore} from '../store/settings.store';
import {generateRoute} from '../utils/generate-route';

export function useMenuComponent() {
  const router = useRouter();
  const currentRoute = computed(() => {
    return router.currentRoute.value.name;
  });

  const isCollapsed = ref(true);

  const options = computed<MenuOption[]>(() => {
    const routes = {
      home: generateRoute('home', HomeOutline, true),
      preview: generateRoute('preview', EarthOutline),
      player: generateRoute('player', PlayOutline),
      reductions: generateRoute('reductions', EyeOutline),
      volumes: generateRoute('volumes', StatsChartOutline),
      covering: generateRoute('covering', AlbumsOutline),
      minitools: generateRoute('minitools', ConstructOutline),
      settings: generateRoute('settings', CogOutline),
      config: generateRoute('config', DocumentTextOutline),
      help: generateRoute('help', InformationOutline),
    };

    if (settingsStore.preview === false) {
      return [
        routes.home,
        routes.reductions,
        routes.settings,
        routes.help,
      ];
    }

    return Object.values(routes);
  });

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
