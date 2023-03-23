import type {Component} from 'vue';
import {h} from 'vue';
import {RouterLink} from 'vue-router';
import {capitalizeFirstLetter} from './capitalize-first-letter';
import {renderNaiveIcon} from './render-naive-icon';

export function generateRoute(
  key: string,
  icon: Component,
  isDefault = false,
) {
  return {
    label: () => h(RouterLink, {to: {name: key}}, {
      default: () => capitalizeFirstLetter(key),
    }),
    key,
    icon: renderNaiveIcon(icon),
    fftSize: isDefault,
  };
}
