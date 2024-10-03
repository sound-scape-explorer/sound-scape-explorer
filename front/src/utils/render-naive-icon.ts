import {NIcon} from 'naive-ui';
import {type Component} from 'vue';
import {h} from 'vue';

/**
 * @see https://ionic.io/ionicons
 */
export function renderNaiveIcon(icon: Component) {
  return () => h(NIcon, null, {default: () => h(icon)});
}
