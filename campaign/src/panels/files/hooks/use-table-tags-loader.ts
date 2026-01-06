import {type FileDto} from '@shared/dtos';
import {useCallback} from 'react';
import {useTableState} from 'src/panels/files/hooks/use-table-state';
import {addPrefixToTagName} from 'src/utils/files';

export function useTableTagsLoader() {
  const {createColumn} = useTableState();

  const loadFromDto = useCallback(
    (files: FileDto[]) => {
      const file = files[0];
      const tagNames = Object.keys(file.tags);

      for (const tagName of tagNames) {
        const data = new Array<string>(files.length);

        // fill values
        for (let i = 0; i < files.length; i += 1) {
          data[i] = files[i].tags[tagName];
        }

        const prefixed = addPrefixToTagName(tagName);

        // creat col
        createColumn(prefixed, {
          key: `col_${prefixed}`,
          type: 'user',
          data,
        });
      }
    },
    [createColumn],
  );

  return {
    loadFromDto,
  };
}
