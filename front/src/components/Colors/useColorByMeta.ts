import {useLimitedColorScale} from './useLimitedColorScale';

export function useColorByMeta() {
  const {createLimitedColorScale} = useLimitedColorScale();

  // TODO: Rename
  const getColorByMeta = (
    pointIndex: number,
    metaPropertyAsColorType: string,
    metaPropertiesAsColorTypes: string[],
    groupedMetas: string[][],
    metaSets: string[][],
  ): string => {
    const metaPropertyIndex = metaPropertiesAsColorTypes.indexOf(
      metaPropertyAsColorType,
    );

    const metaValues = groupedMetas[pointIndex];
    const metaValue = metaValues[metaPropertyIndex];
    const metaPossibleValues = metaSets[metaPropertyIndex];

    const colors = createLimitedColorScale(metaPossibleValues.length);
    const metaIndex = metaPossibleValues.indexOf(metaValue);

    const [r, g, b] = colors[metaIndex];

    return `rgb(${r},${g},${b})`;
  };

  const getColorByMetaIndex = (index: number, length: number): string => {
    const colors = createLimitedColorScale(length);
    const [r, g, b] = colors[index];

    return `rgb(${r},${g},${b})`;
  };

  return {
    getColorByMeta: getColorByMeta,
    getColorByMetaIndex: getColorByMetaIndex,
  };
}
