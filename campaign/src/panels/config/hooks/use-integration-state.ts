import {atom} from 'jotai/index';
import {useReducerState} from 'src/panels/config/hooks/use-reducer-state.ts';
import {useGenericSectionState} from 'src/primitives/generic-section/use-generic-section-state.ts';

const configIntegrationsAtom = atom<ConfigIntegration[]>([]);

export interface ConfigIntegration {
  index: number;
  name: string; // unique
  duration: number;
}

export function useIntegrationState() {
  const {purgeIntegrations} = useReducerState();

  const {
    items: integrations,
    setItems: setIntegrations,
    add,
    update,
  } = useGenericSectionState({
    atom: configIntegrationsAtom,
    createItem: (index) => ({
      index,
      name: '',
      duration: 15,
    }),
    onDelete: (integration) => {
      purgeIntegrations(integration);
    },
  });

  return {
    integrations,
    setIntegrations,
    add,
    update,
  };
}
