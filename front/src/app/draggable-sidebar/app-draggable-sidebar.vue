<script lang="ts" setup="">
import {computed, defineProps, withDefaults} from 'vue';

interface Props {
  shift?: boolean;
}

const props = withDefaults(defineProps<Props>(), {shift: false});

const classNames = computed<string>(() => {
  let string = 'app-draggable-sidebar__container';

  if (props.shift) {
    string += ' app-draggable-sidebar__shift';
  }

  return string;
});
</script>

<template>
  <div :class="classNames">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.app-draggable-sidebar__container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  gap: 2px;

  height: 0;

  margin-left: -2rem;
}

.app-draggable-sidebar__shift {
  transform: translate3d(0, -1rem, 0);
}
</style>
