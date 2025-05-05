<script lang="ts" setup>
import {IonIcon} from '@ionic/vue';
import {resizeOutline} from 'ionicons/icons';
import {NButtonGroup} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import {type InjectionKey} from 'src/common/injection-key';
import {useAppPlotSize} from 'src/composables/use-app-plot-size';
import {useRefInject} from 'src/composables/use-ref-inject';

interface Props {
  width?: InjectionKey;
  height?: InjectionKey;
  disabled: boolean;
  onlyFactors?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  onlyFactors: false,
});

const width = props.width ? useRefInject<number>(props.width) : null;
const height = props.height ? useRefInject<number>(props.height) : null;

const {resize1by1, resize16by10, resize16by9, half, double, resize4by3} =
  useAppPlotSize(width, height);
</script>

<template>
  <NButtonGroup>
    <AppButton
      v-if="!onlyFactors"
      :disabled="props.disabled"
      :handle-click="resize1by1"
    >
      <IonIcon :icon="resizeOutline" />&nbsp;1:1
    </AppButton>
    <AppButton
      v-if="!onlyFactors"
      :disabled="props.disabled"
      :handle-click="resize4by3"
    >
      <IonIcon :icon="resizeOutline" />&nbsp;4:3
    </AppButton>
    <AppButton
      v-if="!onlyFactors"
      :disabled="props.disabled"
      :handle-click="resize16by10"
    >
      <IonIcon :icon="resizeOutline" />&nbsp;16:10
    </AppButton>
    <AppButton
      v-if="!onlyFactors"
      :disabled="props.disabled"
      :handle-click="resize16by9"
    >
      <IonIcon :icon="resizeOutline" />&nbsp;16:9
    </AppButton>
    <AppButton
      :disabled="props.disabled"
      :handle-click="half"
    >
      /2
    </AppButton>
    <AppButton
      :disabled="props.disabled"
      :handle-click="double"
    >
      *2
    </AppButton>
  </NButtonGroup>
</template>
