import {useAtom} from 'jotai';
import {useCallback, useMemo, useRef, useState} from 'react';
import {extractorsAtom} from 'src/atoms.ts';
import {
  ConfigTemplate,
  useConfigTemplatesOld,
} from 'src/hooks/use-config-templates-old.ts';
import {NeuralExtractorType} from 'src/panels/config/hooks/use-neural-extractor-state';
import {type Extractor} from 'src/types.ts';
import {swapNext, swapPrevious} from 'src/utils/array.ts';
import {notifyError} from 'src/utils/notifications.ts';

const DEFAULT_OFFSET = 0;
const DEFAULT_STEP = 1000;

interface TypeValueOption {
  value: keyof typeof NeuralExtractorType;
  label: keyof typeof NeuralExtractorType;
}

export function useExtractors() {
  const [extractors, setExtractors] = useAtom(extractorsAtom);
  const {template} = useConfigTemplatesOld();

  const nameRef = useRef<HTMLInputElement | null>(null);
  const [typeKey, setTypeKey] = useState<TypeValueOption | null>(null);
  const offsetRef = useRef<HTMLInputElement | null>(null);
  const stepRef = useRef<HTMLInputElement | null>(null);
  const persistRef = useRef<HTMLInputElement | null>(null);

  const updateType = useCallback((key: keyof typeof NeuralExtractorType) => {
    setTypeKey({value: key, label: key});
  }, []);

  const retrieveType = useCallback((name: keyof typeof NeuralExtractorType) => {
    return NeuralExtractorType[name];
  }, []);

  const actualExtractors = useMemo<Extractor[]>(() => {
    if (template === ConfigTemplate.coralReef) {
      return [
        {
          name: 'vgg',
          type: NeuralExtractorType.VGGish,
          offset: DEFAULT_OFFSET,
          step: DEFAULT_STEP,
          persist: false,
          isNeural: true,
        },
      ];
    }

    return extractors;
  }, [template, extractors]);

  const resetFields = useCallback(() => {
    if (nameRef.current !== null) {
      nameRef.current.value = '';
    }

    if (typeKey !== null) {
      updateType('VGGish');
    }

    if (offsetRef.current !== null) {
      offsetRef.current.value = DEFAULT_OFFSET.toString();
    }

    if (stepRef.current !== null) {
      stepRef.current.value = DEFAULT_STEP.toString();
    }

    if (persistRef.current !== null) {
      persistRef.current.checked = false;
    }
  }, [typeKey, updateType]);

  const add = useCallback(() => {
    if (
      nameRef.current === null ||
      typeKey === null ||
      offsetRef.current === null ||
      stepRef.current === null ||
      persistRef.current === null
    ) {
      return;
    }

    const name = nameRef.current.value;
    const type = retrieveType(typeKey.value);
    const offset = Number(offsetRef.current.value);
    const step = Number(stepRef.current.value);
    const persist = persistRef.current.checked;

    if (name === '') {
      notifyError('Name is empty');
      return;
    }

    const isUnique = extractors.filter((e) => e.name === name).length === 0;

    if (!isUnique) {
      notifyError('Extractor name already exists');
      return;
    }

    const newExtractor: Extractor = {
      name: name,
      type: type,
      offset: offset,
      step: step,
      persist: persist,
      isNeural: true,
    };

    const newExtractors = [...extractors, newExtractor];
    setExtractors(newExtractors);
    resetFields();
  }, [
    nameRef,
    typeKey,
    retrieveType,
    offsetRef,
    stepRef,
    persistRef,
    extractors,
    setExtractors,
    resetFields,
  ]);

  const remove = useCallback(
    (extractor: Extractor) => {
      const newExtractors = extractors.filter((e) => e !== extractor);
      setExtractors(newExtractors);
    },
    [extractors, setExtractors],
  );

  const moveUp = useCallback(
    (extractor: Extractor) => {
      const i = extractors.indexOf(extractor);

      if (i <= 0) {
        return;
      }

      const newExtractors = [...extractors];
      swapPrevious(newExtractors, i);
      setExtractors(newExtractors);
    },
    [extractors, setExtractors],
  );

  const moveDown = useCallback(
    (extractor: Extractor) => {
      const i = extractors.indexOf(extractor);

      if (i >= extractors.length - 1) {
        return;
      }

      const newExtractors = [...extractors];
      swapNext(newExtractors, i);
      setExtractors(newExtractors);
    },
    [extractors, setExtractors],
  );

  return {
    nameRef,
    typeKey,
    setTypeKey,
    offsetRef,
    stepRef,
    persistRef,
    extractors: actualExtractors,
    add,
    remove,
    moveUp,
    moveDown,
  };
}
