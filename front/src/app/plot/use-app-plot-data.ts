import chroma from 'chroma-js';
import {type Data} from 'plotly.js-dist-min';
import {type AppPlotProps} from 'src/app/plot/app-plot.vue';
import {LOWER_DECILE_SUFFIX, UPPER_DECILE_SUFFIX} from 'src/constants';
import {type PlotlyFill} from 'src/types';

export function useAppPlotData(props: AppPlotProps) {
  const generateData = (): Data[] => {
    const l = props.values.length;
    const data: Data[] = new Array(l);

    for (let i = 0; i < l; i += 1) {
      const name = props.names?.[i] || '';
      const isLowerDecile = name.endsWith(LOWER_DECILE_SUFFIX);
      const isUpperDecile = name.endsWith(UPPER_DECILE_SUFFIX);

      let fill: PlotlyFill = undefined;
      let color: string = props.colors[i];
      let hoverinfo: 'all' | 'none' = 'all';
      let hovertemplate: string | undefined = undefined;
      let showlegend = true;

      if (props.hoverTemplate === 'default') {
        hovertemplate = '%{y:.3f}<extra>%{x}</extra>';
      } else if (props.hoverTemplate === 'relative-trajectories') {
        hovertemplate = `%{y:.3f}<extra>${name}<br>at %{x:.3f}</extra>`;
      }

      if (isLowerDecile) {
        color = 'transparent';
        hovertemplate = undefined;
        hoverinfo = 'none';
        showlegend = false;
      } else if (isUpperDecile) {
        color = 'transparent';
        fill = 'tonexty';
        hovertemplate = undefined;
        hoverinfo = 'none';
        showlegend = false;
      }

      data[i] = {
        type: 'scatter',
        mode: 'lines',
        name: name,
        x: props.labels[i],
        y: props.values[i],
        hovertemplate: hovertemplate,
        hoverinfo: hoverinfo,
        fill: fill,
        showlegend: showlegend,
        fillcolor: `rgba(${chroma(props.colors[i])
          .brighten()
          .alpha(0.33)
          .rgba()
          .join(',')})`,
        marker: {
          color: color,
          size: 6,
        },
      };
    }

    return data;
  };

  return {
    generateData: generateData,
  };
}
