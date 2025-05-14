<script lang="ts" setup>
import {NCheckbox, NCheckboxGroup, NGi, NGrid} from 'naive-ui';
import {useThemeColors} from 'src/composables/use-theme-colors';
import {useLabelCheckboxesColors} from 'src/draggables/labels/use-label-checkboxes-colors';
import {useLabelCheckboxesLifecycles} from 'src/draggables/labels/use-label-checkboxes-lifecycles';
import {useLabelCheckboxesSelector} from 'src/draggables/labels/use-label-checkboxes-selector';
import {ref} from 'vue';

interface Props {
  property: string;
}

const props = defineProps<Props>();

const {colors} = useThemeColors();
const checkboxes = ref<string[]>([]);
const {getColor, uniques} = useLabelCheckboxesColors(props.property);
const {selector} = useLabelCheckboxesSelector(props.property);
useLabelCheckboxesLifecycles(props.property, checkboxes);
</script>

<template>
  <NCheckboxGroup
    :id="selector"
    v-model:value="checkboxes"
  >
    <NGrid
      :class="$style.container"
      :cols="2"
      :x-gap="4"
      :y-gap="4"
    >
      <NGi v-for="(value, p) in uniques">
        <NCheckbox
          :class="$style.checkbox"
          :style="{
            backgroundColor: getColor(p),
          }"
          :value="value"
          size="small"
        >
          <span>{{ value }}</span>
        </NCheckbox>
      </NGi>
    </NGrid>
  </NCheckboxGroup>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';
@use 'src/styles/transitions';

.container {
  margin-top: sizes.$p0;
  margin-right: sizes.$p0;
}

.checkbox {
  width: 100%;
  height: 100%;
  padding-left: sizes.$g0;
  border-radius: sizes.$g0;

  @include transitions.transition-checkboxes;

  &:hover {
    opacity: 0.9;
    background-color: v-bind('colors.actionColor');
  }

  span {
    color: inherit;
  }
}
</style>
