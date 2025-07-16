import {formatDateToString} from '@shared/dates';
import {ScatterHoversError} from 'src/common/Errors';
import {usePlotlyHoverTemplate} from 'src/components/scatter/use-plotly-hover-template';
import {useIntervalDates} from 'src/composables/use-interval-dates';
import {useIntervals} from 'src/composables/use-intervals';
import {STRING_DELIMITER} from 'src/constants';

export function useScatterHovers() {
  const {intervals} = useIntervals();
  const {generate: generateTemplate} = usePlotlyHoverTemplate();
  const {getDates} = useIntervalDates();

  const generateHovers = () => {
    if (intervals.value === null) {
      throw new ScatterHoversError('data unavailable');
    }

    const hovers: string[][][] = new Array(intervals.value.length);
    let hoverLength = -1;

    for (let i = 0; i < intervals.value.length; i += 1) {
      const interval = intervals.value[i];
      const hover: string[][] = [];

      // interval index
      hover.push(['Interval', i.toString()]);

      // dates
      const {start, end} = getDates(interval);
      hover.push(['Start', formatDateToString(start)]);
      hover.push(['End', formatDateToString(end)]);

      // tags
      for (const [tagName, tagValues] of Object.entries(interval.tags)) {
        const tagValue = tagValues.join(STRING_DELIMITER);
        hover.push([tagName, tagValue]);
      }

      hovers[i] = hover;

      if (hover.length > hoverLength) {
        hoverLength = hover.length;
      }
    }

    const template = generateTemplate(hoverLength);

    return {
      hovers,
      template,
    };
  };

  return {
    generateHovers,
  };
}
