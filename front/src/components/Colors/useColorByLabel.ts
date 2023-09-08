import {useLimitedColorScale} from './useLimitedColorScale';

export function useColorByLabel() {
  const {createLimitedColorScale} = useLimitedColorScale();

  const getColorByLabel = (
    intervalIndex: number,
    propertyAsColorType: string, // label property
    propertiesAsColorTypes: string[], // label properties
    aggregatedLabels: string[][],
    labelsSets: string[][],
  ): string => {
    const propertyIndex = propertiesAsColorTypes.indexOf(propertyAsColorType);

    const values = aggregatedLabels[intervalIndex];
    const value = values[propertyIndex];
    const possibleValues = labelsSets[propertyIndex];

    const colors = createLimitedColorScale(possibleValues.length);
    const index = possibleValues.indexOf(value);

    const [r, g, b] = colors[index];

    return `rgb(${r},${g},${b})`;
  };

  const getColorByLabelIndex = (index: number, length: number): string => {
    const colors = createLimitedColorScale(length);
    const [r, g, b] = colors[index];

    return `rgb(${r},${g},${b})`;
  };

  return {
    getColorByLabel: getColorByLabel,
    getColorByLabelIndex: getColorByLabelIndex,
  };
}
