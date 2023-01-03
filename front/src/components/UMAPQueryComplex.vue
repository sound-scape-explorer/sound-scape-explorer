<script lang="ts" setup>
import {ref, watch} from 'vue';
import {NIcon, NInput} from 'naive-ui';
import {FlaskOutline} from '@vicons/ionicons5';
import {useUMAPStatus} from '../composables/useUMAPStatus';
import {useTimeout} from '../composables/useTimeout';
import type {UMAPQueryComplexStoreInterface} from '../store/UMAP-query-complex.store';
import {UMAPQueryComplexStore} from '../store/UMAP-query-complex.store';

const input = ref<string>('');
const {isDisabled} = useUMAPStatus();

function digestQueryItem(item: RegExpMatchArray, payload: UMAPQueryComplexStoreInterface['queryComplex']): void {
  const metaProperty = item[1];
  let value: string | string[] = item[2];

  if (value.includes('+')) {
    value = value.split('+');
  }

  if (typeof payload[metaProperty] === 'string' && typeof value === 'string') {
    payload[metaProperty] = [payload[metaProperty] as string, value];
    return;
  }

  payload[metaProperty] = value;
}

function digestQuery() {
  const payload: UMAPQueryComplexStoreInterface['queryComplex'] = {};

  if (input.value === '') {
    return payload;
  }

  const groupRegex = /\(([^+.]*)\)/g; // ()+()
  const groupMatches = [...input.value.matchAll(groupRegex)].map((element) => element[1]);

  const itemRegex = /@(\w*)=([\w+]*)/g; // @COL=VALUE1+VALUE2

  if (groupMatches.length > 0) {
    // groups detected
    groupMatches.forEach((group, i) => {
      payload[`GROUP_${i}`] = {};

      const groupMatches = [...group.matchAll(itemRegex)];

      groupMatches.forEach((item) => {
        digestQueryItem(item, payload[`GROUP_${i}`]);
      });
    });
  } else {
    // no group detected
    const itemMatches = [...input.value.matchAll(itemRegex)];
    itemMatches.forEach((item) => digestQueryItem(item, payload));
  }

  console.log(payload);

  return payload;
}

function processQuery() {
  UMAPQueryComplexStore.queryComplex = digestQuery();
}

watch(input, () => {
  useTimeout(processQuery, 500);
});
</script>

<template>
  <n-input v-model:value="input" :disabled="isDisabled" placeholder="Query Complex..." type="text">
    <template #suffix>
      <n-icon class="icon">
        <flask-outline />
      </n-icon>
    </template>
  </n-input>
</template>
