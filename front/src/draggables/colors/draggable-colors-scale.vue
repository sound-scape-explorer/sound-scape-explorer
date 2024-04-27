<script lang="ts" setup>
import {NSelect, NTooltip} from 'naive-ui';
import {COLOR_FLAVORS} from 'src/constants';
import {useColorSelection} from 'src/scatter/color-selection';
import {useScatterLoading} from 'src/scatter/scatter-loading';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {computed} from 'vue';

const {flavor} = useColorSelection();
const naiveOptions = computed(() => convertToNaiveSelectOptions(COLOR_FLAVORS));
const {isLoading} = useScatterLoading();
</script>

<template>
  <NTooltip
    placement="right"
    trigger="hover"
  >
    <!--suppress VueUnrecognizedSlot -->
    <template #trigger>
      <NSelect
        v-model:value="flavor"
        :default-value="flavor"
        :disabled="isLoading"
        :options="naiveOptions"
        placeholder="Color scale..."
        size="small"
      />
    </template>
    <span>Color scale</span>
  </NTooltip>
</template>
