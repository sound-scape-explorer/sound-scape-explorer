<script lang="ts" setup>
import {computed} from 'vue';

interface Props {
  size?: 'small' | 'medium' | 'large';
}

const props = withDefaults(defineProps<Props>(), {size: 'small'});

const classNames = computed<string>(() => {
  let string = 'app-draggable-menu__form';

  switch (props.size) {
    case 'small': {
      string += ' app-draggable-menu__form_s';
      break;
    }
    case 'medium': {
      string += ' app-draggable-menu__form_m';
      break;
    }
    case 'large': {
      string += ' app-draggable-menu__form_l';
      break;
    }
  }

  return string;
});
</script>

<template>
  <div class="app-draggable-menu__container">
    <div :class="classNames">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
$s: 3rem;
$m: 5rem;
$l: 8rem;

.app-draggable-menu__container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 0.5rem;

  min-width: 20rem;
}

.app-draggable-menu__form {
  display: grid;
  gap: 0.5rem;
  width: 100%;
}

.app-draggable-menu__form_s {
  grid-template-columns: $s 1fr;
}

.app-draggable-menu__form_m {
  grid-template-columns: $m 1fr;
}

.app-draggable-menu__form_l {
  grid-template-columns: $l 1fr;
}

.app-draggable-menu__row {
  display: grid;
  grid-template-columns: 1fr 4rem 1fr;
  gap: 0.5rem;
}

.app-draggable-menu__full {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.app-draggable-menu__item {
  display: flex;
  justify-content: center;
}
</style>
