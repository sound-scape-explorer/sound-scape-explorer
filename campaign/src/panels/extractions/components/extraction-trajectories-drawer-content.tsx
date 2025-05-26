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
          'time window duration for smoothing trajectory path using rolling average',
        ],
      ]}
    />
  );
}
