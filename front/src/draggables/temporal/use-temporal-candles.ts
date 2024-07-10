import {ref} from 'vue';

interface Period {
  name: string;
  seconds: number;
}

const periods: Period[] = [
  {
    name: '15m',
    seconds: 15 * 60,
  },
  {
    name: '1h',
    seconds: 60 * 60,
  },
  {
    name: '4h',
    seconds: 4 * 60 * 60,
  },
  {
    name: '1d',
    seconds: 24 * 60 * 60,
  },
  {
    name: '1w',
    seconds: 7 * 24 * 60 * 60,
  },
  {
    name: '1m',
    seconds: 30 * 7 * 24 * 60 * 60,
  },
];

const period = ref<Period>(periods[0]);

export function useTemporalCandles() {
  const update = (newPeriod: Period) => {
    if (newPeriod.name === period.value.name) {
      return;
    }

    period.value = newPeriod;
  };

  return {
    period: period,
    periods: periods,
    update: update,
  };
}
