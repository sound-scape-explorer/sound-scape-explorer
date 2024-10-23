<script lang="ts" setup="">
import {NCheckbox, NCheckboxGroup, NGi, NGrid} from 'naive-ui';
import {useLabelCheckboxesColors} from 'src/draggables/labels/use-label-checkboxes-colors';
import {useLabelCheckboxesLifecycles} from 'src/draggables/labels/use-label-checkboxes-lifecycles';
import {useLabelCheckboxesSelector} from 'src/draggables/labels/use-label-checkboxes-selector';
import {ref} from 'vue';

interface Props {
  property: string;
}

const props = defineProps<Props>();

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
.checkbox {
  width: 100%;
  height: 100%;
  padding-left: $g0;
  border-radius: $g0;

  @include transition-checkboxes;

  &:hover {
    opacity: 0.9;
    background-color: $grey;
  }

  span {
    color: inherit;
  }
}
</style>
