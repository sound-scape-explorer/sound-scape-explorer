<script lang="ts" setup>
import {NProgress} from 'naive-ui';
import AppModal from 'src/app/app-modal.vue';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useViewLoader} from 'src/composables/use-view-loader';

const {isLoading, loadingText} = useScatterLoading();
const {step} = useViewLoader();
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
        indicator-placement="inside"
        processing
        type="line"
      />
    </div>
  </AppModal>
</template>

<style lang="scss" module>
.container {
  @include background-blur-0;
}

.loading {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  width: $w0;
  padding: $p0 $p0 * 2 $p0 * 2 $p0 * 2;
  border: 1px solid $grey;
  background: $white;
  gap: $p0;

  @include border-radius;

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
    margin-bottom: $p0;
    padding-top: $p0;
  }
}

.current {
  font-style: italic;
}
</style>
