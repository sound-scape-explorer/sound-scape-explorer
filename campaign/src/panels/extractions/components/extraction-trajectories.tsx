import {Button, Section} from '@blueprintjs/core';
import {SectionCard} from '@blueprintjs/core/lib/esnext';
import {
  ArrowDown,
  ArrowUp,
  Cross,
  CurvedRangeChart,
  Plus,
} from '@blueprintjs/icons';
import {ICON_SIZE, SmoothingWindowPresets} from '@shared/constants';
import clsx from 'clsx';
import {useMemo, useState} from 'react';
import {type ExtractionConfig} from 'src/interfaces.ts';
import styles from 'src/panels/extractions/components/extraction-trajectories.module.scss';
import {ExtractionTrajectoriesDrawerContent} from 'src/panels/extractions/components/extraction-trajectories-drawer-content.tsx';
import {useExtractionTemplates} from 'src/panels/extractions/hooks/use-extraction-templates.ts';
import {useTrajectoryState} from 'src/panels/extractions/hooks/use-trajectory-state.ts';
import {useFilesTagging} from 'src/panels/files/hooks/use-files-tagging';
import {useTrajectoriesValidation} from 'src/panels/metrics/hooks/use-trajectories-validation';
import {useTrajectorySlug} from 'src/panels/metrics/hooks/use-trajectory-slug';
import {DatePicker} from 'src/primitives/date-picker.tsx';
import genericStyles from 'src/primitives/generic-section/generic-section.module.scss';
import {HelpDrawer} from 'src/primitives/help-drawer.tsx';
import {Select} from 'src/primitives/select.tsx';
import {SmallCallout} from 'src/primitives/small-callout.tsx';
import {TextInput} from 'src/primitives/text-input.tsx';

interface Props {
  extraction: ExtractionConfig;
}

export function ExtractionTrajectories({extraction}: Props) {
  const {
    trajectories,
    addTrajectory,
    deleteTrajectory,
    updateIndex,
    updateName,
    updateStart,
    updateEnd,
    updateProperty,
    updateValue,
    updateSmoothingWindowPreset,
  } = useTrajectoryState(extraction);
  const {getSlug} = useTrajectorySlug();
  const {
    validate,
    isNameValid,
    isTagNameValid,
    isTagValueValid,
    isStartValid,
    isEndValid,
  } = useTrajectoriesValidation();
  const validation = useMemo(
    () => validate(extraction),
    [extraction, validate],
  );
  const {names} = useFilesTagging();
  const [open, setOpen] = useState(false);
  const {hasTemplate} = useExtractionTemplates(extraction);

  return (
    <Section
      title="Trajectories"
      icon={<CurvedRangeChart size={ICON_SIZE} />}
      compact
      collapsible
      collapseProps={{
        isOpen: open,
        onToggle: () => setOpen((o) => !o),
      }}
      rightElement={
        <>
          <HelpDrawer>
            <ExtractionTrajectoriesDrawerContent />
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
            onClick={addTrajectory}
            disabled={hasTemplate}
          />
        </div>
        <div>idx</div>
        <div>name</div>
        <div>start</div>
        <div>end</div>
        <div>tag name</div>
        <div>tag value</div>
        <div>window</div>
      </SectionCard>

      {trajectories
        .sort((a, b) => a.index - b.index)
        .map((trajectory) => (
          <SectionCard
            key={getSlug(trajectory)}
            className={clsx(genericStyles.row, styles.row)}
          >
            <div className="flex gap">
              <Button
                size="small"
                icon={<Cross size={ICON_SIZE} />}
                onClick={() => deleteTrajectory(trajectory)}
                disabled={hasTemplate}
              />
              <Button
                size="small"
                icon={<ArrowDown size={ICON_SIZE} />}
                onClick={() => updateIndex(trajectory, +1)}
                disabled={hasTemplate}
              />
              <Button
                size="small"
                icon={<ArrowUp size={ICON_SIZE} />}
                onClick={() => updateIndex(trajectory, -1)}
                disabled={hasTemplate}
              />
            </div>

            <span>{trajectory.index}</span>

            <TextInput
              defaultValue={trajectory.name}
              onBlur={(v) => updateName(trajectory, v)}
              intent={
                isNameValid(trajectory, extraction) ? 'success' : 'danger'
              }
            />

            <DatePicker
              value={trajectory.start}
              onChange={(d) => d !== null && updateStart(trajectory, d)}
              intent={isStartValid(trajectory) ? 'success' : 'danger'}
              small
            />

            <DatePicker
              value={trajectory.end}
              onChange={(d) => d !== null && updateEnd(trajectory, d)}
              intent={isEndValid(trajectory) ? 'success' : 'danger'}
              small
            />

            <Select
              items={names}
              current={trajectory.tagName ?? null}
              onSelect={(v) => updateProperty(trajectory, v)}
              placeholder="Select"
              intent={isTagNameValid(trajectory) ? 'success' : 'danger'}
            />

            <TextInput
              defaultValue={trajectory.tagValue}
              onBlur={(v) => updateValue(trajectory, v)}
              intent={isTagValueValid(trajectory) ? 'success' : 'danger'}
            />

            <Select
              items={SmoothingWindowPresets}
              current={trajectory.smoothingWindowPreset}
              onSelect={(s) => updateSmoothingWindowPreset(trajectory, s)}
              placeholder="step"
            />
          </SectionCard>
        ))}
    </Section>
  );
}
