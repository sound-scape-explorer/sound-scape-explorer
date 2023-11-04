import {type Data} from 'plotly.js-dist-min';

export type HeatmapData = Data & {
  hoverongaps: boolean;
};

interface GenerateDataProps {
  colorscale: string;
  x: string[];
  y: string[];
  z: (number | null)[][];
  zmin: number | undefined;
  zmax: number | undefined;
}

export function useHeatmapData() {
  const generateData = ({
    colorscale,
    x,
    y,
    z,
    zmin,
    zmax,
  }: GenerateDataProps): HeatmapData => {
    const data: HeatmapData = {
      type: 'heatmap',
      colorscale: colorscale,
      reversescale: true,
      x: x,
      y: y,
      z: z,
      hovertemplate: '%{z:.3f}<extra>%{y}/%{x}</extra>',
      hoverongaps: false,
      xgap: 10,
      ygap: 10,
      zmin: zmin,
      zmax: zmax,
    };

    return data;
  };

  return {
    generateData: generateData,
  };
}
