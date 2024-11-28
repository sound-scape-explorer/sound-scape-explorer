import {useAtomValue} from 'jotai';
import {useCallback} from 'react';
import {settingsAtom} from 'src/atoms.ts';
import {STORAGE_EXT} from 'src/constants.ts';
import {useBands} from 'src/hooks/use-bands.ts';
import {useExtractors} from 'src/hooks/use-extractors.ts';
import {useFilesPage} from 'src/hooks/use-files-page.ts';
import {useIntegrations} from 'src/hooks/use-integrations.ts';
import {type ExportConfig} from 'src/types.ts';
import {convertDateToString} from 'src/utils/dates.ts';
import {convertRowsToFiles} from 'src/utils/files.ts';

export function useExportPanel() {
  const settings = useAtomValue(settingsAtom);
  const {rows} = useFilesPage();
  const {bands} = useBands();
  const {integrations} = useIntegrations();
  const {extractors} = useExtractors();

  const download = useCallback(() => {
    const files = convertRowsToFiles(rows);

    const payload: ExportConfig = {
      settings: {
        ...settings,
        timelineOrigin: convertDateToString(settings.timelineOrigin),
      },
      config: {
        bands,
        integrations,
        extractors,
      },
      files: files,
    };

    // sanitize storage path
    if (!payload.settings.storagePath.endsWith(STORAGE_EXT)) {
      payload.settings.storagePath = `${settings.storagePath}${STORAGE_EXT}`;
    }

    const data = JSON.stringify(payload, null, 2);
    const blob = new Blob([data], {type: 'application/json'});
    const anchor = document.createElement('a');
    anchor.href = window.URL.createObjectURL(blob);
    anchor.download = 'campaign.json';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(anchor.href);
  }, [settings, rows, bands, integrations, extractors]);

  return {
    download,
  };
}
