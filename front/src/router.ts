import type {RouteParams, RouteRecordRaw} from 'vue-router';
import {createRouter, createWebHistory} from 'vue-router';
import {Route} from './enums/Route';
import Explore from './pages/Explore.vue';
import Help from './pages/Help.vue';
import Home from './pages/Home.vue';
import Settings from './pages/Settings.vue';

const base = import.meta.env.BASE_URL;

export const routes: RouteRecordRaw[] = [
  {
    name: Route.home,
    path: `${base}`,
    component: Home,
  },
  {
    name: Route.explore,
    path: `${base}${Route.explore}`,
    component: Explore,
  },
  {
    name: Route.settings,
    path: `${base}${Route.settings}`,
    component: Settings,
  },
  {
    name: Route.help,
    path: `${base}${Route.help}`,
    component: Help,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export function routerPush(name: Route, params?: RouteParams): ReturnType<typeof router.push> {
  if (params !== undefined) {
    return router.push({
      name,
      params,
    });
  } else {
    return router.push({name});
  }
}
