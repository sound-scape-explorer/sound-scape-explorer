import {useCallback, useRef} from 'react';

export function useReducers() {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const dimensionsRef = useRef<HTMLInputElement | null>(null);
  const extractorRef = useRef<HTMLSelectElement | null>(null);
  const bandsRef = useRef<HTMLSelectElement | null>(null);
  const integrationsRef = useRef<HTMLSelectElement | null>(null);
  const rangesRef = useRef<HTMLSelectElement | null>(null);

  const add = useCallback(() => {}, []);

  return {
    nameRef,
    dimensionsRef,
    extractorRef,
    bandsRef,
    integrationsRef,
    rangesRef,
    add,
  };
}
