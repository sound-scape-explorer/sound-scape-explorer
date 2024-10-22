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
    :is-wait="true"
  >
    <div :class="$style.loading">
      <div>Please wait</div>
      <span :class="$style.current">{{ loadingText }}</span>
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
.loading {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  width: $w0;
  padding: $p0 $p0 * 2 $p0 * 2 $p0 * 2;
  border: 1px solid $grey;
  background: $white;
  gap: $p0 * 1;

  @include border-radius;
  @include background-blur;

  & > :last-child {
    width: 100%;
    min-width: 100%;
  }
}

.current {
  font-style: italic;
}
</style>
