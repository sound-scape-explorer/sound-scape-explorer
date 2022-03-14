const hz2mel = (hz) => 2595 * Math.log10(1 + hz / 700);
const mel2hz = (m) => 700 * (Math.pow(10, m / 2595) - 1);

const getBandBoundsFromSpec = function (b, sr, toHz) {
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

export { getBandBoundsFromSpec, mel2hz, hz2mel };
