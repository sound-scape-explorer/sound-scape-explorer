import {
  CogOutline,
  HomeOutline,
  InformationOutline,
  RocketOutline,
} from '@vicons/ionicons5';
import type {MenuOption} from 'naive-ui';
import {computed, ref} from 'vue';
import {useRouter} from 'vue-router';
import {Route} from '../enums/Route';
import {generateRoute} from '../utils/generate-route';

export function useMenuComponent() {
  const router = useRouter();
  const currentRoute = computed(() => {
    return router.currentRoute.value.name;
  });

  const isCollapsed = ref(true);

  const options = computed<MenuOption[]>(() => {
    const routes = {
      home: generateRoute(Route.home, HomeOutline, true),
      explore: generateRoute(Route.explore, RocketOutline),
      settings: generateRoute(Route.settings, CogOutline),
      help: generateRoute(Route.help, InformationOutline),
    };

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
