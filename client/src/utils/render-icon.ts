import type {Component} from 'vue';
import {h} from 'vue';
import {NIcon} from 'naive-ui';

export function renderIcon(icon: Component) {
  return () => h(NIcon, null, {default: () => h(icon)});
}
