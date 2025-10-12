import {Button, Section, SectionCard} from '@blueprintjs/core';
import {
  ArrowDown,
  ArrowUp,
  Cross,
  NewLink,
  Plus,
  Snowflake,
} from '@blueprintjs/icons';
import {ICON_SIZE} from '@shared/constants';
import clsx from 'clsx';
import {useMemo, useState} from 'react';
import {type ExtractionConfig} from 'src/interfaces.ts';
import {useExtractionTemplates} from 'src/panels/extractions/hooks/use-extraction-templates.ts';
import {useIntegrationState} from 'src/panels/extractions/hooks/use-integration-state.ts';
import {useIntegrationValidation} from 'src/panels/extractions/hooks/use-integration-validation.ts';
import genericStyles from 'src/primitives/generic-section/generic-section.module.scss';
import {NumberInput} from 'src/primitives/number-input';
import {SmallCallout} from 'src/primitives/small-callout.tsx';
import {TextInput} from 'src/primitives/text-input.tsx';

import styles from './config-integrations.module.scss';
import {useObjectSlug} from 'src/panels/extractions/hooks/use-object-slug.ts';

interface Props {
  extraction: ExtractionConfig;
}

export function ExtractionIntegrations({extraction}: Props) {
  const {
    integrations,
    addIntegration,
    deleteIntegration,
    updateIndex,
    updateName,
    updateDuration,
  } = useIntegrationState(extraction);
  const {hasTemplate} = useExtractionTemplates(extraction);
  const {getSlug} = useObjectSlug();
  const {isNameValid, isDurationValid, validate} = useIntegrationValidation();
  const validation = useMemo(
    () => validate(extraction),
    [extraction, validate],
  );
  const [open, setOpen] = useState(false);

  return (
    <Section
      title="Integrations"
      icon={<NewLink size={ICON_SIZE} />}
      compact
      collapsible
      collapseProps={{
        isOpen: open,
        onToggle: () => setOpen((o) => !o),
      }}
      rightElement={
        <>
          {hasTemplate && <Snowflake size={ICON_SIZE} />}
          {validation && (
            <SmallCallout intent={validation.intent}>
              {validation.content}
            </SmallCallout>
          )}
        </>
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
            onClick={addIntegration}
            disabled={hasTemplate}
          />
        </div>
        <div>idx</div>
        <div>name</div>
        <div>duration (ms)</div>
      </SectionCard>

      {integrations
        .sort((a, b) => a.index - b.index)
        .map((integration) => (
          <SectionCard
            key={getSlug(integration)}
            className={clsx(genericStyles.row, styles.row)}
          >
            <div className="flex gap">
              <Button
                size="small"
                icon={<Cross size={ICON_SIZE} />}
                onClick={() => deleteIntegration(integration)}
                disabled={hasTemplate}
              />
              <Button
                size="small"
                icon={<ArrowDown size={ICON_SIZE} />}
                onClick={() => updateIndex(integration, +1)}
                disabled={hasTemplate}
              />
              <Button
                size="small"
                icon={<ArrowUp size={ICON_SIZE} />}
                onClick={() => updateIndex(integration, -1)}
                disabled={hasTemplate}
              />
            </div>

            <span>{integration.index}</span>

            <TextInput
              defaultValue={integration.name}
              onBlur={(v) => updateName(integration, v)}
              intent={
                isNameValid(integration, extraction) ? 'success' : 'danger'
              }
              disabled={hasTemplate}
            />

            <NumberInput
              defaultValue={integration.duration}
              onBlur={(n) => updateDuration(integration, n)}
              intent={
                isDurationValid(integration, extraction) ? 'success' : 'danger'
              }
              disabled={hasTemplate}
            />
          </SectionCard>
        ))}
    </Section>
  );
}
