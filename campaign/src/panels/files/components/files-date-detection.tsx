import {Button, Callout, Section, SectionCard} from '@blueprintjs/core';
import {FilesDateDetectionDrawerContent} from 'src/panels/files/components/files-date-detection-drawer-content.tsx';
import {useDateDetection} from 'src/panels/files/hooks/use-date-detection.ts';
import {HelpDrawer} from 'src/primitives/help-drawer.tsx';
import {TextInput} from 'src/primitives/text-input.tsx';
import {formatDateToString} from 'src/utils/datetime.ts';

export function FilesDateDetection() {
  const {value, update, detect, apply, files, results} = useDateDetection();

  return (
    <div className="flex gap">
      <Section
        compact
        collapsible
        collapseProps={{defaultIsOpen: false}}
        title="Detect dates"
        rightElement={
          <HelpDrawer>
            <FilesDateDetectionDrawerContent />
          </HelpDrawer>
        }
      >
        <SectionCard className="flex gap column">
          <Callout intent="primary">
            First file path:&nbsp;
            <code>{files[0].Path}</code>
          </Callout>

          <Callout intent="primary">
            Detection result:&nbsp;
            <code>
              {results.length > 0
                ? formatDateToString(results[0])
                : 'No results'}
            </code>
          </Callout>

          <div className="flex gap">
            <TextInput
              value={value}
              onBlur={update}
              onChange={update}
              onEnter={detect}
            />

            <Button
              className="w2"
              onClickCapture={detect}
              text="Detect"
            />

            <Button
              className="w2"
              onClickCapture={apply}
              text="Apply"
              disabled={results.length === 0}
            />
          </div>
        </SectionCard>
      </Section>
    </div>
  );
}
