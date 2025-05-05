import {useScatterCamera} from 'src/components/scatter/use-scatter-camera';

export function useAudioLock() {
  const {lock: scatterLock, unlock: scatterUnlock} = useScatterCamera();

  const attachListener = () => {
    document.addEventListener('mouseup', unlock);
  };

  const removeListener = () => {
    document.removeEventListener('mouseup', unlock);
  };

  const lock = () => {
    scatterLock();
    attachListener();
  };

  const unlock = () => {
    scatterUnlock();
    removeListener();
  };

  return {
    lock,
    unlock,
  };
}
