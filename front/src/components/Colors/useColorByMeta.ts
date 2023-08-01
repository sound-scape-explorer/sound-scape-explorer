import {alphaHighRef} from '.././Scatter/useScatterColorScale';
import {useLimitedColorScale} from './useLimitedColorScale';

export function useColorByMeta() {
  const {createLimitedColorScale} = useLimitedColorScale();

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

    return `rgba(${r},${g},${b},${alphaHighRef.value})`;
  };

  const getColorByMetaIndex = (index: number, length: number): string => {
    const colors = createLimitedColorScale(length);
    const [r, g, b] = colors[index];
    const a = 0.8;

    return `rgba(${r},${g},${b},${a})`;
  };

  return {
    getColorByMeta: getColorByMeta,
    getColorByMetaIndex: getColorByMetaIndex,
  };
}
