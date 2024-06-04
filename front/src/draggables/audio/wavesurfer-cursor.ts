import {useWavesurfer} from 'src/draggables/audio/wavesurfer';
import {watch} from 'vue';
import CursorPlugin from 'wavesurfer.js/src/plugin/cursor';

export function useWavesurferCursor() {
  const {ws} = useWavesurfer();

  const register = () => {
    if (ws.value === null) {
      return;
    }

    const cursor = CursorPlugin.create({
      showTime: true,
      opacity: 'solid',
      customShowTimeStyle: {
        'background-color': '#000',
        'color': '#fff',
        'padding': '2px',
        'font-size': '10px',
      },
    });

    ws.value.registerPlugins([cursor]);
  };

  watch(ws, register);
}
