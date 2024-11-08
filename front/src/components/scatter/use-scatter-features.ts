import {type Data, type PlotType} from 'plotly.js-dist-min';
import {ScatterFeaturesError} from 'src/common/Errors';
import {useScatterColorAlpha} from 'src/components/scatter/use-scatter-color-alpha';
import {useScatterColorScale} from 'src/components/scatter/use-scatter-color-scale';
import {useScatterHovers} from 'src/components/scatter/use-scatter-hovers';
import {useScreen} from 'src/components/screen/use-screen';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useScatterGlobalFilter} from 'src/composables/use-scatter-global-filter';
import {useStorageAggregatedLabels} from 'src/composables/use-storage-aggregated-labels';
import {useStorageLabels} from 'src/composables/use-storage-labels';
import {useStorageReducedFeatures} from 'src/composables/use-storage-reduced-features';
import {useIntervalSelector} from 'src/draggables/audio/use-interval-selector';
import {colorMap} from 'src/styles/color-map';
import {computed} from 'vue';

const size2d = 5;
const size3d = 3;

export function useScatterFeatures() {
  const {labelProperties} = useStorageLabels();
  const {reducedFeatures} = useStorageReducedFeatures();
  const {aggregatedLabels} = useStorageAggregatedLabels();
  const {low, high} = useScatterColorAlpha();
  const {scale} = useScatterColorScale();
  const {selected} = useScreen();
  const {isWebGlScatter2d, isSelectedPointHighlighted, scatterBorderWidth} =
    useClientSettings();
  const {filtered} = useScatterGlobalFilter();
  const {currentIntervalIndex} = useIntervalSelector();
  const {generateHovers} = useScatterHovers();

  const isThreeDimensional = computed<boolean>(() => {
    if (reducedFeatures.value === null) {
      return false;
    }

    return reducedFeatures.value[0].length === 3;
  });

  const scatterType = computed<PlotType>(() => {
    if (isThreeDimensional.value) {
      return 'scatter3d';
    }

    if (isWebGlScatter2d.value) {
      return 'scattergl';
    }

    return 'scatter';
  });

  const generateCoordinates = () => {
    if (reducedFeatures.value === null) {
      throw new ScatterFeaturesError('data not available');
    }

    const features = reducedFeatures.value;
    const l = features.length;

    const xs: number[] = new Array(l);
    const ys: number[] = new Array(l);
    const zs: number[] | null = isThreeDimensional.value ? new Array(l) : null;

    for (let i = 0; i < l; i += 1) {
      xs[i] = features[i][0];
      ys[i] = features[i][1];

      if (zs !== null) {
        zs[i] = features[i][2];
      }
    }

    return {
      xs: xs,
      ys: ys,
      zs: zs,
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
    if (
      currentIntervalIndex.value !== null &&
      isSelectedPointHighlighted.value
    ) {
      borders[currentIntervalIndex.value] = colorMap.selectedBorder;
    }

    return {
      borders: borders,
    };
  };

  const generateColors = () => {
    if (scale.value === null) {
      throw new ScatterFeaturesError('color scale missing');
    }

    const scalePointer = scale.value;
    const selectedPointer = selected.value;
    const colors: [number, string][] = new Array(scale.value.length);

    for (let i = 0; i < scale.value.length; i += 1) {
      colors[i] = [] as unknown as [number, string];

      const rangedIndex = i / (scalePointer.length - 1);
      colors[i][0] = rangedIndex;

      const isSelected = selectedPointer.indexOf(i) !== -1;
      if (isSelected) {
        colors[i][1] = colorMap.selected(high.value);
        continue;
      }

      const isExcluded = filtered.value[i] === true;
      if (isExcluded) {
        colors[i][1] = colorMap.transparent(low.value);
        continue;
      }

      colors[i][1] = scalePointer[i];
    }

    return {
      colors: colors,
    };
  };

  const trace = (): Data[] => {
    if (
      labelProperties.value === null ||
      reducedFeatures.value === null ||
      aggregatedLabels.value === null ||
      scale.value === null ||
      filtered.value === null
    ) {
      return [];
    }

    const {colors} = generateColors();
    const {xs, ys, zs} = generateCoordinates();
    const {hovers, template} = generateHovers(xs.length);
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
        size: isThreeDimensional.value ? size3d : size2d,
        symbol: 'circle',
        opacity: high.value,
        color: indices,
        colorscale: colors,
        colors: colors,
        line: {
          color: borders,
          width: Number(scatterBorderWidth.value),
        },
      },
    } as Data;

    return [trace];
  };

  return {
    traceFeatures: trace,
  };
}
