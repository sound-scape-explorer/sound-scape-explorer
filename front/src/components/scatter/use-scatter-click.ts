import type {PlotMouseEvent} from 'plotly.js-dist-min';
import {useAudioSelector} from 'src/draggables/audio/use-audio-selector';

export function useScatterClick() {
  const {selectAudio} = useAudioSelector();

  const handleClick = (e: PlotMouseEvent) => {
    const intervalIndex = e.points[0].pointNumber;
    selectAudio(intervalIndex);
  };

  return {
    handleClick: handleClick,
  };
}
