import {VGGISH_WINDOW_MS} from '@shared/constants';
import {
  AutoclusterImpl,
  ExtractorImpl,
  MetricImpl,
  ReducerImpl,
} from '@shared/enums';
import {atom, useAtom} from 'jotai';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {type ExtractionConfig} from 'src/interfaces.ts';
import {useExtractionState} from 'src/panels/extractions/hooks/use-extraction-state.ts';

export enum TemplateKey {
  NONE = 'No template',
  CORAL_REEFS = 'Coral reefs',
}

type KeyById = Record<string, TemplateKey>;

const keyByIdAtom = atom<KeyById>({});

export function useExtractionTemplates(extraction: ExtractionConfig) {
  const [keyById, setKeyById] = useAtom(keyByIdAtom);
  const {updateExtraction} = useExtractionState();

  const [customExtractions, setCustomExtractions] = useState<
    ExtractionConfig[]
  >([]);

  // on mount
  useEffect(() => {
    if (keyById[extraction._id]) {
      return;
    }

    setKeyById((prev) => ({...prev, [extraction._id]: TemplateKey.NONE}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasTemplate = useMemo(
    () => keyById[extraction._id] !== TemplateKey.NONE,
    [extraction, keyById],
  );

  const update = useCallback(
    (k: TemplateKey) => {
      setKeyById((prev) => ({...prev, [extraction._id]: k}));

      switch (k) {
        case TemplateKey.CORAL_REEFS: {
          setCustomExtractions((prev) => [...prev, extraction]);

          updateExtraction({
            ...extraction,
            bands: [
              {
                index: 0,
                name: 'fish',
                low: 70,
                high: 2000,
              },
            ],
            integrations: [
              {
                index: 0,
                name: 'i15',
                duration: 15000,
              },
            ],
            extractors: [
              {
                index: 0,
                name: 'vggish',
                impl: ExtractorImpl.enum.VGGISH,
                window: VGGISH_WINDOW_MS,
                hop: VGGISH_WINDOW_MS,
              },
            ],
            reducers: [
              {
                index: 0,
                impl: ReducerImpl.enum.UMAP,
                dimensions: 3,
              },
              {
                index: 1,
                impl: ReducerImpl.enum.UMAP,
                dimensions: 2,
              },
            ],
            metrics: [
              {index: 0, impl: MetricImpl.enum.SILHOUETTE},
              {index: 1, impl: MetricImpl.enum.CONTINGENCY},
            ],
            autoclusters: [
              {
                index: 0,
                impl: AutoclusterImpl.enum.HDBSCAN_EOM,
                minClusterSize: 15,
                minSamples: 15,
                alpha: 1,
                epsilon: 0.1,
              },
              {
                index: 1,
                impl: AutoclusterImpl.enum.HDBSCAN_LEAF,
                minClusterSize: 15,
                minSamples: 15,
                alpha: 1,
                epsilon: 0.1,
              },
            ],
          });

          break;
        }
        default: {
          const found = customExtractions.find(
            (ex) => ex._id === extraction._id,
          );

          if (!found) {
            return;
          }

          setCustomExtractions((prev) =>
            prev.filter((ex) => ex._id !== extraction._id),
          );

          updateExtraction(found);
        }
      }
    },
    [setKeyById, updateExtraction, customExtractions, extraction],
  );

  return {
    key: keyById[extraction._id],
    update,
    hasTemplate,
  };
}
