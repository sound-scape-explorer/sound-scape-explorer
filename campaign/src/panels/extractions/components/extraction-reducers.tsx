import {Button, Section, Tooltip} from '@blueprintjs/core';
import {SectionCard} from '@blueprintjs/core/lib/esnext';
import {ArrowDown, ArrowUp, Cross, Minimize, Plus} from '@blueprintjs/icons';
import {ICON_SIZE} from '@shared/constants';
import {ReducerImplEnum} from '@shared/enums';
import clsx from 'clsx';
import {useMemo, useState} from 'react';
import {type ExtractionConfigWithId} from 'src/panels/extractions/hooks/use-extraction-state.ts';
import {useExtractionTemplates} from 'src/panels/extractions/hooks/use-extraction-templates.ts';
import {useReducerSlug} from 'src/panels/extractions/hooks/use-reducer-slug';
import {useReducerState} from 'src/panels/extractions/hooks/use-reducer-state.ts';
import {useReducerValidation} from 'src/panels/extractions/hooks/use-reducer-validation.ts';
import genericStyles from 'src/primitives/generic-section/generic-section.module.scss';
import {NumberInput} from 'src/primitives/number-input';
import {Select} from 'src/primitives/select';
import {SmallCallout} from 'src/primitives/small-callout.tsx';

import styles from './config-reducers.module.scss';

interface Props {
  extraction: ExtractionConfigWithId;
}

export function ExtractionReducers({extraction}: Props) {
  const {
    reducers,
    addReducer,
    deleteReducer,
    updateIndex,
    updateImpl,
    updateDimensions,
  } = useReducerState(extraction);

  const {hasTemplate} = useExtractionTemplates(extraction);

  const {getSlug} = useReducerSlug();
  const {isDimensionsValid, validate} = useReducerValidation();
  const validation = useMemo(
    () => validate(extraction),
    [extraction, validate],
  );
  const [open, setOpen] = useState(false);

  return (
    <Section
      title="Reducers"
      icon={<Minimize size={ICON_SIZE} />}
      compact
      collapsible
      collapseProps={{
        isOpen: open,
        onToggle: () => setOpen((o) => !o),
      }}
      rightElement={
        validation && (
          <SmallCallout intent={validation.intent}>
            {validation.content}
          </SmallCallout>
        )
      }
    >
      <SectionCard
        className={clsx(genericStyles.row, genericStyles.narrow, styles.row)}
      >
        <div>
          <Button
            size="small"
            icon={<Plus size={ICON_SIZE} />}
            fill
            style={{margin: 2}}
            onClick={addReducer}
            disabled={hasTemplate}
          />
        </div>
        <div>idx</div>
        <div>impl</div>
        <Tooltip content="Dimensions">
          <div>dim.</div>
        </Tooltip>
      </SectionCard>

      {reducers
        .sort((a, b) => a.index - b.index)
        .map((reducer) => (
          <SectionCard
            key={getSlug(reducer)}
            className={clsx(genericStyles.row, styles.row)}
          >
            <div className="flex gap">
              <Button
                size="small"
                icon={<Cross size={ICON_SIZE} />}
                onClick={() => deleteReducer(reducer)}
                disabled={hasTemplate}
              />
              <Button
                size="small"
                icon={<ArrowDown size={ICON_SIZE} />}
                onClick={() => updateIndex(reducer, +1)}
                disabled={hasTemplate}
              />
              <Button
                size="small"
                icon={<ArrowUp size={ICON_SIZE} />}
                onClick={() => updateIndex(reducer, -1)}
                disabled={hasTemplate}
              />
            </div>

            <span>{reducer.index}</span>

            <Select
              items={ReducerImplEnum.options}
              onSelect={(v) => updateImpl(reducer, v)}
              current={reducer.impl}
              placeholder="Select implementation"
              disabled={hasTemplate}
            />

            <NumberInput
              defaultValue={reducer.dimensions}
              onBlur={(n) => updateDimensions(reducer, n)}
              intent={
                isDimensionsValid(reducer, extraction) ? 'success' : 'danger'
              }
              disabled={hasTemplate}
            />
          </SectionCard>
        ))}
    </Section>
  );
}
