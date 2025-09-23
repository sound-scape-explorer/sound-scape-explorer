import {Button, Section, SectionCard} from '@blueprintjs/core';
import {FilterList, Plus, Snowflake} from '@blueprintjs/icons';
import {ICON_SIZE} from '@shared/constants';
import clsx from 'clsx';
import {useMemo, useState} from 'react';
import {type ExtractionConfig} from 'src/interfaces.ts';
import styles from 'src/panels/extractions/components/config-extractors.module.scss';
import {ExtractionExtractorCard} from 'src/panels/extractions/components/extraction-extractor-card.tsx';
import {ExtractionExtractorsDrawerContent} from 'src/panels/extractions/components/extraction-extractors-drawer-content.tsx';
import {useExtractionTemplates} from 'src/panels/extractions/hooks/use-extraction-templates.ts';
import {useExtractorSlug} from 'src/panels/extractions/hooks/use-extractor-slug';
import {useExtractorState} from 'src/panels/extractions/hooks/use-extractor-state.ts';
import {useExtractorValidation} from 'src/panels/extractions/hooks/use-extractor-validation.ts';
import genericStyles from 'src/primitives/generic-section/generic-section.module.scss';
import {HelpDrawer} from 'src/primitives/help-drawer.tsx';
import {SmallCallout} from 'src/primitives/small-callout.tsx';

interface Props {
  extraction: ExtractionConfig;
}

export function ExtractionExtractors({extraction}: Props) {
  const {extractors, addExtractor} = useExtractorState(extraction);
  const {hasTemplate} = useExtractionTemplates(extraction);
  const {getSlug} = useExtractorSlug();
  const {validate} = useExtractorValidation();
  const validation = useMemo(
    () => validate(extraction),
    [extraction, validate],
  );
  const [open, setOpen] = useState(false);

  return (
    <Section
      title="Extractors"
      icon={<FilterList size={ICON_SIZE} />}
      compact
      collapsible
      collapseProps={{
        isOpen: open,
        onToggle: () => setOpen((o) => !o),
      }}
      rightElement={
        <>
          {hasTemplate && <Snowflake size={ICON_SIZE} />}

          <HelpDrawer>
            <ExtractionExtractorsDrawerContent />
          </HelpDrawer>

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
            onClick={addExtractor}
            disabled={hasTemplate}
          />
        </div>
        <span>idx</span>
        <span>name</span>
        <span>impl</span>
        <span>window (ms)</span>
        <span>hop (ms)</span>
        <span>adv.</span>
      </SectionCard>

      {extractors
        .sort((a, b) => a.index - b.index)
        .map((extractor) => (
          <ExtractionExtractorCard
            key={getSlug(extractor)}
            extraction={extraction}
            extractor={extractor}
          />
        ))}
    </Section>
  );
}
