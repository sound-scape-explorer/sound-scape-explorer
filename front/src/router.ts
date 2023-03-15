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

const base = import.meta.env.BASE_URL;

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
    path: `${base}`,
    component: Home,
  },
  {
    name: 'preview',
    path: `${base}preview`,
    component: Preview,
  },
  {
    name: 'player',
    path: `${base}player`,
    component: Player,
  },
  {
    name: 'reductions',
    path: `${base}reductions`,
    component: Reductions,
  },
  {
    name: 'volumes',
    path: `${base}volumes`,
    component: Volumes,
  },
  {
    name: 'covering',
    path: `${base}covering`,
    component: Covering,
  },
  {
    name: 'minitools',
    path: `${base}minitools`,
    component: MiniTools,
  },
  {
    name: 'settings',
    path: `${base}settings`,
    component: Settings,
  },
  {
    name: 'config',
    path: `${base}config`,
    component: Config,
  },
  {
    name: 'help',
    path: `${base}help`,
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
