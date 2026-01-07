import {DrawerContent} from 'src/primitives/drawer-content.tsx';

export function SettingsRangesHelpContent() {
  return (
    <DrawerContent
      items={[
        {
          index: 0,
          title: 'Time Ranges',
          body: (
            <div className="flex column">
              <span>
                Time ranges provide calendar-based navigation for browsing your
                data in the interface.
              </span>
              <span className="i">
                Note: time ranges are for visualisation only and do not affect
                any calculations.
              </span>
            </div>
          ),
        },
      ]}
    />
  );
}
