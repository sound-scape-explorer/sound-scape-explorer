<script lang="ts" setup="">
interface Props {
  height?: number; // percents
}

const props = withDefaults(defineProps<Props>(), {
  height: 20,
});
</script>

<template>
  <div
    :style="{maxHeight: props.height + 'em'}"
    class="container"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.container {
  overflow-y: scroll;
  padding-right: 10px;
}
</style>
