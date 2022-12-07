function floorMod(value: number, modulus: number): number {
  return value - modulus * Math.floor(value / modulus);
}

// TODO: Rewrite with dayjs
export function fastTimeInDay(timeZone: string) {
  const cache = new Map();
  const bin = 24 * 3600; // one day

  return (t) => {
    const k = Math.floor(t / bin);
    if (cache.has(k)) {
      const [t0, tInDay0] = cache.get(k);
      const delta = (t - t0) / 3600;
      return floorMod(tInDay0 + delta, 24);
    } else {
      const d = new Date(new Date(1000 * t)
        .toLocaleString('en-US', {timeZone}));

      const tInDay = d.getHours() + d.getMinutes() / 60 + d.getSeconds() / 3600;
      cache.set(k, [t, tInDay]);

      return tInDay;
    }
  };
}
