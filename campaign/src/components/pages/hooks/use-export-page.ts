import {useAtomValue} from 'jotai';
import {useCallback} from 'react';
import {
  bandsAtom,
  extractorsAtom,
  integrationsAtom,
  jsonFilesAtom,
  settingsAtom,
} from 'src/atoms.ts';
import {STORAGE_EXT} from 'src/constants.ts';

export function useExportPage() {
  const settings = useAtomValue(settingsAtom);
  const jsonFiles = useAtomValue(jsonFilesAtom);
  const bands = useAtomValue(bandsAtom);
  const integrations = useAtomValue(integrationsAtom);
  const extractors = useAtomValue(extractorsAtom);

  const download = useCallback(() => {
    const payload = {
      settings,
      files: jsonFiles,
      config: {
        bands,
        integrations,
        extractors,
      },
    };

    // sanitize storage path
    if (!payload.settings.storagePath.endsWith(STORAGE_EXT)) {
      payload.settings.storagePath = `${settings.storagePath}${STORAGE_EXT}`;
    }

    const data = JSON.stringify(payload);
    const blob = new Blob([data], {type: 'application/json'});
    const anchor = document.createElement('a');
    anchor.href = window.URL.createObjectURL(blob);
    anchor.download = 'campaign.json';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(anchor.href);
  }, [settings, jsonFiles, bands, integrations, extractors]);

  return {
    download,
  };
}
