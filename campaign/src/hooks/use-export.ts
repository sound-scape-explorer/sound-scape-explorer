import {ConfigDto, type FileDto} from '@shared/dtos';
import {useCallback} from 'react';
import {TAG_PREFIX_FOR_TABLE} from 'src/constants';
import {useSettingsState} from 'src/hooks/use-settings-state';
import {useTableStateConverter} from 'src/hooks/use-table-state-converter';
import {useExtractionState} from 'src/panels/extractions/hooks/use-extraction-state.ts';
import {useRangeState} from 'src/panels/extractions/hooks/use-range-state.ts';
import {VERSION} from 'src/version';

export function useExport() {
  const {settings} = useSettingsState();
  const {extractions} = useExtractionState();
  const {ranges} = useRangeState();
  const {getFiles} = useTableStateConverter();

  const download = useCallback(
    <T>(data: T, filename = 'campaign.json'): void => {
      try {
        const string = JSON.stringify(data, null, 2);
        const blob = new Blob([string], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = filename;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading JSON:', error);
      }
    },
    [],
  );

  const generate = useCallback(() => {
    const files = getFiles();
    const filesDto: FileDto[] = [];

    for (const file of files) {
      const fileDto: FileDto = {
        Index: file.Index,
        Path: file.Path,
        Date: file.Date,
        Site: file.Site,
        tags: {},
      };

      const tagNames = Object.keys(file).filter((k) =>
        k.startsWith(TAG_PREFIX_FOR_TABLE),
      );

      for (const tagName of tagNames) {
        const removed = tagName.replace(TAG_PREFIX_FOR_TABLE, '');
        fileDto.tags[removed] = file[tagName];
      }

      filesDto.push(fileDto);
    }

    const json: ConfigDto = {
      version: VERSION,
      settings,
      extractions,
      ranges,
      files: filesDto,
    };

    const config = ConfigDto.parse(json);
    return config;
  }, [settings, extractions, ranges, getFiles]);

  const exportToJson = useCallback(() => {
    const json = generate();
    const filename = settings.storagePath.replace('.h5', '.json');
    download(json, filename);
  }, [generate, download, settings]);

  return {
    exportToJson,
  };
}
