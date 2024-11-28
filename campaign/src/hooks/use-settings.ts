import {useAtom} from 'jotai';
import {settingsAtoms} from 'src/atoms.ts';

export function useSettings() {
  const [storagePath, setStoragePath] = useAtom(settingsAtoms.storagePath);
  const [audioPath, setAudioPath] = useAtom(settingsAtoms.audioPath);
  const [sampleRate, setSampleRate] = useAtom(settingsAtoms.sampleRate);
  const [origin, setOrigin] = useAtom(settingsAtoms.origin);
  const [audioHost, setAudioHost] = useAtom(settingsAtoms.audioHost);
  const [timezone, setTimezone] = useAtom(settingsAtoms.timezone);
  const [computationDimensions, setComputationDimensions] = useAtom(
    settingsAtoms.computationDimensions,
  );
  const [computationIterations, setComputationIterations] = useAtom(
    settingsAtoms.computationIterations,
  );
  const [displaySeed, setDisplaySeed] = useAtom(settingsAtoms.displaySeed);

  return {
    storagePath,
    setStoragePath,
    audioPath,
    setAudioPath,
    sampleRate,
    setSampleRate,
    origin,
    setOrigin,
    audioHost,
    setAudioHost,
    timezone,
    setTimezone,
    computationDimensions,
    setComputationDimensions,
    computationIterations,
    setComputationIterations,
    displaySeed,
    setDisplaySeed,
  };
}
