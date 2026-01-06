import {type FileDto} from '@shared/dtos';
import {atom, useAtom} from 'jotai';
import {useCallback} from 'react';
import {useTableDateLoader} from 'src/panels/files/hooks/use-table-date-loader.tsx';
import {useTableIndexLoader} from 'src/panels/files/hooks/use-table-index-loader.tsx';
import {useTablePathLoader} from 'src/panels/files/hooks/use-table-path-loader.tsx';
import {useTableSiteLoader} from 'src/panels/files/hooks/use-table-site-loader.tsx';
import {useTableState} from 'src/panels/files/hooks/use-table-state';
import {useTableTagsLoader} from 'src/panels/files/hooks/use-table-tags-loader';

const isLoadedAtom = atom<boolean>(false);

export interface FileAlias {
  path: string; // relative
  timestamp: number;
}

export function useTableLoader() {
  const [isLoaded, setIsLoaded] = useAtom(isLoadedAtom);

  const indices = useTableIndexLoader();
  const paths = useTablePathLoader();
  const dates = useTableDateLoader();
  const sites = useTableSiteLoader();
  const tags = useTableTagsLoader();
  const {clearHistory} = useTableState();

  const finishLoad = useCallback(() => {
    clearHistory();
    setIsLoaded(true);
  }, [clearHistory, setIsLoaded]);

  const loadFromFolder = useCallback(
    (files: FileAlias[]) => {
      indices.loadFromFolder(files);
      paths.loadFromFolder(files);
      dates.loadFromFolder(files);
      sites.loadFromFolder(files);
      finishLoad();
    },
    [finishLoad, indices, paths, dates, sites],
  );

  const loadFromDto = useCallback(
    (files: FileDto[]) => {
      indices.loadFromDto(files);
      paths.loadFromDto(files);
      dates.loadFromDto(files);
      sites.loadFromDto(files);
      tags.loadFromDto(files);
      finishLoad();
    },
    [finishLoad, indices, paths, dates, sites, tags],
  );

  return {
    isLoaded,
    loadFromFolder,
    loadFromDto,
  };
}
