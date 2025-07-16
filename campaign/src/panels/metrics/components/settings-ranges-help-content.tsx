import {DrawerContent} from 'src/primitives/drawer-content.tsx';

export function SettingsRangesHelpContent() {
  return (
    <DrawerContent
      content={[
        [
          'Time Ranges',
          <div
            className="flex column"
            key="time-ranges"
          >
            <span>
              Time ranges provide calendar-based navigation for browsing your
              data in the interface.
            </span>
            <span className="i">
              Note: time ranges are for visualization only and do not affect any
              calculations.
            </span>
          </div>,
        ],
      ]}
    />
  );
}
