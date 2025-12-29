import {type Data, type PlotType} from 'plotly.js-dist-min';
import {ScatterFeaturesError} from 'src/common/Errors';
import {useScatterColorScale} from 'src/components/scatter/use-scatter-color-scale';
import {useScatterDimensions} from 'src/components/scatter/use-scatter-dimensions';
import {useScatterHovers} from 'src/components/scatter/use-scatter-hovers';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useIntervalTransport} from 'src/composables/use-interval-transport';
import {useReductions} from 'src/composables/use-reductions';
import {useScatterFilterGlobal} from 'src/composables/use-scatter-filter-global';
import {colorMap} from 'src/styles/color-map';
import {computed} from 'vue';

const size2d = 5;
const size3d = 3;

export function useScatterEmbeddings() {
  const {reductions} = useReductions();
  const {colorsAlphaLow: low, colorsAlphaHigh: high} = useClientSettings();
  const {scale} = useScatterColorScale();
  const {isWebGlScatter2d, isSelectedPointHighlighted, scatterBorderWidth} =
    useClientSettings();
  const {filtered} = useScatterFilterGlobal();
  const {currentIndex} = useIntervalTransport();
  const {generateHovers} = useScatterHovers();
  const {is3d} = useScatterDimensions();

  const scatterType = computed<PlotType>(() => {
    if (is3d.value) {
      return 'scatter3d';
    }

    if (isWebGlScatter2d.value) {
      return 'scattergl';
    }

    return 'scatter';
  });

  const generateCoordinates = () => {
    if (reductions.value === null) {
      throw new ScatterFeaturesError('data not available');
    }

    const features = reductions.value;
    const l = features.length;

    const xs: number[] = new Array(l);
    const ys: number[] = new Array(l);
    const zs: number[] | null = is3d.value ? new Array(l) : null;

    for (let i = 0; i < l; i += 1) {
      xs[i] = features[i][0];
      ys[i] = features[i][1];

      if (zs !== null) {
        zs[i] = features[i][2];
      }
    }

    return {
      xs,
      ys,
      zs,
    };
  };

  const generateBorders = (length: number) => {
    const borders: string[] = new Array(length);

    // fill
    for (let i = 0; i < length; i += 1) {
      const isExcluded = filtered.value[i] === true;
      borders[i] = colorMap.border(isExcluded ? low.value : undefined);
    }

    // is selected and enabled
    if (currentIndex.value !== null && isSelectedPointHighlighted.value) {
      borders[currentIndex.value] = colorMap.selectedBorder;
    }

    return {
      borders,
    };
  };

  const generateColors = () => {
    if (scale.value === null) {
      throw new ScatterFeaturesError('color scale missing');
    }

    const scalePointer = scale.value;
    const colors: [number, string][] = new Array(scale.value.length);

    for (let i = 0; i < scale.value.length; i += 1) {
      colors[i] = [] as unknown as [number, string];

      const rangedIndex = i / (scalePointer.length - 1);
      colors[i][0] = rangedIndex;

      const isExcluded = filtered.value[i] === true;
      if (isExcluded) {
        colors[i][1] = colorMap.transparent(low.value);
        continue;
      }

      colors[i][1] = scalePointer[i];
    }

    return {
      colors,
    };
  };

  const render = (): Data[] => {
    if (
      reductions.value === null ||
      scale.value === null ||
      filtered.value === null
    ) {
      return [];
    }

    const {colors} = generateColors();
    const {xs, ys, zs} = generateCoordinates();
    const {hovers, template} = generateHovers();
    const {borders} = generateBorders(xs.length);

    const indices = Array.from({length: xs.length}, (_, i) => i);

    const trace: Data = {
      x: xs,
      y: ys,
      z: zs,
      name: '',
      type: scatterType.value,
      mode: 'markers',
      text: hovers,
      hovertemplate: template,
      marker: {
        size: is3d.value ? size3d : size2d,
        symbol: 'circle',
        opacity: high.value,
        color: indices,
        colorscale: colors,
        colors,
        line: {
          color: borders,
          width: Number(scatterBorderWidth.value),
        },
      },
    } as Data;

    return [trace];
  };

  return {
    render,
  };
}
