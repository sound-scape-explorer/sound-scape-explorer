<script lang="ts" setup="">
import AppTitle from 'src/app/app-title.vue';
import {useKeyboardShortcuts} from 'src/composables/use-shortcuts';
import Shortcuts from 'src/draggables/help/shortcuts.vue';
import {computed} from 'vue';

const {shortcuts, draggables, alphas, betas} = useKeyboardShortcuts();
const hasAlphas = computed(() => alphas.length > 0);
const hasBetas = computed(() => betas.length > 0);
</script>

<template>
  <AppTitle>🧭 Navigation Shortcuts</AppTitle>
  <Shortcuts :shortcuts="draggables" />
  <AppTitle>🪟 Draggables Shortcuts</AppTitle>
  <Shortcuts :shortcuts="shortcuts" />
  <AppTitle v-if="hasAlphas">🐤 Alpha Shortcuts</AppTitle>
  <Shortcuts
    v-if="hasAlphas"
    :shortcuts="alphas"
  />
  <AppTitle v-if="hasBetas">🐦 Beta Shortcuts</AppTitle>
  <Shortcuts
    v-if="hasBetas"
    :shortcuts="betas"
  />
</template>
