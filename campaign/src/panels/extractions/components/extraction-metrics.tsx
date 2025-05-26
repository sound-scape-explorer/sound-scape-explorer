import {Button, Section} from '@blueprintjs/core';
import {SectionCard} from '@blueprintjs/core/lib/esnext';
import {
  ArrowDown,
  ArrowUp,
  Cross,
  HeatGrid,
  Plus,
  Snowflake,
} from '@blueprintjs/icons';
import {ICON_SIZE} from '@shared/constants';
import {MetricImpl} from '@shared/enums';
import clsx from 'clsx';
import {useMemo, useState} from 'react';
import {type ExtractionConfig} from 'src/interfaces.ts';
import styles from 'src/panels/extractions/components/extraction-metrics.module.scss';
import {ExtractionMetricsDrawerContent} from 'src/panels/extractions/components/extraction-metrics-drawer-content.tsx';
import {useExtractionTemplates} from 'src/panels/extractions/hooks/use-extraction-templates.ts';
import {useMetricState} from 'src/panels/extractions/hooks/use-metric-state.ts';
import {useMetricSlug} from 'src/panels/metrics/hooks/use-metric-slug';
import {useMetricValidation} from 'src/panels/metrics/hooks/use-metric-validation.ts';
import genericStyles from 'src/primitives/generic-section/generic-section.module.scss';
import {HelpDrawer} from 'src/primitives/help-drawer.tsx';
import {Select} from 'src/primitives/select.tsx';
import {SmallCallout} from 'src/primitives/small-callout.tsx';

interface Props {
  extraction: ExtractionConfig;
}

export function ExtractionMetrics({extraction}: Props) {
  const {metrics, addMetric, deleteMetric, updateIndex, updateImpl} =
    useMetricState(extraction);
  const {hasTemplate} = useExtractionTemplates(extraction);
  const {getSlug} = useMetricSlug();
  const {isImplValid, validate} = useMetricValidation();
  const validation = useMemo(
    () => validate(extraction),
    [extraction, validate],
  );
  const [open, setOpen] = useState(false);

  return (
    <Section
      title="Metrics"
      icon={<HeatGrid size={ICON_SIZE} />}
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
            <ExtractionMetricsDrawerContent />
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
            onClick={addMetric}
            disabled={hasTemplate}
          />
        </div>
        <div>idx</div>
        <div>impl</div>
      </SectionCard>

      {metrics
        .sort((a, b) => a.index - b.index)
        .map((metric) => (
          <SectionCard
            key={getSlug(metric)}
            className={clsx(genericStyles.row, styles.row)}
          >
            <div className="flex gap">
              <Button
                size="small"
                icon={<Cross size={ICON_SIZE} />}
                onClick={() => deleteMetric(metric)}
                disabled={hasTemplate}
              />
              <Button
                size="small"
                icon={<ArrowDown size={ICON_SIZE} />}
                onClick={() => updateIndex(metric, +1)}
                disabled={hasTemplate}
              />
              <Button
                size="small"
                icon={<ArrowUp size={ICON_SIZE} />}
                onClick={() => updateIndex(metric, -1)}
                disabled={hasTemplate}
              />
            </div>

            <span>{metric.index}</span>

            <Select
              items={MetricImpl.options}
              current={metric.impl}
              onSelect={(v) => updateImpl(metric, v)}
              placeholder="Select impl"
              intent={isImplValid(metric, extraction) ? 'success' : 'danger'}
              disabled={hasTemplate}
            />
          </SectionCard>
        ))}
    </Section>
  );
}
