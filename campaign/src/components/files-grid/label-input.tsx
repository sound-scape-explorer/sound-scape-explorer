import {useAtom} from 'jotai';
import {type FormEvent, useCallback, useRef} from 'react';
import {audioFilesColumnsAtom} from 'src/atoms.ts';
import {Input} from 'src/components/primitives/input.tsx';
import {Submit} from 'src/components/primitives/submit.tsx';
import {BASE_WIDTH, LABEL_PREFIX} from 'src/constants.ts';

import styles from './label-input.module.scss';

export function LabelInput() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [columns, setColumns] = useAtom(audioFilesColumnsAtom);

  const addProperty = useCallback(() => {
    if (inputRef.current === null || inputRef.current.value === '') {
      return;
    }

    const newColumnDefs = [
      ...columns,
      {
        field: `${LABEL_PREFIX}${inputRef.current.value}`,
        minWidth: BASE_WIDTH * 2,
        editable: true,
      },
    ];

    setColumns(newColumnDefs);
    inputRef.current.value = '';
  }, [columns, setColumns]);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
  }, []);

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit}
    >
      <Input
        ref={inputRef}
        type="text"
      />

      <Submit handleClick={addProperty}>Add label property</Submit>
    </form>
  );
}
