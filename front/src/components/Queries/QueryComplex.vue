<script lang="ts" setup>
import {FlaskOutline} from '@vicons/ionicons5';
import {NIcon, NInput} from 'naive-ui';
import {ref, watch} from 'vue';
import {useTimeout} from '../../hooks/useTimeout';
import {useScatterStatus} from '../Scatter/useScatterStatus';
import type {QueryComplexStore} from './queryComplexStore';
import {queriesComplexStore} from './queryComplexStore';

const input = ref<string>('');
const {isDisabled} = useScatterStatus();

function digestQueryItem(item: RegExpMatchArray, payload: QueryComplexStore['queryComplex']): void {
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

function processQuery() {
  if (input.value === '') {
    queriesComplexStore.isActive = false;
    return;
  }

  const payload: QueryComplexStore['queryComplex'] = {};
  const groupRegex = /\(([^+.]*)\)/g; // ()+()
  const groupMatches = [...input.value.matchAll(groupRegex)].map((element) => element[1]);

  const itemRegex = /@(\w*)=([\w+]*)/g; // @COL=VALUE1+VALUE2

  if (groupMatches.length > 0) {
    queriesComplexStore.hasGroups = true;

    groupMatches.forEach((group, i) => {
      payload[`GROUP_${i}`] = {};

      const groupMatches = [...group.matchAll(itemRegex)];

      groupMatches.forEach((item) => {
        digestQueryItem(item, payload[`GROUP_${i}`]);
      });
    });
  } else {
    queriesComplexStore.hasGroups = false;

    const itemMatches = [...input.value.matchAll(itemRegex)];
    itemMatches.forEach((item) => digestQueryItem(item, payload));
  }

  queriesComplexStore.isActive = true;
  queriesComplexStore.queryComplex = payload;
}

watch(input, () => {
  useTimeout(processQuery, 500);
});
</script>

<template>
  <n-input
    v-model:value="input"
    :disabled="isDisabled"
    placeholder="Query Complex..."
    size="small"
    type="text"
  >
    <template #suffix>
      <n-icon class="icon">
        <flask-outline />
      </n-icon>
    </template>
  </n-input>
</template>
