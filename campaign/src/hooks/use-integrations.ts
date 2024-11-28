import {useAtom} from 'jotai';
import {useCallback, useMemo, useRef} from 'react';
import {integrationsAtom} from 'src/atoms.ts';
import {
  ConfigTemplate,
  useConfigTemplatesOld,
} from 'src/hooks/use-config-templates-old.ts';
import {type Integration} from 'src/types.ts';
import {swapNext, swapPrevious} from 'src/utils/array.ts';
import {notifyError} from 'src/utils/notifications.ts';

export function useIntegrations() {
  const [integrations, setIntegrations] = useAtom(integrationsAtom);
  const {template} = useConfigTemplatesOld();

  const actualIntegrations = useMemo(() => {
    if (template === ConfigTemplate.coralReef) {
      return [{name: 'i15', seconds: 15}];
    }

    return integrations;
  }, [integrations, template]);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const secondsRef = useRef<HTMLInputElement | null>(null);

  const resetFields = useCallback(() => {
    if (nameRef.current !== null) {
      nameRef.current.value = '';
    }

    if (secondsRef.current !== null) {
      secondsRef.current.value = '';
    }
  }, []);

  const add = useCallback(() => {
    if (nameRef.current === null || secondsRef.current === null) {
      return;
    }

    const name = nameRef.current.value;
    const seconds = Number(secondsRef.current.value);

    if (name === '') {
      notifyError('Name is empty');
      return;
    }

    if (seconds === 0) {
      notifyError('Integration is empty');
      return;
    }

    const isUnique = integrations.filter((i) => i.name === name).length === 0;

    if (!isUnique) {
      notifyError('Name already exists');
      return;
    }

    const newIntegration: Integration = {
      name: name,
      seconds: seconds,
    };

    const newIntegrations = [...integrations, newIntegration];
    setIntegrations(newIntegrations);
    resetFields();
  }, [nameRef, secondsRef, integrations, setIntegrations, resetFields]);

  const remove = useCallback(
    (integration: Integration) => {
      const newIntegrations = integrations.filter((i) => i !== integration);
      setIntegrations(newIntegrations);
    },
    [integrations, setIntegrations],
  );

  const moveUp = useCallback(
    (integration: Integration) => {
      const i = integrations.indexOf(integration);

      if (i <= 0) {
        return;
      }

      const newIntegrations = [...integrations];
      swapPrevious(newIntegrations, i);
      setIntegrations(newIntegrations);
    },
    [integrations, setIntegrations],
  );

  const moveDown = useCallback(
    (integration: Integration) => {
      const i = integrations.indexOf(integration);

      if (i >= integrations.length - 1) {
        return;
      }

      const newIntegrations = [...integrations];
      swapNext(newIntegrations, i);
      setIntegrations(newIntegrations);
    },
    [integrations, setIntegrations],
  );

  return {
    nameRef,
    secondsRef,
    integrations: actualIntegrations,
    add,
    remove,
    moveUp,
    moveDown,
  };
}
