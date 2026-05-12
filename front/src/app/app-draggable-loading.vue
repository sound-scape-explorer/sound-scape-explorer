<script lang="ts" setup="">
import AppIcon from 'src/app/app-icon.vue';
import {useThemeColors} from 'src/composables/use-theme-colors';

interface Props {
  isLoading: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
});

const {colors} = useThemeColors();
</script>

<template>
  <div
    :class="[$style.loading, {[$style['loading-hidden']]: !props.isLoading}]"
  >
    <AppIcon
      :class="$style.spin"
      icon="refresh"
      size="giant"
    />
  </div>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';
@use 'src/styles/borders';
@use 'src/styles/animations';

.loading {
  align-items: center;
  backdrop-filter: blur(sizes.$p0);
  background-color: v-bind('colors.modalColor');
  display: flex;
  font-size: 100px;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;

  @include borders.border-radius;
}

.loading-hidden {
  display: none;
}

$o1: 50% - 0%;
$o2: 50% + 8%;

.spin {
  transform-origin: $o1 $o2;

  @include animations.spin;
}
</style>
