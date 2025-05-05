import {ExtractionDto} from '@shared/dtos.ts';
import {atom, useAtom} from 'jotai';
import {useCallback} from 'react';
import {useExtractorDefaults} from 'src/panels/extractions/hooks/use-extractor-defaults.ts';
import {z} from 'zod';

export type ExtractionCurrentId = string | undefined;

const generateId = () =>
  `extraction_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

export const ExtractionConfigWithId = ExtractionDto.extend({
  _id: z.string(),
});

export type ExtractionConfigWithId = z.infer<typeof ExtractionConfigWithId>;

const extractionsAtom = atom<ExtractionConfigWithId[]>([]);
const currentIdAtom = atom<ExtractionCurrentId>();

export function useExtractionState() {
  const [extractions, setExtractions] = useAtom(extractionsAtom);
  const [currentId, setCurrentId] = useAtom(currentIdAtom);
  const {createExtractorWithDefaults} = useExtractorDefaults();

  const addExtraction = useCallback(() => {
    const indices =
      extractions.length > 0 ? extractions.map((e) => e.index) : [-1];
    const next = Math.max(...indices) + 1;

    const extraction: ExtractionConfigWithId = {
      _id: generateId(),
      index: next,
      name: 'Extraction',
      bands: [],
      integrations: [],
      extractors: [],
      reducers: [],
      autoclusters: [],
      metrics: [],
      trajectories: [],
    };

    setExtractions((prev) => [...prev, extraction]);
    setCurrentId(extraction._id);
  }, [extractions, setExtractions, setCurrentId]);

  const loadExtractions = useCallback(
    (extractions: ExtractionDto[]) => {
      const newExtractions: ExtractionConfigWithId[] = extractions.map(
        (extraction) => {
          return {
            ...extraction,
            _id: generateId(),
            extractors: extraction.extractors.map((ex) =>
              createExtractorWithDefaults(ex),
            ),
          };
        },
      );

      setExtractions(newExtractions);

      const extraction = newExtractions.find((e) => e.index === 0);

      if (!extraction) {
        return;
      }

      setCurrentId(extraction._id);
    },
    [setExtractions, createExtractorWithDefaults, setCurrentId],
  );

  const deleteExtraction = useCallback(
    (id: ExtractionCurrentId) => {
      if (typeof id === 'undefined') {
        return;
      }

      const extraction = extractions.find((e) => e._id === id);

      if (!extraction) {
        return;
      }

      const filtered = extractions.filter((e) => e._id !== id);
      const sorted = filtered.map((e, i) => ({
        ...e,
        index: i,
      }));

      setExtractions(sorted);

      const previous = extractions.find(
        (e) => e.index === extraction.index - 1,
      );

      if (previous) {
        setCurrentId(previous._id);
        return;
      }

      if (extractions.length > 0) {
        setCurrentId(extractions[0]._id);
      }
    },
    [setExtractions, extractions, setCurrentId],
  );

  const moveExtraction = useCallback(
    (id: ExtractionCurrentId, direction: number) => {
      setExtractions((prev) => {
        if (typeof id === 'undefined') {
          return prev;
        }

        const newExtractions = [...prev];
        const currentIndex = newExtractions.findIndex((e) => e._id === id);

        if (currentIndex === -1) {
          return prev;
        }

        const newPosition = currentIndex + direction;
        if (newPosition < 0 || newPosition >= newExtractions.length) {
          return newExtractions; // Out of bounds, do nothing
        }

        // Swap the extractions
        [newExtractions[currentIndex], newExtractions[newPosition]] = [
          newExtractions[newPosition],
          newExtractions[currentIndex],
        ];

        // Update indices to match their new positions
        return newExtractions.map((extraction, idx) => ({
          ...extraction,
          index: idx,
        }));
      });
    },
    [setExtractions],
  );

  const duplicateExtraction = useCallback(
    (id: ExtractionCurrentId) => {
      if (typeof id === 'undefined') {
        return;
      }

      const extraction = extractions.find((e) => e._id === id);

      if (!extraction) {
        return;
      }

      const newExtraction = {
        ...extraction,
        _id: generateId(),
        index: extractions.length,
      };

      const newExtractions = [...extractions, newExtraction];
      setExtractions(newExtractions);
      setCurrentId(newExtraction._id);
    },
    [extractions, setExtractions, setCurrentId],
  );

  const updateName = useCallback(
    (extraction: ExtractionConfigWithId, name: string) => {
      setExtractions((prev) => {
        const newExtractions = [...prev];
        newExtractions[extraction.index] = {
          ...extraction,
          name,
        };
        return newExtractions;
      });
    },
    [setExtractions],
  );

  const updateExtraction = useCallback(
    (extraction: ExtractionConfigWithId) => {
      setExtractions((prev) => {
        const newExtractions = [...prev];
        newExtractions[extraction.index] = {
          ...extraction,
        };

        return newExtractions;
      });
    },
    [setExtractions],
  );

  return {
    extractions,
    loadExtractions,
    currentId,
    setCurrentId,
    addExtraction,
    duplicateExtraction,
    deleteExtraction,
    moveExtraction,
    updateExtraction,
    updateName,
  };
}
