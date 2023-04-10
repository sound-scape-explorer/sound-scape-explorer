import {useColors} from '../Colors/useColors';
import {scatterAlphasStore} from './scatterStore';
import {useScatterDataset} from './useScatterDataset';

export function useScatterMeta() {
  const {colors} = useColors();
  const {getMetaContent} = useScatterDataset();

  function createLimitedColorScale(length: number): [number, number, number][] {
    return colors.value.colors(length, 'rgb');
  }

  function getMetaColor(
    colorType: string,
    index: number,
    metaPropertiesAsColorTypes: string[],
    metaSets: string[][],
  ) {
    const metaPropertyIndex = metaPropertiesAsColorTypes.indexOf(colorType);
    const metaValues = getMetaContent(index);
    const metaValue = metaValues[metaPropertyIndex];
    const metaPossibleValues = metaSets[metaPropertyIndex];

    const colors = createLimitedColorScale(metaPossibleValues.length);
    const metaIndex = metaPossibleValues.indexOf(metaValue);

    const [r, g, b] = colors[metaIndex];

    return `rgba(${r},${g},${b},${scatterAlphasStore.high})`;
  }

  function getMetaColorFromMetaIndex(index: number, length: number): string {
    const colors = createLimitedColorScale(length);
    const [r, g, b] = colors[index];
    const a = 0.8;

    return `rgba(${r},${g},${b},${a})`;
  }

  return {
    getMetaColor: getMetaColor,
    getMetaColorFromMetaIndex: getMetaColorFromMetaIndex,
  };
}
