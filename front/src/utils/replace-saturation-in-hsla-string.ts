import {SCATTER_PLOT_DEFAULT_COLOR} from '../constants';

export function replaceSaturationInHslaString(sampleHslaString: string | undefined, newSaturation: number) {
  if (typeof sampleHslaString === 'undefined') {
    return SCATTER_PLOT_DEFAULT_COLOR;
  }

  const hslaStringParts = sampleHslaString.split(',');
  return `${hslaStringParts[0]}, ${newSaturation}%, ${hslaStringParts[2]}, ${hslaStringParts[3]}`;
}
