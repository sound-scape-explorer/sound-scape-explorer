import {type Margin} from 'plotly.js-dist-min';

const basePadding = 100;

export function usePlotlyMargins() {
  const generatePlotlyMargins = (): Partial<Margin> => {
    return {
      l: basePadding * 0.5,
      r: basePadding * 0.5,
      b: basePadding * 2,
      t: basePadding,
      pad: 4,
    };
  };

  return {
    generatePlotlyMargins: generatePlotlyMargins,
  };
}
