import {useStorageAggregatedTimestamps} from 'src/composables/use-storage-aggregated-timestamps';
import {useCalendarSliders} from 'src/draggables/calendar/use-calendar-sliders';
import {useDraggableCalendar} from 'src/draggables/calendar/use-draggable-calendar';
import {mapRange} from 'src/utils/map-range';
import {computed} from 'vue';

interface Interest {
  key: number;
  values: boolean[];
}

export function useCalendarInterests() {
  const {aggregatedTimestamps} = useStorageAggregatedTimestamps();
  const {duration} = useDraggableCalendar();
  const {sliders} = useCalendarSliders();

  const interests = computed<Interest[]>(() => {
    if (aggregatedTimestamps.value === null) {
      return [];
    }

    const allTimestamps = aggregatedTimestamps.value.map((t) => t / 1000);

    const interests: Interest[] = [];
    const ignoreDecimalsFactor = 1 / duration.value;
    const ignoreDecimals = (value: number) =>
      Math.floor(ignoreDecimalsFactor * value);

    for (const slider of sliders.value) {
      const {min, max, key} = slider;
      const timestamps = allTimestamps.filter(
        (timestamp) => timestamp >= min && timestamp <= max,
      );

      const values = [];

      for (let i = 0; i < 100; i += 1) {
        const index = mapRange(i, 0, 100, min, max);

        const trimmedTimestamps = timestamps.map((t) => ignoreDecimals(t));
        const isInterest = trimmedTimestamps.includes(ignoreDecimals(index));

        values.push(isInterest);
      }

      const interest: Interest = {
        key: key,
        values: values,
      };

      interests.push(interest);
    }

    return interests;
  });

  return {
    interests: interests,
  };
}
