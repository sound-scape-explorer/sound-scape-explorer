import {ManuallyEnteredData, MultiSelect} from '@blueprintjs/icons';
import {ICON_SIZE} from '@shared/constants.ts';
import {DrawerContent} from 'src/primitives/drawer-content.tsx';

export function ExtractionTrajectoriesDrawerContent() {
  return (
    <DrawerContent
      items={[
        {
          index: 0,
          title: 'name',
          body: 'unique identifier for the trajectory',
        },
        {
          index: 1,
          title: 'start',
          body: 'start time for trajectory data filtering',
        },
        {
          index: 2,
          title: 'end',
          body: 'end time for trajectory data filtering',
        },
        {
          index: 3,
          title: 'tag name',
          body: 'filter intervals to only include those containing this tag',
        },
        {
          index: 4,
          title: 'tag value',
          body: 'filter intervals to only include those where the tag contains this value',
        },
        {
          index: 5,
          title: 'window',
          body: (
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
            </div>
          ),
        },
      ]}
    />
  );
}
