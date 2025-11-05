<script lang="ts" setup>
import AppButton from 'src/app/app-button.vue';
import AppGradient from 'src/app/app-gradient.vue';
import AppIcon from 'src/app/app-icon.vue';
import {useColorInvert} from 'src/composables/use-color-invert';
import {ColorOption} from 'src/constants';
import {useColorByDayOrNight} from 'src/draggables/colors/use-color-by-day-or-night';
import {useColorByTag} from 'src/draggables/colors/use-color-by-tag';
import {useColorGradients} from 'src/draggables/colors/use-color-gradients';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {useColorState} from 'src/draggables/colors/use-color-state';
import {useTagNumeric} from 'src/draggables/tags/use-tag-numeric';
import {computed} from 'vue';

const {isTag} = useColorState();

const {invert, isReversible} = useColorInvert();
const {isEnabled} = useTagNumeric();

const {option} = useColorSelection();
const {isEnabled: isNumeric} = useTagNumeric();
const {min, max} = useColorByTag();
const {scale: dayOrNightScale} = useColorByDayOrNight();

const {hoursInDayColors, hoursInDayLabels, hoursInDayLegend, userColors} =
  useColorGradients();

const isHoursInDay = computed(
  () => option.value === ColorOption.enum.HoursInDay,
);

const isDayOrNight = computed(
  () => option.value === ColorOption.enum.DayOrNight,
);

const userLabels = computed<string[]>(() => {
  if (!isNumeric.value || min.value === null || max.value === null) {
    return [];
  }

  const size = userColors.value.length;

  const labels: string[] = [];

  for (let i = 0; i < size; i += 1) {
    const value = min.value + (i * (max.value - min.value)) / (size - 1);
    const int = Math.round(value);
    labels.push(int.toString());
  }

  return labels;
});
</script>

<template>
  <h2
    v-if="!isTag || isEnabled"
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
    v-if="!isTag || isEnabled"
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
      :labels="userLabels"
    />
  </div>
</template>

<style lang="scss" module>
.gradients {
  transform: translateY(-2px);
}
</style>
