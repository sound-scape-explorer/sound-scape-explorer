import {type Margin} from 'plotly.js-dist-min';

export function usePlotlyMargins() {
  const generatePlotlyMargins = (basePadding = 60): Partial<Margin> => {
    return {
      l: basePadding * 0.5,
      r: basePadding * 0.5,
      b: basePadding,
      t: basePadding,
      pad: 4,
    };
  };

  return {
    generatePlotlyMargins,
  };
}
