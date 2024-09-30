import {useDate} from 'src/composables/use-date';
import {useStorageAggregatedIntervalDetails} from 'src/composables/use-storage-aggregated-interval-details';
import {useStorageAggregatedLabels} from 'src/composables/use-storage-aggregated-labels';
import {useStorageLabels} from 'src/composables/use-storage-labels';

export function useScatterHovers() {
  const {aggregatedIntervalDetails} = useStorageAggregatedIntervalDetails();
  const {convertTimestampToIsoDate} = useDate();
  const {labelProperties} = useStorageLabels();
  const {aggregatedLabels} = useStorageAggregatedLabels();

  const generateTemplate = (length: number) => {
    let template = '';

    for (let i = 0; i < length; i += 1) {
      template += `<br><b>%{text[${i}][0]}: </b>%{text[${i}][1]}`;
    }

    return template;
  };

  const generateHovers = (length: number) => {
    if (
      aggregatedIntervalDetails.value === null ||
      labelProperties.value === null ||
      aggregatedLabels.value === null
    ) {
      throw new Error('Data unavailable');
    }

    const intervalDetailsPointer = aggregatedIntervalDetails.value;
    const labelPropertiesPointer = labelProperties.value;
    const labelValuesPointer = aggregatedLabels.value;

    const hovers = new Array(length);
    let textLengthMax = -1;

    for (let i = 0; i < length; i += 1) {
      const offset = 1;
      const intervalDetails = intervalDetailsPointer[i];
      const labelValues = labelValuesPointer[i];

      const textLength =
        offset + intervalDetails.length + labelPropertiesPointer.length;
      if (textLength > textLengthMax) {
        textLengthMax = textLength;
      }

      const texts: string[][] = new Array(textLength);

      // interval index
      texts[0] = ['Interval', i.toString()];

      // dates
      for (let iD = 0; iD < intervalDetails.length; iD += 1) {
        const iDO = iD + offset;
        const block = intervalDetails[iD];
        texts[iDO] = ['Date', convertTimestampToIsoDate(block.start)];
      }

      // user labels
      for (let p = 0; p < labelPropertiesPointer.length; p += 1) {
        const pO = p + offset + intervalDetails.length;
        const property = labelPropertiesPointer[p];
        const label = labelValues[p];
        texts[pO] = [property, label];
      }

      hovers[i] = texts;
    }

    const template = generateTemplate(textLengthMax);

    return {
      hovers: hovers,
      template: template,
    };
  };

  return {
    generateHovers: generateHovers,
  };
}
