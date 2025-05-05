import {useIntervals} from 'src/composables/use-intervals';
import {SITE_AS_LABEL} from 'src/constants';
import {ref} from 'vue';

export interface LabelSets {
  [property: string]: string[];
}

const sets = ref<LabelSets>({});
const actual = ref<LabelSets>({}); // without site and autocluster labels

export function useLabelSets() {
  const {intervals} = useIntervals();

  const generate = () => {
    if (intervals.value === null) {
      throw new Error('intervals are missing');
    }

    const newSets: LabelSets = {};

    for (const interval of intervals.value) {
      for (const [property, values] of Object.entries(interval.labels)) {
        if (newSets[property] === undefined) {
          newSets[property] = [];
        }

        for (const value of values) {
          if (newSets[property].includes(value)) {
            continue;
          }

          newSets[property].push(value);
        }
      }
    }

    sets.value = newSets;
    actual.value = Object.fromEntries(
      Object.entries(newSets).filter(([key]) => !key.startsWith(SITE_AS_LABEL)),
    );
  };

  return {
    generate,
    sets,
    actual,
  };
}
