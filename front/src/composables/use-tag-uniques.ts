import {useIntervals} from 'src/composables/use-intervals';
import {SITE_AS_TAG_NAME, STRING_DELIMITER} from 'src/constants';
import {sortStringsNumerically} from 'src/utils/strings';
import {ref} from 'vue';

export interface AllTagUniques {
  [tagName: string]: string[];
}

const allUniques = ref<AllTagUniques>({}); // file sites + autoclustering labels + file tags
const coreUniques = ref<AllTagUniques>({}); // above minus file sites

export function useTagUniques() {
  const {intervals} = useIntervals();

  const generate = () => {
    if (intervals.value === null) {
      throw new Error('intervals are missing');
    }

    const newUniques: AllTagUniques = {};

    for (const interval of intervals.value) {
      for (const [tagName, values] of Object.entries(interval.tags)) {
        // init
        if (newUniques[tagName] === undefined) {
          newUniques[tagName] = [];
        }

        const unique = values.join(STRING_DELIMITER);

        // fill
        if (newUniques[tagName].includes(unique)) {
          continue;
        }

        newUniques[tagName].push(unique);
        newUniques[tagName] = sortStringsNumerically(newUniques[tagName]);
      }
    }

    allUniques.value = newUniques;
    coreUniques.value = Object.fromEntries(
      Object.entries(newUniques).filter(
        ([tagName]) => !tagName.startsWith(SITE_AS_TAG_NAME),
      ),
    );
  };

  return {
    generate,
    allUniques,
    coreUniques,
  };
}
