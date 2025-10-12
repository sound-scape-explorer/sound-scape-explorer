import {Button, Section, SectionCard} from '@blueprintjs/core';
import {Add, ArrowDown, ArrowUp, Cross} from '@blueprintjs/icons';
import {ICON_SIZE} from '@shared/constants';
import clsx from 'clsx';
import {useMemo} from 'react';
import {useRangeState} from 'src/panels/extractions/hooks/use-range-state.ts';
import {SettingsRangesHelpContent} from 'src/panels/metrics/components/settings-ranges-help-content.tsx';
import {useRangeValidation} from 'src/panels/metrics/hooks/use-range-validation';
import {DatePicker} from 'src/primitives/date-picker.tsx';
import genericStyles from 'src/primitives/generic-section/generic-section.module.scss';
import {HelpDrawer} from 'src/primitives/help-drawer.tsx';
import {SmallCallout} from 'src/primitives/small-callout.tsx';
import {TextInput} from 'src/primitives/text-input.tsx';

import styles from './metrics-ranges.module.scss';
import {useObjectSlug} from 'src/panels/extractions/hooks/use-object-slug.ts';

export function SettingsRanges() {
  const {
    ranges,
    addRange,
    deleteRange,
    updateIndex,
    updateName,
    updateStart,
    updateEnd,
  } = useRangeState();
  const {getSlug} = useObjectSlug();
  const {isNameValid, isStartValid, isEndValid, validate} =
    useRangeValidation();
  const validation = useMemo(() => validate(), [validate]);

  return (
    <Section
      title="Time Ranges"
      compact
      collapsible
      collapseProps={{defaultIsOpen: false}}
      rightElement={
        <>
          {validation && (
            <SmallCallout intent={validation.intent}>
              {validation.content}
            </SmallCallout>
          )}

          <HelpDrawer>
            <SettingsRangesHelpContent />
          </HelpDrawer>
        </>
      }
    >
      <SectionCard
        className={clsx(genericStyles.row, genericStyles.narrow, styles.row)}
      >
        <div>
          <Button
            size="small"
            icon={<Add size={ICON_SIZE} />}
            fill
            style={{margin: 2}}
            onClick={addRange}
          />
        </div>
        <div>idx</div>
        <div>name</div>
        <div>start</div>
        <div>end</div>
      </SectionCard>

      {ranges
        .sort((a, b) => a.index - b.index)
        .map((range) => (
          <SectionCard
            key={getSlug(range)}
            className={clsx(genericStyles.row, styles.row)}
          >
            <div className="flex gap">
              <Button
                size="small"
                icon={<Cross size={ICON_SIZE} />}
                onClick={() => deleteRange(range)}
              />
              <Button
                size="small"
                icon={<ArrowDown size={ICON_SIZE} />}
                onClick={() => updateIndex(range, +1)}
              />
              <Button
                size="small"
                icon={<ArrowUp size={ICON_SIZE} />}
                onClick={() => updateIndex(range, -1)}
              />
            </div>

            <span>{range.index}</span>

            <TextInput
              defaultValue={range.name}
              onBlur={(v) => updateName(range, v)}
              intent={isNameValid(range) ? 'success' : 'danger'}
            />

            <DatePicker
              value={range.start}
              onChange={(n) => n !== null && updateStart(range, n)}
              intent={isStartValid(range) ? 'success' : 'danger'}
            />

            <DatePicker
              value={range.end}
              onChange={(n) => n !== null && updateEnd(range, n)}
              intent={isEndValid(range) ? 'success' : 'danger'}
            />
          </SectionCard>
        ))}
    </Section>
  );
}
