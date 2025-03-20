import chroma from 'chroma-js';

export function convertRgbToString([r, g, b]: [
  number,
  number,
  number,
]): string {
  return `rgb(${r},${g},${b})`;
}

export function createHourlyLabels(size: number): string[] {
  const dates = [];
  const totalDuration = 24 * 60 * 60 * 1000; // The number of milliseconds during a day
  const interval = totalDuration / size;

  const referenceDate = new Date('1970-01-01T00:00:00');

  for (let i = 0; i < size; i++) {
    const currentDate = new Date(referenceDate.getTime() + i * interval);
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const date = `${hours}:${minutes}`;
    dates.push(date);
  }

  return dates;
}

export function isEnoughContrast(color1: string, color2: string): boolean {
  return chroma.contrast(color1, color2) > 4.5;
}
