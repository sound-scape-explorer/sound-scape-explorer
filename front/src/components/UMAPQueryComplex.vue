<script lang="ts" setup>
import {ref, watch} from 'vue';
import {NIcon, NInput} from 'naive-ui';
import {FlaskOutline} from '@vicons/ionicons5';
import {useUMAPStatus} from '../composables/useUMAPStatus';
import {useTimeout} from '../composables/useTimeout';

const input = ref<string>('');
const {isDisabled} = useUMAPStatus();

function processQuery() {
  console.log(input.value);
}

watch(input, () => {
  useTimeout(processQuery, 500);
});
</script>

<template>
  <n-input v-model:value="input" :disabled="isDisabled" placeholder="COMPLEX QUERY" type="text">
    <template #suffix>
      <n-icon class="icon">
        <flask-outline />
      </n-icon>
    </template>
  </n-input>
</template>

<style lang="scss" scoped>

</style>
