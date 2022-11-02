<script lang="ts" setup>
import {defineProps, ref} from 'vue';
import {NP, NTable} from 'naive-ui';

/**
 * Props
 */

interface Props {
  xs: string[];
  ys: string[];
  // eslint-disable-next-line no-unused-vars
  callback?: (x: string, y: string) => void;
}

const props = defineProps<Props>();

/**
 * State
 */

const activeX = ref();
const activeY = ref();

/**
 * Handlers
 */

function selectCell(nextX: string, nextY: string) {
  if (!nextX || !nextY) {
    return;
  }

  if (nextX === activeX.value && nextY === activeY.value) {
    activeX.value = null;
    activeY.value = null;
    props?.callback && props?.callback(activeX.value, activeY.value);
    return;
  }

  activeX.value = nextX;
  activeY.value = nextY;

  props?.callback && props?.callback(activeX.value, activeY.value);
}

function cellIsActive(nextX: string, nextY: string) {
  return nextX === activeX.value && nextY === activeY.value;
}
</script>

<template>
  <n-p>
    <n-table :single-line="false" class="table" size="small">
      <thead>
      <tr>
        <th />
        <th v-for="x in props.xs">{{ x }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="y in props.ys">
        <th>{{ y }}</th>
        <td
            v-for="x in props.xs"
            :class="{active: cellIsActive(x, y)}"
            class="cell"
            @click="selectCell(x, y)"
        >
          x
        </td>
      </tr>
      </tbody>
    </n-table>
  </n-p>
</template>

<style lang="scss" scoped>
.table {
  text-align: center;
}

.cell {
  cursor: pointer;
}

.active {
  background: black !important;
  color: white !important;
}
</style>
