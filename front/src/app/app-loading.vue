<script lang="ts" setup>
import {NProgress} from 'naive-ui';
import AppModal from 'src/app/app-modal.vue';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useThemeColors} from 'src/composables/use-theme-colors';
import {useViewLoader} from 'src/composables/use-view-loader';

const {isLoading, loadingText} = useScatterLoading();
const {step} = useViewLoader();
const {colors} = useThemeColors();
</script>

<template>
  <AppModal
    v-if="isLoading"
    :class="$style.container"
    :is-wait="true"
  >
    <div :class="$style.loading">
      <div>Please wait</div>
      <div :class="$style.current">{{ loadingText }}</div>
      <NProgress
        :percentage="step"
        color="rgb(23 159 87 / 100%)"
        indicator-placement="inside"
        processing
        type="line"
      />
    </div>
  </AppModal>
</template>

<style lang="scss" module>
@use 'src/styles/fx';
@use 'src/styles/borders';
@use 'src/styles/sizes';

.container {
  @include fx.background-blur-0;
}

.loading {
  align-items: flex-start;
  background: v-bind('colors.baseColor');
  border: 1px solid v-bind('colors.borderColor');
  display: flex;
  flex-direction: column;
  gap: sizes.$p0;
  justify-content: flex-start;
  padding: sizes.$p0 sizes.$p0 * 2 sizes.$p0 * 2 sizes.$p0 * 2;
  width: sizes.$w0;

  @include borders.border-radius;

  & > * {
    height: 1em;
  }

  & > :first-child {
    font-weight: bold;
  }

  & > :last-child {
    height: 1em;
    margin-bottom: sizes.$p0;
    min-width: 100%;
    padding-top: sizes.$p0;
    width: 100%;
  }
}

.current {
  font-style: italic;
}
</style>
