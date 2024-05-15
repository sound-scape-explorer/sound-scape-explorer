import {useScatterCamera} from 'src/components/scatter/scatter-camera';

export function useAudioLock() {
  const {lock: scatterLock, unlock: scatterUnlock} = useScatterCamera();

  const watch = () => {
    document.addEventListener('mouseup', unlock);
  };

  const purge = () => {
    document.removeEventListener('mouseup', unlock);
  };

  const lock = () => {
    scatterLock();
    watch();
  };

  const unlock = () => {
    scatterUnlock();
    purge();
  };

  return {
    lock: lock,
    unlock: unlock,
  };
}
