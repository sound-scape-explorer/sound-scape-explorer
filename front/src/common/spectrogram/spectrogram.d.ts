// stock is wavesurfer.js@6.6.3
declare module 'src/common/spectrogram' {
  import StockSpectrogramPlugin, {
    type RGBA as StockRGBA,
  } from 'wavesurfer.js/src/plugin/spectrogram';

  export default StockSpectrogramPlugin;

  export type RGBA = StockRGBA;
}
