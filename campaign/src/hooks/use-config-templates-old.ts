import {useAtom} from 'jotai';
import {type ChangeEvent, useCallback, useMemo} from 'react';
import {configTemplateAtom} from 'src/atoms.ts';

export enum ConfigTemplate {
  custom = 'custom', // default
  coralReef = 'coral reef',
}

export function useConfigTemplatesOld() {
  const [template, setTemplate] = useAtom(configTemplateAtom);
  const isPredefined = useMemo(
    () => template !== ConfigTemplate.custom,
    [template],
  );

  const update = useCallback(
    (newTemplate: ConfigTemplate) => {
      if (template === newTemplate) {
        return;
      }

      setTemplate(newTemplate);
    },
    [template, setTemplate],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      if (e.target.value === ConfigTemplate.coralReef) {
        update(ConfigTemplate.coralReef);
        return;
      }

      update(ConfigTemplate.custom);
    },
    [update],
  );

  return {
    template,
    handleChange,
    isPredefined,
  };
}
