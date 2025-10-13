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
  labels: [string, string | null];
}

export function useAppHeatmapData() {
  const buildData = ({
    colorscale,
    x,
    y,
    z,
    zmin,
    zmax,
    labels,
  }: GenerateDataProps): HeatmapData => {
    const labelA = labels[0];
    const labelB = labels[1] === null ? labels[0] : labels[1];

    const data: HeatmapData = {
      type: 'heatmap',
      colorscale,
      reversescale: true,
      x,
      y,
      z,
      hovertemplate: `%{z:.3f}<extra>${labelB}: %{y}<br />${labelA}: %{x}</extra>`,
      hoverongaps: false,
      xgap: 1,
      ygap: 1,
      zmin,
      zmax,
    };

    return data;
  };

  return {
    buildData,
  };
}
