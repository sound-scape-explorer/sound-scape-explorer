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
  <div class="container">
    <div
      v-if="!isLoading"
      class="layer"
    >
      <NSlider
        v-for="slider in sliders"
        :key="slider.key"
        v-model:value="current"
        :disabled="!isActive"
        :marks="slider.marks"
        :max="slider.max"
        :min="slider.min"
        :style="{width: 100 / sliders.length + '%'}"
        :tooltip="false"
        class="slider"
      />
    </div>

    <div
      v-if="!isLoading"
      class="layer"
    >
      <div
        v-for="interest in interests"
        class="interest"
      >
        <span
          v-for="interestValue of interest.values"
          :style="{background: interestValue ? 'red' : 'gainsboro'}"
          class="interest__pixel"
        />
      </div>
    </div>

    <div
      v-if="!isLoading"
      class="layer zoom"
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

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.layer {
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100%;
}

.slider {
  z-index: $calendarSliderLayer;
}

.interest {
  display: flex;

  width: 100%;
  height: 13px;
  padding: 0 $p0;

  z-index: $calendarInterestLayer;
  user-select: none;
  transform: translateY(-20px);
}

.interest__pixel {
  width: 1%;
}

.zoom {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  padding: 0 8px;

  transform: translateY(-6px);
  height: 10px;
}
</style>
