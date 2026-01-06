import {downloadJson} from '@shared/browser.ts';
import {ConfigDto, type FileDto} from '@shared/dtos';
import {getStorageFilename} from '@shared/files';
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

  const generate = useCallback(() => {
    const files = getFiles();
    const filesDto: FileDto[] = [];

    // build DTO files with tags dict
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

    const unvalidatedDto = {
      version: VERSION,
      settings,
      extractions,
      ranges,
      files: filesDto,
    };

    const dto = ConfigDto.parse(unvalidatedDto);
    return dto;
  }, [settings, extractions, ranges, getFiles]);

  const exportToJson = useCallback(() => {
    const dto = generate();
    const filename = getStorageFilename(dto);
    downloadJson(dto, filename);
  }, [generate]);

  return {
    exportToJson,
  };
}
