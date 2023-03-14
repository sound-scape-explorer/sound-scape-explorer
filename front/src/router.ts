import type {RouteParams, RouteRecordRaw} from 'vue-router';
import {createRouter, createWebHistory} from 'vue-router';
import Config from './pages/Config.vue';
import Covering from './pages/Covering.vue';
import Help from './pages/Help.vue';
import Home from './pages/Home.vue';
import MiniTools from './pages/MiniTools.vue';
import Player from './pages/Player.vue';
import Preview from './pages/Preview.vue';
import Reductions from './pages/Reductions.vue';
import Settings from './pages/Settings.vue';
import Volumes from './pages/Volumes.vue';

export type AppRouteNames =
  | 'home'
  | 'preview'
  | 'player'
  | 'reductions'
  | 'volumes'
  | 'covering'
  | 'minitools'
  | 'config'
  | 'help'
  | 'settings'

export const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'preview',
    path: '/preview',
    component: Preview,
  },
  {
    name: 'player',
    path: '/player',
    component: Player,
  },
  {
    name: 'reductions',
    path: '/reductions',
    component: Reductions,
  },
  {
    name: 'volumes',
    path: '/volumes',
    component: Volumes,
  },
  {
    name: 'covering',
    path: '/covering',
    component: Covering,
  },
  {
    name: 'minitools',
    path: '/minitools',
    component: MiniTools,
  },
  {
    name: 'settings',
    path: '/settings',
    component: Settings,
  },
  {
    name: 'config',
    path: '/config',
    component: Config,
  },
  {
    name: 'help',
    path: '/help',
    component: Help,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export function routerPush(name: AppRouteNames, params?: RouteParams): ReturnType<typeof router.push> {
  if (params !== undefined) {
    return router.push({
      name,
      params,
    });
  } else {
    return router.push({name});
  }
}
