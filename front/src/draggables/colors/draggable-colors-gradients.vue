<script lang="ts" setup>
import AppButton from 'src/app/app-button.vue';
import AppGradient from 'src/app/app-gradient.vue';
import AppIcon from 'src/app/app-icon.vue';
import {useColorInvert} from 'src/composables/use-color-invert';
import {ColorOption} from 'src/constants';
import {useColorByDayOrNight} from 'src/draggables/colors/use-color-by-day-or-night';
import {useColorGradients} from 'src/draggables/colors/use-color-gradients';
import {useColorType} from 'src/draggables/colors/use-color-type';
import {useColoringState} from 'src/draggables/colors/use-coloring-state';
import {computed} from 'vue';

const {isTag} = useColorType();

const {invert, isReversible} = useColorInvert();
const {isNumericModeEnabled, option} = useColoringState();
const {scale: dayOrNightScale} = useColorByDayOrNight();

const {
  hoursInDayColors,
  hoursInDayLabels,
  hoursInDayLegend,
  userColors,
  labels,
} = useColorGradients();

const isHoursInDay = computed(
  () => option.value === ColorOption.enum.HoursInDay,
);

const isDayOrNight = computed(
  () => option.value === ColorOption.enum.DayOrNight,
);
</script>

<template>
  <h2
    v-if="!isTag || isNumericModeEnabled"
    style="display: flex; gap: 8px"
  >
    <span>Map</span>
    <AppButton
      :disabled="!isReversible"
      :handle-click="invert"
      size="tiny"
      tooltip="Revert color map"
      tooltip-placement="bottom"
    >
      <AppIcon
        icon="swap"
        size="small"
      />
    </AppButton>
  </h2>

  <div
    v-if="!isTag || isNumericModeEnabled"
    :class="$style.gradients"
  >
    <AppGradient
      v-if="isHoursInDay"
      :colors="hoursInDayColors"
      :labels="hoursInDayLabels"
      :legend-max="hoursInDayLegend.max"
      :legend-med="hoursInDayLegend.med"
      :legend-min="hoursInDayLegend.min"
    />

    <AppGradient
      v-if="isDayOrNight"
      :colors="dayOrNightScale"
      :labels="['day', 'night']"
      :width="50"
      legend-max="night"
      legend-min="day"
    />

    <AppGradient
      v-if="!isHoursInDay && !isDayOrNight"
      :colors="userColors"
      :labels="labels"
    />
  </div>
</template>

<style lang="scss" module>
.gradients {
  transform: translateY(-2px);
}
</style>
