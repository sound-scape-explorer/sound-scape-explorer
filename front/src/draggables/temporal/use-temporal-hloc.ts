import {useTemporalCandles} from 'src/draggables/temporal/use-temporal-candles';

type Hloc = {
  high: number;
  low: number;
  open: number;
  close: number;
  timestamp: number;
};

// TODO: quartiles and percentiles could be more useful for acoustic data here
export function useTemporalHloc() {
  const {period} = useTemporalCandles();

  const calculate = (values: number[], timestamps: number[]): Hloc[] => {
    let hloc: Hloc[] = [];

    const indices = Array.from({length: timestamps.length}, (_, i) => i);
    indices.sort((a, b) => timestamps[a] - timestamps[b]);

    const sortedTimestamps = indices.map((i) => timestamps[i]);
    const sortedValues = indices.map((i) => values[i]);

    let start = sortedTimestamps[0];
    let bufferTimestamps: number[] = [];
    let bufferValues: number[] = [];

    while (start < sortedTimestamps[sortedTimestamps.length - 1]) {
      const inc = period.value.seconds * 1000;
      const end = start + inc;

      // select indices in range
      for (let i = 0; i < sortedTimestamps.length; i += 1) {
        const t = sortedTimestamps[i];
        if (t >= start && t < end) {
          bufferTimestamps = [...bufferTimestamps, sortedTimestamps[i]];
          bufferValues = [...bufferValues, sortedValues[i]];
        }
      }

      if (bufferTimestamps.length > 0 && bufferValues.length > 0) {
        const h: Hloc = {
          high: Math.max(...bufferValues),
          low: Math.min(...bufferValues),
          open: bufferValues[0],
          close: bufferValues[bufferValues.length - 1],
          timestamp: start,
        };

        hloc = [...hloc, h];
      }

      start += inc;
      bufferTimestamps = [];
      bufferValues = [];
    }

    return hloc;
  };

  return {
    calculate,
  };
}
