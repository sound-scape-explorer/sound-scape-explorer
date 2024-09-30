import type {Data, PlotType} from 'plotly.js-dist-min';
import {useScatterColorAlpha} from 'src/components/scatter/use-scatter-color-alpha';
import {useScatterColorScale} from 'src/components/scatter/use-scatter-color-scale';
import {useScreen} from 'src/components/screen/use-screen';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useDate} from 'src/composables/use-date';
import {useScatterGlobalFilter} from 'src/composables/use-scatter-global-filter';
import {useStorageAggregatedIntervalDetails} from 'src/composables/use-storage-aggregated-interval-details';
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
  const {aggregatedIntervalDetails} = useStorageAggregatedIntervalDetails();
  const {convertTimestampToIsoDate} = useDate();
  const {low, high} = useScatterColorAlpha();
  const {scale} = useScatterColorScale();
  const {selected} = useScreen();
  const {isWebGlScatter2d, isSelectedPointHighlighted} = useClientSettings();
  const {filtered} = useScatterGlobalFilter();
  const {currentIntervalIndex} = useIntervalSelector();

  const isThreeDimensional = computed<boolean>(
    () => reducedFeatures.value?.[0].length === 3 ?? false,
  );

  const scatterType = computed<PlotType>(() => {
    if (isThreeDimensional.value) {
      return 'scatter3d';
    }

    if (isWebGlScatter2d.value) {
      return 'scattergl';
    }

    return 'scatter';
  });

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

  const generateTemplate = (length: number) => {
    let template = '';

    for (let i = 0; i < length; i += 1) {
      template += `<br><b>%{text[${i}][0]}: </b>%{text[${i}][1]}`;
    }

    return template;
  };

  const generateCoordinates = () => {
    if (reducedFeatures.value === null) {
      throw new Error('Data unavailable');
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
      throw new Error('Data unavailable');
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
          width: 2,
        },
      },
    } as Data;

    return [trace];
  };

  return {
    traceFeatures: trace,
  };
}
