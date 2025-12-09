import {Button, Section, SectionCard} from '@blueprintjs/core';
import {
  ArrowDown,
  ArrowUp,
  Cross,
  Plus,
  Snowflake,
  Waves,
} from '@blueprintjs/icons';
import {ICON_SIZE} from '@shared/constants';
import clsx from 'clsx';
import {useMemo, useState} from 'react';
import {type ExtractionConfig} from 'src/interfaces.ts';
import {useBandState} from 'src/panels/extractions/hooks/use-band-state.ts';
import {useBandValidation} from 'src/panels/extractions/hooks/use-band-validation';
import {useExtractionTemplates} from 'src/panels/extractions/hooks/use-extraction-templates.ts';
import genericStyles from 'src/primitives/generic-section/generic-section.module.scss';
import {NumberInput} from 'src/primitives/number-input';
import {SmallCallout} from 'src/primitives/small-callout.tsx';
import {TextInput} from 'src/primitives/text-input.tsx';

import styles from './config-bands.module.scss';
import {useObjectSlug} from 'src/panels/extractions/hooks/use-object-slug.ts';

interface Props {
  extraction: ExtractionConfig;
}

export function ExtractionBands({extraction}: Props) {
  const {addBand, deleteBand, updateIndex, updateName, updateLow, updateHigh} =
    useBandState(extraction);
  const {hasTemplate} = useExtractionTemplates(extraction);
  const {getSlug} = useObjectSlug();
  const {isNameValid, isLowValid, isHighValid, validate} = useBandValidation();
  const validation = useMemo(
    () => validate(extraction),
    [validate, extraction],
  );
  const [open, setOpen] = useState(false);

  return (
    <Section
      title="Bands"
      icon={<Waves size={ICON_SIZE} />}
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
            onClick={addBand}
            disabled={hasTemplate}
          />
        </div>
        <div>idx</div>
        <div>name</div>
        <div>low freq. (Hz)</div>
        <div>high freq. (Hz)</div>
      </SectionCard>

      {extraction.bands
        .sort((a, b) => a.index - b.index)
        .map((band) => (
          <SectionCard
            key={getSlug(band)}
            className={clsx(genericStyles.row, styles.row)}
          >
            <div className="flex gap">
              <Button
                size="small"
                icon={<Cross size={ICON_SIZE} />}
                onClick={() => deleteBand(band)}
                disabled={hasTemplate}
              />
              <Button
                size="small"
                icon={<ArrowDown size={ICON_SIZE} />}
                onClick={() => updateIndex(band, +1)}
                disabled={hasTemplate}
              />
              <Button
                size="small"
                icon={<ArrowUp size={ICON_SIZE} />}
                onClick={() => updateIndex(band, -1)}
                disabled={hasTemplate}
              />
            </div>

            <span>{band.index}</span>

            <TextInput
              defaultValue={band.name}
              onBlur={(v) => updateName(band, v)}
              intent={isNameValid(band, extraction) ? 'success' : 'danger'}
              disabled={hasTemplate}
            />

            <NumberInput
              defaultValue={band.low}
              onBlur={(n) => updateLow(band, n)}
              intent={isLowValid(band) ? 'success' : 'danger'}
              disabled={hasTemplate}
            />

            <NumberInput
              defaultValue={band.high}
              onBlur={(n) => updateHigh(band, n)}
              intent={isHighValid(band) ? 'success' : 'danger'}
              disabled={hasTemplate}
            />
          </SectionCard>
        ))}
    </Section>
  );
}
