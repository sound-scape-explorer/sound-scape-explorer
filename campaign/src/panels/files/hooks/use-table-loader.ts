import {atom, useAtom} from 'jotai';
import {useCallback} from 'react';
import {type ConfigFile} from 'src/hooks/use-table-state-converter.ts';
import {useTableDateLoader} from 'src/panels/files/hooks/use-table-date-loader.tsx';
import {useTableIndexLoader} from 'src/panels/files/hooks/use-table-index-loader.tsx';
import {useTableLabelLoader} from 'src/panels/files/hooks/use-table-label-loader.ts';
import {useTablePathLoader} from 'src/panels/files/hooks/use-table-path-loader.tsx';
import {useTableSiteLoader} from 'src/panels/files/hooks/use-table-site-loader.tsx';
import {useTableState} from 'src/panels/files/hooks/use-table-state.ts';
import {type IndexedXlsxFile} from 'src/utils/xlsx-parser.ts';

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
  const labels = useTableLabelLoader();
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

  const loadFromXlsx = useCallback(
    (files: IndexedXlsxFile[]) => {
      indices.loadFromXlsx(files);
      paths.loadFromXlsx(files);
      dates.loadFromXlsx(files);
      sites.loadFromXlsx(files);
      labels.loadFromXlsx(files);
      finishLoad();
    },
    [finishLoad, indices, paths, dates, sites, labels],
  );

  const loadFromJson = useCallback(
    (files: ConfigFile[]) => {
      indices.loadFromJson(files);
      paths.loadFromJson(files);
      dates.loadFromJson(files);
      sites.loadFromJson(files);
      labels.loadFromJson(files);
      finishLoad();
    },
    [finishLoad, indices, paths, dates, sites, labels],
  );

  return {
    isLoaded,
    loadFromFolder,
    loadFromXlsx,
    loadFromJson,
  };
}
