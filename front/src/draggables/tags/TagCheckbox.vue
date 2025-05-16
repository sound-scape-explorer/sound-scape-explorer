<script lang="ts" setup>
import {NCheckbox, NCheckboxGroup, NGi, NGrid} from 'naive-ui';
import {useThemeColors} from 'src/composables/use-theme-colors';
import {useTagCheckboxColors} from 'src/draggables/tags/use-tag-checkbox-colors';
import {useTagCheckboxLifecycles} from 'src/draggables/tags/use-tag-checkbox-lifecycles';
import {useTagCheckboxSelector} from 'src/draggables/tags/use-tag-checkbox-selector';
import {ref} from 'vue';

interface Props {
  property: string;
}

const props = defineProps<Props>();

const {colors} = useThemeColors();
const checkboxes = ref<string[]>([]);
const {getColor, tagUniques} = useTagCheckboxColors(props.property);
const {selector} = useTagCheckboxSelector(props.property);
useTagCheckboxLifecycles(props.property, checkboxes);
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
      <NGi v-for="(value, p) in tagUniques">
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
