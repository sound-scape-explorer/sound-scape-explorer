import {ScatterHoversError} from 'src/common/Errors';
import {useIntervals} from 'src/composables/use-intervals';
import {STRING_DELIMITER} from 'src/constants';

export function useScatterHovers() {
  const {intervals} = useIntervals();

  const generateTemplate = (length: number) => {
    let template = '';

    for (let i = 0; i < length; i += 1) {
      template += `<br><b>%{text[${i}][0]}: </b>%{text[${i}][1]}`;
    }

    return template;
  };

  // TODO: refactor me this is broken when user puts no labels
  const generateHovers = () => {
    if (intervals.value === null) {
      throw new ScatterHoversError('data unavailable');
    }

    const hovers = new Array(intervals.value.length);
    let textLengthMax = -1;

    for (let i = 0; i < intervals.value.length; i += 1) {
      const offset = 1;
      const interval = intervals.value[i];

      const textLength = offset + Object.keys(interval.tags).length;

      if (textLength > textLengthMax) {
        textLengthMax = textLength;
      }

      const texts: string[][] = new Array(textLength);

      // interval index
      texts[0] = ['Interval', i.toString()];

      // dates
      // for (let iD = 0; iD < intervalDetails.length; iD += 1) {
      //   const iDO = iD + offset;
      //   const block = intervalDetails[iD];
      //   texts[iDO] = ['Date', convertTimestampToIsoDate(block.start)];
      // }

      // user labels
      for (let p = 0; p < Object.keys(interval.tags).length; p += 1) {
        const pO = p + offset;
        const property = Object.keys(interval.tags)[p];
        const label = Object.values(interval.tags)[p];
        texts[pO] = [property, label.join(STRING_DELIMITER)];
      }

      hovers[i] = texts;
    }

    const template = generateTemplate(textLengthMax);

    return {
      hovers,
      template,
    };
  };

  return {
    generateHovers,
  };
}
