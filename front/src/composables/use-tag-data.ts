import {useIntervals} from 'src/composables/use-intervals';
import {useTagUniques} from 'src/composables/use-tag-uniques';
import {STRING_DELIMITER} from 'src/constants';

export function useTagData() {
  const {intervals} = useIntervals();
  const {allUniques} = useTagUniques();

  const getTagPrimitive = (intervalIndex: number, tagName: string) => {
    const interval = intervals.value[intervalIndex];
    const tagValue = interval.tags[tagName].join(STRING_DELIMITER);
    const tagUniques = allUniques.value[tagName];

    return {
      tagUniques,
      tagValue,
    };
  };

  return {
    getTagPrimitive,
  };
}
