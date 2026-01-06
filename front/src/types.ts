import {type Data} from 'plotly.js-dist-min';

export type PlotlyData = Data & {
  hoverongaps?: boolean;
};

export type NaiveSize = 'tiny' | 'small' | 'medium' | 'large';

export type NaiveTooltipPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end'
  | 'bottom-start'
  | 'bottom-end';

export type PlotlyFill =
  | 'none'
  | 'tozeroy'
  | 'tozerox'
  | 'tonexty'
  | 'tonextx'
  | 'toself'
  | 'tonext'
  | undefined;
