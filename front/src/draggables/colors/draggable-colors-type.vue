<script lang="ts" setup>
import {NSelect, NTooltip} from 'naive-ui';
import {useColorSelection} from 'src/components/scatter/color-selection';
import {useScatterLoading} from 'src/components/scatter/scatter-loading';
import {useColorType} from 'src/draggables/colors/color-type';

const {isLoading} = useScatterLoading();
const {type} = useColorSelection();
const {options} = useColorType();
</script>

<template>
  <NTooltip
    placement="right"
    trigger="hover"
  >
    <!--suppress VueUnrecognizedSlot -->
    <template #trigger>
      <NSelect
        v-model:value="type"
        :disabled="isLoading"
        :options="options"
        placeholder="Color type..."
        size="small"
      />
    </template>
    <span>Color by</span>
  </NTooltip>
</template>
