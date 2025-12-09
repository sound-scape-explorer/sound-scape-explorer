import {ManuallyEnteredData, MultiSelect} from '@blueprintjs/icons';
import {ICON_SIZE} from '@shared/constants.ts';
import {DrawerContent} from 'src/primitives/drawer-content.tsx';

export function ExtractionTrajectoriesDrawerContent() {
  return (
    <DrawerContent
      content={[
        ['name', 'unique identifier for the trajectory'],
        ['start', 'start time for trajectory data filtering'],
        ['end', 'end time for trajectory data filtering'],
        [
          'tag name',
          'filter intervals to only include those containing this tag',
        ],
        [
          'tag value',
          'filter intervals to only include those where the tag contains this value',
        ],
        [
          'window',
          <div key="window">
            <div>
              time window duration for smoothing trajectory path using rolling
              average
            </div>
            <div className="flex gap align">
              <MultiSelect size={ICON_SIZE} />
              Use predefined values
            </div>
            <div className="flex gap align">
              <ManuallyEnteredData size={ICON_SIZE} />
              Manually enter value in milliseconds
            </div>
          </div>,
        ],
      ]}
    />
  );
}
