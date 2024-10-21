import chroma from 'chroma-js';

const primary = 'black';
const background = 'white';

const stroke = '#999';
const strokeLight = '#ccc';
const fill = '#666';
const fillLight = '#DDD';

export function useTimelineColors() {
  const highlight = (color: string) => chroma(color).darken().css();

  return {
    primary: primary,
    background: background,
    stroke: stroke,
    strokeLight: strokeLight,
    fill: fill,
    fillLight: fillLight,
    highlight: highlight,
  };
}
