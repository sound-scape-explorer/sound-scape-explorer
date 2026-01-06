import {
  AUTOCLUSTER_ALPHA_DEFAULT,
  AUTOCLUSTER_EPSILON_DEFAULT,
  AUTOCLUSTER_MIN_CLUSTER_SIZE_DEFAULT,
  AUTOCLUSTER_MIN_SAMPLES_DEFAULT,
} from '@shared/constants.ts';
import {type AutoclusterDto} from '@shared/dtos.ts';
import {AutoclusterImpl} from '@shared/enums.ts';
import {useCallback, useMemo} from 'react';
import {type ExtractionConfig} from 'src/interfaces.ts';
import {useExtractionState} from 'src/panels/extractions/hooks/use-extraction-state.ts';

export function useAutoclusterState(extraction: ExtractionConfig) {
  const {updateExtraction} = useExtractionState();

  const autoclusters = useMemo(
    () => extraction.autoclusters,
    [extraction.autoclusters],
  );

  const addAutocluster = useCallback(() => {
    extraction.autoclusters.push({
      index: extraction.autoclusters.length,
      impl: AutoclusterImpl.enum.HDBSCAN_EOM,
      minClusterSize: AUTOCLUSTER_MIN_CLUSTER_SIZE_DEFAULT,
      minSamples: AUTOCLUSTER_MIN_SAMPLES_DEFAULT,
      alpha: AUTOCLUSTER_ALPHA_DEFAULT,
      epsilon: AUTOCLUSTER_EPSILON_DEFAULT,
    });

    updateExtraction(extraction);
  }, [extraction, updateExtraction]);

  const deleteAutocluster = useCallback(
    (autocluster: AutoclusterDto) => {
      const newAutoclusters = extraction.autoclusters.filter(
        (ac) => ac.index !== autocluster.index,
      );
      newAutoclusters.forEach((ac, index) => {
        ac.index = index;
      });
      extraction.autoclusters = newAutoclusters;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateIndex = useCallback(
    (autocluster: AutoclusterDto, index: number) => {
      const newAutoclusters = [...extraction.autoclusters];
      const newIndex = autocluster.index + index;

      if (newIndex < 0 || newIndex >= extraction.autoclusters.length) {
        return;
      }

      const existing = newAutoclusters.find((ac) => ac.index === newIndex);
      const updated = newAutoclusters.find(
        (ac) => ac.index === autocluster.index,
      );
      if (existing && updated) {
        existing.index = autocluster.index;
        updated.index = newIndex;
      }

      extraction.autoclusters = newAutoclusters;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateImpl = useCallback(
    (autocluster: AutoclusterDto, impl: AutoclusterImpl) => {
      autocluster.impl = impl;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateMinClusterSize = useCallback(
    (autocluster: AutoclusterDto, minClusterSize: number) => {
      autocluster.minClusterSize = minClusterSize;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateMinSamples = useCallback(
    (autocluster: AutoclusterDto, minSamples: number) => {
      autocluster.minSamples = minSamples;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateAlpha = useCallback(
    (autocluster: AutoclusterDto, alpha: number) => {
      autocluster.alpha = alpha;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateEpsilon = useCallback(
    (autocluster: AutoclusterDto, epsilon: number) => {
      autocluster.epsilon = epsilon;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  return {
    autoclusters,
    addAutocluster,
    deleteAutocluster,
    updateIndex,
    updateImpl,
    updateMinClusterSize,
    updateMinSamples,
    updateAlpha,
    updateEpsilon,
  };
}
