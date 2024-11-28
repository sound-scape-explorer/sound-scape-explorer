import {useAtomValue} from 'jotai';
import {useMemo} from 'react';
import {bandsAtom, extractorsAtom, integrationsAtom} from 'src/atoms.ts';

export function useSettings() {
  const bands = useAtomValue(bandsAtom);
  const integrations = useAtomValue(integrationsAtom);
  const extractors = useAtomValue(extractorsAtom);

  const hasBands = useMemo(() => bands.length > 0, [bands]);

  const hasIntegrations = useMemo(
    () => integrations.length > 0,
    [integrations],
  );

  const hasExtractors = useMemo(() => extractors.length > 0, [extractors]);

  const hasSettings = useMemo(
    () => hasBands && hasIntegrations && hasExtractors,
    [hasBands, hasIntegrations, hasExtractors],
  );

  return {
    hasSettings,
  };
}
