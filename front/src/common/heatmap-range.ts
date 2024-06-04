export interface HeatmapRange {
  min: number | undefined;
  max: number | undefined;
}

export const heatmapRanges: {[key: string]: HeatmapRange} = {
  auto: {
    min: undefined,
    max: undefined,
  },
  min1to1: {
    min: -1,
    max: 1,
  },
  min0to1: {
    min: 0,
    max: 1,
  },
  min0to100: {
    min: 0,
    max: 100,
  },
};
