import type {RouteParams, RouteRecordRaw} from 'vue-router';
import {createRouter, createWebHistory} from 'vue-router';
import Home from './pages/Home.vue';
import Preview from './pages/Preview.vue';
import Player from './pages/Player.vue';
import UMAP from './pages/UMAP.vue';
import Volumes from './pages/Volumes.vue';
import Covering from './pages/Covering.vue';
import MiniTools from './pages/MiniTools.vue';
import Config from './pages/Config.vue';
import Docs from './pages/Docs.vue';

export type AppRouteNames =
  | 'home'
  | 'preview'
  | 'player'
  | 'umap'
  | 'volumes'
  | 'covering'
  | 'minitools'
  | 'config'
  | 'docs'

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
    name: 'umap',
    path: '/umap',
    component: UMAP,
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
    name: 'config',
    path: '/config',
    component: Config,
  },
  {
    name: 'docs',
    path: '/docs',
    component: Docs,
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
