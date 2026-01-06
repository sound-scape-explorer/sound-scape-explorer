import {useScatterFilterAcoustic} from 'src/components/scatter/use-scatter-filter-acoustic';
import {useScatterFilterCalendar} from 'src/components/scatter/use-scatter-filter-calendar';
import {useScatterFilterSpatial} from 'src/components/scatter/use-scatter-filter-spatial';
import {useScatterFilterTag} from 'src/components/scatter/use-scatter-filter-tag';
import {useScatterFilterGlobal} from 'src/composables/use-scatter-filter-global';
import {computed} from 'vue';

export function useFilteringInfoData() {
  const {filtered: global} = useScatterFilterGlobal();
  const {filtered: calendar} = useScatterFilterCalendar();
  const {filtered: tags} = useScatterFilterTag();
  const {filtered: acoustic} = useScatterFilterAcoustic();
  const {filtered: spatial} = useScatterFilterSpatial();

  const totalOut = computed(() => global.value.filter((f) => f).length);
  const totalIn = computed(() => global.value.length - totalOut.value);

  const calendarOut = computed(() => calendar.value.filter((f) => f).length);
  const calendarIn = computed(() => calendar.value.length - calendarOut.value);

  const tagsOut = computed(() => tags.value.filter((f) => f).length);
  const tagsIn = computed(() => tags.value.length - tagsOut.value);

  const acousticOut = computed(() => acoustic.value.filter((f) => f).length);
  const acousticIn = computed(() => acoustic.value.length - acousticOut.value);

  const spatialOut = computed(() => spatial.value.filter((f) => f).length);
  const spatialIn = computed(() => spatial.value.length - spatialOut.value);

  const isCalendarActive = computed<boolean>(() => calendarOut.value > 0);
  const isTagsActive = computed<boolean>(() => tagsOut.value > 0);
  const isAcousticActive = computed<boolean>(() => acousticOut.value > 0);
  const isSpatialActive = computed<boolean>(() => spatialOut.value > 0);
  const population = computed(() => calendar.value.length);

  return {
    totalOut,
    totalIn,
    calendarOut,
    calendarIn,
    tagsOut,
    tagsIn,
    acousticOut,
    acousticIn,
    spatialOut,
    spatialIn,
    isCalendarActive,
    isTagsActive,
    isAcousticActive,
    isSpatialActive,
    population,
  };
}
