
import { piecewise } from 'd3-interpolate'

export let paletteH = [0, 29, 49, 81, 158, 184, 202, 222, 274, 320, 18, 39, 61, 132, 173, 193, 212, 236, 294, 337];
export let paletteS = 75;
export let paletteL = 50;

export let h2HSLString = h => `${h}, ${paletteS}%, ${paletteL}%`;
export let paletteHSLString = paletteH.map(h2HSLString);

export let continuousPalette = piecewise(paletteH);
let range1 = n => [...Array(n).keys()];
export let paletteH1000 = range1(1000).map(n => continuousPalette(n/1000));
export let palette1000HSLString = paletteH1000.map(h2HSLString);
