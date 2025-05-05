import {DrawerContent} from 'src/primitives/drawer-content.tsx';

export function SettingsPanelMemoryLimitDrawerContent() {
  return (
    <DrawerContent
      content={[
        [
          null,
          'The memory limit to apply when computing the mean distances matrix.',
        ],
      ]}
    />
  );
}
