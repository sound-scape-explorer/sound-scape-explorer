<script lang="ts" setup="">
import {SearchOutline} from '@vicons/ionicons5';
import {computed} from 'vue';
import {useColors} from '../composables/useColors';
import {settingsStore} from '../store/settings.store';
import {UMAPLegendStore} from '../store/UMAP-legend.store';
import Button from './Button.vue';
import UMAPLegendGradient from './UMAPLegendGradient.vue';
import UMAPMeta from './UMAPLegendMeta.vue';
import UMAPLegendSelection from './UMAPLegendSelection.vue';

const {colors} = useColors();

const gradientColors = computed<string[]>(() => colors.value.colors(100));

function toggle() {
  UMAPLegendStore.isOpen = !UMAPLegendStore.isOpen;
}

const containerClasses = computed<string>(() => {
  let classes = 'container ';

  if (UMAPLegendStore.isOpen) {
    classes += 'container-open';
  } else {
    classes += 'container-close';
  }

  return classes;
});

const moreClasses = computed<string>(() => {
  let classes = 'more ';

  if (UMAPLegendStore.isOpen) {
    classes += 'more-open';
  } else {
    classes += 'more-close';
  }

  return classes;
});
</script>

<template>
  <div :class="containerClasses">
    <Button :handle-click="toggle" class="toggle">
      <search-outline />
    </Button>

    <div v-if="settingsStore.debug" class="title">
      Color scale
    </div>

    <UMAPLegendGradient
        v-if="settingsStore.debug"
        :array="gradientColors"
        max=""
        med=""
        min=""
    />

    <div class="title">
      Meta selection
    </div>

    <UMAPMeta />

    <div :class="moreClasses">
      <UMAPLegendSelection v-if="UMAPLegendStore.isOpen" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;

  position: absolute;
  top: 1rem;
  right: 2rem;

  width: 20rem;

  z-index: 90;

  padding: 0.6rem 0.9rem;
  overflow-y: auto;

  background-color: rgba(255, 255, 255, 0.8);

  transition: width 120ms ease-in-out,
  border 120ms ease-in-out,
  background-color 120ms ease-in-out;
}

.container-open {
  max-height: 60%;

  border: 1px solid rgba(0, 0, 0, 0.8);

  transition: width 120ms ease-in,
  max-height 120ms ease-in,
  border 120ms ease-in;
}

.container-close {
  max-height: 20%;

  border: 1px solid rgba(0, 0, 0, 0.1);

  transition: width 120ms ease-out,
  max-height 120ms ease-out,
  border 120ms ease-in;
}

.more {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.more-open {
  opacity: 1;
  transition: opacity 240ms ease-in;
}

.more-close {
  opacity: 0;
  transition: opacity 240ms ease-out;
}

.title {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  font-size: small;
  font-weight: bold;
  font-style: italic;
}

.toggle {
  position: fixed;
  background: transparent;
  padding-right: 26px;
  width: auto;
}
</style>
