import clsx from 'clsx';
import {type FormEvent, type ReactElement, useCallback} from 'react';
import styles from 'src/components/primitives/form.module.scss';

interface Props {
  children: ReactElement[];
  className?: string;
}

export function Form({children, className}: Props) {
  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(styles.form, className)}
    >
      {children}
    </form>
  );
}
