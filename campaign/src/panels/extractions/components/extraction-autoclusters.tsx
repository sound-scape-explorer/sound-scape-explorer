import {Button, Section} from '@blueprintjs/core';
import {SectionCard} from '@blueprintjs/core/lib/esnext';
import {
  ArrowDown,
  ArrowUp,
  Cross,
  LayoutSortedClusters,
  Plus,
} from '@blueprintjs/icons';
import {ICON_SIZE} from '@shared/constants';
import {AutoclusterImpl} from '@shared/enums';
import clsx from 'clsx';
import {useMemo, useState} from 'react';
import {type ExtractionConfig} from 'src/interfaces.ts';
import styles from 'src/panels/extractions/components/extraction-autoclusters.module.scss';
import {useAutoclusterState} from 'src/panels/extractions/hooks/use-autocluster-state.ts';
import {useExtractionTemplates} from 'src/panels/extractions/hooks/use-extraction-templates.ts';
import {useAutoclusterSlug} from 'src/panels/metrics/hooks/use-autocluster-slug';
import {useAutoclustersValidation} from 'src/panels/metrics/hooks/use-autoclusters-validation';
import genericStyles from 'src/primitives/generic-section/generic-section.module.scss';
import {NumberInput} from 'src/primitives/number-input.tsx';
import {Select} from 'src/primitives/select.tsx';
import {SmallCallout} from 'src/primitives/small-callout.tsx';

interface Props {
  extraction: ExtractionConfig;
}

export function ExtractionAutoclusters({extraction}: Props) {
  const {
    autoclusters,
    addAutocluster,
    deleteAutocluster,
    updateIndex,
    updateImpl,
    updateMinClusterSize,
    updateMinSamples,
    updateAlpha,
    updateEpsilon,
  } = useAutoclusterState(extraction);
  const {getSlug} = useAutoclusterSlug();
  const {
    isMinClusterSizeValid,
    isMinSamplesValid,
    isAlphaValid,
    isEpsilonValid,
    validate,
  } = useAutoclustersValidation();
  const validation = useMemo(
    () => validate(extraction),
    [extraction, validate],
  );
  const [open, setOpen] = useState(false);
  const {hasTemplate} = useExtractionTemplates(extraction);

  return (
    <Section
      title="Autoclusters"
      icon={<LayoutSortedClusters size={ICON_SIZE} />}
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
            onClick={addAutocluster}
            disabled={hasTemplate}
          />
        </div>
        <div>idx</div>
        <div>impl</div>
        <div>min cluster size</div>
        <div>min samples</div>
        <div>alpha</div>
        <div>epsilon</div>
      </SectionCard>

      {autoclusters
        .sort((a, b) => a.index - b.index)
        .map((autocluster) => (
          <SectionCard
            key={getSlug(autocluster)}
            className={clsx(genericStyles.row, styles.row)}
          >
            <div className="flex gap">
              <Button
                size="small"
                icon={<Cross size={ICON_SIZE} />}
                onClick={() => deleteAutocluster(autocluster)}
                disabled={hasTemplate}
              />
              <Button
                size="small"
                icon={<ArrowDown size={ICON_SIZE} />}
                onClick={() => updateIndex(autocluster, +1)}
                disabled={hasTemplate}
              />
              <Button
                size="small"
                icon={<ArrowUp size={ICON_SIZE} />}
                onClick={() => updateIndex(autocluster, -1)}
                disabled={hasTemplate}
              />
            </div>

            <span>{autocluster.index}</span>

            <Select
              items={AutoclusterImpl.options}
              onSelect={(v) => updateImpl(autocluster, v)}
              current={autocluster.impl}
              placeholder="Select implementation"
            />

            <NumberInput
              defaultValue={autocluster.minClusterSize}
              onBlur={(n) => updateMinClusterSize(autocluster, n)}
              intent={isMinClusterSizeValid(autocluster) ? 'success' : 'danger'}
            />

            <NumberInput
              defaultValue={autocluster.minSamples}
              onBlur={(n) => updateMinSamples(autocluster, n)}
              intent={isMinSamplesValid(autocluster) ? 'success' : 'danger'}
            />

            <NumberInput
              defaultValue={autocluster.alpha}
              onBlur={(n) => updateAlpha(autocluster, n)}
              intent={isAlphaValid(autocluster) ? 'success' : 'danger'}
            />

            <NumberInput
              defaultValue={autocluster.epsilon}
              onBlur={(n) => updateEpsilon(autocluster, n)}
              intent={isEpsilonValid(autocluster) ? 'success' : 'danger'}
            />
          </SectionCard>
        ))}
    </Section>
  );
}
