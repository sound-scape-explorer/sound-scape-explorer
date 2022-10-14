<script lang="ts" setup>
import {defineProps} from 'vue';
import {NP} from 'naive-ui';

/**
 * Props
 */

interface Props {
  text: string;
}

const {text} = defineProps<Props>();
</script>

<template>
  <n-p>
    {{ text }}
  </n-p>
</template>
