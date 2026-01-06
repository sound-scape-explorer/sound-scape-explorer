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
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  width: sizes.$w0;
  padding: sizes.$p0 sizes.$p0 * 2 sizes.$p0 * 2 sizes.$p0 * 2;
  border: 1px solid v-bind('colors.borderColor');
  background: v-bind('colors.baseColor');
  gap: sizes.$p0;

  @include borders.border-radius;

  & > * {
    height: 1em;
  }

  & > :first-child {
    font-weight: bold;
  }

  & > :last-child {
    width: 100%;
    min-width: 100%;
    height: 1em;
    margin-bottom: sizes.$p0;
    padding-top: sizes.$p0;
  }
}

.current {
  font-style: italic;
}
</style>
