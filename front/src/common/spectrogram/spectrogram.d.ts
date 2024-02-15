declare module 'src/common/spectrogram' {
  // stock is wavesurfer.js@6.6.3

  import StockSpectrogramPlugin, {
    type RGBA as StockRGBA,
    type SpectrogramPluginParams as StockSpectrogramPluginParams,
  } from 'wavesurfer.js/src/plugin/spectrogram';
  import {type PluginDefinition} from 'wavesurfer.js/types/plugin';

  export type RGBA = StockRGBA;

  export interface SpectrogramPluginParams
    extends StockSpectrogramPluginParams {
    decibels: boolean;
  }

  export default class StockSpectrogram extends StockSpectrogramPlugin {
    static create(params: SpectrogramPluginParams): PluginDefinition;
  }
}
