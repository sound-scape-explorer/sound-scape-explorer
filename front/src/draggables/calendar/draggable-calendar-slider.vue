<script lang="ts" setup="">
import {SearchOutline} from '@vicons/ionicons5';
import {NSlider} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import {useScatterFilterTime} from 'src/components/scatter/use-scatter-filter-time';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useCalendarInterests} from 'src/draggables/calendar/use-calendar-interests';
import {useCalendarSliders} from 'src/draggables/calendar/use-calendar-sliders';
import {useDraggableCalendar} from 'src/draggables/calendar/use-draggable-calendar';
import {watch} from 'vue';

const {isLoading} = useScatterLoading();
const {isActive, duration, current} = useDraggableCalendar();
const {filterByTime} = useScatterFilterTime();
const {sliders, toggleZoom} = useCalendarSliders();
const {interests} = useCalendarInterests();

watch([isActive, duration, current], filterByTime);
</script>

<template>
  <div :class="$style.container">
    <div
      v-if="!isLoading"
      :class="$style.layer"
    >
      <NSlider
        v-for="slider in sliders"
        :key="slider.key"
        v-model:value="current"
        :class="$style.slider"
        :disabled="!isActive"
        :marks="slider.marks"
        :max="slider.max"
        :min="slider.min"
        :style="{width: 100 / sliders.length + '%'}"
        :tooltip="false"
      />
    </div>

    <div
      v-if="!isLoading"
      :class="$style.layer"
    >
      <div
        v-for="interest in interests"
        :class="$style.interest"
      >
        <span
          v-for="interestValue of interest.values"
          :class="$style['interest-pixel']"
          :style="{background: interestValue ? 'red' : 'gainsboro'}"
        />
      </div>
    </div>

    <div
      v-if="!isLoading"
      :class="[$style.layer, $style.zoom]"
    >
      <AppButton
        v-for="slider in sliders"
        :handle-click="() => toggleZoom(slider)"
        grow
        icon
      >
        <SearchOutline />
      </AppButton>
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.layer {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
}

.slider {
  z-index: $calendar-slider-layer;
}

.interest {
  z-index: $calendar-interest-layer;
  display: flex;
  width: 100%;
  height: 13px;
  padding: 0 $p0;
  user-select: none;
  transform: translateY(-20px);
}

.interest-pixel {
  width: 1%;
}

.zoom {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10px;
  padding: 0 8px;
  transform: translateY(-6px);
  gap: 1rem;
}
</style>
