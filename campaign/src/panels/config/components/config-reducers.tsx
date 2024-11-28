import {Tooltip} from '@blueprintjs/core';
import {useMemo} from 'react';
import {getEnumKeys} from 'src/enums.ts';
import {useBandState} from 'src/panels/config/hooks/use-band-state.ts';
import {useConfigTemplates} from 'src/panels/config/hooks/use-config-templates.ts';
import {useIntegrationState} from 'src/panels/config/hooks/use-integration-state.ts';
import {useNeuralExtractorState} from 'src/panels/config/hooks/use-neural-extractor-state.ts';
import {useReducerSlug} from 'src/panels/config/hooks/use-reducer-slug.ts';
import {
  ReducerType,
  useReducerState,
} from 'src/panels/config/hooks/use-reducer-state.ts';
import {useReducerValidation} from 'src/panels/config/hooks/use-reducer-validation.ts';
import {GenericSection} from 'src/primitives/generic-section/generic-section.tsx';
import {MultipleSelect} from 'src/primitives/multiple-select.tsx';
import {NumberInput} from 'src/primitives/number-input';
import {Select} from 'src/primitives/select';

import styles from './config-reducers.module.scss';

export function ConfigReducers() {
  const {hasTemplate} = useConfigTemplates();
  const {bands} = useBandState();
  const {integrations} = useIntegrationState();
  const {extractors} = useNeuralExtractorState();

  const {reducers, add, update} = useReducerState();
  const {getSlug} = useReducerSlug();
  const {isDimensionsValid, validate} = useReducerValidation();
  const validation = useMemo(() => validate(), [validate]);

  return (
    <GenericSection
      title="Reducers"
      getSlug={getSlug}
      items={reducers}
      add={add}
      update={update}
      className={styles.row}
      renderItem={(reducer) => (
        <>
          <Select
            items={getEnumKeys(ReducerType)}
            onSelect={(n) => update(reducer, 'type', n)}
            current={reducer.type}
            placeholder="Select type"
            disabled={hasTemplate}
          />

          <NumberInput
            defaultValue={reducer.dimensions}
            onBlur={(n) => update(reducer, 'dimensions', n)}
            intent={isDimensionsValid(reducer) ? 'success' : 'danger'}
            disabled={hasTemplate}
          />

          <Tooltip content="Leave empty for all bands">
            <MultipleSelect
              items={bands}
              selected={reducer.bands}
              tagSelector="name"
              renderTag={(band) => band.name}
              onSelect={(bands) => update(reducer, 'bands', bands)}
              onClear={() => update(reducer, 'bands', [])}
              onRemove={(i) => {
                update(
                  reducer,
                  'bands',
                  reducer.bands.filter((o) => o.name !== reducer.bands[i].name),
                );
              }}
              disabled={hasTemplate}
              placeholder="Select bands"
            />
          </Tooltip>

          <Tooltip content="Leave empty for all integrations">
            <MultipleSelect
              items={integrations}
              selected={reducer.integrations}
              tagSelector="name"
              renderTag={(integration) => integration.name}
              onSelect={(integrations) =>
                update(reducer, 'integrations', integrations)
              }
              onClear={() => update(reducer, 'integrations', [])}
              onRemove={(i) => {
                reducer.integrations.filter(
                  (o) => o.name !== reducer.integrations[i].name,
                );
              }}
              disabled={hasTemplate}
              placeholder="Select integrations"
            />
          </Tooltip>

          <Tooltip content="Leave empty for all extractors">
            <MultipleSelect
              items={extractors}
              selected={reducer.extractors}
              tagSelector="name"
              renderTag={(ex) => ex.name}
              onSelect={(exs) => update(reducer, 'extractors', exs)}
              onClear={() => update(reducer, 'extractors', [])}
              onRemove={(i) => {
                update(
                  reducer,
                  'extractors',
                  reducer.extractors.filter(
                    (o) => o.name !== reducer.extractors[i].name,
                  ),
                );
              }}
              disabled={hasTemplate}
              placeholder="Select extractors"
            />
          </Tooltip>
        </>
      )}
      validation={validation}
    >
      <div>type</div>
      <Tooltip content="Dimensions">
        <div>dim.</div>
      </Tooltip>
      <div>bands</div>
      <div>integrations</div>
      <div>extractors</div>
    </GenericSection>
  );
}
