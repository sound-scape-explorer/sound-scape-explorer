export const hz2mel = (hz) => 2595 * Math.log10(1 + hz / 700);
export const mel2hz = (m) => 700 * (Math.pow(10, m / 2595) - 1);

export const getBandBoundsFromSpec = function (b, sr, toHz) {
  const spectroFreq = sr / 2;
  const melMax = hz2mel(spectroFreq);
  const melStart = (b[1] / b[0]) * melMax;
  const melEnd = ((b[1] + 64) / b[0]) * melMax;
  if (toHz) {
    return [mel2hz(melStart), mel2hz(melEnd)];
  } else {
    return [melStart, melEnd];
  }
};

//export { getBandBoundsFromSpec, mel2hz, hz2mel };

export function dateFormatInTz(d: Date, timeZone: string) {
  return new Intl.DateTimeFormat("fr", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone,
  }).format(d);
}

export function floorMod(v, m) {
  return v - m * Math.floor(v/m);
}

export function argsort(a, cmp) {
  return a.map((v,i)=>[v,i]).sort((a,b) => cmp(a[0], b[0])).map(vi => vi[1]);
}
